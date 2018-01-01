import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, App, ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AddsupervisorPage} from '../addsupervisor/addsupervisor';
import {EditsupervisorPage} from '../editsupervisor/editsupervisor';
/**
 * Generated class for the SupervisorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supervisors',
  templateUrl: 'supervisors.html',
})
export class SupervisorsPage {
	ApiUrl = 'http://localhost/passport-laravel/trade/api/';
	loading: any;

	constructor(public app: App, public navCtrl: NavController, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: HttpClient) {
		
		if(localStorage.getItem("token")) {
	    
	      this.Supervisors();
	    }
	    else{
	      navCtrl.setRoot(LoginPage);
	    }
	}

	supervisors: any;
	Supervisors() {
		this.showLoader('Loading ...');
	    return new Promise(resolve => {
	        let headers = new HttpHeaders({
	          'Content-Type': 'application/json',
	          'Accept': 'application/json',
	          'Authorization': 'Bearer '+localStorage.getItem('token'),
	          'X-Auth-Token': localStorage.getItem('token')
	        });
	        
	        this.http.get(this.ApiUrl+'supervisor?json=true', {headers: headers}).subscribe(data => {
	          console.log('supervisor');
	          this.loading.dismiss();
	          console.log(data);
	          // this.presentToast(data);
	          this.supervisors = data;
	          // this.stores = data;
	          //this.showAlert(this.stores);
	        }, err => {
	          console.log('err');
	          console.log(err);
	        });
	    });
	}

	
	delete(id: number){
	    this.showLoader('Loading ...');
	    return new Promise(resolve => {
	        let headers = new HttpHeaders({
	          'Content-Type': 'application/json',
	          'Accept': 'application/json',
	          'Authorization': 'Bearer '+localStorage.getItem('token'),
	          'X-Auth-Token': localStorage.getItem('token')
	        });
	        this.http.get(this.ApiUrl+'supervisor/delete/'+id+'?json=true', {headers: headers}).subscribe(data => {
	          	console.log('Delete');
	          	this.loading.dismiss();
	          	console.log(data);
				this.navCtrl.setRoot(SupervisorsPage);
	          
	        }, err => {
	          //console.log('err');
	          this.loading.dismiss();
	          console.log(err);
	        });
	    });
	}

	add(){
		this.navCtrl.setRoot(AddsupervisorPage);
	}

	edit(id: number){
	    this.showLoader('Loading ...');
	    return new Promise(resolve => {
	        let headers = new HttpHeaders({
	          'Content-Type': 'application/json',
	          'Accept': 'application/json',
	          'Authorization': 'Bearer '+localStorage.getItem('token'),
	          'X-Auth-Token': localStorage.getItem('token')
	        });
	        this.http.get(this.ApiUrl+'supervisor/edit/'+id+'?json=true', {headers: headers}).subscribe(data => {
	          console.log('Delete');
	          this.loading.dismiss();
	          console.log(data);
	          this.navCtrl.setRoot(EditsupervisorPage,{user: data['supervisor']});
	          
	        }, err => {
	          //console.log('err');
	          console.log(err);
	        });
	    });
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SupervisorsPage');
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
