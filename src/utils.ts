// create-data.ts
import { Data } from './data/Data';
import { SimpleDataCreator } from './data-creator/SimpleDataCreator';
import { ArrayDataCreator } from './data-creator/ArrayDataCreator';
import { PointerDataCreator } from './data-creator/PointerDataCreator';
import { ComplexDataCreator } from './data-creator/ComplexDataCreator';
import { SIMPLE_TYPES } from './types';
import { ARRAY_TYPES } from './types';

export function createData(variable: any): Data | null {
  if (variable === undefined || variable === null) {
    return null;
  }

  if (SIMPLE_TYPES.has(variable.type)) {
    return new SimpleDataCreator().create(variable); 
  } else if (ARRAY_TYPES.has(variable.type.split("<")[0]) || /\[[0-9]+\]/.test(variable.type)) {
    return new ArrayDataCreator().create(variable); 
  } else if (variable.type.includes("*")) {
    return new PointerDataCreator().create(variable);
  } else {
    return new ComplexDataCreator().create(variable);
  }
}
