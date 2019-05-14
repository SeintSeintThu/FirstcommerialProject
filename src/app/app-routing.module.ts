import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'login', loadChildren: './pages/login/login.module.ts#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/HomePageModule' },
  { path: 'customer', loadChildren: './pages/customer/customer.module.ts#CustomerPageModule' },
  { path: 'one', loadChildren: './pages/two/two.module.ts#TwoPageModule'},
  { path: 'two', loadChildren: './pages/three/three.module.ts#ThreePageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
