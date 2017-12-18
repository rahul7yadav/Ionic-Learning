import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import {LoginPage} from '../login/login';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

	  user = { name: '', email: '', password: ''};
	  createSuccess = false;

	  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public alertCtrl: AlertController) {
	    // If we navigated to this page, we will have an item available as a nav param
	    
	  }

	saveUser() {
		this.restProvider.addUser(this.user).then((result) => {
	    	if (result) {
		        this.createSuccess = true;
		        this.showPopup("Success", "Account created.");
		    } else {
		        this.showPopup("Error", "Problem creating account.");
		    }
	  	}, (err) => {
	    	console.log(err);
	    	this.showPopup("Error", err);
	  	});
	}

	showPopup(title, text) {
	    let alert = this.alertCtrl.create({
	      title: title,
	      subTitle: text,
	      buttons: [
	        {
	          text: 'OK',
	          handler: data => {
	            if (this.createSuccess) {
	              //this.navCtrl.popToRoot();
					this.navCtrl.push(LoginPage);
	
	            }
	          }
	        }
	      ]
	    });
	    alert.present();
	  }


}
