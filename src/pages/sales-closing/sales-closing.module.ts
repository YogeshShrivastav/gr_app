import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesClosingPage } from './sales-closing';

@NgModule({
  declarations: [
    SalesClosingPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesClosingPage),
  ],
})
export class SalesClosingPageModule {}
