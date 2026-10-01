export const RandomBinaryStr = (): string => {
	const len = Math.floor(Math.random() * 10) + 3
	const randomString = '01'
	let ans = ''
	for (let i = len; i > 0; i--) {
		ans += randomString[Math.floor(Math.random() * randomString.length)]
	}
	return ans
}
