import { DataVisitor } from "./DataVisitor";
import { Data } from "../data/Data";
import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export class OnlyTypesRenderer implements DataVisitor {
  visitSimple(data: SimpleData): string {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.value} (${data.type})`;
    return element.outerHTML;
  }

  visitPointer(data: PointerData): string {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.address} (${data.type})`;
    return element.outerHTML;
  }

    visitComplex(data: ComplexData): string {
        const element = document.createElement("div");
        element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
        const elementsList = document.createElement("ul");
        element.appendChild(elementsList);
        return element.outerHTML;
    }

    visitArray(data: ArrayData): string {
        const element = document.createElement("div");
        element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
        const elementsList = document.createElement("ul");
        element.appendChild(elementsList);
        return element.outerHTML;
    }
}