
import { Data } from "./data/Data";
import { DataVisitor } from "./data-visitor/DataVisitor";
import { DataCreator } from "./data-creator/DataCreator";
import { ArrayDataCreator } from "./data-creator/ArrayDataCreator";
import { SimpleDataCreator } from "./data-creator/SimpleDataCreator";
import { ComplexDataCreator } from "./data-creator/ComplexDataCreator";
import { PointerDataCreator } from "./data-creator/PointerDataCreator";
import { FullRenderer } from "./data-visitor/FullRenderer";
import { OnlyTypesRenderer } from "./data-visitor/OnlyTypesRenderer";
import { SIMPLE_TYPES } from './utils/types';

export class App {
  private dataList: Data[] = [];
  private previousData: Data[] = [];
  private activeTypes: Set<string> = new Set();

  App() {
    this.dataList = [];
    this.previousData = [];
    this.activeTypes = new Set();
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

  toggleType(type: string) {
    if (this.activeTypes.has(type)) this.activeTypes.delete(type);
    else this.activeTypes.add(type);
  }

  isTypeActive(type: string): boolean {
    return this.activeTypes.has(type);
  }

  getActiveTypes(): string[] {
    return Array.from(this.activeTypes);
  }

  visualizeData(): HTMLElement {
    const container = document.createElement("div");
    this.dataList.forEach((data) => {
      if (this.isTypeActive(data.type)) {
        const element = data.accept(new FullRenderer());
        container.appendChild(element);
      }
    });
    return container;
  }

  visualizeDataTypes(): HTMLElement {
    const container = document.createElement("div");
    this.dataList.forEach((data) => {
      if (this.isTypeActive(data.type)) {
        const element = data.accept(new OnlyTypesRenderer());
        container.appendChild(element);
      }
    });
    return container;
  }

  createDataList(data: any) {
    //Pasar data a previousData
    this.previousData = this.dataList;
    this.dataList = [];
    //Vaciar dataList
    this.dataList.length = 0;
    //Crear nuevo data
    for (const variable of data) {
      const createdData = this.createData(variable);
      if (createdData) {
        this.dataList.push(createdData);
      }
    }
  }

  createData(variable: any): Data | null {
    if (variable === undefined || variable === null) {
      return null;
    }
    
    if (SIMPLE_TYPES.has(variable.type)) {
      return new SimpleDataCreator().create(variable); 
    } else {
      return null; // No se crea un objeto Data para tipos no simples
    }

  }

}
