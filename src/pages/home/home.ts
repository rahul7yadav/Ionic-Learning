import { Component } from '@angular/core';
import { LoadingController, App, ToastController, NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {LoginPage} from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	loading: any;
	isLoggedIn: boolean = false;

  constructor(public app: App, public navCtrl: NavController, public restProvider: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  	
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.getUsers();
    }
    else{
      navCtrl.setRoot(LoginPage);
    }

  	

  }

  users: any;

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }

  logout() {
    this.showLoader();
    this.restProvider.logout().then((result) => {
      this.loading.dismiss();
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
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
