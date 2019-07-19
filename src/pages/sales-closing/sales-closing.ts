import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskListPage } from '../task-list/task-list';
/**
 * Generated class for the SalesClosingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales-closing',
  templateUrl: 'sales-closing.html',
})
export class SalesClosingPage {

  sale_id:any=0;
  user_id:any=0;
  dr_id:any=0;
  maxDate:any;
  row:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public db:DatabaseProvider) {
    this.sale_id=this.navParams.get("sale_id");
    console.log(this.sale_id);
    storage.get("id")
    .then(resp=>{
      console.log(resp);
      this.data.user_id=resp;
      this.data.sale_id=this.sale_id;
    });
    this.maxDate = new Date().toISOString();
  }
  data:any={};
  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesClosingPage');
    this.get_product_detail();
  }

  product_arr:any=[];
  tmp_prod_arr:any=[];
  get_product_detail()
  {
    this.db.getData(this.sale_id,"master/get_task_detail")
      .subscribe(resp=>{
        console.log(resp);
        this.product_arr=resp["product_detail"];
        for(var i=0;i<this.product_arr.length;i++)
        {
          this.product_arr[i]["delivery_qty"]=0;
          this.product_arr[i]["remain_qty"]=this.product_arr[i]["qty"];
        }
      });
  }

  submit_closing_report()
  {
    console.log(this.data);
    console.log(this.product_arr);
    
    this.db.getData({data:this.data,product:this.product_arr},"master/insert_sales_close")
    .subscribe(resp=>{
      console.log(resp);
      if(resp["msg"]="success")
      {
        this.navCtrl.push(TaskListPage);
      }
    });
  }

  tmp_val:any=0;
  calculate(indx,del_qty)
  {
    console.log(del_qty);
    if(parseInt(del_qty) > parseInt(this.product_arr[indx].qty))
    {
      this.product_arr[indx].delivery_qty=this.product_arr[indx].qty;
      this.product_arr[indx].remain_qty=(parseInt(this.product_arr[indx].qty))-(parseInt(this.product_arr[indx].qty));
    }
    else if(parseInt(del_qty) < 0)
    {
      this.product_arr[indx].delivery_qty=0;
      this.product_arr[indx].remain_qty=0;
    }else
    {
      if(del_qty==''){
        del_qty=0;
      }
      this.product_arr[indx].remain_qty=(parseInt(this.product_arr[indx].qty))-(parseInt(del_qty));
    }
    console.log(this.product_arr[indx]);
  }
}
