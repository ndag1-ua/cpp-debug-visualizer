import { Data } from '../data/Data';

export abstract class DataCreator {
  abstract create(variable: any): Data;
}




  