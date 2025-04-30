/*

import { ArrayData } from '../data/ArrayData';
import { DataCreator } from './DataCreator';

export class ArrayDataCreator extends DataCreator {
    create(variable: any): ArrayData {
        const arrayData = new ArrayData(variable.name, variable.type);
        arrayData. = variable.value.map((item: any) => this.createData(item));
        return arrayData;

    }

    createData(variable: any): Data {
        if (Array.isArray(variable)) {
            return this.create(variable);
        } else {
            return super.createData(variable);
        }
    }
}
*/
