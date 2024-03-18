import { IProject } from '../IProject'
const thumbnail = 'test.jpg'

// const img1 = import.meta.env.VITE_IMAGE_URL_SRC + '1.jpg'
const img2 = import.meta.env.VITE_IMAGE_URL_SRC + '2.jpg'
const img3 = import.meta.env.VITE_IMAGE_URL_SRC + '3.jpg'
const img4 = import.meta.env.VITE_IMAGE_URL_SRC + '4.jpg'
const img5 = import.meta.env.VITE_IMAGE_URL_SRC + '5.jpg'
const img6 = import.meta.env.VITE_IMAGE_URL_SRC + '6.jpg'

export const test: IProject = {
	details: {
		header: 'Test',
		thumbnail: thumbnail,
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
