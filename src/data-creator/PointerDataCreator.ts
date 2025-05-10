
import { Data } from '../data/Data';
import { DataCreator } from './DataCreator';
import { PointerData } from '../data/PointerData';
import { SimpleData } from '../data/SimpleData';
import { createData } from '../utils';
import { SIMPLE_TYPES } from '../types';

export class PointerDataCreator extends DataCreator {
    create(variable: any): PointerData {
        const name = variable.name || variable.evaluateName || variable.value;
        const type = variable.type || typeof variable.value;
        const value = variable.value;

        let pointer: Data | null = null;

        if (Array.isArray(variable.children) && variable.children.length > 0) {
            const child = variable.children[0];
        
            const looksSimple =
                SIMPLE_TYPES.has(child.type) &&
                !child.name.includes('.') &&         // evita "obj.member"
                !child.evaluateName?.includes('->') &&  // evita accesos a miembros con ->
                !child.evaluateName?.includes('.')    // evita accesos tipo obj.member
        
            if (variable.children.length === 1 && looksSimple) {
                // Solo un hijo y parece tipo simple
                pointer = createData(child);
            } else if (variable.children.length === 1 && child.type.includes('*')) {
                // Solo un hijo y parece puntero
                pointer = createData(child);
            } else {
                // Probablemente una clase con al menos un campo
                const complex: any = {
                    name: variable.name,
                    type: type.replace('*', '').trim(),
                    children: variable.children
                };
                pointer = createData(complex);
            }
        }

        console.log("PointerData: ", name, type, value, pointer);

        return new PointerData(name, type, value, pointer);

    }

}
