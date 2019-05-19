import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Record } from './models/record';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private fireStore: AngularFirestore) { }
  formData : Record;
  getRecord()
  {  
    return this.fireStore.collection('record').snapshotChanges();
    
  }
}
