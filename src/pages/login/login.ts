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
  
    if(localStorage.getItem("token")) {
      navCtrl.setRoot(HomePage);
    }
    
  }

  doLogin() {
    this.showLoader();
    this.restProvider.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      console.log('get data');
      console.log(this.data['success']['token']);
      localStorage.setItem('token', this.data['success']['token']);
      console.log(localStorage.getItem('token'));
      this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log('error=');
      console.log(err.error['error']);
      if (typeof err.error['error'] === "string") {
          console.log('string hai');
          this.presentToast(err.error['error']);
      }
      else
      {
        //console.log(err.error['error'].size());
        var err_msg = '<ul>';
          for (var x in err.error['error']) {
            console.log(x);
            console.log(err.error['error'][x][0]);
            err_msg += '<li>'+err.error['error'][x][0]+'</li>';
        }
        err_msg += '</ul>';
        this.presentToast(err_msg);
      }  
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
