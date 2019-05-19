import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';

export class Format {
    type: string;
    isChecked: boolean;

 constructor(type  : string,
        ischecked: boolean){
    this.type= type;
    this.isChecked= ischecked;
}
}