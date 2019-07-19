import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskListPage } from '../task-list/task-list';
import { IonicSelectableComponent } from 'ionic-selectable';

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

  task:any={};
  product_list:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider) {
  }

  ionViewDidLoad() {
    this.task.type_name='SALES';
    this.getallproducts();
  }

  all_lead:any=[];
  getallleads()
  {
    this.db.getData(this.task.lead_type,"master/get_all_lead")
    .subscribe(resp=>{
      console.log(resp);
      this.all_lead=resp;
    })
  }

  service_type_list:any=[];
  getallproducts()
  {
    this.db.getData("","master/get_all_product")
    .subscribe(resp=>{
      console.log(resp);
      this.product_list=resp["product_list"];
      this.service_type_list=resp["service_type"];
    })
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    console.log('port:', event.value);
  }

  product:any={};
  service_type:any={};
  product_arr:any=[];
  // product_name:any='';
  add_product()
  {
    let val = JSON.parse(JSON.stringify(this.product))
    // console.log(this.service_type);
    val.service_type=this.service_type.type_name;
    val.ser_type_id=this.service_type.id;
    val.type_name=this.task.type_name;
    val.lead_type=this.task.lead_type;
    val.lead_id=this.task.lead_id;
    console.log(val);
    
    
    if(this.product_arr.length == 0 || this.task.type_name == 'SERVICE')
    {     
      this.product_arr.push(val);
      console.log(val);
    }
    else
    {
      for(var i=0; i<this.product_arr.length; i++) 
      {
        if(this.product_arr[i].id == val.id) 
        {
          this.product_arr[i].qty = parseInt(this.product_arr[i].qty) + parseInt(this.product.qty);
          this.product_arr[i].rate = parseInt(this.product_arr[i].rate) + parseInt(this.product.rate);
          this.product_arr[i].amount =  (parseInt(this.product_arr[i].rate) * parseInt(this.product_arr[i].qty));
        }
        else if(i == this.product_arr.length -1) 
        {
          this.product_arr.push(val);
          break; 
        }
      } 
    }    

 
    this.product.product_id="";
    this.product.qty="";
    this.product.rate="";
    this.product.amount="";
    this.product.remarks="";
    this.service_type={};
    this.product.reason_of_call="";
    console.log(this.product_arr);
    
  }

  remove_arr(array,indx)
  {     
    array.splice(indx,1);
  }

  calculate()
  {
    if(this.product.qty== undefined)
    {
      this.product.qty=0;
    }
    if(this.product.rate== undefined)
    {
      this.product.rate=0;
    }
    this.product.amount=this.product.qty*this.product.rate
  }

  addtask()
  {
    console.log("hello");
    console.log(this.product_arr);
    this.db.getData(this.product_arr,"master/add_task")
    .subscribe(resp=>{
      console.log(resp);
      if(resp["msg"]=="success")
      {
        this.navCtrl.push(TaskListPage);
      }
    })    
    
  }

  change()
  {
    this.product.product_id="";
    this.product.qty="";
    this.product.rate="";
    this.product.amount="";
    this.product.reason_of_call="";
    this.product_arr=[];
  }

}
