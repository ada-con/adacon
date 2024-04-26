// These constants are string-replaced compile time.
// See https://vitejs.dev/config/shared-options.html#define
declare const VERSION: string
declare const HOMEPAGE: string
declare const BUILD_TIME: string

interface ImportMeta {
	readonly env: ImportMetaEnv
}
