/*

import { Data } from '../data/Data';
import { SimpleDataCreator } from '../data-creator/SimpleDataCreator';
import { ComplexDataCreator } from '../data-creator/ComplexDataCreator';
import { PointerDataCreator } from '../data-creator/PointerDataCreator';
import { ArrayDataCreator } from '../data-creator/ArrayDataCreator';


export abstract class DataCreator {
    abstract create(variable: any): Data;

    createData(variable: any): Data {
        if (variable.type.includes("*")) {
          return new PointerDataCreator().create(variable);
        } else if (variable.variablesReference > 0) {
          return new ComplexDataCreator().create(variable);
        } else {
          return new SimpleDataCreator().create(variable);
        }
      }
}
*/



  