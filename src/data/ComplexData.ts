import { Data } from "./Data";
import { DataVisitor } from "../data-visitor/DataVisitor";

export class ComplexData extends Data {
    constructor(name: string, type: string, public elements: Data[]) {
        super(name, type);
    }

    accept(visitor: DataVisitor): string{
        return visitor.visitComplex(this);
    }

    hasChangedComparedTo(other: Data): boolean {
        if (!(other instanceof ComplexData)) return true;
        if (this.elements.length !== other.elements.length) return true;
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].hasChangedComparedTo(other.elements[i])) return true;
        }
        return false;
    }
}