import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { LeadDetailPage } from '../lead-detail/lead-detail';

@IonicPage()
@Component({
  selector: 'page-add-lead',
  templateUrl: 'add-lead.html',
})
export class AddLeadPage {
  data:any={};
  temp_data:any={state:{},district:{},city:{}};
  form:any={};
  state_data:any=[];
  district_data:any=[];
  city_data:any=[];
  cp_person:any=[];
  edit_lead:any;
  loader:Loading;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public service:DatabaseProvider,public loading:LoadingController) 
  {
    this.data.lead_type="Consumer";
    this.service.getData(0,'leads/statedata').subscribe((resp)=>
    {
      console.log(resp);
      this.state_data=resp;
    });
    
    this.showLoading();
    this.edit_lead = this.navParams.get('edit_lead_data');
    console.log(this.edit_lead);
    
    if(this.edit_lead)
    {
      this.data = this.edit_lead;
      if(this.edit_lead.lead_type == 'Corporate')
      {
        this.data.lead_name = this.edit_lead.company_name;
      }
      else
      {
        this.data.lead_name = this.edit_lead.name;
      }
      this.form.username = this.edit_lead.username;
      this.form.cp_mobile_no_1 = this.edit_lead.cp_mobile_no_1;
      this.form.cp_mobile_no_2 = this.edit_lead.cp_mobile_no_2;
      
      
      this.temp_data.state.state_name = this.edit_lead.state;
      this.temp_data.district.district_name = this.edit_lead.district;
      this.temp_data.city.city = this.edit_lead.city;
    }
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

  state()
  {
    this.service.getData(this.temp_data.state.state_name,'leads/districtdata').subscribe((resp)=>
    {
      console.log(resp);
      this.district_data=resp;
      
    })
  }
  district()
  {
    this.service.getData(this.temp_data.district.district_name,'leads/citydata').subscribe((resp)=>
    {
      console.log(resp);
      this.city_data=resp;
      
    }) 
  }
  
  add_cp()
  {
    console.log(this.form);
    
    let val=JSON.parse(JSON.stringify(this.form));
    console.log(val);
    this.cp_person.push(val);
    console.log(this.cp_person);
    this.form.username='';
    this.form.cp_mobile_no_1='';
    this.form.cp_mobile_no_2='';
    console.log(this.form); 
  }
  
  onSubmit()
  {
    this.data.state=this.temp_data.state.state_name;
    this.data.district=this.temp_data.district.district_name;
    this.data.city=this.temp_data.city.city;
    this.data.username=this.form.username;
    this.data.cp_mobile_no_1=this.form.cp_mobile_no_1;
    this.data.cp_mobile_no_2=this.form.cp_mobile_no_2;
    console.log(this.data);

    if(this.edit_lead)
    {
      
      this.service.getData(this.data,'leads/update_lead_data').subscribe((resp)=>
      {
        console.log(resp);
        this.navCtrl.push(LeadDetailPage,{id:resp});
        
      })
    }
    else
    {
      let new_data = {data:this.data, form:this.cp_person};
      
      this.service.getData(new_data,'leads/add_lead').subscribe((resp)=>
      {
        console.log(resp);
        this.navCtrl.push(LeadDetailPage,{id:resp});
      })
    }
    }
    
    ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeadPage');
    }

    // ionViewWillLeave() {
    //   console.log("will leave");
      
    // this.navCtrl.push(LeadListPage);
    // }
}
