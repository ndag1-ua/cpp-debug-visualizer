import { DataVisitor } from "../data-visitor/DataVisitor";

export abstract class Data {
    constructor(public name: string, public type: string) {}
    abstract accept(visitor: DataVisitor): HTMLElement;
    abstract hasChangedComparedTo(other: Data): boolean;
}
  





