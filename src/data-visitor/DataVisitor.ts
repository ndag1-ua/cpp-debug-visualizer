import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export interface DataVisitor {
  visitSimple(data: SimpleData): string;
  visitPointer(data: PointerData): string;
  visitComplex(data: ComplexData): string;
  visitArray(data: ArrayData): string;
}

