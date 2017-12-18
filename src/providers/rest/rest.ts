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

  	loginUrl = 'http://localhost/ionic_backend/login.php';
  	getUrl = 'https://jsonplaceholder.typicode.com';
  	regUrl = 'http://localhost/ionic_backend/register.php';
  	logoutUrl = 'http://localhost/ionic_backend/logout.php';
  	
  	login(credentials) {
	    return new Promise((resolve, reject) => {
	        let headers = new HttpHeaders();
	        headers.append('Content-Type', 'application/json');

	        this.http.post(this.loginUrl, JSON.stringify(credentials), {headers: headers})
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
	    this.http.get(this.getUrl+'/users').subscribe(data => {
	      resolve(data);
	    }, err => {
	      console.log(err);
	    });
	  });
	}

	addUser(data) {
	  return new Promise((resolve, reject) => {
	    this.http.post(this.regUrl, JSON.stringify(data))
	      .subscribe(res => {
	        resolve(res);
	      }, (err) => {
	        reject(err);
	      });
	  });
	}

	logout(){
	    return new Promise((resolve, reject) => {
	        let headers = new HttpHeaders();
	        console.log('get Token');
	        console.log(localStorage.getItem('token'));
	        headers.append('X-Auth-Token', localStorage.getItem('token'));

	        this.http.post(this.logoutUrl, {}, {headers: headers})
	          .subscribe(res => {
	          	console.log('logout res');
	          	console.log(res);
	          	localStorage.clear();
	          	resolve(res);

	          }, (err) => {
	            reject(err);
	          });
	    });
	}

}
