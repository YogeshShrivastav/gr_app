import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LeadDetailPage } from '../lead-detail/lead-detail';


/**
* Generated class for the FollowUpListPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-follow-up-list',
  templateUrl: 'follow-up-list.html',
})
export class FollowUpListPage {
  followup_status:any = 'Pending';
  followup_data:any=[];
  pending_row:any=0;
  done_row:any=0;
  show:boolean=false;
  loader:Loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:DatabaseProvider,public loading:LoadingController) 
  {
    this.get_followup_data('Pending');
    this.showLoading(); 
  }
  
  get_followup_data(data)
  {
    this.followup_status=data;

    this.service.getData(this.followup_status,'leads/get_followup_data')
    .subscribe((resp)=>
    {
      console.log(resp);
      this.followup_data=resp['followup_data'];
      this.pending_row=resp['pending_row'];
      this.done_row=resp['done_row'];
      if(this.followup_data.length==0)
      {
        this.show=true;
      }
      else{
        this.show=false;
      }
    
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowUpListPage');
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
  
  SeeFollowupDetail(dr_id){
    console.log(dr_id);
    
    this.navCtrl.push(LeadDetailPage,{id:dr_id});
  }
  
}
