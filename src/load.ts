import * as fs from 'fs';
import { KEY } from './provider';
import { Container } from "./container";

export function load(path: string) {
    const list = fs.readdirSync(path);

    for (const file of list) {
        if (fs.lstatSync(file).isFile()) {
            if (/\.ts$/.test(file)) { // 扫描 ts 文件
                // TODO: 这个文件目录的问题要改一下
                const exports = require(`/Users/gaoshuda/pippiteam/tinyIoc-ts/src/instances/index.ts`);
                for (const m in exports) {
                    const module = exports[m];
                    if (typeof module === 'function') {
                        const metadata = Reflect.getMetadata(KEY, module);
                        // 注册实例
                        if (metadata) {
                            Container.bindDependence(metadata.identifier, module, metadata.args)
                        }
                    }
                }
            }
        } else {
            load(file);
        }
    }
}
