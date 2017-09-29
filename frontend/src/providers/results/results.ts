import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ResultsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultsProvider {
  results: any;

  constructor(public http: Http) {
    this.load();
  }

  load() {
    this.results = [
      {
        "firstname": "Dave"
      }
    ]
  }

}
