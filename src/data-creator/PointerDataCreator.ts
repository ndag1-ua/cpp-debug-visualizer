/*
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';

export class PointerDataCreator extends DataCreator {
    create(variable: any): Data {
        const arrayData = new Data(variable.name, variable.type);
        arrayData.value = variable.value.map((item: any) => this.createData(item));
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