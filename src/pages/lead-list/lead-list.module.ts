import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeadListPage } from './lead-list';

@NgModule({
  declarations: [
    LeadListPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadListPage),
  ],
})
export class LeadListPageModule {}
