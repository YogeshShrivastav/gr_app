import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LeadListPage } from '../lead-list/lead-list';
import { TaskListPage } from '../task-list/task-list';
import { FollowUpListPage } from '../follow-up-list/follow-up-list';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NotificationPage } from '../notification/notification';
// import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  user_id:any=0;
  notification_cn:any=0;
  user_detail:any={};
  constructor(public navCtrl: NavController,public storage:Storage,public db:DatabaseProvider,public push:Push) {
    this.get_user_detail();
  }

  ionViewDidLoad() {
    this.storage.get("id")
    .then(resp=>{
      console.log(resp);
      this.user_id=resp;
      this.get_user_detail();
      });

      this.pushSetup();
  }

  get_user_detail()
  {
    this.db.getData(this.user_id,"master/get_user_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.user_detail=resp;
      this.notification_cn=this.user_detail["row"];
      // this.noti_count=this.notification_cn;
      // console.log(this.comp.noti_count);
      // this.notification_cn=this.comp.noti_count;
      console.log(this.notification_cn);
      
    })
  }

  GoLeadsList(){
    this.navCtrl.push(LeadListPage)
  }

  SeeTask(){
    this.navCtrl.push(TaskListPage)
  }

  SeefollowUp(){
    this.navCtrl.push(FollowUpListPage)
  }

  logout_user()
  {
    this.storage.set("token","");
    this.storage.set("id","");
    this.db.set_token_data("");
    this.navCtrl.setRoot(LoginPage);
  }

  seeNotification(){
    this.navCtrl.push(NotificationPage,{user:this.user_detail});
  }

  pushSetup()
  {
    const options: PushOptions = {
      android: {
        senderID : '504540252840'
      }
      
    }
   
    const pushObject: PushObject = this.push.init(options);
    
    
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
    
    pushObject.on('registration')
    .subscribe((registration: any)=>{
      console.log('Device registered', registration);
      this.db.getData(registration,"report/insert_user_fcmId")
      .subscribe(resp=>{
        console.log(resp);
      });
    });
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  
  }
}
