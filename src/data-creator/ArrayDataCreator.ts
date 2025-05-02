

import { ArrayData } from '../data/ArrayData';
import { DataCreator } from './DataCreator';

export class ArrayDataCreator extends DataCreator {
    create(variable: any): ArrayData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value !== undefined ? variable.value : null;
        const array = variable; // Assuming array is a property of the variable

        const rows = Array.isArray(array) ? array.length : 0;
        const columns = Array.isArray(array[0]) ? array[0].length : 0;
        const elements = Array.isArray(array) ? array.flat() : [];
        return new ArrayData(name, type, rows, columns, elements);

    }

}

