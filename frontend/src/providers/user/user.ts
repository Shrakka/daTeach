import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  firstname: string;
  lastname: string;
  age: number;
  picture: string;
  sex: string;
  email: string;
  phone: string;
  shortDescription: string;
  longDescription: string;
  level: string;
  isAuth: boolean;


  constructor(public http: Http) {
    this.load();
  }

  load() {
    this.firstname = 'Jon';
    this.lastname = 'Snow';
    this.age = 25;
    this.picture = '../../assets/img/profile.png';
    this.sex = 'M';
    this.email = 'j.snow@winterfell.com';
    this.phone = '01 23 45 67 89';
    this.shortDescription = 'Knower of nothing';
    this.longDescription = 'Long Description...'
    this.level = 'Bac+3';
    this.isAuth = true;
  }

}
