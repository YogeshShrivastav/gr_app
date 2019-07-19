import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading,LoadingController } from 'ionic-angular';
import { DailyWorkReportDetailPage } from '../daily-work-report-detail/daily-work-report-detail';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';


@IonicPage()
@Component({
  selector: 'page-daily-work-report',
  templateUrl: 'daily-work-report.html',
})
export class DailyWorkReportPage {

  loader:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public db:DatabaseProvider,public loading:LoadingController) {
    this.showLoading();
  }

  user_id:any=0;
  today:any=0;
  tmp_today:any=0;
  date:any={}
  ionViewDidLoad() {
    this.storage.get("id")
    .then(resp=>{
      this.user_id=resp;
      console.log(this.user_id);

      this.date = new Date();
      this.today=this.tmp_today=this.date.toISOString();
      console.log(this.date);
      this.get_daily_report();
    });
    
  }

  set_date()
  {
    this.date=new Date(this.today);
  }

  change_date(val)
  {
    if(val == 'prev')
    {
      this.date.setDate(this.date.getDate() - 1);
      this.today=this.date.toISOString()
      this.get_daily_report();
    }
    if(val == 'next')
    {
      this.date.setDate(this.date.getDate() + 1);
      this.today=this.date.toISOString()
      this.get_daily_report();
    }
    
  }


  page_val:any={};
  goOndetail(type){
    this.page_val.type=type;
    this.page_val.date=this.date;
    this.navCtrl.push(DailyWorkReportDetailPage,{'page':this.page_val})
  }

  data:any={};
  get_daily_report()
  {
    this.db.getData({"data":this.date},"report/get_work_report")
    .subscribe(resp=>{
      console.log(resp);
      this.data=resp;

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
}
