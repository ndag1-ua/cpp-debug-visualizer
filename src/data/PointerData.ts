import { Data } from "./Data";
import { DataVisitor } from "../data-visitor/DataVisitor";

export class PointerData extends Data {
    constructor(name: string, type: string, public address: string, public pointsTo: Data) {
        super(name, type);
    }

    accept(visitor: DataVisitor): HTMLElement {
        return visitor.visitPointer(this);
    }

    hasChangedComparedTo(other: Data): boolean {
        return !(other instanceof PointerData) || this.address !== other.address;
    }
}