import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendProvider {
  url: string;
  static: string;
  apikey: string;

  constructor(public http: Http) {
    console.log('Hello BackendProvider Provider');
    this.url = 'http://ec2-54-77-151-59.eu-west-1.compute.amazonaws.com:8080';
    this.apikey = 'VxWSMnBRcTTGXMFRzAoAcyFQLDYZ8pQW';
    this.static = this.url + '/public/photos/';
    // this.url = 'http://localhost:8080';
    // this.url = 'http://10.42.0.1:8080';
    //this.url = 'http://192.168.2.1:8080';
  }
}
export const socketURL = 'http://ec2-54-77-151-59.eu-west-1.compute.amazonaws.com:8080';
// export const socketURL = 'http://10.42.0.1:8080';
// export const socketURL = 'http://192.168.2.1:8080';


