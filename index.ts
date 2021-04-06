import { load } from "./src/load";
import { Container } from "./src/container";

load('./src/instances');
console.log(Container.getInstance('a'));
