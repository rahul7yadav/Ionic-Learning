import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { ListsubitemPage } from '../pages/listsubitem/listsubitem';
import { SupervisorsPage } from '../pages/supervisors/supervisors';
import {AddsupervisorPage} from '../pages/addsupervisor/addsupervisor';
import {EditsupervisorPage} from '../pages/editsupervisor/editsupervisor';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    ListPage,
    ListsubitemPage,
    SupervisorsPage,
    AddsupervisorPage,
    EditsupervisorPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    ListPage,
    ListsubitemPage,
    SupervisorsPage,
    AddsupervisorPage,
    EditsupervisorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    RestProvider
  ]
})
export class AppModule {}
