import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { LoadingController, ToastController, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';


import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SupervisorsPage } from '../pages/supervisors/supervisors';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav; 
  rootPage:any = LoginPage;
  menus: string[];
  pages: Array<{ title: string, component: any }>;
  loading: any;
  constructor(public platform: Platform, statusbar: StatusBar, splashscreen: SplashScreen,public app: App, menu: MenuController, public restProvider: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.initializeApp(statusbar,splashscreen);
    //console.log('component ____');
    //console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") != null || localStorage.getItem("token") != '') {
      this.pages = [
            {title: 'Dashboard', component: HomePage},
            {title: 'Supervisors', component: SupervisorsPage},
            {title: 'Logout', component: null}
        ];
    }
    else{
      this.pages = [
            {title: 'Login', component: LoginPage},
            //{title: 'List', component: ListPage}
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
      this.logout();
      localStorage.clear();
      this.nav.setRoot(LoginPage);
    }
    
  }

  logout() {
    this.showLoader();
    this.restProvider.logout().then((result) => {
      this.loading.dismiss();
      this.presentToast(result);
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Logout...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

