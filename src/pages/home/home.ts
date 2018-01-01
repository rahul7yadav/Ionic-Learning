import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, App, ToastController, NavController, AlertController} from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import {LoginPage} from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	loading: any;
	isLoggedIn: boolean = false;

  occasions= [];
  //{id: '',occasion_name: '', current_occasion: ''}
  ApiUrl = 'http://localhost/passport-laravel/trade/api/';
  constructor(public app: App, public navCtrl: NavController, public restProvider: RestProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public http: HttpClient, public alertCtrl: AlertController) {
  	
    if(localStorage.getItem("token")) {
      this.isLoggedIn = true;
      this.getUsers();
      this.Dashboard();
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
      
    });
  }

  dashboard_data: any;
  Dashboard() {
    this.showLoader('Loading ...');
    this.restProvider.Dashboard()
    .then(data => {
      console.log(data);
      this.loading.dismiss();
      this.dashboard_data = data;
      for (let i=0; i<data['occasions'].length;i++) {
        
        this.occasions.push(data['occasions'][i]);
        //this.occasions[i].occasion_name = data['occasions'][i].occasion_name;
        //this.occasions[i].current_occasion = data['occasions'][i].current_occasion;
      }
      console.log(this.occasions);
    });
  }

  stores: any;
  getStores(name: string,id: number){
    this.showLoader('Loading ...');
    return new Promise(resolve => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token'),
          'X-Auth-Token': localStorage.getItem('token')
        });
        this.http.get(this.ApiUrl+'repstores/'+name+'/'+id+'?json=true', {headers: headers}).subscribe(data => {
          console.log('getStores');
          this.loading.dismiss();
          console.log(data);
          this.stores = data;
          this.showAlert(this.stores);
        }, err => {
          //console.log('err');
          console.log(err);
        });
    });
  }

  chooseOccasion (){
    this.showLoader('Loading ...');
    return new Promise(resolve => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token'),
          'X-Auth-Token': localStorage.getItem('token')
        });
        var postData = [];
        var objpost = {};
        for (let i=0; i<this.occasions.length;i++) {
          postData.push(this.occasions[i].id);
        }
        objpost = this.toObject(postData);
        this.http.post(this.ApiUrl+'chooseoccasion?json=true', {occasion: objpost}, {headers: headers}).subscribe(data => {
          console.log('chooseOccasion');
          this.loading.dismiss();
          console.log(data);
          this.presentToast(data);
          // this.stores = data;
          //this.showAlert(this.stores);
        }, err => {
          console.log('err');
          console.log(err);
        });
    });

  }

  toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];
    return rv;
  }

  showAlert(stores: string) {
    let alert = this.alertCtrl.create({
      //title: '',
      subTitle: stores
      //buttons: ['OK']
    });
    alert.present();
  }

  logout() {
    this.showLoader('Logout...');
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
// export class ObjNgFor implements PipeTransform {
//     transform(value: any, args: any[] = null): any {
//         return Object.keys(value).map(key => Object.assign({ key }, value[key]));
//     }
// }