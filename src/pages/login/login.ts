import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { DatabaseProvider } from '../../providers/database/database';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public db: DatabaseProvider,public storage:Storage) {
  }
  login_mobile:any="";
  data:any={};
  ionViewDidLoad() {
    console.log('ionViewDidLoad PayconfirmPage');
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none';
      });
    }
  }
  
  ionViewWillLeave() {
    console.log('ionViewDidLoad WaterNotificationPage');
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }

  SeeHome(){

    console.log(this.data);
    this.db.login(this.data,"login/loginUser")
    .subscribe(resp=>{
      console.log(resp);      
      if(resp!='wrong')
      {
        this.storage.set('token',resp["token"]); 
        this.storage.set('id',resp["id"]); 
        this.db.set_token_data(resp["token"]);
        this.navCtrl.setRoot(TabsPage, {token:resp["token"]});
      }
      else
      {
        alert("Invalid mobile number");
      }
      console.log(this.storage);      
    })
  }
}
