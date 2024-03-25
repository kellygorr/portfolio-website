import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface IUseShowAssetProps {
	asset: string
}
export const useShowAsset = (props: IUseShowAssetProps): [(node?: Element) => void, boolean] => {
	const { asset } = props
	//Preload asset
	const isMounted = useIsMounted() //Prevent memory leaks.  Cleanup with useEffect
	const [isLoaded, setIsLoaded] = useState<boolean | null>(null)

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 0,
		triggerOnce: true,
	})

	useEffect(() => {
		if (!asset || asset.includes('.mp4')) {
			setIsLoaded(true)
		} else if (inView) {
			const img = new Image()
			img.src = asset
			img.onload = () => {
				if (isMounted.current) {
					setIsLoaded(true)
				}
			}
		}
	}, [asset, inView, isMounted])

	return [ref, isLoaded as boolean] // Fix: Update the type of isLoaded to boolean
}

const useIsMounted = () => {
	const isMounted = useRef(true)

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return isMounted
}
