import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

	  selectedItem: any;
	  icons: string[];
	  items: Array<{ title: string, note: string, icon: string }>;

	  constructor(public navCtrl: NavController, public navParams: NavParams) {
	    // If we navigated to this page, we will have an item available as a nav param
	    this.selectedItem = navParams.get('item');

	    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
	      'american-football', 'boat', 'bluetooth', 'build'];

	    this.items = [];
	    for (let i = 1; i < 11; i++) {
	      this.items.push({
	        title: 'Item ' + i,
	        note: 'This is item #' + i,
	        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
	      });
	    }
	  }

	  itemTapped(event, item) {
	    this.navCtrl.push(LoginPage, {
	      item: item
	    });
	  }

}
