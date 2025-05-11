
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { ComplexData } from '../data/ComplexData';
import { createData } from '../utils';

export class ComplexDataCreator extends DataCreator {
    create(variable: any): ComplexData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const elements: Data[] = [];

        // verificar si tiene children
        if (!variable.children || variable.children.length === 0) {
            return new ComplexData(name, type, []);
        }

        for (const child of variable.children) {
            const data = createData(child);
            if (data) {
                elements.push(data);
            }
        }
        return new ComplexData(name, type, elements);
    }

}
