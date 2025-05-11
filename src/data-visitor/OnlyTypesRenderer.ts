import { DataVisitor } from "./DataVisitor";
import { Data } from "../data/Data";
import { SimpleData } from "../data/SimpleData";
import { PointerData } from "../data/PointerData";
import { ComplexData } from "../data/ComplexData";
import { ArrayData } from "../data/ArrayData";

export class OnlyTypesRenderer implements DataVisitor {
  constructor(private activeTypes: Map<string, boolean>) {}

  private renderButton(type: string): string {
    const isActive = this.activeTypes.get(type) ?? true; // por defecto activo si no existe
    const className = `type-toggle${isActive ? ' active' : ' inactive'}`;
    console.log("type: ", type, " isActive: ", isActive, "\n");
    return `<button class="${className}" data-type="${type}">${type}</button>`;
  }

  visitSimple(data: SimpleData): string {
    return this.renderButton(data.type);
  }

  visitPointer(data: PointerData): string {
    return this.renderButton(data.type);
  }

  visitArray(data: ArrayData): string {
    return this.renderButton(data.type);
  }

  visitComplex(data: ComplexData): string {
    const typeButton = this.renderButton(data.type);

    const memberButtons = data.elements.map(elem => {
      const key = `${data.type}.${elem.name}`;
      return this.renderButton(key);
    }).join("\n");

    return `
      <div class="complex-buttons">
        ${typeButton}
        <div class="member-buttons">
        ${memberButtons}
        </div>
      </div>
    `;
  }
}