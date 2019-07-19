import { Component, NgZone } from '@angular/core';
import { Platform,LoadingController,Loading,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  noti_count:any=0;
  rootPage:any ;
  loader:Loading;
  constructor(platform: Platform,
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public storage:Storage,
              public db:DatabaseProvider,
              public loading:LoadingController,
              public track:GeolocationProvider,
              public network: Network,
              public event:Events,
              public zone:NgZone,
              public firebase:Firebase){

    platform.ready().then(() =>{
      this.start_tracking();
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString("#327669");
      splashScreen.hide();
      this.showLoading();
      this.get_connection();
      this.storage.get("token")
      .then((token)=>{

        if(token && typeof(token) !== "undefined")
        {
          this.db.get_login(token,"master/auth_user")
          .subscribe(resp=>{
            console.log(resp);
            if(resp)
            {
              this.db.set_token_data(token);
              this.rootPage=TabsPage;
              this.loader.dismiss();
            }
            else
            {
              this.rootPage=LoginPage;
              this.loader.dismiss();
            }
          })
        }
        else
        {
          this.rootPage=LoginPage;
          this.loader.dismiss();
        }      
      });
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

  start_tracking()
  {
    this.track.startTracking();
  }

  con_err:boolean=false;
  get_connection()
  {
    console.log("Network");
    console.log(this.network);

       this.network.onConnect()
      .subscribe(()=>{
        this.zone.run(()=>{
          this.con_err=false;
        });
      });
    
    this.network.onDisconnect()
      .subscribe(()=>{
        this.zone.run(()=>{
        this.con_err=true;
      });
    });
   
  }
}
