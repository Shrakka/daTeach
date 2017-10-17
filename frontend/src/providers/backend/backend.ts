import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendProvider {
  url: string;
  apikey: string;

  constructor(public http: Http) {
    console.log('Hello BackendProvider Provider');
    this.url = 'http://localhost:8080';
    this.apikey = 'VxWSMnBRcTTGXMFRzAoAcyFQLDYZ8pQW';
  }

}
