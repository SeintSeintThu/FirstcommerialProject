import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { Record } from '../service/models/record';
import { Format } from '../service/models/format';
import { Usage } from '../service/models/usage';
import { TwoDService } from '../service/twod.service';
import { LegarMap } from '../service/models/legarmap';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';


//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'twod-page',
  templateUrl: './twod.page.html',
  styleUrls: ['./twod.page.css']
})
export class TwoDeePage implements OnInit {


  constructor(
    private fireStore: AngularFirestore,
    private twoDService: TwoDService
    // private toastService : ToastrService
  ) { }

  records: Record[]; // not work
  record: Record = new Record();
  number: number;
  amount: number;
  selectedFormat: string;
  usages: Set<Usage>;
  usagesList: Usage[];
  usageMap: Map<string, number>;
  /**
   * this is for new Design
   */
  now: string;
  customer: string;
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
  excedListTotal: number =0;

  @Input() isChecked = false;

  doubles: number[] = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  customers: Array<string> = [
    "သန္လ်င္",
    "ဗိုလ္တစ္ေထာင္",
    "ဆူးေယ"
  ]
  formats: Set<Format> = null;

  ngOnInit() {
    this.now = new Date().toLocaleTimeString();
    this.resetform();
    this.formats = new Set<Format>();
    this.usageMap = new Map<string, number>();
    this.usages = new Set<Usage>();
    this.usagesList = [];
    this.makeupLegarMap();

  }
  resetform(form?: NgForm) {
    if (form != null)
      form.reset();
    let formData = {
      customerName: null,
      phoneNumber: null,
      township: null,
      makeDate: null,
      note: null,
      usage: null,
      total: 0
    }
  }

  saveRecord(form?: NgForm) {
    let data = form.value;
    let array = [];
    let total = 0;
    console.log(this.usages);
    for (let item of Array.from(this.usages.values())) {
      total = +total + +item.amount;
      console.log(item);
      let usageOne = {
        number: item.number,
        amount: item.amount
      }
      array.push(usageOne);
    }

    this.record = {
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      township: data.township,
      note: data.note,
      makeDate: data.makeDate,
      usage: array,
      total: total
    }
    let firebaseRef = this.fireStore.collection("record");
    firebaseRef.add(Object.assign({}, this.record));
    this.resetform();

  }

  makeupUsage(id: number, number: string, amount: number) {
    let usage = new Usage(id, number, amount);
    this.usages.add(usage);
  }

  makeUsage(number,amount) {
    //let data = form.value;
    this.number = number;
    this.amount = amount;
    console.log(this.selectedFormat)
    if (this.number == null && this.amount == 0)
      return;
    switch (this.selectedFormat) {
      case '': {
        this.addtoLeger(this.number, this.amount)
        //this.makeupUsage(this.usages.size + 1, this.number + "", this.amount);   
        break;
      }
      case 'r': {
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;//3
        console.log(firstNumber);
        console.log(secondNumber);
        let next :number = (secondNumber) * 10 + firstNumber;
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
        let next :number = +(this.number) * 10 + + this.number;
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
    }
  }
  removeUsage(usages, object) {
    console.log(usages + ":" + object);
    if (this.usages.has(object))
      this.usages.delete(object);

  }

  //For New
 
  onEnterAmount(amount) { //PASS
    this.amount = amount;
    console.log(this.number + this.selectedFormat + this.amount);
    this.makeUsage(this.number,this.amount)
    //this.addtoLeger(this.number, this.amount)
  }
  onEnterCustomer(value) { //PASS
    this.customers.push(value);
  }
  onEnterRestritedValue(value) { //PASS
    console.log(value)
    this.restricedValue = value;
    console.log(this.restricedValue)
  }
  onChangeSelectedCustomer(event) { //PASS
    this.customer = event;
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
    console.log(this.legarMap)
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
      this.waitingListTotal =0;
      this.waitingList.forEach(record=>
        {  
          console.log(this.waitingListTotal)
          console.log(record.amount)
          this.waitingListTotal = + this.waitingListTotal + + record.amount;
          console.log(this.waitingListTotal)
        });
  }

  addtoCuttingTable() {
    console.log(this.restricedValue)
    console.log(this.waitingList)
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
      //for total
      this.excedListTotal = 0;
      this.excedList.forEach(record1=>
        {
          this.excedListTotal = + this.excedListTotal + + record1.amount;
        })

  }

}


