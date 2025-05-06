
import { Data } from '../data/Data';
import { ArrayData } from '../data/ArrayData';
import { DataCreator } from './DataCreator';

export class ArrayDataCreator extends DataCreator {
    create(variable: any): ArrayData {
        const name = variable.name;
        const type = variable.type;

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

}

