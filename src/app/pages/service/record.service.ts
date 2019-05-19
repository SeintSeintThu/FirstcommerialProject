import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Record } from './models/record';


@Injectable({
  providedIn: 'root'
})
export class RecordService {

  formData : Record;

  constructor(private fireStore: AngularFirestore) { }
  getRecord ()
  {  
    return this.fireStore.collection('record').snapshotChanges();
    
  }
  
}
