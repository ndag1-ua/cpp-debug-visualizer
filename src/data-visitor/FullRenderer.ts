import { DataVisitor } from "./DataVisitor";
import { Data } from "../data/Data";
import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export class FullRenderer implements DataVisitor {
  constructor(private activeTypes: Map<string, boolean>) {}

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
        <div class="data-item">
          <div class="data-header">${data.name}: ${data.type}</div>
          <div class="data-box" ${fromAttr}>${data.address}</div>
        </div>
        ${data.pointsTo ? `<div ${toAttr}>${data.pointsTo.accept(this)}</div>` : ""}
      </div>
    `;
  }
  

  visitComplex(data: ComplexData): string {
    const scalarHtml = data.elements
    .filter(elem => !(elem instanceof PointerData))
    .filter(elem => {
      const key = `${data.type}.${elem.name}`;
      return this.activeTypes.get(key) !== false;
    })
    .map(elem => elem.accept(this))
    .join("");

  
    let pointerHeaders = "";
    let pointerBlocks = "";
  
    for (const element of data.elements) {
      if (element instanceof PointerData) {
        // SI no esta activo, no renderizar tipo (TipoPadre.TipoHijo)
        const buttonName = data.type + "." + element.name;
        const isActive = this.activeTypes.get(buttonName);
        if (isActive === false) continue;

        const uid = `${element.name}-${Math.random().toString(36).substring(2, 8)}`;
        const fromId = `from-${uid}`;
        const toId = `to-${uid}`;
  
        // Header (solo la dirección)
        pointerHeaders += `
          <div class="data-item">
            <div class="data-header">${element.name}: ${element.type}</div>
            <div class="data-box" id="${fromId}">${element.address}</div>
          </div>
        `;
  
        // Si tiene pointsTo, renderizar el bloque externo
        if (element.pointsTo) {
          const block = element.pointsTo.accept(this);
          // Añadir id al primer data-item del bloque
          const blockWithId = block.replace(
            '<div class="data-item">',
            `<div class="data-item" id="${toId}">`
          );
          pointerBlocks += blockWithId + '\n';
        }
      }
    }
  
    return `
      <div class="pointer-wrapper">
        <div class="data-item">
          <div class="data-header">${data.name}: ${data.type}</div>
          <div class="complex-data-box">
            ${scalarHtml}
            <div class="pointer-row">
              ${pointerHeaders}
            </div>
          </div>
        </div>
        <div class="pointer-blocks">
          ${pointerBlocks}
        </div>
      </div>
    `;
  }

 visitArray(data: ArrayData): string {
  const elementsHtml = data.elements
    .map(element => element.accept(this))
    .join("");

  return `
    <div class="data-item">
      <div class="data-header">${data.name}: ${data.type}</div>
      <div class="complex-data-box">
        ${elementsHtml}
      </div>
    </div>
  `;
}

}