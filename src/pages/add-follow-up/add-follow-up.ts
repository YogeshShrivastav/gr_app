import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
* Generated class for the AddFollowUpPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-add-follow-up',
  templateUrl: 'add-follow-up.html',
})
export class AddFollowUpPage {
  dr_id:any;
  loader:Loading;
  data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:DatabaseProvider,public loading:LoadingController) 
  {
    this.dr_id = this.navParams.get('id');
    console.log(this.dr_id);
    this.showLoading();
    this.get_recent_followup();
  }
  
  add_followup()
  {
    this.data.dr_id = this.dr_id;
    console.log(this.data);
    
    this.service.getData(this.data,'leads/add_follow_up').subscribe((resp)=>
    {
      console.log(resp);
      if(resp)
      {
        this.get_recent_followup();
        this.data.activity_type='';
        this.data.description='';
        this.data.next_followup_type='';
        this.data.next_followup_date='';
      }
    })
    
  }

  showLoading()
  {
    this.loader=this.loading.create({
      spinner:"hide",
      content:`<img class="rotate h65" src="assets/imgs/gif-loder.svg" />`,
      dismissOnPageChange: true
    });
    this.loader.present();
  }
  
  ionViewDidLoad() {
    // this.get_recent_followup();
  }
  
  recent_followup:any=[];
  get_recent_followup()
  {
    console.log(this.data);
    
    this.service.getData(this.dr_id,"leads/get_followup")
    .subscribe(resp=>{
      console.log(resp);
      this.recent_followup=resp;
      
    })
  }
}
