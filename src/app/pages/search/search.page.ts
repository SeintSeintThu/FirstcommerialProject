import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.css']
})
export class SearchPage implements OnInit {

  constructor(
    private fireStore: AngularFirestore,
    private recordService: RecordService
  ) { }
  records = [];
  afterSearch = [];
  foundIds  : string[];
  ngOnInit() {
    this.afterSearch = [];
    this.foundIds = new Array();
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
  onEnter(value) {
    let term = value;
    console.log(term);
    if (term.trim() === '') {
      console.log('Type a number');
      this.afterSearch.pop();
      this.afterSearch = [];
    }
    
    console.log(this.records)
    this.records.forEach(element => {
      console.log(element);
        console.log(term);
        console.log(element.object.customerName + ":" + term)
        console.log(element.object.customerName === term);
        console.log(element.object.township === term);
        console.log(element.object.note === term);
      console.log(element.object.makeDate === term);     


        if (element.object.customerName === term){
              this.foundIds.push(element.id);
              console.log(this.foundIds);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.phoneNumber === term){
            this.foundIds.push(element.id);
            console.log(this.foundIds);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.township === term){

            this.foundIds.push(element.id);
            console.log(this.foundIds);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.note === term){
            this.foundIds.push(element.id);
            console.log(this.foundIds);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.makeDate === term) {
            this.foundIds.push(element.id);
            console.log(this.foundIds);
          } 

          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
    });
        console.log(this.foundIds);
      //  this.makeAddMeta(foundIds)

  }

  makeAddMeta(foundIds : string[]) {
    let total = 0;
    foundIds.forEach(id =>{
      this.records.forEach(element =>{
        for(let usage  of element.object.usage){
          total = +total + +usage.amount;
        if(element.id == id){
          let meta = {
            id: id,
            customerName: element.object.customerName,
            customerPhoneNumber: element.object.phoneNumber,
            number: usage.number,
            amount: usage.amount,
            total : total
          }
          this.afterSearch.push(meta);
        }
      }

    });
    
  });
   
    
  }
}
