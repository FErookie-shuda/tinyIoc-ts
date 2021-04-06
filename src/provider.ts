import 'reflect-metadata';
export const KEY = 'test:shudagao';

export function provider(identifier: string, ...args: any[]) {
    return (target: any) => {
        Reflect.defineMetadata(KEY, {
            identifier: identifier,
            args: args || [],
        }, target);
        return target;
    }
}
