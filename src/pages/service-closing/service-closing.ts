import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskListPage } from '../task-list/task-list';


/**
 * Generated class for the ServiceClosingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-closing',
  templateUrl: 'service-closing.html',
})
export class ServiceClosingPage {
  sale_id:any=0;
  user_id:any;
  state_data:any=[];
  constructor(public navCtrl: NavController,public storage:Storage, public navParams: NavParams,public db:DatabaseProvider) {
    this.sale_id = this.navParams.get('id');
    console.log("service-id");    
    console.log(this.sale_id);
    storage.get("id")
    .then(resp=>{
      console.log(resp);           
      this.user_id=resp;      
    });
    this.getState();
    this.getTaskDetail();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceClosingPage');
  }
  service:any={}; 
  
  addCloseService(){
   console.log(this.service);  
   this.db.getData(this.service,"master/insert_services_close")
   .subscribe(resp=>{
     console.log(resp);
     if(resp["msg"]="success")
     {
       this.navCtrl.push(TaskListPage);
     }
   });
  }

  product_arr:any=[];
  service_arr:any=[];
  lead_detail:any={};
  getTaskDetail()
  {
    console.log(this.sale_id);    
    this.db.getData(this.sale_id,"master/get_task_detail")
    .subscribe(resp=>{
      console.log("service detail");      
      console.log(resp);
      this.service_arr=resp["product_detail"];
      this.service=resp["lead_detail"];
      this.service.sale_id=this.sale_id;
      this.service.user_id=this.user_id;
      this.service.type='SERVICES';
      this.service.status='Close';
      this.service.reason_of_call='';          
      this.service_arr.forEach(element => {
        console.log('service array');        
        console.log(element.type);
        if(element.type=='SERVICE'){
         this.service.reason_of_call=this.service.reason_of_call+'#'+element.reason_of_call;
        }        
      });  
      console.log(this.service);
      
    });
  }

  getState(){
    this.db.getData(0,'leads/statedata').subscribe((resp)=>
    {
      console.log(resp);
      this.state_data=resp;
    });
  }
  
  MobileNumber(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  
}
