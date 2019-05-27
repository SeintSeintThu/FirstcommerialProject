import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { Record } from '../service/models/record';
import { Format } from '../service/models/format';
import { Usage } from '../service/models/usage';


//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'threed-page',
  templateUrl: './threed.page.html',
  styleUrls: ['./threed.page.css']
})
export class ThreeDeePage implements OnInit {


  constructor(
    private fireStore: AngularFirestore,
    private recordService: RecordService
    // private toastService : ToastrService
  ) { }

  records: Record[];
  record: Record = new Record();
  number: number;
  amount: number;
  selectedFormat: string;
  usages: Set<Usage>;
  usagesList: Usage[];
  usageMap: Map<string, number>;


  @Input() isChecked = false;

  doubles: number[] = [11, 22, 33, 44, 55, 66, 77, 88, 99];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  townships: Array<string> = [
    "သာေကတ",
    "သန္လ်င္",
    "ဗိုလ္တစ္ေထာင္",
    "ဆူးေယ"
  ]
  formats: Set<Format> = null;

   /**
   * this is for new Design
   */
  now : string;
  customer :string ; 
  restricedValue :number;
  type  :string;
  waitingList = [];
  excedList = [];
  legarMap = [];
   row1 =[];
   row2=[];
   row3 =[];
  row4 =[];
   row5 =[];
  row6 =[];
  row7 =[];
  row8 =[];
  row9 =[];
  row10 =[];
  customers: Array<string> = [
    "သန္လ်င္",
    "ဗိုလ္တစ္ေထာင္",
    "ဆူးေယ"
  ]


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
    this.recordService.formData = {
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

  makeUsage(form?: NgForm) {
    let data = form.value;
    this.number = data.number;
    this.amount = data.amount;
    console.log(this.selectedFormat)
    if (this.number == null && this.amount == 0)
      return;
    switch (this.selectedFormat) {
      case 'dae': {
        this.makeupUsage(this.usages.size + 1, this.number + "", this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'arr': {
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;//3
        console.log(firstNumber);
        console.log(secondNumber);
        let next = (secondNumber) * 10 + firstNumber;
        console.log(next);
        //updata Map
        this.makeupUsage(this.usages.size + 1, this.number + "", this.amount);
        this.makeupUsage(this.usages.size + 1, next + "", this.amount);
        //this.usage.set(next+"",this.amount);

        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'double': {
        console.log("In double");
        this.makeupUsage(this.usages.size + 1, this.number+""+ this.number, this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'natkhat': {
        console.log("In natkhat");
        if (this.number == 0) {
          for (let natkhat of this.natkhats)
            this.makeupUsage(this.usages.size + 1, natkhat, this.amount);
        }
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'power': {
        if (this.number == 0) {
          for (let power of this.powers)
            this.makeupUsage(this.usages.size + 1, power + "", this.amount);

        }
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'arrow_back': {
        console.log('this.arrow_back')
        let next = this.number % 10;
        this.makeupUsage(this.usages.size + 1, next * 10 + "", this.amount);
        for (let number of this.numberforSeries)
          this.makeupUsage(this.usages.size + 1, (next * 10) + number + "", this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'arrow_forward': {
        console.log("In arrow_forward");
        let next = this.number % 10;
        this.makeupUsage(this.usages.size + 1, "0" + next, this.amount);
        for (let number of this.numberforSeries)
          this.makeupUsage(this.usages.size + 1, number + "" + next, this.amount);
        break;
      }
    }
  }
  removeUsage(usages, object) {
    console.log(usages + ":" + object);
    if (this.usages.has(object))
      this.usages.delete(object);

  }

  onChange(isChecked, type) {
    console.log("checkCeckboxValue is reached");
    console.log(isChecked + ":" + type);
    this.selectedFormat = type;
    console.log(this.selectedFormat)

  }

  onChangeSelectedTownship(event) {
    console.log(event)
    this.record.township = event;
  }
  onChangeStartDate(event) {
    console.log(event)
    this.record.makeDate = event;
  }

  //For New
  onEnterAmount(amount){ //PASS
    this.amount = amount;

    console.log(this.number + this.type + this.amount);
  }
  onEnterCustomer(value){ //PASS
    this.customers.push(value);
  }
  onEnterRestritedValue(value){ //PASS
    console.log(value)
    
  this.restricedValue = value;
  console.log(this.restricedValue)
  }
  onChangeSelectedCustomer(event) { //PASS
   this.customer = event;
  }
  makeupLegarMap()
  { 
      for(let i = 0 ; i< 100 ;i++){
      console.log(i)
      let map;
       if (i< 10){
        map={
          number : i < 10 ? "00" + i : i +"",
          amount : 0,
          total :0
       }
       }
       else
          map ={
           number : i < 100 && i>= 10 ? "0" + i : i +"",
           amount : 0,
           total :0
        }
      this.row1.push(map)
    }
    for(let i = 100 ; i< 200 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row2.push(map)
      console.log(this.row1)
    }
   
    for(let i = 200 ; i< 300 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row3.push(map)
      console.log(this.row3)
    }
   
    for(let i = 300 ; i< 400 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row4.push(map)
      console.log(this.row4)
    }

    for(let i = 400 ; i< 500 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row5.push(map)
      console.log(this.row5)
    }
  
    for(let i = 500 ; i< 600 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row6.push(map)
      console.log(this.row6)
    }

    for(let i = 600 ; i< 700 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row7.push(map)
      console.log(this.row7)
    }
    
    for(let i = 700 ; i< 800 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row8.push(map)
      console.log(this.row8)
    }
  
    for(let i = 800 ; i< 900 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row9.push(map)
      console.log(this.row9)
    }
  
    for(let i = 900 ; i< 1000 ;i++){
      console.log(i)
          let map ={
           number : i ,
           amount : 0,
           total :0
        }
      this.row10.push(map)
      console.log(this.row10)
    }
    console.log(this.legarMap)
  }
  addtoLeger(){


  }
  addtoWaitingTable(){

  }
  addtoCuttingTable(){

  }

}


