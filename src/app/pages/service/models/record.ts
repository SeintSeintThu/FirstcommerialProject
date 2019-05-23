import { Customer } from './customer';
import { Usage } from './usage';

export class Record {
    customerName : string;
    phoneNumber : string;
    township: string;
    note : string;
    makeDate : Date;
    //for array
    usage  : any[];
    //for map
    //usage : Map<string,number>;
    total : number;
    
}
