import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AddLeadPage } from '../add-lead/add-lead';
import { LeadDetailPage } from '../lead-detail/lead-detail';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-lead-list',
  templateUrl: 'lead-list.html',
})
export class LeadListPage {
  lead_data:any=[];
  loader:Loading;
  consumer_count:any;
  corporate_count:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:DatabaseProvider,public loading:LoadingController) 
  {
    this.lead_list();
    this.showLoading();
    
  }

  show:boolean=false;
  lead_list()
  {
    if(this.search.type === undefined)
    {
      this.search.type="Consumer";
    }
    console.log(this.search);

    this.service.getData({"search":this.search},'leads/get_lead_data')
    .subscribe((resp)=>
    {
      console.log(resp);
      this.lead_data=resp['lead_data'];
      if(this.lead_data.length==0)
      {
        this.show=true;
      }
      else{
        this.show=false;
      }
      this.consumer_count=resp['consumer_count']['consumer_count'];
      this.corporate_count=resp['corporate_count']['corporate_count'];
      
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

  search:any={};
  set_val(data)
  {
    this.search.type=data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeadListPage');
  }

  CreatLeads(){
    this.navCtrl.push(AddLeadPage)
  }

  LeadDetail(id){
    console.log(id);
    
    this.navCtrl.push(LeadDetailPage,{id:id})
  }
}
