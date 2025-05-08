
import { Data } from "./data/Data";
import { FullRenderer } from "./data-visitor/FullRenderer";
import { OnlyTypesRenderer } from "./data-visitor/OnlyTypesRenderer";
import { createData } from "./utils";

export class App {
  private dataList: Data[] = [];
  private previousData: Data[] = [];
  private activeTypes: Map<string, boolean> = new Map();

  App() {
    this.dataList = [];
    this.previousData = [];
    this.activeTypes = new Map();
  }

  setNewData(newData: Data[]) {
    this.previousData = this.dataList;
    this.dataList = newData;
  }

  getCurrentData(): Data[] {
    return this.dataList;
  }

  getPreviousData(): Data[] {
    return this.previousData;
  }

  getActiveTypes(): Map<string, boolean> {
    return this.activeTypes;
  }

  isActiveType(type: string): boolean {
    return this.activeTypes.get(type) || false;
  }

  setActiveType(type: string, value: boolean) {
    this.activeTypes.set(type, value);
  }

  visualizeData(): string {
    const renderer = new FullRenderer();
    let html = "";
  
    for (const data of this.dataList) {
      const rendered = data.accept(renderer); // esto devuelve un string
      html += rendered + "\n";
    }
    console.log("HTML: " + html);
    return html;
  }
  

  visualizeDataTypes(): string {
    const renderer = new OnlyTypesRenderer(this.activeTypes);
    let html = "";
  
    for (const data of this.dataList) {
      const rendered = data.accept(renderer); // esto devuelve un string
      html += rendered + "\n";
    }
    return html;
  }

  createDataList(data: any) {
    this.previousData = this.dataList;
    this.dataList = [];
  
    const previousTypes = new Map(this.activeTypes); // Clonar el estado previo
    this.activeTypes.clear();
  
    for (const variable of data) {
      const createdData = createData(variable);
      if (createdData) {
        console.log("Created data: name " + createdData.name + " type: " + createdData.type);
        this.dataList.push(createdData);
  
        // Tipo base (ej: "MyClass")
        if (!this.activeTypes.has(createdData.type)) {
          const wasActive = previousTypes.get(createdData.type);
          this.activeTypes.set(createdData.type, wasActive !== false);
        }
  
        // Si es complejo, añade también los atributos
        if ('elements' in createdData && Array.isArray(createdData.elements)) {
          for (const attr of createdData.elements) {
            const attrTypeKey = `${createdData.type}.${attr.name}`;
            if (!this.activeTypes.has(attrTypeKey)) {
              const wasActive = previousTypes.get(attrTypeKey);
              this.activeTypes.set(attrTypeKey, wasActive !== false);
            }
          }
        }
      }
    }
  }

}
