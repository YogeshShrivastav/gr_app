import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SalesClosingPage } from '../sales-closing/sales-closing';
import { TaskListPage } from '../task-list/task-list';
import { ServiceClosingPage } from '../service-closing/service-closing';
/**
 * Generated class for the TaskDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html',
})
export class TaskDetailPage {

  sale_id:any;
  data:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
    this.data = this.navParams.get('data');
    this.sale_id=this.data.id;
    console.log(this.data);
    
    this.getTaskDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskDetailPage');
  }

  product_arr:any=[];
  lead_detail:any={};
  getTaskDetail()
  {
    console.log(this.sale_id);
    
    this.db.getData(this.sale_id,"master/get_task_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.product_arr=resp["product_detail"];
      this.lead_detail=resp["lead_detail"];
      if(this.lead_detail.status == undefined)
      {
        this.lead_detail.status="Open";        
      }

    });
  }

  goOnSalesClosingReport(){
    this.navCtrl.push(SalesClosingPage,{sale_id:this.sale_id});
  }

  goBack(){
    this.navCtrl.push(TaskListPage,{dr_id:this.sale_id});
  }

  SeeTaskDetailservice(){    
      this.navCtrl.push(ServiceClosingPage,{id:this.sale_id});
    }

  // SeeTaskDetailservice(row.status,row.id)
}
