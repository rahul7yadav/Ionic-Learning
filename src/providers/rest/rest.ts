import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  	// loginUrl = 'http://localhost/ionic_backend/login.php';
  	// getUrl = 'https://jsonplaceholder.typicode.com';
  	// regUrl = 'http://localhost/ionic_backend/register.php';
  	// logoutUrl = 'http://localhost/ionic_backend/logout.php';
  	ApiUrl = 'http://localhost/passport-laravel/trade/api/';
  	//MainUrl = 'http://localhost/passport-laravel/trade/';	

  	login(credentials) {
	    return new Promise((resolve, reject) => {
	        let headers = new HttpHeaders();
	        headers.append('Content-Type', 'application/json');

	        this.http.post(this.ApiUrl+'login', credentials, {headers: headers})
	          .subscribe(res => {
	            resolve(res);
	            console.log(res);
	          }, (err) => {
	            reject(err);
	          });
	    });
	  }

  	getUsers() {
	  return new Promise(resolve => {
	  	let headers = new HttpHeaders({
	  		'Content-Type': 'application/json',
	  		'Accept': 'application/json',
	  		'Authorization': 'Bearer '+localStorage.getItem('token'),
	  		'X-Auth-Token': localStorage.getItem('token')
	  	});
        //headers.append();
        //console.log('token = '+localStorage.getItem('token'));
        //headers.append();
        //headers.append();
        console.log('headers');
        console.log(headers);
	    this.http.post(this.ApiUrl+'get-details?json=true',localStorage.getItem('token'),{headers: headers}).subscribe(data => {
	      console.log('resolve');
	      console.log(data);
	      resolve(data);
	    }, err => {
	      console.log('err');
	      console.log(err);
	    });
	  });
	}

	Dashboard(){
		return new Promise(resolve => {
		  	let headers = new HttpHeaders({
		  		'Content-Type': 'application/json',
		  		'Accept': 'application/json',
		  		'Authorization': 'Bearer '+localStorage.getItem('token'),
		  		'X-Auth-Token': localStorage.getItem('token')
		  	});
	        //headers.append();
	        //console.log('token = '+localStorage.getItem('token'));
	        //headers.append();
	        //headers.append();
	        // console.log('headers');
	        // console.log(headers);
		    this.http.get(this.ApiUrl+'dashboard?json=true', {headers: headers}).subscribe(data => {
		      // console.log('resolve');
		      // console.log(data);
		      resolve(data);
		    }, err => {
		      //console.log('err');
		      console.log(err);
		    });
		});
	}

	addUser(data) {
	  return new Promise((resolve, reject) => {
	  	let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
	    this.http.post(this.ApiUrl+'register', data, {headers: headers})
	      .subscribe(res => {
	      	console.log('res');
	      	console.log(res);
	        resolve(res);
	      }, (err) => {
	      	console.log('err');
	      	console.log(err);
	        reject(err);
	      });
	  });
	}

	logout(){
	    return new Promise((resolve, reject) => {
	        let headers = new HttpHeaders({
		  		'Content-Type': 'application/json',
		  		'Accept': 'application/json',
		  		'Authorization': 'Bearer '+localStorage.getItem('token'),
		  		'X-Auth-Token': localStorage.getItem('token')
		  	});
	        this.http.post(this.ApiUrl+'logout', localStorage.getItem('token'), {headers: headers})
	          .subscribe(res => {
	          	console.log('logout res');
	          	console.log(res);
	          	localStorage.clear();
	          	resolve(res);

	          }, (err) => {
	          	console.log('logout err');
	            reject(err);
	          });
	    });
	}

}
