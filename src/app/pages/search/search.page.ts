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
  id : string;
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
    console.log(term)

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
       //this.makeAddMeta(this.foundIds)

   
  }

  onEnter(value) {
    let term = value;
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
              this.id= element.id;
              console.log(this.id);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.phoneNumber === term){
            this.id = element.id;
            console.log(this.id);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.township === term){

            this.id = element.id;
            console.log(this.id);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.note === term){
            this.id= element.id;
            console.log(this.id);
        }   
          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
        else if (element.object.makeDate === term) {
            this.id= element.id;
            console.log(this.id);
          } 

          //this.makeAddMeta(element.id, element.object.customerName, element.object.phoneNumber, usage.number, usage.amount);
    });
        console.log(this.id);
        this.makeAddMeta(this.id)

  }

  makeAddMeta(id : string) {
    let total = 0;
    
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
    
}
   
}
