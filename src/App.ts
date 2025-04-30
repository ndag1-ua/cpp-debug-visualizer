
import { Data } from "./data/Data";
import { DataVisitor } from "./data-visitor/DataVisitor";
import { FullRenderer } from "./data-visitor/FullRenderer";
import { OnlyTypesRenderer } from "./data-visitor/OnlyTypesRenderer";

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

}
