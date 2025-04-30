import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export interface DataVisitor {
  visitSimple(data: SimpleData): HTMLElement;
  visitPointer(data: PointerData): HTMLElement;
  visitComplex(data: ComplexData): HTMLElement;
  visitArray(data: ArrayData): HTMLElement;
}

export class FullRenderer implements DataVisitor {
  visitSimple(data: SimpleData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.value} (${data.type})`;
    return element;
  }

  visitPointer(data: PointerData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.address} (${data.type})`;
    return element;
  }

  visitComplex(data: ComplexData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
    const membersList = document.createElement("ul");
    data.members.forEach((member) => {
      membersList.appendChild(member.accept(this));
    });
    element.appendChild(membersList);
    return element;
  }
  visitArray(data: ArrayData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
    const elementsList = document.createElement("ul");
    data.elements.forEach((element) => {
      elementsList.appendChild(element.accept(this));
    });
    element.appendChild(elementsList);
    return element;
  }
}

export class OnlyTypesRenderer implements DataVisitor {
  visitSimple(data: SimpleData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.type}`;
    return element;
  }

  visitPointer(data: PointerData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong>: ${data.type}`;
    return element;
  }

  visitComplex(data: ComplexData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
    return element;
  }
  visitArray(data: ArrayData): HTMLElement {
    const element = document.createElement("div");
    element.innerHTML = `<strong>${data.name}</strong> (${data.type})`;
    return element;
  }
}
