import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicSelectableModule } from 'ionic-selectable';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';


import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddFollowUpPageModule } from '../pages/add-follow-up/add-follow-up.module';
import { DatabaseProvider } from '../providers/database/database';
import { HttpClientModule } from '@angular/common/http';
import { ToastrProvider } from '../providers/toastr/toastr';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { Push } from '@ionic-native/push';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/';
import { Network } from '@ionic-native/network';
import { FmsProvider } from '../providers/fms/fms';
import { AddLeadPageModule } from '../pages/add-lead/add-lead.module';
import { DailyWorkReportPageModule } from '../pages/daily-work-report/daily-work-report.module';
import { DailyWorkReportDetailPageModule } from '../pages/daily-work-report-detail/daily-work-report-detail.module';
import { FollowUpDetailPageModule } from '../pages/follow-up-detail/follow-up-detail.module';
import { FollowUpListPageModule } from '../pages/follow-up-list/follow-up-list.module';
import { LeadDetailPageModule } from '../pages/lead-detail/lead-detail.module';
import { LeadListPageModule } from '../pages/lead-list/lead-list.module';
import { LoginPageModule } from '../pages/login/login.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { SalesClosingPageModule } from '../pages/sales-closing/sales-closing.module';
import { ServiceClosingPageModule } from '../pages/service-closing/service-closing.module';
import { TaskDetailPageModule } from '../pages/task-detail/task-detail.module';
import { TaskListPageModule } from '../pages/task-list/task-list.module';
import { AddTaskPageModule } from '../pages/add-task/add-task.module';


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAa7TtlqwUsiusfZoFHoll1Er7FjD7-LIU",
    authDomain: "gr-industries007.firebaseapp.com",
    databaseURL: "https://gr-industries007.firebaseio.com",
    projectId: "gr-industries007",
    storageBucket: "gr-industries007.appspot.com",
    messagingSenderId: "504540252840"
  };


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    AddFollowUpPageModule,
    AddLeadPageModule,
    AddTaskPageModule,
    DailyWorkReportPageModule,
    DailyWorkReportDetailPageModule,
    FollowUpDetailPageModule,
    FollowUpListPageModule,
    LeadDetailPageModule,
    LeadListPageModule,
    LoginPageModule,
    NotificationPageModule,
    SalesClosingPageModule,
    ServiceClosingPageModule,
    TaskDetailPageModule,
    TaskListPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GeolocationProvider,
    BackgroundGeolocation,
    Push,
    Firebase,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    ToastrProvider,
    FirebaseProvider,
    FmsProvider
  ]
})
export class AppModule {}