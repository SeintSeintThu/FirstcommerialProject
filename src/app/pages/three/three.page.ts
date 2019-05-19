import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { RecordService } from '../service/record.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../service/models/customer';

@Component({
  selector: 'three-page',
  templateUrl: './three.page.html',
  styleUrls: ['./three.page.css']
})
export class ThreePage implements OnInit {
    constructor( private fireStore : AngularFirestore,
      private recordService : RecordService) {
  }
  ngOnInit() {
    
  }
  resetform(form?: NgForm) {
    if (form != null)
      form.reset();
    this.recordService.formData = {
      customerName : null,
      customerPhno : null,
      customerTownship: null,
      makeDate : null,
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
createNewRecord(){}

}
