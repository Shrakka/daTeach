import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http';
import { UserProvider } from '../user/user';
import { BackendProvider } from '../backend/backend';

/*
  Generated class for the DiscussionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DiscussionProvider {
  discussions;

  constructor(public http: Http, public userProvider: UserProvider, public backendProvider: BackendProvider) {
    console.log('Hello DiscussionProvider Provider');
  }

  getUserDiscussions(id: string) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.get(this.backendProvider.url + '/discussion/user/' + id + '/?apikey=' + this.backendProvider.apikey, options)
        .map(res => res.json())
        .subscribe(data => {
          this.discussions = data
        });
    });
  }

}
