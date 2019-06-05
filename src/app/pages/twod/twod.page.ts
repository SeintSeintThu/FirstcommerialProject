import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';

import { Format } from '../service/models/format';
import { LegarMap } from '../service/models/legarmap';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';
import { Legar } from '../service/models/legar';
import { ToastrModule, ToastrService } from 'ngx-toastr';


//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'twod-page',
  templateUrl: './twod.page.html',
  styleUrls: ['./twod.page.css']
})
export class TwoDeePage implements OnInit {


  constructor(
    private fireStore: AngularFirestore,
    private toast: ToastrService
  ) { }


  legar: Legar = new Legar();
  number: number;
  amount: number;
  selectedFormat: string;

  /**
   * this is for new Design
   */
  now: string;
  restricedValue: number;
  type: string;
  waitingList = [];
  excedList = [];
  legarMap = [];
  row1 = [];
  row2 = [];
  row3 = [];
  row4 = [];
  row5 = [];
  row6 = [];
  row7 = [];
  row8 = [];
  row9 = [];
  row10 = [];
  waitingListTotal: number = 0;
  excedListTotal: number = 0;
  waitingArray = [];
  excedArray = [];
  searchList = [];
  searchValue: string;
  @Input() isChecked = false;
  records = [];
  afterSearch = [];
  foundIds = [];
  //customers = [];
  makeDate: Date;
  addValue: string;


  doubles: number[] = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //customers: Array<string> = [];
  formats: Set<Format> = null;

  ngOnInit() {
    this.now = new Date().toDateString();
    this.waitingArray = [];
    this.excedArray = [];
    this.makeupLegarMap();
    this.searchList = [];
    this.waitingList = [];
    this.excedList =[];
  }

  getLegarTwoD(now) {
    console.log(now);
    let recordRef = this.fireStore.collection('legartwoD', ref =>
      ref.where('now', '==', now)
        .limit(1))
      .snapshotChanges();
      recordRef.subscribe(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc);
          console.log(doc.payload.doc.id)
         let legar = doc.payload.doc.data() as Legar;
         console.log(legar);
         this.makeupForm(legar);
        });
      });
  }
  makeupForm(legar : Legar){
    this.restricedValue = legar.restricedAmount;
    this.makeDate=  legar.now;
    this.excedList =legar.excedList;
    this.waitingList = legar.waitingList;
    this.waitingListTotal = legar.totalforWaitingList;
    this.excedListTotal = legar.totalforExcedList;
    this.waitingList.forEach(item =>
    {
          this.updateLeger(item.number ,item.amount)
    });
  }
  resetForm(){
    console.log("Reached")
    this.makeDate = null;
    this.restricedValue = 0;
    this.now = null;
    this.waitingList.forEach(item=>
      {
        this.updateLeger(item.number,0)
      });
    this.waitingList = [];
    this.excedList = [];
    this.waitingArray = [];
    this.excedArray = [];
    this.excedListTotal = 0;
    this.waitingListTotal = 0;
    this.restricedValue = 0;
    //this.makeupLegarMap();
   
  }
 

  searchRecord(searchValue) {
    this.searchList.pop();
    this.searchList = [];
    console.log(this.searchValue);
   // this.searchValue = searchValue;
    this.waitingList.forEach(record => {
        console.log("In If")
        console.log(this.searchList)
          if (searchValue == record.number) {
            let record1 = {
              number: record.number,
              amount: record.amount
            }
            this.searchList.push(record1);
          }
    
        });
  }
  saveRecord() {
    this.waitingList.forEach(item => {
      console.log(item);
      let usageOne = {
        number: item.number,
        amount: item.amount,
        total: this.waitingListTotal
      }
      this.waitingArray.push(usageOne);
    });

    this.excedList.forEach(item => {
      console.log(item);
      let usageOne = {
        number: item.number,
        amount: item.amount,
        total: this.waitingListTotal
      }
      this.excedArray.push(usageOne);
    });

    this.legar = {
      now: this.makeDate,
      restricedAmount: this.restricedValue,
      waitingList: this.waitingArray,
      excedList: this.excedArray,
      totalforWaitingList: this.waitingListTotal,
      totalforExcedList : this.excedListTotal
    }
    let firebaseRef = this.fireStore.collection("legartwoD");
    firebaseRef.add(Object.assign({}, this.legar));
    this.resetForm();
    this.toast.success("save successfully", this.makeDate+"");

  }

  makeUsage(number, amount) {
    if(amount == 0)
       return;
    this.number = number;
    this.amount = amount;
    console.log(this.selectedFormat)
    if (this.number == null && this.amount == 0)
      return;
    switch (this.selectedFormat) {
      case '.': {
        this.addtoLeger(this.number, this.amount)
        break;
      }
      case '+': {
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;//3
        console.log(firstNumber);
        console.log(secondNumber);
        let next: number = (secondNumber) * 10 + firstNumber;
        console.log(next);

        this.addtoLeger(this.number, this.amount);
        this.addtoLeger(next, this.amount);

        // if(this.amount2)
        // this.addtoLeger(next, this.amount2)
        // else 
        // this.addtoLeger(next, this.amount)
        break;
      }
      case '*': {
        console.log("In double");
        let next: number = +(this.number) * 10 + + this.number;
        console.log(next);
        this.addtoLeger(next, this.amount);
        break;
      }
      case 'n': {
        console.log("In natkhat");
        if (this.number == 0) {
          for (let natkhat of this.natkhats)
            this.addtoLeger(natkhat, this.amount);
        }

        break;
      }
      case 'p': {
        if (this.number == 0) {
          for (let power of this.powers)
            this.addtoLeger(power, this.amount);
        }
        break;
      }
      case 'b': {
        console.log('this.arrow_back')
        let next = this.number % 10;
        this.addtoLeger(next * 10, this.amount);
        for (let number of this.numberforSeries)
          this.addtoLeger((next * 10) + number, this.amount);
        break;
      }
      case 'f': {
        console.log("In arrow_forward");
        let next = this.number % 10;
        this.addtoLeger("0" + next, this.amount);
        for (let number of this.numberforSeries)
          this.addtoLeger(number + "" + next, this.amount);
        break;
      }
      case '@': {
        console.log("In double");
        this.addtoLeger(0+""+0, this.amount);
        for (let number of this.doubles)
          this.addtoLeger(number, this.amount);
        break;
      }
      case '#': {
        console.log("In total");
        for (let i=0;i<11;i++){
          for (let j=i;j<11;j++){
            let total = +j + + i;
           if( total%10 == this.number){
            if(i == j){
              this.addtoLeger(i + "" + j, this.amount);
              continue;
            }
          this.addtoLeger(i + "" + j, this.amount);
          this.addtoLeger(j + "" + i, this.amount);
           }
          }
        } 
        break;
      }
      case '$': {
        console.log("In double series");
        this.addtoLeger(this.number +""+ this.number, this.amount);
        for (let number of this.numberforSeries){
          if(number != this.number){
          this.addtoLeger(this.number + ""+number, this.amount);
          this.addtoLeger(number + ""+ this.number, this.amount);
          }
        }
        break;
      }
    }
  }

  //For New
  onEnterForm(form) {
    console.log(form);
    let formArray = [];
    formArray = form.split(('/'));
    console.log(formArray);
    this.number = formArray[0];
    this.selectedFormat = formArray[1];
    this.amount = formArray[2];
    console.log(this.number + ":" + this.selectedFormat + ":" + this.amount);
    this.makeUsage(this.number, this.amount);
    this.addValue = "";

  }
  onEnterAmount(amount) { //PASS
    this.amount = amount;
    console.log(this.number + this.selectedFormat + this.amount);
    this.makeUsage(this.number, this.amount)
    //this.addtoLeger(this.number, this.amount)
  }
  onEnterCustomer(value) { //PASS
   // this.customers.push(value);
    this.toast.success("Add successfully", value + "");
  }
  updateRecord(value) {
    if (value.trim() === '') {
      console.log('Type a number');
      this.afterSearch.pop();
      this.afterSearch = [];
      this.foundIds = [];
    }
    console.log(this.records)
    this.records.forEach(element => {
      console.log(element);
      if (element.customerName === value) {

        console.log(this.foundIds);
      }
    });
  }
 
  getRecords() {
    this.afterSearch = [];
    let recordRef = this.fireStore.collection('legartwoD');
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
  onEnterRestritedValue(value) { //PASS
    console.log(value)
    this.restricedValue = value;
    console.log(this.restricedValue)
    this.toast.success("Add successfully", this.restricedValue + "");
  }
  onChangeSelectedCustomer(event) { //PASS
    //this.customer = event;
    //this.customers.push(this.customer);
    // this.getRecords();
    // this.updateRecord(event);
  }
  makeupLegarMap() {
    for (let i = 0; i < 10; i++) {
      console.log(i)
      let map = {
        number: i < 10 ? "0" + i : i + "",
        amount: 0,
        total: 0
      }
      this.row1.push(map)
    }
    for (let i = 10; i < 20; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row2.push(map)
      console.log(this.row1)
    }

    for (let i = 20; i < 30; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row3.push(map)
      console.log(this.row3)
    }

    for (let i = 30; i < 40; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row4.push(map)
      console.log(this.row4)
    }

    for (let i = 40; i < 50; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row5.push(map)
      console.log(this.row5)
    }

    for (let i = 50; i < 60; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row6.push(map)
      console.log(this.row6)
    }

    for (let i = 60; i < 70; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row7.push(map)
      console.log(this.row7)
    }

    for (let i = 70; i < 80; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row8.push(map)
      console.log(this.row8)
    }

    for (let i = 80; i < 90; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row9.push(map)
      console.log(this.row9)
    }

    for (let i = 90; i < 100; i++) {
      console.log(i)
      let map = {
        number: i,
        amount: 0,
        total: 0
      }
      this.row10.push(map)
      console.log(this.row10)
    }
  }

  addtoLeger(number, amount) {
    let firstNumber = ~~(number / 10);
    switch (firstNumber) {
      case 0: {
        this.row1.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;

      }
      case 1: {
        this.row2.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }

        })
        break;

      }
      case 2: {
        this.row3.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;

      }
      case 3: {
        this.row4.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;

      }
      case 4: {
        this.row5.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;
      }
      case 5: {
        this.row6.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;
      }
      case 6: {
        this.row7.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;
      }
      case 7: {
        this.row8.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }

        })
        break;

      }
      case 8: {
        this.row9.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }

        })
        break;

      }
      case 9: {
        this.row10.forEach(item => {
          if (item.number == number) {
            item.amount = +item.amount + +amount;
            this.addtoWaitingTable(item.number, item.amount);
            this.addtoCuttingTable();
          }
        })
        break;

      }

    }


  }
  addtoWaitingTable(number, amount) {
    if (this.waitingList.length != 0) {
      console.log("In If")
      console.log(this.waitingList)
      for (let i = 0; i < this.waitingList.length; i++) {
        console.log(i)
        if (this.waitingList[i].number === number) {
          this.waitingList[i].amount = amount;
          break;
        }
        else {
          console.log(i);
          console.log(this.waitingList[i].number === number)
          if (i === this.waitingList.length - 1) {
            console.log("In true")
            let record = {
              number: number,
              amount: amount
            }
            this.waitingList.push(record)
            break;
          }
          else {
            console.log("Before continue")
            continue;
          }

        }

      }
    }
    else {
      console.log("In waiting table")
      let record = {
        number: number,
        amount: amount
      }
      this.waitingList.push(record)
    }
    //for total
    console.log(this.waitingList.length)
    this.waitingListTotal = 0;
    this.waitingList.forEach(record => {
      console.log(this.waitingListTotal)
      console.log(record.amount)
      this.waitingListTotal = + this.waitingListTotal + + record.amount;
      console.log(this.waitingListTotal)
    });
  }

  addtoCuttingTable() {
    console.log(this.restricedValue)
    console.log(this.waitingList)
    if(this.restricedValue != 0){
          this.waitingList.forEach(record => {
      if (record.amount > this.restricedValue) {
        let excedAmount = record.amount - this.restricedValue;
        if (this.excedList.length != 0) {
          console.log("In If")
          console.log(this.excedList)
          for (let i = 0; i < this.excedList.length; i++) {
            console.log(i)
            if (this.excedList[i].number === record.number) {
              this.excedList[i].amount = excedAmount;
              break;
            }
            else {
              console.log(i);
              console.log(this.excedList[i].number === record.number)
              if (i === this.excedList.length - 1) {
                console.log("In true")
                let record1 = {
                  number: record.number,
                  amount: excedAmount
                }

                this.excedList.push(record1)
                break;
              }
              else {
                console.log("Before continue")
                continue;
              }
            }

          }
        }
        else {
          console.log("In waiting table")
          let recordNew = {
            number: record.number,
            amount: excedAmount
          }
          this.excedList.push(recordNew)
        }

      }
    });
   }
    //for total
    this.excedListTotal = 0;
    this.excedList.forEach(record1 => {
      this.excedListTotal = + this.excedListTotal + + record1.amount;
    })

  }
  onChangeStartDate(event) {
    this.makeDate = event;
    console.log(this.makeDate);
    this.getLegarTwoD(this.makeDate);
  }

  removeUsageWaitingList(usages, object) {
    console.log("Reached")
    console.log(usages + ":" + object);
    console.log(this.waitingList);
     
  this.waitingList.forEach(waitingItem =>
    {
      let index= 0;
      if(waitingItem.number == object.number){
        index = this.waitingList.indexOf(object);
        this.waitingList.splice(index, 1)
    }
    });
    console.log(this.excedList)
    this.excedList.forEach(excedItem =>
      {
        let index2;
        if(excedItem.number == object.number){
          console.log(object)
          index2 = this.excedList.indexOf(excedItem);
          console.log(index2)
          this.excedList.splice(index2, 1)
          this.excedListTotal = this.excedListTotal - excedItem.amount; 
         }
      });
    console.log(this.waitingList)
    this.waitingListTotal = this.waitingListTotal - object.amount;

    this.updateLeger(object.number, 0);
  }

  removeUsageExcedList(usages, object) {
    console.log("Reached")
    console.log(usages + ":" + object);
    console.log(this.excedList);
    this.excedList.splice(object, 1);
    console.log(this.waitingList)
    this.excedListTotal = this.excedListTotal - object.amount;
    this.updateLeger(object.number, 0);
  }
  updateLeger(number, amount) {
    let firstNumber = ~~(number / 10);
    switch (firstNumber) {
      case 0: {
        this.row1.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;

      }
      case 1: {
        this.row2.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;
      }
      case 2: {
        this.row3.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;

      }
      case 3: {
        this.row4.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;

      }
      case 4: {
        this.row5.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;
      }
      case 5: {
        this.row6.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;
      }
      case 6: {
        this.row7.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        });
        break;
      }
      case 7: {
        this.row8.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        });
        break;

      }
      case 8: {
        this.row9.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;

      }
      case 9: {
        this.row10.forEach(item => {
          if (item.number == number)
            item.amount = amount;
        })
        break;

      }

    }


  }

  removeUsageALLExcedList(){
    this.excedList =[];
    this.excedListTotal =0 ;
    
  }
  removeUsageALLWaitingList(){
    this.waitingList.forEach(item=>
      {
        this.updateLeger(item.number,0)
      });
    this.waitingList =[];
    this.waitingListTotal=0;
  }
}

// getCustomers() {
//   let recordRef = this.fireStore.collection('customer');
//   recordRef.get()
//     .subscribe(snapshot => {
//       snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//         this.customers.push(doc.data().name);
//       });
//     });
//   console.log(this.customers);
// }


