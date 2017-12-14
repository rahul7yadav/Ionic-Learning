import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

import { ListsubitemPage } from '../listsubitem/listsubitem';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
	lists: Observable<any>;
	selectedItem: any;
	icons: string[];
	items: Array<{id: number, title: string, note: string, icon: string}>;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

  		// If we navigated to this page, we will have an item available as a nav param
	    //this.selectedItem = navParams.get('item');

	    // Let's populate this page with some filler content for funzies
	    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
	    'american-football', 'boat', 'bluetooth', 'build'];

	    // Try to make Dynamic List
	    this.items = [];
	    this.lists = this.httpClient.get('http://localhost/ionic_backend/items.php');
    	this.lists.subscribe(data => {
      		console.log('my data: ', data);
      		data.forEach( (value, key, index) => {
      			this.items.push({
      				id: value.id,
			        title: value.item_name,
			        note: value.item_name+' #' + value.id,
			        icon: value.icon
			      });
				//console.log("This is the value", value);
				//console.log(value['item_name']);
				//console.log(value.item_name);
				//console.log("from the key", key);
				//console.log("Index is", index);
			})
    	});

    	



	    //this.items = [];
	    //for (let i = 0; i < 10; i++) {
	    //  this.items.push({
	    //    title: 'Item ' + i,
	    //    note: 'This is item #' + i,
	    //    icon: this.icons[i]
	    //  });
	    //}
  	
  	}

  	itemTapped(event, item) {
	    // That's right, we're pushing to ourselves!
	    this.navCtrl.push(ListPage, {
	      item: item
	    });
	}

	openSubitems(item) {
	    this.navCtrl.push(ListsubitemPage, {item: item});
	}


  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ListPage');
  	}

}
