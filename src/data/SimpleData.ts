import { Data } from "./Data";
import { DataVisitor } from "../data-visitor/DataVisitor";

export class SimpleData extends Data {
    constructor(name: string, type: string, public value: string) {
        super(name, type);
    }

    accept(visitor: DataVisitor): HTMLElement {
        return visitor.visitSimple(this);
    }

    hasChangedComparedTo(other: Data): boolean {
        return !(other instanceof SimpleData) || this.value !== other.value;
    }
}
