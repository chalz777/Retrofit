import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    plugins: [vue(), mkcert()],
    server: {
        https: true
        //  the rest of the config...
    }
});