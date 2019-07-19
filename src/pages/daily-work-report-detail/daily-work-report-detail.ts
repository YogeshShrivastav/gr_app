import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the DailyWorkReportDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daily-work-report-detail',
  templateUrl: 'daily-work-report-detail.html',
})
export class DailyWorkReportDetailPage {

  loader:Loading;
  data:any='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public loading:LoadingController,public db:DatabaseProvider) {
    this.data=this.navParams.get('page');
    console.log(this.data);
    this.showLoading();
  }

  ionViewDidLoad() {
    this.get_detail();
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

  work_report:any=[];
  show:boolean=false;
  get_detail()
  {
    this.db.getData(this.data,"report/get_work_report_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.work_report=resp;
      if(this.work_report.length==0)
      {
        this.show=true;
      }
      else{
        this.show=false;
      }
    })
  }
}
