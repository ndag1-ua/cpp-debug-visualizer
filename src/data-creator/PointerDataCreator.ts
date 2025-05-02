
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { PointerData } from '../data/PointerData';

export class PointerDataCreator extends DataCreator {
    create(variable: any): PointerData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value !== undefined ? variable.value : null;
        const pointer = variable.pointer || null; // Assuming pointer is a property of the variable

        return new PointerData(name, type, value, pointer);
    }

}
