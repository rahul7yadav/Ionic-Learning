import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, App, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { SupervisorsPage } from '../supervisors/supervisors';
/**
 * Generated class for the EditsupervisorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editsupervisor',
  templateUrl: 'editsupervisor.html',
})
export class EditsupervisorPage {
	user = {};
	ApiUrl = 'http://localhost/passport-laravel/trade/api/';
	loading: any;
	
	constructor(public app: App, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: HttpClient, public navParams: NavParams) {
		
		if(localStorage.getItem("token")) {
			this.user = navParams.get('user');
			console.log('edit user');
	      	console.log(this.user);
	    }
	    else{
	      navCtrl.setRoot(LoginPage);
	    }
	}

	updateSupervisor(){
		this.showLoader('Loading ...');
  		return new Promise((resolve, reject) => {
		  	
		  	let headers = new HttpHeaders({
	          'Content-Type': 'application/json',
	          'Accept': 'application/json',
	          'Authorization': 'Bearer '+localStorage.getItem('token'),
	          'X-Auth-Token': localStorage.getItem('token')
	        });

		  	this.http.post(this.ApiUrl+'supervisor/update/'+this.user['id']+'?json=true', this.user, {headers: headers})
		      .subscribe(res => {
		      	this.loading.dismiss();
		      	console.log('res');
		      	console.log(res);
		        this.presentToast(res);
		        this.navCtrl.setRoot(SupervisorsPage);
		      }, (err) => {
		      	this.loading.dismiss();
		      	console.log('err');
		      	console.log(err);
		        var err_msg = '<ul>';
		  		for (var x in err.error['error']) {
		  			console.log(x);
		  			console.log(err.error['error'][x][0]);
				    err_msg += '<li>'+err.error['error'][x][0]+'</li>';
				}
				err_msg += '</ul>';
				this.presentToast(err_msg);
		      });
		});

	}

	showLoader(msg){
	    this.loading = this.loadingCtrl.create({
	        content: msg
	    });

	    this.loading.present();
	}

	presentToast(msg) {
	    let toast = this.toastCtrl.create({
	      message: msg,
	      duration: 9000,
	      position: 'bottom',
	      dismissOnPageChange: true
	    });

	    toast.onDidDismiss(() => {
	      console.log('Dismissed toast');
	    });

	    toast.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditsupervisorPage');
	}

}
