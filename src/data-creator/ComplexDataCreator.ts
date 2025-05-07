
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { ComplexData } from '../data/ComplexData';
import { createData } from '../utils';

export class ComplexDataCreator extends DataCreator {
    create(variable: any): ComplexData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value !== undefined ? variable.value : null;
        const complex = variable.complex || null; // Assuming complex is a property of the variable

        return new ComplexData(name, type, value);
    }

}
