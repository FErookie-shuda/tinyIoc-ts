import { injectKey } from "./inject";

interface ConstructorInterface {
    constructorFunction: Function,
    constructorParams: [any],
}

export class Container {

    private static dependenceMap: Map<string, ConstructorInterface> = null;

    constructor() {
    }

    public static bindDependence(identifier: string, constructorFunction: Function, constructorParams: [any]) {
        if (!this.dependenceMap) {
            this.dependenceMap = new Map<string, ConstructorInterface>();
        }
        this.dependenceMap.set(identifier, {
            constructorFunction: constructorFunction,
            constructorParams: constructorParams,
        });
    }

    public static getInstance<T>(identifier:string): T {
        if (!this.dependenceMap) {
            this.dependenceMap = new Map<string, ConstructorInterface>();
        }
        const target = this.dependenceMap.get(identifier);

        console.log(target);
        const { constructorFunction, constructorParams } = target;
        const injectProps = Reflect.getMetadata(injectKey, constructorFunction) || {};
        let instance = Reflect.construct(constructorFunction, constructorParams);

        Object.keys(injectProps).forEach((prop) => {
            instance[prop] = this.getInstance(injectProps[prop].value);
        })

        return instance;
    }

}
