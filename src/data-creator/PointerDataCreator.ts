
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { PointerData } from '../data/PointerData';
import { SimpleData } from '../data/SimpleData';
import { createData } from '../utils';

export class PointerDataCreator extends DataCreator {
    create(variable: any): PointerData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value;
        const pointer = createData(variable.children[0]); // Assuming pointsTo is the variable that the pointer points to

        return new PointerData(name, type, value, pointer);
    }

}
