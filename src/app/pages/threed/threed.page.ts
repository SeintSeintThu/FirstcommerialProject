import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
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
    private toast : ToastrService
  ) { }

  
  legar: Legar= new Legar();
  number: number;
  amount: number;
  selectedFormat: string;
  searchValue:number;
  @Input() isChecked = false;

  doubles: string[] = ['000','111', '222', '333', '444', '555', '666', '777', '888', '999'];
  powers: number[] = [16, 27, 38, 49, 50];
  natkhats: string[] = ['18', '24', '35', '07', '96'];
  numberforSeries: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   /**
   * this is for new Design
   */
  now : string;
 // customer :string ; 
  restricedValue :number;
  type  :string;
  waitingList = [];
  excedList = [];
  searchList = [];
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
 // customers =[];
  excedListTotal=0;
  waitingListTotal=0;
  waitingArray = [];
  excedArray = [];
  makeDate : Date;
  addValue : string; 
  amountTwo : number;
  

  ngOnInit() {
    this.now = new Date().toLocaleTimeString();
    this.waitingArray =[];
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
    this.waitingList.forEach(item=>{
      console.log(item);
      let usageOne = {
        number: item.number,
        amount: item.amount,
        total : this.waitingListTotal
      }
      this.waitingArray.push(usageOne);
    });

    this.excedList.forEach(item=>{
      console.log(item);
      let usageOne = {
        number: item.number,
        amount: item.amount,
        total : this.waitingListTotal
      }
      this.excedArray.push(usageOne);
    });

    this.legar = {
        now : this.makeDate,
        restricedAmount : this.restricedValue,
        waitingList : this.waitingArray,
        excedList : this.excedArray,
        totalforWaitingList: this.waitingListTotal,
        totalforExcedList : this.excedListTotal
    }
    let firebaseRef = this.fireStore.collection("legarthreeD");
    firebaseRef.add(Object.assign({}, this.legar));
    let firebaseRefcustomer = this.fireStore.collection("customer");
    firebaseRefcustomer.add(Object.assign({}, this.makeDate));
    this.resetForm();
    this.toast.success("save successfully",this.legar.now+"");

  }
  onEnterForm(form){
    console.log(form);
    let formArray =[];
      formArray = form.split(('/'));
        console.log(formArray);
      this.number = formArray[0];
      this.selectedFormat = formArray[1];
      this.amount = formArray[2];
      this.amountTwo = formArray[3];
      console.log(this.number +":"+ this.selectedFormat+":" + this.amount);
      this.makeUsage(this.number,this.amount);
      this.addValue ="";
    }

  makeUsage(number,amount) {
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
        let next1 = firstNumber +""+lastNumber+""+secondNumber;
        console.log(next1);
        this.addtoLeger(next1, this.amount);
        let next6= firstNumber +""+secondNumber+""+lastNumber;
        console.log(next6);
        this.addtoLeger(next6, this.amount);
        let next2 = secondNumber +""+lastNumber+""+firstNumber;
        console.log(next2);
        this.addtoLeger(next2, this.amount);
        let next3 = secondNumber +""+firstNumber+""+lastNumber;
        console.log(next3);
        this.addtoLeger(next3, this.amount);
        let next4 = lastNumber +""+firstNumber+""+secondNumber;
        console.log(next4);
        this.addtoLeger(next4, this.amount);
        let next5 = lastNumber +""+secondNumber+""+firstNumber;
        console.log(next5);
        this.addtoLeger(next5, this.amount);
        break;
      }
      case '*': {
        console.log("In double");
        this.addtoLeger(this.number+""+this.number+""+this.number, this.amount);
        break;
      }
      case 'b': {
        console.log('this.arrow_back');
        this.addtoLeger(this.number+"0", this.amount);
        for (let number of this.numberforSeries)
            this.addtoLeger(this.number+""+ number + "", this.amount);
        break;
      }
      case 'm': {
        console.log('this.arrow_downward')
        let firstNumber = ~~(this.number / 10);//2
        let secondNumber = this.number % 10;
        this.addtoLeger(firstNumber +"0"+ secondNumber, this.amount);
        for (let number of this.numberforSeries)
        this.addtoLeger(firstNumber+""+number+""+secondNumber, this.amount);
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
    }
  }
  //For New
  onEnterAmount(amount){ //PASS
    this.amount = amount;
   console.log(this.number + this.type + this.amount);
   this.makeUsage(this.number,this.amount);
  }
  onEnterCustomer(value){ //PASS
   /// this.customers.push(value);
    this.toast.success("Add successfully",value+"");
  }
  onEnterRestritedValue(value){ //PASS
    console.log(value) 
  this.restricedValue = value;
  console.log(this.restricedValue);
  this.toast.success("Add successfully",this.restricedValue+"");
  
  }
  onChangeSelectedCustomer(event) { //PASS
   //this.customer = event;
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
  addtoLeger(number, amount) {
    let firstNumber = ~~(number / 100);
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
      this.waitingListTotal=0;
      this.waitingList.forEach(record=>
        {
          this.waitingListTotal = + this.waitingListTotal+ + record.amount;
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
      this.excedListTotal=0; 
      this.excedList.forEach(record=>
        {
          this.excedListTotal = + this.excedListTotal+ + record.amount;
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
  this.waitingList.forEach(waitingItem =>
    {
      let index= 0;
      if(waitingItem.number == object.number){
        index = this.waitingList.indexOf(object);
        this.waitingList.splice(index, 1)
    }
    });
    /*
    Update in exced list
    */
    this.excedList.forEach(excedItem =>
      {
        let index2;
        if(excedItem.number == object.number){
        
          index2 = this.excedList.indexOf(excedItem);
          this.excedList.splice(index2, 1)
          this.excedListTotal = this.excedListTotal - excedItem.amount; 
         }
      });
    this.waitingListTotal = this.waitingListTotal - object.amount;
    this.updateLeger(object.number, 0);
  }


 updateLeger(number, amount) {
  let firstNumber = ~~(number / 100 );
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

/*
getCustomers(){
    let recordRef = this.fireStore.collection('customer');
    recordRef.get()
      .subscribe(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.customers.push(doc.data().name);
        });
      });
    console.log(this.customers);
  }
*/
}

