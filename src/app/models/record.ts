import { Customer } from './customer';

export class Record {
    id :string;
    Costomer :Customer;
    makeDate : Date;
    total : number;
    usage : Map<number,number>;

}
