
import { Data } from '../data/Data';
import { ArrayData } from '../data/ArrayData';
import { DataCreator } from './DataCreator';
import { ARRAY_TYPES } from '../types';
import { createData } from '../utils';

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
      if (child.name === '_M_elems') {
        // Si el hijo es _M_elems, se asume que es un array de elementos
        for (const elem of child.children) {
          if (elem.name.startsWith('[') && elem.name.endsWith(']') && elem.value !== "" && !elem.value.startsWith('std')) {
            elements.push(createData(elem)); // Crear datos a partir de la variable
          }
        }
      }
      else {
        elements.push(createData(child)); 
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

