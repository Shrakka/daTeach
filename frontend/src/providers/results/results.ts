import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ResultsProvider {
  results: any;

  constructor(public http: Http) {
    this.load();
  }

  load() {
    this.results = [
      {
        "firstname": "Sheldon",
        "lastname": "Cooper",
        "picture": "assets/img/result1.png",
        "shortDescription": "Theoretical physicist at Caltech",
        "lessons": ["MAT", "PHY"]
      },
      {
        "firstname": "Sigmund",
        "lastname": "Freud",
        "picture": "assets/img/result2.png",
        "shortDescription": "Principal Front End Rock Star ",
        "lessons": ["ENG", "HIS"]
      },
      {
        "firstname": "Samuel",
        "lastname": "Oak",
        "picture": "assets/img/result3.png",
        "shortDescription": "Pokemon Go player at Nancy",
        "lessons": ["MAT", "JAP"]
      },
      {
        "firstname": "Sheldon",
        "lastname": "Cooper",
        "picture": "assets/img/result1.png",
        "shortDescription": "Theoretical physicist at Caltech",
        "lessons": ["MAT", "PHY"]
      },
      {
        "firstname": "Sigmund",
        "lastname": "Freud",
        "picture": "assets/img/result2.png",
        "shortDescription": "Principal Front End Rock Star ",
        "lessons": ["ENG", "HIS"]
      },
      {
        "firstname": "Samuel",
        "lastname": "Oak",
        "picture": "assets/img/result3.png",
        "shortDescription": "Pokemon Go player at Nancy",
        "lessons": ["MAT", "JAP"]
      },
      {
        "firstname": "Sheldon",
        "lastname": "Cooper",
        "picture": "assets/img/result1.png",
        "shortDescription": "Theoretical physicist at Caltech",
        "lessons": ["MAT", "PHY"]
      },
      {
        "firstname": "Sigmund",
        "lastname": "Freud",
        "picture": "assets/img/result2.png",
        "shortDescription": "Principal Front End Rock Star ",
        "lessons": ["ENG", "HIS"]
      },
      {
        "firstname": "Samuel",
        "lastname": "Oak",
        "picture": "assets/img/result3.png",
        "shortDescription": "Pokemon Go player at Nancy",
        "lessons": ["MAT", "JAP"]
      }
    ]
  }

}
