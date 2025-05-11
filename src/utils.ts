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
  } else if (isArrayType(variable.type)) {
    return new ArrayDataCreator().create(variable); 
  } else if (variable.type.includes("*")) {
    return new PointerDataCreator().create(variable);
  } else {
    return new ComplexDataCreator().create(variable);
  }
}

export function isSimpleType(type: string): boolean {
  return SIMPLE_TYPES.has(type);
}

export function isArrayType(type: string): boolean {
  // Detecta arrays C++ tipo int[3], float[2][4], etc.
  const isCArray = /\[[0-9]+\]/.test(type);

  // Detecta contenedores STL
  const isStlArray = (
    type.includes("::") &&
    type.includes("std") &&
    Array.from(ARRAY_TYPES).some(keyword => type.includes(keyword))
  );

  return isCArray || isStlArray;
}
