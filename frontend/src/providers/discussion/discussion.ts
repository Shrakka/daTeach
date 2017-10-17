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
  inactiveDiscussions;
  activeDiscussions;

  constructor(public http: Http, public userProvider: UserProvider, public backendProvider: BackendProvider) {
    console.log('Hello DiscussionProvider Provider');
    this.inactiveDiscussions = [];
    this.activeDiscussions = [];
  }

  postDiscussion(body) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.post(this.backendProvider.url + '/discussion/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
        });
    });
  }

  getUserDiscussions(id: string) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.get(this.backendProvider.url + '/discussion/user/' + id + '/?apikey=' + this.backendProvider.apikey, options)
        .map(res => res.json())
        .subscribe(data => {
          for (var discussion of data) {
            if (discussion.discussion.messages.length == 1) {
              this.inactiveDiscussions.push(discussion);
            }
            else {
              this.activeDiscussions.push(discussion);
            }
          }
        });
    });
  }

}
