import { Data } from "./Data";
import { DataVisitor } from "../data-visitor/DataVisitor";

export class ArrayData extends Data {
    constructor(name: string, type: string, public rows: number, public columns: number, public elements: any[]) {
        super(name, type);
    }

    accept(visitor: DataVisitor): string {
        return visitor.visitArray(this);
    }

    hasChangedComparedTo(other: Data): boolean {
        if (!(other instanceof ArrayData)) return true;
        if (this.elements.length !== other.elements.length) return true;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].hasChangedComparedTo(other.elements[i])) return true;
        }
        return false;
    }

}
