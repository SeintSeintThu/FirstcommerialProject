import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  constructor(private router: Router,
    private toast : ToastrService) { }
   userName : string ;
   password : string ;

  ngOnInit() {
  }
  check(){
    if(this.userName === 'admin' && this.password === 'admin')
       this.router.navigate(['/home/']);
    else 
       this.toast.error("Please Try again..")
    
  }

}
