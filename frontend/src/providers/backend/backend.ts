import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendProvider {
  url: string;
  apikey: string;

  constructor(public http: Http) {
    console.log('Hello BackendProvider Provider');
    this.url = 'http://ec2-54-77-151-59.eu-west-1.compute.amazonaws.com:8080';
    this.apikey = 'VxWSMnBRcTTGXMFRzAoAcyFQLDYZ8pQW';
  }

}
