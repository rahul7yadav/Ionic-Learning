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
  rootPage:any = HomePage;
  menus: string[];
  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, statusbar: StatusBar, splashscreen: SplashScreen, app: App, menu: MenuController) {
    this.initializeApp(statusbar,splashscreen);
    this.pages = [
            {title: 'Home', component: HomePage},
            {title: 'Sign up', component: SignupPage},
            {title: 'Login', component: LoginPage},
            {title: 'List', component: ListPage}
        ];
    menu.enable(false);    

  }

  initializeApp(statusbar,splashscreen){
    this.platform.ready().then(() => {
      statusbar.styleDefault();
      splashscreen.hide();
    });
  }

  openPage(page){
    this.nav.setRoot(page.component);
  }


}

