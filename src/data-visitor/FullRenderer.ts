import { DataVisitor } from "./DataVisitor";
import { Data } from "../data/Data";
import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export class FullRenderer implements DataVisitor {
  visitSimple(data: SimpleData): string {
    return `
      <div class="data-item">
        <div class="data-header">${data.name}: ${data.type}</div>
        <div class="data-box">${data.value}</div>
      </div>
    `;
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
    return `
      <div class="data-item">
        <div class="data-header">${data.name}: ${data.type} ${data.rows} x ${data.columns}</div>
        <div class="data-box">[${data.elements.map((element) => element.toString()).join(", ")}]</div>

      </div>
    `;
  }
}