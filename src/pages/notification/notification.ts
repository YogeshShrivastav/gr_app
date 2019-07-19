import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskListPage } from '../task-list/task-list';
import { LeadListPage } from '../lead-list/lead-list';
import { FollowUpListPage } from '../follow-up-list/follow-up-list';
import { HomePage } from '../home/home';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  @Input() home: HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
  }

  user_data:any=[];
  data:any=[];
  ionViewDidLoad() {
    this.data=this.navParams.get('user')
    this.user_data=this.data["data"];
  }

  read(id,type)
  {
    console.log(id);
    this.db.getData(id,"master/update_notification")
    .subscribe(resp=>{
      console.log(resp);

      if(type == 'Task')
      { this.navCtrl.push(TaskListPage) }

      if(type == 'Lead')
      { this.navCtrl.push(LeadListPage) }

      if(type == 'Follow Up')
      { this.navCtrl.push(FollowUpListPage) }
    })
  }

  back()
  {
    this.navCtrl.push(HomePage);
  }
}
