import 'reflect-metadata';

export const injectKey = 'ioc:inject:key';

export function inject() {
    return function(target: any, targetKey: string) {
        const targetConstructor = target.constructor;
        let props = {};
        if (Reflect.hasOwnMetadata(injectKey, targetConstructor)) {
            props = Reflect.getOwnMetadata(injectKey, targetConstructor);
        }
        props[targetKey] = {
            value: targetKey,
        }
        Reflect.defineMetadata(injectKey, props, targetConstructor);
    }
}
