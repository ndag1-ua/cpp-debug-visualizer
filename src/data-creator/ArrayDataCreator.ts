
import { Data } from '../data/Data';
import { ArrayData } from '../data/ArrayData';
import { DataCreator } from './DataCreator';
import { ARRAY_TYPES } from '../types';

export class ArrayDataCreator extends DataCreator {
  create(variable: any): ArrayData {
    const name = variable.name;
    const type = this.simplifyType(variable.type);

    const elements = this.extractArrayElements(variable); 

    return new ArrayData(name, type, 0, 0, elements);
  }

  private extractArrayElements(variable: any): any[] {
    if (!variable.children || variable.children.length == 0) {
      return [];
    }

    const elements: any[] = [];

    for (const child of variable.children) {
      if (child.name.startsWith('[') && child.name.endsWith(']') && child.value !== "" && !child.value.startsWith('std')) {
        elements.push(child.value); 
      }
      else {
        const childElements = this.extractArrayElements(child); // Llamada recursiva para obtener elementos de arrays anidados
        for (const childElement of childElements) {
          elements.push(childElement); // Agregar elementos anidados a la lista de elementos
        }
      }
    }

    return elements;
  }

  private simplifyType(originalType: string): string {
    // Mantener tal cual si es array clásico tipo int[3] o int[2][3]
    if (/\[[0-9]+\]/.test(originalType)) return originalType;

    // Buscar keyword relevante en ARRAY_TYPE_KEYWORDS
    for (const keyword of ARRAY_TYPES) {
      const regex = new RegExp(`\\b${keyword}\\b`);
      if (originalType.includes("std") && regex.test(originalType)) {
        return `std::${keyword}`;
      }
    }

    // Si no matchea, devolver tipo original
    return originalType;
  }


}

