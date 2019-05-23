import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Record } from '../service/models/record';
import { RecordService } from '../service/record.service';

@Component({
  selector: 'detail-page',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.css']
})
export class DetailPage implements OnInit {

  constructor(private fireStore: AngularFirestore,
    private recordService: RecordService) { }

  records = [];
  afterSearch = [];
  total : number = 0;
  ngOnInit() {
    this.afterSearch = [];
    let recordRef = this.fireStore.collection('record');
    recordRef.get()
      .subscribe(snapshot => {
        snapshot.forEach(doc => {
          let record = {
            id: doc.id,
            object: doc.data()
          }
          console.log(doc.id, '=>', doc.data());
          this.records.push(record);

        });
      },
        err => {
          console.log('Error getting documents', err);
        });
    console.log(this.records);
  }

  search(searchEvent: any) {
    let term = searchEvent.target.value;
    console.log(term);
    if (term.trim() === '') {
      console.log('Type a number');
      this.afterSearch.pop();
      this.total = 0;
    }
    this.records.forEach(element => {
      for (let item of element.object.usage) {
        console.log(term)
       
        if (item.number === term) {
          console.log(item.number + ":" + term)
         this.total = +this.total + +item.amount;
          let meta = {
            id: element.id,
            customerName: element.object.customerName,
            customerPhoneNumber: element.object.phoneNumber,
            amount: item.amount,
            
          }
          this.afterSearch.push(meta);
          //recordIds.push(element.id);
        }
      }
    });
    console.log(this.afterSearch);

  }
  ngOnDestroy() {
    this.afterSearch = null;
  }

}