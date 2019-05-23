import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';

@Component({
  selector: 'search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.css']
})
export class SearchPage implements OnInit {

  constructor(
    private fireStore : AngularFirestore,
    private recordService : RecordService
  ) { }
  records = [];
  afterSearch = [];
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
    }
    console.log(this.records)
    this.records.forEach(element => {
      for (let item of element.object) {
        console.log(term);
        console.log(item);
        if (item.number === term) {
          console.log(item.number + ":" + term)
          let meta = {
            id: element.id,
            customerName: element.object.customerName,
            customerPhoneNumber: element.object.phoneNumber,
            amount: item.amount
          }
          this.afterSearch.push(meta);
          //recordIds.push(element.id);
        }
      }
    });
    console.log(this.afterSearch); 
  } 
}
