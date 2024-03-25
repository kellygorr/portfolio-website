/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_THUMBNAIL_SRC_1x: string
	readonly VITE_THUMBNAIL_SRC_15x: string
	readonly VITE_THUMBNAIL_SRC_2x: string
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
