import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { NgForm } from '@angular/forms';
import { Usage } from '../service/models/usage';
import { Record } from '../service/models/record';
import { Format } from '../service/models/format';


@Component({
  selector: 'three-page',
  templateUrl: './three.page.html',
  styleUrls: ['./three.page.css']
})
export class ThreePage implements OnInit {
  constructor(
    private fireStore: AngularFirestore,
    private recordService: RecordService) {
  }
  records: Record[];
  record: Record = new Record();
  number: number;
  amount: number;
  selectedFormat: string;
  usages: Set<Usage>;
  usagesList: Usage[];
  usageMap: Map<string, number>;

  @Input() isChecked = false;

  doubles: number[] = [111, 222, 333, 444, 555, 666, 777, 888, 999];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  townships: Array<string> = [
    "သာေကတ",
    "သန္လ်င္",
    "ဗိုလ္တစ္ေထာင္",
    "ဆူးေယ"
  ]

  ngOnInit() {
    this.resetform();
    this.usageMap = new Map<string, number>();
    this.usages = new Set<Usage>();
    this.usagesList = [];
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
        let firstNumber = ~~(this.number / 100);//3
        console.log(firstNumber)
        let secondNumber = (~~(this.number / 10)) % 10;//32
        console.log(secondNumber)
        let lastNumber = (this.number % 100) % 10;//3
        console.log(lastNumber);
        let next1 = firstNumber +""+lastNumber+""+secondNumber;
        console.log(next1);
        this.makeupUsage(this.usages.size + 1, next1 + "", this.amount);
        let next6= firstNumber +""+secondNumber+""+lastNumber;
        console.log(next6);
        this.makeupUsage(this.usages.size + 1, next6 + "", this.amount);
        let next2 = secondNumber +""+lastNumber+""+firstNumber;
        console.log(next2);
        this.makeupUsage(this.usages.size + 1, next2 + "", this.amount);
        let next3 = secondNumber +""+firstNumber+""+lastNumber;
        console.log(next3);
        this.makeupUsage(this.usages.size + 1, next3 + "", this.amount);
        let next4 = lastNumber +""+firstNumber+""+secondNumber;
        console.log(next4);
        this.makeupUsage(this.usages.size + 1, next4 + "", this.amount);
        let next5 = lastNumber +""+secondNumber+""+firstNumber;
        console.log(next5);
        this.makeupUsage(this.usages.size + 1, next5 + "", this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'double': {
        console.log("In double");
        let next = this.number % 100;
        this.makeupUsage(this.usages.size + 1, next+""+ next +""+next, this.amount);
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
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;
        //let next = this.number % 100;
        this.makeupUsage(this.usages.size + 1, this.number+ "0", this.amount);
        for (let number of this.numberforSeries)
          this.makeupUsage(this.usages.size + 1, firstNumber+""+secondNumber +""+ number, this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'arrow_downward': {
        console.log('this.arrow_downward')
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;
        //let next = this.number % 100;
        this.makeupUsage(this.usages.size + 1, firstNumber +"0"+ secondNumber, this.amount);
        for (let number of this.numberforSeries)
          this.makeupUsage(this.usages.size + 1, firstNumber+""+number+""+secondNumber, this.amount);
        console.log(this.usages.size);
        console.log(this.usages);
        break;
      }
      case 'arrow_forward': {
        console.log("In arrow_forward");
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;
        this.makeupUsage(this.usages.size + 1, "0" + firstNumber+""+secondNumber, this.amount);
        for (let number of this.numberforSeries)
          this.makeupUsage(this.usages.size + 1, number + "" + firstNumber+""+secondNumber, this.amount);
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


}
