import { Component } from '@angular/core';
import { LoadingController, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import {HomePage} from '../home/home';
import {SignupPage} from '../signup/signup';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loading: any;
	loginData = { email:'', password:'' };
	data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
  }

  doLogin() {
    this.showLoader();
    this.restProvider.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      console.log('get data');
      console.log(this.data[0].id);
      localStorage.setItem('token', this.data[0].id);
      console.log(localStorage.getItem('token'));
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  }

  register() {
    this.navCtrl.push(SignupPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
