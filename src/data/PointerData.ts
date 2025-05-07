import { Data } from "./Data";
import { DataVisitor } from "../data-visitor/DataVisitor";

export class PointerData extends Data {
    constructor(name: string, type: string, public address: string, public pointsTo: Data | null = null) {
        super(name, type);
    }

    accept(visitor: DataVisitor): string{
        return visitor.visitPointer(this);
    }

    hasChangedComparedTo(other: Data): boolean {
        return !(other instanceof PointerData) || this.address !== other.address;
    }
}