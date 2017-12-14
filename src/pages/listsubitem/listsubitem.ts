import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ListsubitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listsubitem',
  templateUrl: 'listsubitem.html',
})
export class ListsubitemPage {
	parent: any;	
  lists: Observable<any>;
  selectedItem: any;
  icons: string[];
  items: Array<{id: number, title: string, note: string, icon: string}>;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) {

  		//this.parent = this.navParams.get('parent');
      this.parent = navParams.get('item');
      console.log('rahul');
  		console.log(this.parent);
      // Try to make Dynamic List
      this.items = [];
      this.lists = this.httpClient.get('http://localhost/ionic_backend/items.php?parent='+this.parent.id);
      this.lists.subscribe(data => {
          console.log('my data: ', data);
          data.forEach( (value, key, index) => {
            this.items.push({
              id: value.id,
              title: value.item_name,
              note: value.item_name+' #' + value.id,
              icon: value.icon
            });
          
        })
      });

  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ListsubitemPage');
  	}

}
