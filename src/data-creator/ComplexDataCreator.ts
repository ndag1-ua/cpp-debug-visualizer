
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { ComplexData } from '../data/ComplexData';
import { createData } from '../utils';

export class ComplexDataCreator extends DataCreator {
    create(variable: any): ComplexData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const elements: Data[] = [];

        for (const child of variable.children) {
            const data = createData(child);
            if (data) {
                elements.push(data);
            }
        }
        if (elements.length === 0) {    
            return new ComplexData(name, type, []);
        }

        return new ComplexData(name, type, elements);
    }

}
