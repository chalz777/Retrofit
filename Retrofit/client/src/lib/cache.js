// port from https://raw.githubusercontent.com/shadowwalker/next-pwa/master/cache.js
export const cachePreset = [
    {
        urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
            cacheName: 'google-fonts',
            expiration: {
                maxEntries: 4,
                maxAgeSeconds: 365 * 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'static-font-assets',
            expiration: {
                maxEntries: 4,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'static-image-assets',
            expiration: {
                maxEntries: 64,
                maxAgeSeconds: 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:js)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'static-js-assets',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:css|less)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'static-style-assets',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\.(?:json|xml|csv)$/i,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'static-data-assets',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60,
            },
        },
    },
    {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkFirst',
        method: 'GET',
        options: {
            cacheName: 'apis',
            expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60,
            },
            networkTimeoutSeconds: 10,
        },
    },
    {
        urlPattern: /.*/i,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'others',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60,
            },
            networkTimeoutSeconds: 10,
        },
    },
];
//# sourceMappingURL=cache.js.map