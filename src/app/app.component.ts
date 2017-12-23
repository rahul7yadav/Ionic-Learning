import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav; 
  rootPage:any = LoginPage;
  menus: string[];
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, statusbar: StatusBar, splashscreen: SplashScreen, app: App, menu: MenuController) {
    this.initializeApp(statusbar,splashscreen);
    //console.log('component ____');
    //console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") != null) {
      this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'List', component: ListPage},
            {title: 'Logout', component: null}
        ];
    }
    else{
      this.pages = [
            {title: 'Login', component: LoginPage},
            {title: 'List', component: ListPage}
        ];
    }    
    menu.enable(false);    

  }

  initializeApp(statusbar,splashscreen){
    this.platform.ready().then(() => {
      statusbar.styleDefault();
      splashscreen.hide();
    });
  }

  openPage(page){
    if(page.component != null)
    {
      this.nav.setRoot(page.component);  
    }
    else
    {
      localStorage.clear();
      this.nav.setRoot(LoginPage);
    }
    
  }




}

