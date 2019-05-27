import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {ThreeDeePage} from './threed.page';

const routes: Routes = [
  {
    path: '',
    component: ThreeDeePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [ 
  ],
  declarations: [ThreeDeePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThreeDeePageModule {}
