import { injectServiceWorker } from '../html';
import { _generateBundle, _generateSW } from '../api';
export function BuildPlugin(ctx) {
    var _a, _b;
    return {
        name: 'vite-sandbox:build',
        enforce: 'post',
        apply: 'build',
        transformIndexHtml: {
            enforce: 'post',
            transform(html) {
                const { options, useImportRegister } = ctx;
                if (options.disable)
                    return html;
                // if virtual register is requested, do not inject.
                if (options.injectRegister === 'auto')
                    options.injectRegister = useImportRegister ? null : 'script';
                const serviceWorker = injectServiceWorker(html, options, false);
                return serviceWorker;
            },
        },
        generateBundle(_, bundle) {
            const temp = _generateBundle(ctx, bundle);
            return temp;
        },
        closeBundle: {
            sequential: true,
            order: (_b = (_a = ctx.userOptions) === null || _a === void 0 ? void 0 : _a.integration) === null || _b === void 0 ? void 0 : _b.closeBundleOrder,
            async handler() {
                if (!ctx.viteConfig.build.ssr && !ctx.options.disable)
                    await _generateSW(ctx);
            },
        },
        async buildEnd(error) {
            if (error)
                throw error;
        },
    };
}
//# sourceMappingURL=build.js.map