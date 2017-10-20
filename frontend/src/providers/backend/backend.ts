import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
