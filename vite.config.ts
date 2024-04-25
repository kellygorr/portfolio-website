import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			output: {
				// /**
				//  * The pattern to use for chunks created from entry points, or a function that is called per entry chunk to return such a pattern.
				//  *
				//  * @see https://rollupjs.org/configuration-options/#output-entryfilenames
				//  */
				// chunkFileNames: 'assets/js/[name]-[hash].js',
				// /**
				//  * The pattern to use for naming shared chunks created when code-splitting, or a function that is called per chunk to return such a pattern.
				//  * @see https://rollupjs.org/configuration-options/#output-chunkfilenames
				//  */
				// entryFileNames: 'assets/js/[name]-[hash].js',

				/**
				 * The pattern to use for naming custom emitted assets to include in the build output,
				 * or a function that is called per asset to return such a pattern.
				 * Please ensure that the returned path is relative to the out directory defined in the build.output option.
				 *
				 * @see https://rollupjs.org/configuration-options/#output-assetfilenames
				 *
				 */
				assetFileNames: ({ name }) => {
					// Move files which end with gif, jpeg, jpg, png or svg to assets/images.
					// If you don't need hash, you can use the [name] placeholder like this:
					// 'assets/images/[name][extname]'
					if (/\.(gif|jpe?g|png|svg|pdf)$/.test(name ?? '')) {
						return 'assets/images/[name]-[hash][extname]'
					}

					// Move files which end with css to assets/css
					if (/\.mp4$/.test(name ?? '')) {
						return 'assets/videos/[name]-[hash][extname]'
					}

					// Move files which end with css to assets/css
					if (/\.(woff|woff2|eot|otf|ttf)$/.test(name ?? '')) {
						return 'assets/fonts/[name]-[hash][extname]'
					}

					// Default value
					// ref: https://rollupjs.org/guide/en/#outputassetfilenames
					return 'assets/[name]-[hash][extname]'
				},
			},
		},
	},
})
