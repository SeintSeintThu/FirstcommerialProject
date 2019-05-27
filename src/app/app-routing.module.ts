import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: '../app/pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: '../app/pages/home/home.module#HomePageModule' },
  { path: 'customer', loadChildren: '../app/pages/customer/customer.module#CustomerPageModule' },
  { path: 'two', loadChildren: '../app/pages/two/two.module#TwoPageModule'},
  { path: 'twod', loadChildren: '../app/pages/twod/twod.module#TwoDeePageModule'},
  { path: 'threed', loadChildren: '../app/pages/threed/threed.module#ThreeDeePageModule'},
  { path: 'three', loadChildren: '../app/pages/three/three.module#ThreePageModule'},
  { path: 'detail', loadChildren: '../app/pages/detail/detail.module#DetailPageModule'},
  { path: 'search', loadChildren: '../app/pages/search/search.module#SearchPageModule'},
  { path: 'percent', loadChildren: '../app/pages/home/home.module#HomePageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
