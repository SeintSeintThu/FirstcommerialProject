import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage implements OnInit {

  constructor() { }
  selectedValue : string;
  ngOnInit() {
  }
  onChangeSelectedPercent(event){
    this.selectedValue = event;
    console.log(this.selectedValue)
  }
}
