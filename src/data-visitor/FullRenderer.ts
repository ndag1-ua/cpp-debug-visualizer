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
    const uid = `${data.name}-${Math.random().toString(36).substring(2, 8)}`;
  
    const fromAttr = `id="from-${uid}"`;
    const toAttr = `id="to-${uid}"`;
  
    return `
      <div class="pointer-wrapper">
        <div class="data-item" ${fromAttr}>
          <div class="data-header">${data.name}: ${data.type}</div>
          <div class="data-box">${data.address}</div>
        </div>
        ${data.pointsTo ? `<div ${toAttr}>${data.pointsTo.accept(this)}</div>` : ""}
      </div>
    `;
  }
  

  visitComplex(data: ComplexData): string {
    return `
  `;
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