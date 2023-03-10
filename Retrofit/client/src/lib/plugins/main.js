import { VIRTUAL_MODULES, VIRTUAL_MODULES_MAP, VIRTUAL_MODULES_RESOLVE_PREFIX, } from '../constants';
import { generateRegisterSW } from '../modules';
import { resolveOptions } from '../options';
import { swDevOptions } from './dev';
export function MainPlugin(ctx, api) {
    const retVal = {
        name: 'vite-sandbox',
        enforce: 'pre',
        config() {
            return {
                ssr: {
                    // TODO: remove until workbox-window support native ESM
                    noExternal: ['workbox-window'],
                },
            };
        },
        async configResolved(config) {
            var _a, _b, _c, _d, _e;
            ctx.useImportRegister = false;
            ctx.viteConfig = config;
            (_e = (_d = (_c = (_b = (_a = ctx.userOptions) === null || _a === void 0 ? void 0 : _a.integration) === null || _b === void 0 ? void 0 : _b.
            //ctx.userOptions?.integration?.configureOptions?.(config, ctx.userOptions)
            ctx.userOptions) === null || _c === void 0 ? void 0 : _c.integration) === null || _d === void 0 ? void 0 : _d.configureOptions) === null || _e === void 0 ? void 0 : _e.call(_d, config, ctx.userOptions);
            ctx.options = await resolveOptions(ctx.userOptions, config);
        },
        resolveId(id) {
            return VIRTUAL_MODULES.includes(id) ? VIRTUAL_MODULES_RESOLVE_PREFIX + id : undefined;
        },
        load(id) {
            const hiddenVal = !ctx.options.disable && ctx.viteConfig.command === "build" ? "build" : "dev";
            if (id.startsWith(VIRTUAL_MODULES_RESOLVE_PREFIX))
                id = id.slice(VIRTUAL_MODULES_RESOLVE_PREFIX.length);
            else
                return;
            if (VIRTUAL_MODULES.includes(id)) {
                ctx.useImportRegister = true;
                if (ctx.viteConfig.command === 'serve' && ctx.options.devOptions.enabled) {
                    return generateRegisterSW(Object.assign(Object.assign({}, ctx.options), { filename: swDevOptions.swUrl }), 'build', VIRTUAL_MODULES_MAP[id]);
                }
                else {
                    return generateRegisterSW(ctx.options, !ctx.options.disable && ctx.viteConfig.command === 'build' ? 'build' : 'dev', VIRTUAL_MODULES_MAP[id]);
                }
            }
        },
        api,
    };
    return retVal;
}
//# sourceMappingURL=main.js.map