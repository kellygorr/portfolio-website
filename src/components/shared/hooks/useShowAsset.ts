import { useInView } from 'react-intersection-observer'

import * as React from 'react'
interface IUseShowAssetProps {
	asset: string
}
export const useShowAsset = (props: IUseShowAssetProps): [(node?: Element) => void, boolean] => {
	const { asset } = props
	//Preload asset
	const isMounted = useIsMounted() //Prevent memory leaks.  Cleanup with useEffect
	const [isLoaded, setIsLoaded] = React.useState(null)

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 0,
		triggerOnce: true,
	})

	React.useEffect(() => {
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

	return [ref, isLoaded]
}

const useIsMounted = () => {
	const isMounted = React.useRef(true)

	React.useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	return isMounted
}
