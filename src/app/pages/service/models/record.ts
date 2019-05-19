import { Customer } from './customer';

export class Record {
    customerName : string;
    phoneNumber : string;
    township: string;
    note : string;
    makeDate : Date;
    usage : Map<number,number>;
    total : number;
    
}
