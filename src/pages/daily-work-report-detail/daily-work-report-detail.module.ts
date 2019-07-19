import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyWorkReportDetailPage } from './daily-work-report-detail';

@NgModule({
  declarations: [
    DailyWorkReportDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyWorkReportDetailPage),
  ],
})
export class DailyWorkReportDetailPageModule {}
