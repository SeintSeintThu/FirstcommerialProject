import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'search-page',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.css']
})
export class SearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onSubmit(form ? : NgForm){
    let data= form.value;
    console.log("Data is:"+ data);
  }

}
