import { IProject } from '../IProject'

const thumbnailx1 = new URL('../../assets/thumbnails/x1/test.jpg', import.meta.url).href
const thumbnailx15 = new URL('../../assets/thumbnails/x15/test.jpg', import.meta.url).href
const thumbnailx2 = new URL('../../assets/thumbnails/x2/test.jpg', import.meta.url).href

// const img1 = import.meta.env.VITE_IMAGE_URL_SRC + '1.jpg'
const img2 = new URL('../../assets/images/2.jpg', import.meta.url).href
const img3 = new URL('../../assets/images/3.jpg', import.meta.url).href
const img4 = new URL('../../assets/images/4.jpg', import.meta.url).href
const img5 = new URL('../../assets/images/5.jpg', import.meta.url).href
const img6 = new URL('../../assets/images/6.jpg', import.meta.url).href

export const test: IProject = {
	details: {
		header: 'Test',
		thumbnail: {
			x1: thumbnailx1,
			x15: thumbnailx15,
			x2: thumbnailx2,
		},
	},
	content: [
		{
			slideshow: {
				width: 800,
				slides: [
					{
						img: 'https://www.thewowstyle.com/wp-content/uploads/2015/03/Desktop-Wallpaper-HD2.jpg',
						caption: 'Text',
					},
					{
						img: img2,
						caption: 'Text 2',
					},
					{
						img: img3,
						caption: 'Text 3',
					},
					{
						img: img4,
						caption: 'Text 4',
					},
					{
						img: img5,
						caption: 'Text 5',
					},
					{
						img: img6,
						caption: 'Text 6',
					},
				],
			},
		},
	],
}
