import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { Record } from '../service/models/record';
import { Format } from '../service/models/format';
import { Usage } from '../service/models/usage';
import { stringify } from '@angular/core/src/render3/util';


//import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'two-page',
  templateUrl: './two.page.html',
  styleUrls: ['./two.page.css']
})
export class TwoPage implements OnInit {


  constructor(
    private fireStore :AngularFirestore,
    private recordService : RecordService
     // private toastService : ToastrService
  ) { }
    record : Record = new Record();
    number :number;
    amount : number;
    selectedFormat :string;
    dae : boolean;
    arr :boolean;
    double :boolean;
    power :boolean;
    natkhat :boolean;
    arrow_forward :boolean;
    arrow_back :boolean;
    usages : Set<Usage>;
    usageMap : Map<string,number>;


    @Input() isChecked =false;
    
     doubles: number[] = [11,22,33,44,55,66,77,88,99];
     powers : number[] =[16,27,38,49,50];
     natkhats : string [] = ['18','24','35','07','96'];
     numberforSeries  : number [] = [1,2,3,4,5,6,7,8,9];
     townships: Array<string> = [ 
      "သာေကတ",
      "သန္လ်င္",
      "ဗိုလ္တစ္ေထာင္",
      "ဆူးေယ"
  ]
    formats : Set<Format> =null;

    ngOnInit() {
    this.resetform();
    this.formats =new Set<Format>() ;
    this.usageMap = new Map<string,number>();
    this.usages = new Set<Usage>();
  }
  resetform(form?: NgForm) {
    if (form != null)
      form.reset();
    this.recordService.formData = {
      customerName : null,
      phoneNumber : null,
      township: null,
      makeDate : null,
      note :null,
      usage : null,
      total : 0
    }
  }
 
onSubmit(form?: NgForm){
    console.log("Submit is reached");
    let data= form.value;
    console.log("Data is:"+ data);
    this.fireStore.collection("record").add(data);
    console.log("After Sending");
      this.resetform(form);
      console.log("finished")
    //  this.toastService.success("Submit Successfully","Thanks");
  }
  saveRecord(form? : NgForm){
    let data = form.value;
    console.log("Name is :" + this.record.customerName)
    this.record .customerName = data.customerName; 
    console.log("Name is :" + this.record.customerName)//PASS
    console.log("phoneNumber is :" + this.record.phoneNumber)
    this.record.phoneNumber = data.phoneNumber;
    console.log("phoneNumber is :" + this.record.phoneNumber)//PaSS
    console.log("makeDate is :" + this.record.makeDate)
    this.record.makeDate = data.makeDate;
    console.log("makeDate is :" + this.record.makeDate)
    console.log("township is :" + this.record.township)
    this.record.township = data.township;
    console.log("township is :" + this.record.township)
    this.record.note  =data.note;
    console.log("note is :" + this.record.note)
    let total =0;
    console.log( this.usages);
    for(let item of Array.from(this.usages.values()))
    { 
      total = +total+ +item.amount;
      console.log(item);
      this.usageMap.set(item.number, item.amount);
    }
    
    console.log("total is :" + total)
    this.record.total= total;
    console.log("Map is :" + this.usageMap)
    this.record.usage = this.usageMap;
    console.log("Record is:"+ this.record)
    //this.fireStore.collection("record").add(this.record);
  }

  makeupUsage(id : number , number : string , amount :number) {
       let usage = new Usage(id,number,amount);
       this.usages.add(usage);
  }
  
   makeUsage(form? : NgForm){
     let data = form.value;
    this. number =data.number;
    this.amount = data.amount;
    this.arrow_forward = data.arr;
    console.log(this.number);
    console.log(this.amount);
    console.log(this.arr);
    if(this.number == null && this.amount == 0)
       return;
    if(this.arr)
    {
      console.log("In R");//23
      let firstNumber= ~~(this.number/10);//2
      let secondNumber= this.number%10;//3
      console.log(firstNumber);
      console.log(secondNumber);
      let next =(secondNumber)*10 + firstNumber;
      console.log(next);
      //updata Map
      this.makeupUsage(this.usages.size +1,this.number+"", this.amount);
      this.makeupUsage(this.usages.size +1,next+"", this.amount);
      //this.usage.set(next+"",this.amount);

     console.log(this.usages.size);
     console.log( this.usages);
    }
    else if (this.dae){
      this.makeupUsage(this.usages.size +1,this.number+"" , this.amount);
      console.log(this.usages.size);
      console.log( this.usages);
    }
    
    else if (this.double)
    {
      console.log("In double");
      let next = this.number % 10;
      this.makeupUsage(this.usages.size +1,(next*10)+ next+"" , this.amount);
      console.log(this.usages.size);
      console.log( this.usages);
    }
    else if (this.natkhat)
    {   
      console.log("In natkhat");
      if (this.number == 0){
       for(let natkhat of this.natkhats)
       this.makeupUsage(this.usages.size +1,natkhat , this.amount);
      }
      console.log(this.usages.size);
      console.log( this.usages);
    }
    else if (this.power)
    {
      console.log("In power")
      if (this.number == 0){
       for(let power of this.powers)
       this.makeupUsage(this.usages.size +1,power+"" , this.amount);
     
      }
      console.log(this.usages.size);
      console.log( this.usages);
    }
    else if (this.arrow_back)
    {   
      console.log("In arrow_back");
      let next = this.number % 10;
      this.makeupUsage(this.usages.size +1,next * 10 +"", this.amount);
      for(let number of this.numberforSeries)
      this.makeupUsage(this.usages.size +1,(next*10) + number+"", this.amount);
      console.log(this.usages.size);
      console.log( this.usages);
    }
    else {
      console.log("In arrow_forward");
      let next = this.number % 10;
      this.makeupUsage(this.usages.size +1,"0"+next,this.amount);
      for(let number of this.numberforSeries)
        this.makeupUsage(this.usages.size +1,number +""+ next,this.amount);
      }
    
      console.log(this.usages.size);
      console.log( this.usages);
  }

   onChangeSelectedFormat( format) { 
     this.selectedFormat = format;
   }
   onChange(isChecked, type){
    console.log("checkCeckboxValue is reached");
     console.log(isChecked +":"+ type);
    this.formats.add(new Format(type,isChecked));
    console.log("Format are  :" + this.formats);
    this.formats.forEach(function(item){
      console.log(item.isChecked +":"+ item.type);
    })
      
  }

  onChangeSelectedTownship(event)
  {
    console.log(event)
    this.record.township = event;
  }
  onChangeStartDate(event)
    {
      console.log(event)
      this.record.makeDate = event;
    }
  
   }
   

