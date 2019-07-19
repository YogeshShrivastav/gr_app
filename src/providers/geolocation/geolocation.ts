import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the GeolocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocationProvider {

  user_id:any=0;
  constructor(public http: HttpClient,public zone:NgZone,public backgroundGeolocation:BackgroundGeolocation,public geolocation:Geolocation,public db:DatabaseProvider,public storage:Storage) {
       
  }

  ionViewDidLoad() {
    this.storage.get("id")
    .then(resp=>{
      console.log(resp);
      this.user_id=resp;
      })
  }

  lat:any=0;
  lng:any=0;
  watch:any;
  startTracking() {
    
    this.storage.get("id")
    .then(resp=>{
      console.log(resp);
      this.user_id=resp;
      })

    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10, 
      debug: true,
      interval: 2000 
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
    });
    this.backgroundGeolocation.start();

    let options = {
    frequency: 3000, 
    enableHighAccuracy: true
  };
  this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {

    console.log(position);

    this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.user_id);
    
    this.db.getData({"latitude":this.lat,"longitude":this.lng,"user_id":this.user_id},"master/user_location")
    .subscribe(resp=>{
      console.log(resp);
      
    })
  });

  });

  }

  stopTracking() {

    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }
}
