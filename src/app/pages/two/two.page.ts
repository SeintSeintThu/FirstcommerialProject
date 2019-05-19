import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Customer } from '../service/models/customer';
import { RecordService } from '../service/record.service';

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
     townships: string[] = [ "ANNUAL", "CASUAL", "MEDICAL", "UNPAID", "MATERNITY", "PATERNITY", "PARENTAL", "COMPASIONATE", "EDUCATION", "MARRIAGE" ];
  ngOnInit() {
    this.resetform();
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
}
