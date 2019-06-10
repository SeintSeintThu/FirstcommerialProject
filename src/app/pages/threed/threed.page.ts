import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { Legar } from '../service/models/legar';
import { ToastrService } from 'ngx-toastr';

//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'threed-page',
  templateUrl: './threed.page.html',
  styleUrls: ['./threed.page.css']
})
export class ThreeDeePage implements OnInit {


  constructor(
    private fireStore: AngularFirestore,
    private recordService: RecordService,
    private toast: ToastrService
  ) { }


  legar: Legar = new Legar();
  number: number;
  amount: number;
  selectedFormat: string;
  searchValue: string;
  @Input() isChecked = false;

  doubles: string[] = ['000', '111', '222', '333', '444', '555', '666', '777', '888', '999'];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  /**
  * this is for new Design
  */
  now: string;
  // customer :string ; 
  restricedValue: number;
  type: string;
  waitingList = [];
  excedList = [];
  searchList = [];
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
  row11 = [];
  row12 = [];
  row13 = [];
  row14 = [];
  row15 = [];
  row16 = [];
  row17 = [];
  row18 = [];
  row19 = [];
  row20 = [];
  row21 = [];
  row22 = [];
  row23 = [];
  row24 = [];
  row25 = [];
  row26 = [];
  row27 = [];
  row28 = [];
  row29 = [];
  row30 = [];
  row31 = [];
  row32 = [];
  row33 = [];
  row34 = [];
  row35 = [];
  row36 = [];
  row37 = [];
  row38 = [];
  row39 = [];
  row40 = [];
  row41 = [];
  row42 = [];
  row43 = [];
  row44 = [];
  row45 = [];
  row46 = [];
  row47 = [];
  row48 = [];
  row49 = [];
  row50 = [];
  row51 = [];
  row52 = [];
  row53 = [];
  row54 = [];
  row55 = [];
  row56 = [];
  row57 = [];
  row58 = [];
  row59 = [];
  row60 = [];
  row61 = [];
  row62 = [];
  row63 = [];
  row64 = [];
  row65 = [];
  row66 = [];
  row67 = [];
  row68 = [];
  row69 = [];
  row70 = [];
  row71 = [];
  row72 = [];
  row73 = [];
  row74 = [];
  row75 = [];
  row76 = [];
  row77 = [];
  row78 = [];
  row79 = [];
  row80 = [];
  row81 = [];
  row82 = [];
  row83 = [];
  row84 = [];
  row85 = [];
  row86 = [];
  row87 = [];
  row88 = [];
  row89 = [];
  row90 = [];
  row91 = [];
  row92 = [];
  row93 = [];
  row94 = [];
  row95 = [];
  row96 = [];
  row97 = [];
  row98 = [];
  row99 = [];
  row100 = [];

  // customers =[];
  excedListTotal = 0;
  waitingListTotal = 0;
  waitingArray = [];
  excedArray = [];
  makeDate: Date;
  addValue: string;
  amountTwo: number;


  ngOnInit() {
    this.now = new Date().toLocaleTimeString();
    this.waitingArray = [];
    this.excedArray = [];
    this.makeupLegarMap();
  }

  getLegarThreeD(now) {
    console.log(now);
    let recordRef = this.fireStore.collection('legarthreeD', ref =>
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
  makeupForm(legar: Legar) {
    this.restricedValue = legar.restricedAmount;
    this.makeDate = legar.now;
    this.excedList = legar.excedList;
    this.waitingList = legar.waitingList;
    this.waitingListTotal = legar.totalforWaitingList;
    this.excedListTotal = legar.totalforExcedList;
    this.waitingList.forEach(item => {
      this.updateLeger(item.number, item.amount)
    });
  }

  resetForm() {
    console.log("Reached")
    this.makeDate = null;
    this.restricedValue = 0;
    this.now = null;
    this.waitingList.forEach(item => {
      this.updateLeger(item.number, 0)
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
    this.searchValue = searchValue;
   // console.log(this.searchValue);
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
    this.searchValue = "";
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
      totalforExcedList: this.excedListTotal
    }
    let firebaseRef = this.fireStore.collection("legarthreeD");
    firebaseRef.add(Object.assign({}, this.legar));
    let firebaseRefcustomer = this.fireStore.collection("customer");
    firebaseRefcustomer.add(Object.assign({}, this.makeDate));
    this.resetForm();
    this.toast.success("save successfully", this.legar.now + "");

  }
  onEnterForm(form) {
    console.log(form);
    let formArray = [];
    formArray = form.split(('/'));
    console.log(formArray);
    this.number = formArray[0];
    this.selectedFormat = formArray[1];
    this.amount = formArray[2];
    this.amountTwo = formArray[3];
    console.log(this.number + ":" + this.selectedFormat + ":" + this.amount);
    this.makeUsage(this.number, this.amount);
    this.addValue = "";
  }

  makeUsage(number, amount) {
    this.number = number;
    this.amount = amount;
    console.log(this.selectedFormat)
    if (this.number == null && this.amount == 0)
      return;
    switch (this.selectedFormat) {
      case '.': {
        this.addtoLeger(this.number, this.amount);
        break;
      }
      case '+': {
        let firstNumber = ~~(this.number / 100);//3
        console.log(firstNumber)
        let secondNumber = (~~(this.number / 10)) % 10;//32
        console.log(secondNumber)
        let lastNumber = (this.number % 100) % 10;//3
        console.log(lastNumber);
        let next1 = firstNumber + "" + secondNumber + "" + lastNumber;
        console.log(next1);
        this.addtoLeger(next1, this.amount);
       if(firstNumber != secondNumber && firstNumber !=lastNumber && secondNumber != firstNumber && secondNumber !=lastNumber && lastNumber !=secondNumber && lastNumber !=firstNumber ){
        
        let next6 = firstNumber + "" + secondNumber + "" + lastNumber;
        console.log(next6);
        if(this.amountTwo)
        this.addtoLeger(next6, this.amountTwo);
        else 
        this.addtoLeger(next6, this.amount );
        let next2 = secondNumber + "" + lastNumber + "" + firstNumber;
        console.log(next2);
        if(this.amountTwo)
        this.addtoLeger(next2, this.amountTwo);
        else 
        this.addtoLeger(next2, this.amount );
        let next3 = secondNumber + "" + firstNumber + "" + lastNumber;
        console.log(next3);
        if(this.amountTwo)
        this.addtoLeger(next3, this.amountTwo);
        else 
        this.addtoLeger(next3, this.amount );
        let next4 = lastNumber + "" + firstNumber + "" + secondNumber;
        console.log(next4);
        if(this.amountTwo)
        this.addtoLeger(next4, this.amountTwo);
        else 
        this.addtoLeger(next4, this.amount );
        let next5 = lastNumber + "" + secondNumber + "" + firstNumber;
        console.log(next5);
        if(this.amountTwo)
        this.addtoLeger(next5, this.amountTwo);
        else 
        this.addtoLeger(next5, this.amount );
       }
       else if(firstNumber == secondNumber && firstNumber != lastNumber){
       
        let next2 = lastNumber+ "" + firstNumber + "" + secondNumber;
        console.log(next2);
        if(this.amountTwo)
        this.addtoLeger(next2, this.amountTwo);
        else 
        this.addtoLeger(next2, this.amount );
        let next3 = secondNumber + "" + lastNumber + "" + firstNumber;
        console.log(next3);
        if(this.amountTwo)
        this.addtoLeger(next3, this.amountTwo);
        else 
        this.addtoLeger(next3, this.amount );
       }
       else if(firstNumber == lastNumber && firstNumber != secondNumber){
        let next2 = lastNumber+ "" + firstNumber + "" + secondNumber;
        console.log(next2);
        if(this.amountTwo)
        this.addtoLeger(next2, this.amountTwo);
        else 
        this.addtoLeger(next2, this.amount );
        let next3 = secondNumber + "" + lastNumber + "" + firstNumber;
        if(this.amountTwo)
        this.addtoLeger(next3, this.amountTwo);
        else 
        this.addtoLeger(next3, this.amount );
        console.log(next3);

        
      }
      else if(secondNumber == lastNumber && firstNumber != secondNumber){
        let next2 = secondNumber+ "" + lastNumber + "" + firstNumber;
        console.log(next2);
        if(this.amountTwo)
        this.addtoLeger(next2, this.amountTwo);
        else 
        this.addtoLeger(next2, this.amount );
        let next3 = secondNumber + "" + firstNumber + "" +lastNumber;
        if(this.amountTwo)
        this.addtoLeger(next3, this.amountTwo);
        else 
        this.addtoLeger(next3, this.amount );
        console.log(next3);
       
      }
        break;
      }
      case '*': {
        console.log("In double");
        this.addtoLeger(this.number + "" + this.number + "" + this.number, this.amount);
        break;
      }
      case 'b': {
        console.log('this.arrow_back');
        this.addtoLeger(this.number + "0", this.amount);
        for (let number of this.numberforSeries)
          this.addtoLeger(this.number + "" + number + "", this.amount);
        break;
      }
      case 'm': {
        console.log('this.arrow_downward')
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;
        console.log(firstNumber)
        console.log(secondNumber)
        this.addtoLeger(firstNumber + "0" + secondNumber, this.amount);
        for (let number of this.numberforSeries)
          this.addtoLeger(firstNumber + "" + number + "" + secondNumber, this.amount);
        break;
      }
      case '@': {
        console.log("In double");
        for (let number of this.doubles)
          this.addtoLeger(number, this.amount);
        break;
      }
      case 'f': {
        console.log("In arrow_forward");
        this.addtoLeger("0" + this.number, this.amount);
        for (let number of this.numberforSeries)
          this.addtoLeger(number + "" + this.number, this.amount);
        break;
      }
      case '$': {
        console.log("In double series");
        this.addtoLeger(this.number + "0" + "0", this.amount);
        this.addtoLeger("0" + this.number + "0", this.amount);
        this.addtoLeger("0" + "0" + this.number, this.amount);

        this.addtoLeger(this.number + "" + this.number + "" + this.number, this.amount);
        for (let number of this.numberforSeries) {
          if (number != this.number) {
            this.addtoLeger(this.number + "" + number + "" + number, this.amount);
            this.addtoLeger(number + "" + this.number + "" + number, this.amount);
            this.addtoLeger(number + "" + number + "" + this.number, this.amount);
          }
        }
        break;
      }
    }
  }
  //For New
  onEnterAmount(amount) { //PASS
    this.amount = amount;
    console.log(this.number + this.type + this.amount);
    this.makeUsage(this.number, this.amount);
  }
  onEnterCustomer(value) { //PASS
    /// this.customers.push(value);
    this.toast.success("Add successfully", value + "");
  }
  onEnterRestritedValue(value) { //PASS
    console.log(value)
    this.restricedValue = value;
    console.log(this.restricedValue);
    this.toast.success("Add successfully", this.restricedValue + "");

  }
  onChangeSelectedCustomer(event) { //PASS
    //this.customer = event;
  }
  addandMakeMap(i, row) {
    let map;
    map = {
      number: i,
      amount: 0,
      total: 0
    }
    row.push(map);
  }
  makeupLegarMap() {
    for (let i = 0; i < 10; i++)
      this.addandMakeMap("00" + i, this.row1)
    for (let i = 10; i < 20; i++)
      this.addandMakeMap("0" + i, this.row2);
    for (let i = 20; i < 30; i++)
      this.addandMakeMap("0" + i, this.row3);
    for (let i = 30; i < 40; i++)
      this.addandMakeMap("0" + i, this.row4);
    for (let i = 40; i < 50; i++)
      this.addandMakeMap("0" + i, this.row5);
    for (let i = 50; i < 60; i++)
      this.addandMakeMap("0" + i, this.row6);
    for (let i = 60; i < 70; i++)
      this.addandMakeMap("0" + i, this.row7);
    for (let i = 70; i < 80; i++)
      this.addandMakeMap("0" + i, this.row8);
    for (let i = 80; i < 90; i++)
      this.addandMakeMap("0" + i, this.row9);
    for (let i = 90; i < 100; i++)
      this.addandMakeMap("0" + i, this.row10);
      for (let i = 100; i < 110; i++)
      this.addandMakeMap( i, this.row11);
    for (let i = 110; i < 120; i++)
      this.addandMakeMap(i, this.row12);
    for (let i = 120; i < 130; i++)
      this.addandMakeMap( i, this.row13);
    for (let i = 130; i < 140; i++)
      this.addandMakeMap(i, this.row14);
    for (let i = 140; i < 150; i++)
      this.addandMakeMap( i, this.row15);
    for (let i = 150; i < 160; i++)
      this.addandMakeMap(i, this.row16);
    for (let i = 160; i < 170; i++)
      this.addandMakeMap(i, this.row17);
    for (let i = 170; i < 180; i++)
      this.addandMakeMap( i, this.row18);
    for (let i = 180; i < 190; i++)
      this.addandMakeMap(i, this.row19);
      for (let i = 190; i < 200; i++)
      this.addandMakeMap(i, this.row20);
    for (let i = 200; i < 210; i++)
      this.addandMakeMap( i, this.row21);
      for (let i = 210; i < 220; i++)
      this.addandMakeMap( i, this.row22)
    for (let i = 220; i < 230; i++)
      this.addandMakeMap(i, this.row23);
    for (let i = 230; i < 240; i++)
      this.addandMakeMap( i, this.row24);
    for (let i = 240; i < 250; i++)
      this.addandMakeMap(i, this.row25);
    for (let i = 250; i < 260; i++)
      this.addandMakeMap(i, this.row26);
    for (let i = 260; i < 270; i++)
      this.addandMakeMap(i, this.row27);
    for (let i = 270; i < 280; i++)
      this.addandMakeMap( i, this.row28);
    for (let i = 280; i < 290; i++)
      this.addandMakeMap(i, this.row29);
    for (let i = 290; i < 300; i++)
      this.addandMakeMap( i, this.row30);
      for (let i = 300; i < 310; i++)
      this.addandMakeMap( i, this.row31);
    for (let i = 310; i < 320; i++)
      this.addandMakeMap(i, this.row32);
      for (let i = 320; i < 330; i++)
      this.addandMakeMap(i, this.row33);
    for (let i = 330; i < 340; i++)
      this.addandMakeMap( i, this.row34);
    for (let i = 340; i < 350; i++)
      this.addandMakeMap( i, this.row35);
    for (let i = 350; i < 360; i++)
      this.addandMakeMap( i, this.row36);
    for (let i = 360; i < 370; i++)
      this.addandMakeMap(i, this.row37);
    for (let i = 370; i < 380; i++)
      this.addandMakeMap( i, this.row38);
    for (let i = 380; i < 390; i++)
      this.addandMakeMap( i, this.row39);
    for (let i = 390; i < 400; i++)
      this.addandMakeMap(i, this.row40);
      for (let i = 400; i < 410; i++)
      this.addandMakeMap( i, this.row41);
    for (let i = 410; i < 420; i++)
      this.addandMakeMap(i, this.row42);
    for (let i = 420; i < 430; i++)
      this.addandMakeMap(i, this.row43);
    for (let i = 430; i < 440; i++)
      this.addandMakeMap( i, this.row44);
    for (let i = 440; i < 450; i++)
      this.addandMakeMap( i, this.row45);
    for (let i = 450; i < 460; i++)
      this.addandMakeMap( i, this.row46);
    for (let i = 460; i < 470; i++)
      this.addandMakeMap( i, this.row47);
    for (let i = 470; i < 480; i++)
      this.addandMakeMap( i, this.row48);
    for (let i = 480; i < 490; i++)
      this.addandMakeMap(i, this.row49);
    for (let i = 490; i < 500; i++)
      this.addandMakeMap(i, this.row50);
      for (let i = 500; i < 510; i++)
      this.addandMakeMap(i, this.row51);
    for (let i = 510; i < 520; i++)
      this.addandMakeMap( i, this.row52);
    for (let i = 520; i < 530; i++)
      this.addandMakeMap( i, this.row53);
    for (let i = 530; i < 540; i++)
      this.addandMakeMap( i, this.row54);
    for (let i = 540; i <550; i++)
      this.addandMakeMap(i, this.row55);
    for (let i = 550; i < 560; i++)
      this.addandMakeMap( i, this.row56);
    for (let i = 560; i < 570; i++)
      this.addandMakeMap( i, this.row57);
    for (let i = 570; i < 580; i++)
      this.addandMakeMap( i, this.row58);
    for (let i = 580; i < 590; i++)
      this.addandMakeMap(i, this.row59);
    for (let i = 590; i < 600; i++)
      this.addandMakeMap(i, this.row60);
      for (let i = 600; i < 610; i++)
      this.addandMakeMap(i, this.row61)
    for (let i = 610; i < 620; i++)
      this.addandMakeMap(i, this.row62);
    for (let i = 620; i < 630; i++)
      this.addandMakeMap(i, this.row63);
    for (let i = 630; i < 640; i++)
      this.addandMakeMap( i, this.row64);
    for (let i = 640; i < 650; i++)
      this.addandMakeMap(i, this.row65);
    for (let i = 650; i < 660; i++)
      this.addandMakeMap( i, this.row66);
    for (let i = 660; i < 670; i++)
      this.addandMakeMap( i, this.row67);
    for (let i = 670; i < 680; i++)
      this.addandMakeMap( i, this.row68);
    for (let i = 680; i < 690; i++)
      this.addandMakeMap( i, this.row69);
    for (let i = 690; i < 700; i++)
      this.addandMakeMap(i, this.row70);
      for (let i = 700; i < 710; i++)
      this.addandMakeMap(i, this.row71)
    for (let i = 710; i < 720; i++)
      this.addandMakeMap(i, this.row72);
    for (let i = 720; i < 730; i++)
      this.addandMakeMap(i, this.row73);
    for (let i = 730; i < 740; i++)
      this.addandMakeMap(i, this.row74);
    for (let i = 740; i < 750; i++)
      this.addandMakeMap( i, this.row75);
    for (let i = 750; i < 760; i++)
      this.addandMakeMap(i, this.row76);
    for (let i = 760; i < 770; i++)
      this.addandMakeMap(i, this.row77);
    for (let i = 770; i < 780; i++)
      this.addandMakeMap( i, this.row78);
    for (let i = 780; i < 790; i++)
      this.addandMakeMap(i, this.row79);
    for (let i = 790; i < 800; i++)
      this.addandMakeMap(i, this.row80);
      for (let i = 800; i < 810; i++)
      this.addandMakeMap( i, this.row81)
    for (let i = 810; i < 820; i++)
      this.addandMakeMap(i, this.row82);
    for (let i = 820; i < 830; i++)
      this.addandMakeMap(i, this.row83);
    for (let i = 830; i < 840; i++)
      this.addandMakeMap( i, this.row84);
    for (let i = 840; i < 850; i++)
      this.addandMakeMap( i, this.row85);
    for (let i = 850; i < 860; i++)
      this.addandMakeMap( i, this.row86);
    for (let i = 860; i < 870; i++)
      this.addandMakeMap(i, this.row87);
    for (let i = 870; i < 880; i++)
      this.addandMakeMap( i, this.row88);
    for (let i = 880; i < 890; i++)
      this.addandMakeMap(i, this.row89);
    for (let i = 890; i < 900; i++)
      this.addandMakeMap(i, this.row90);
      for (let i =900; i < 910; i++)
      this.addandMakeMap( i, this.row91)
    for (let i = 910; i < 920; i++)
      this.addandMakeMap(i, this.row92);
    for (let i = 920; i < 930; i++)
      this.addandMakeMap(i, this.row93);
    for (let i = 930; i < 940; i++)
      this.addandMakeMap( i, this.row94);
    for (let i = 940; i < 950; i++)
      this.addandMakeMap(i, this.row95);
    for (let i = 950; i < 960; i++)
      this.addandMakeMap( i, this.row96);
    for (let i = 960; i < 970; i++)
      this.addandMakeMap(i, this.row97);
    for (let i = 970; i < 980; i++)
      this.addandMakeMap( i, this.row98);
    for (let i = 980; i < 990; i++)
      this.addandMakeMap( i, this.row99);
    for (let i = 990; i < 1000; i++)
      this.addandMakeMap( i, this.row100);

  }
addtoLeger(number, amount) {
  console.log(number)
  let firstNumber;
  let secondNumber;
 firstNumber = ~~(number / 100);//3
    console.log(firstNumber)
  secondNumber = (~~(number / 10)) % 10;
  console.log(secondNumber);

  switch (firstNumber ) {
    case 0: {
      if(secondNumber ==  0)
      {
          console.log("00")
          this.row1.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          });
    
    }
    if(secondNumber ==  1) {
          console.log("01")
          this.row2.forEach(item => {
            console.log(item.number +":"+ number)
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          });
    
      }
      if(secondNumber ==  2){
          this.row3.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          });
    
        }
        if(secondNumber ==  3){
          this.row4.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          });
    
        }
        if(secondNumber ==  4) {
          this.row5.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
        
        }
        if(secondNumber ==  5){
          this.row6.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
        }
        if(secondNumber ==  6){
          this.row7.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          });
        }
        if(secondNumber ==  7){
          this.row8.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
    
    
        }
        if(secondNumber ==  8) {
          this.row9.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          });
    
        }
        if(secondNumber ==  9) {
          this.row10.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
       
    
        }
    
      }
      break;
    
    case 1: {
      switch (secondNumber ) {
        case 0: {
          this.row11.forEach(item => {
            console.log(item.number)
            if (item.number == number) {
              console.log(item)
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row12.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row13.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row14.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row15.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row16.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row17.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row18.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row19.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row20.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 2: {
      switch (secondNumber ) {
        case 0: {
          this.row21.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row22.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row23.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row24.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row25.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row26.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row27.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row28.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row29.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row30.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 3: {
      switch (secondNumber ) {
        case 0: {
          this.row31.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row32.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row33.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row34.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row35.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row36.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row37.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row38.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row39.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row40.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;   
    }
    case 4: {
      switch (secondNumber ) {
        case 0: {
          this.row41.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row42.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row43.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row44.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row45.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row46.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row47.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row48.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row49.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row50.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 5: {
      switch (secondNumber ) {
        case 0: {
          this.row51.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row52.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row53.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row54.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row55.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row56.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row57.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row58.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row59.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row60.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 6: {
      switch (secondNumber ) {
        case 0: {
          this.row61.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row62.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row63.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row64.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row65.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row66.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row67.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row68.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row69.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row70.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 7: {
      switch (secondNumber ) {
        case 0: {
          this.row71.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row72.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row73.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row74.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row75.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row76.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row77.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row78.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row79.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row80.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;

    }
    case 8: {
      switch (secondNumber ) {
        case 0: {
          this.row81.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row82.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row83.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row84.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row85.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row86.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row87.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row88.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row89.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row90.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;
    }
    case 9: {
      switch (secondNumber ) {
        case 0: {
          this.row91.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 1: {
          this.row92.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 2: {
          this.row93.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 3: {
          this.row94.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
        case 4: {
          this.row95.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 5: {
          this.row96.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 6: {
          this.row97.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
        }
        case 7: {
          this.row98.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 8: {
          this.row99.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
    
          })
          break;
    
        }
        case 9: {
          this.row100.forEach(item => {
            if (item.number == number) {
              item.amount = +item.amount + +amount;
              this.addtoWaitingTable(item.number, item.amount);
              this.addtoCuttingTable();
            }
          })
          break;
    
        }
    
      }
      break;

    }

  } 

}
addtoWaitingTable(number, amount) {
   console.log("Reached Waitng")
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
  this.waitingListTotal = 0;
  this.waitingList.forEach(record => {
    this.waitingListTotal = + this.waitingListTotal + + record.amount;
  });
}

addtoCuttingTable() {
  console.log("Reached Waitng")
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
  this.excedList.forEach(record => {
    this.excedListTotal = + this.excedListTotal + + record.amount;
  })

}
onChangeStartDate(event){
  this.makeDate = event;
  console.log(this.makeDate);
  this.getLegarThreeD(this.makeDate);
}

removeUsageWaitingList(usages, object) {
  console.log("Reached")
  console.log(usages + ":" + object);
  this.waitingList.forEach(waitingItem => {
    let index = 0;
    if (waitingItem.number == object.number) {
      index = this.waitingList.indexOf(object);
      this.waitingList.splice(index, 1)
    }
  });
  /*
  Update in exced list
  */
  this.excedList.forEach(excedItem => {
    let index2;
    if (excedItem.number == object.number) {

      index2 = this.excedList.indexOf(excedItem);
      this.excedList.splice(index2, 1)
      this.excedListTotal = this.excedListTotal - excedItem.amount;
    }
  });
  this.waitingListTotal = this.waitingListTotal - object.amount;
  this.updateLeger(object.number, 0);
}


updateLeger(number, amount) {

  let firstNumber = ~~(number / 100);//3
  console.log(firstNumber)
      let secondNumber = (~~(number / 10)) % 10;
      console.log(secondNumber);
switch (firstNumber ) {
  case 0: {
    switch (secondNumber ) {
      case 0: {
        this.row1.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row2.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row3.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row4.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row5.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row6.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row7.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row8.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row9.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row10.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
    
  }
  case 1: {
    switch (secondNumber ) {
      case 0: {
        this.row11.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row12.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row13.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row14.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row15.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row16.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row17.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row18.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row19.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row20.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
  }
  case 2: {
    switch (secondNumber ) {
      case 0: {
        this.row21.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row22.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row23.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row24.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row25.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row26.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row27.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row28.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row29.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row30.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
  }
  case 3: {
    switch (secondNumber ) {
      case 0: {
        this.row31.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row32.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row33.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row34.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row35.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row36.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row37.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row38.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row39.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row40.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }

  }
  case 4: {
    switch (secondNumber ) {
      case 0: {
        this.row41.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row42.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row43.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row44.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row45.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row46.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row47.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row48.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row49.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row50.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
  }
  case 5: {
    switch (secondNumber ) {
      case 0: {
        this.row51.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row52.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row53.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row54.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row55.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row56.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row57.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row58.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row59.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row60.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
  }
  case 6: {
    switch (secondNumber ) {
      case 0: {
        this.row61.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row62.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row63.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row64.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row65.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row66.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row67.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row68.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row69.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row70.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }
  }
  case 7: {
    switch (secondNumber ) {
      case 0: {
        this.row71.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row72.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row73.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row74.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row75.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row76.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row77.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row78.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row79.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row80.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }

  }
  case 8: {
    switch (secondNumber ) {
      case 0: {
        this.row81.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row82.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row83.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row84.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row85.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row86.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row87.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row88.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row89.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row90.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }

  }
  case 9: {
    switch (secondNumber ) {
      case 0: {
        this.row91.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 1: {
        this.row92.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 2: {
        this.row93.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 3: {
        this.row94.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
      case 4: {
        this.row95.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 5: {
        this.row96.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 6: {
        this.row97.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
      }
      case 7: {
        this.row98.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 8: {
        this.row99.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
  
        })
        break;
  
      }
      case 9: {
        this.row100.forEach(item => {
          if (item.number == number) {
            item.amount = amount;
          }
        })
        break;
  
      }
  
    }

  }

} 

  // let firstNumber = ~~(number / 100);
  // switch (firstNumber) {
  //   case 0: {
  //     this.row1.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;

  //   }
  //   case 1: {
  //     this.row2.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;
  //   }
  //   case 2: {
  //     this.row3.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;

  //   }
  //   case 3: {
  //     this.row4.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;

  //   }
  //   case 4: {
  //     this.row5.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;
  //   }
  //   case 5: {
  //     this.row6.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;
  //   }
  //   case 6: {
  //     this.row7.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     });
  //     break;
  //   }
  //   case 7: {
  //     this.row8.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     });
  //     break;

  //   }
  //   case 8: {
  //     this.row9.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;

  //   }
  //   case 9: {
  //     this.row10.forEach(item => {
  //       if (item.number == number)
  //         item.amount = amount;
  //     })
  //     break;

  //   }

  // }


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
removeUsageALLExcedList(){
  this.excedList = [];
  this.excedListTotal = 0;

}
removeUsageALLWaitingList(){
  this.waitingList.forEach(item => {
    this.updateLeger(item.number, 0)
  });
  this.waitingList = [];
  this.waitingListTotal = 0;
  this.searchValue ="";
  this.searchList.pop();
}

}

