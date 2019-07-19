import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AddFollowUpPage } from '../add-follow-up/add-follow-up';
import { AddLeadPage } from '../add-lead/add-lead';


/**
 * Generated class for the LeadDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lead-detail',
  templateUrl: 'lead-detail.html',
})
export class LeadDetailPage {
  dr_id:any;
  loader:Loading;
  lead_detail_data:any={};
  edit_lead_data:any=[];
  cont_pr_data:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:DatabaseProvider,public loading:LoadingController) 
  {
    this.dr_id = this.navParams.get('id');
    console.log(this.dr_id);

    this.contact_person();
    this.get_lead_detail();
    this.showLoading();
  }

  ionViewDidLoad() {  
  }

 

  EditLeads(id)
  {
    this.service.getData(id,'leads/edit_lead_data').subscribe((resp)=>
    {
      console.log(resp);
      this.edit_lead_data=resp;
      this.navCtrl.push(AddLeadPage,{edit_lead_data:this.edit_lead_data});
      
    })
  }

  contact_person()
  {
    this.service.getData(this.dr_id,'leads/get_cont_pr_data').subscribe((resp)=>
    {
      console.log(resp);
      this.cont_pr_data=resp;
      
    });
  }

  get_lead_detail()
  {
    console.log(this.dr_id);
    this.service.getData(this.dr_id,'leads/get_lead_detail')
    .subscribe((resp)=>
    {
      console.log(resp);
      this.lead_detail_data = resp;
    });
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


  CreateFollowup(id)
  {
    this.navCtrl.push(AddFollowUpPage,{id:id});
  }

}
