import { Data } from '../data/Data';
import { SimpleData } from '../data/SimpleData';
import { DataCreator } from './DataCreator';

export class SimpleDataCreator extends DataCreator {
    create(variable: any): SimpleData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value !== undefined ? variable.value : null;

        return new SimpleData(name, type, value);
    }

}
