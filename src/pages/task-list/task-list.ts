import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TaskDetailPage } from '../task-detail/task-detail';
import { ServiceClosingPage } from '../service-closing/service-closing';
import { AddTaskPage } from '../add-task/add-task';
import { DatabaseProvider } from '../../providers/database/database';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {

  loader:Loading;
  search:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public loading:LoadingController,public location:GeolocationProvider,public track:GeolocationProvider) {
    this.showLoading();
  }

  ionViewDidLoad() {    
    this.get_all_task("SALES");
    this.start_tracking();
  }

  data:any={};
  SeeTaskDetail(type,id){
      this.data.type=type;
      this.data.id=id;
      this.navCtrl.push(TaskDetailPage,{"data":this.data});    
  } 

  ionViewWillLeave() {
  console.log("tesk list leaving");
  }

  CreatTask(){
    this.navCtrl.push(AddTaskPage)
  }

  user_task_detail:any=[];
  sales_row:any=0;
  service_row:any=0;
  show:boolean=false;
  get_all_task(data)
  {
    this.search.type_name=data;
    this.db.getData({"search":this.search},"master/get_task")
    .subscribe(resp=>{
      console.log(resp);
      this.user_task_detail=resp["task_list"];

      if(this.user_task_detail.length==0)
      {
        this.show=true;
      }
      else{
        this.show=false;
      }
      this.sales_row=resp["sale_rw"];
      this.service_row=resp["service_rw"];
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

  start_tracking()
  {
    this.track.startTracking();
  }

}
