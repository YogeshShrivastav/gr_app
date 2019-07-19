import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyWorkReportPage } from './daily-work-report';

@NgModule({
  declarations: [
    DailyWorkReportPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyWorkReportPage),
  ],
})
export class DailyWorkReportPageModule {}
