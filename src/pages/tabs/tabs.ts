import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';
import { DailyWorkReportPage } from '../daily-work-report/daily-work-report';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = DailyWorkReportPage;

  data:any={};
  constructor(public db:DatabaseProvider,public storage:Storage) {
    this.data=this.db.get_token_data();
    // this.data=this.storage.get("token");
    console.log("data");
    
    console.log(this.data);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tabspage');
  }

}
