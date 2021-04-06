import { provider } from "../provider";
import { inject } from "../inject";

@provider('b', [10])
export class B {
    private p: number;
    constructor(p: number) {
        this.p = p;
    }
}

@provider('a')
export class A {
    @inject()
    private b:B;
}
