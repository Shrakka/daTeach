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
        "longDescription": "I don't like you. Neither I like anyone though. But come on, I might be one of the best teachers on Earth and noone care. Not an issue, but Penny said I need to become more philantropic... I am philantropic, but only with superheroes.",
        "askmessage": true,
        "lessons": ["MAT", "PHY"]
      },
      {
        "firstname": "Sigmund",
        "lastname": "Freud",
        "picture": "assets/img/result2.png",
        "shortDescription": "Principal Front End Rock Star ",
        "lessons": ["ENG", "HIS"],
        "longDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "askmessage": false,
      },
      {
        "firstname": "Samuel",
        "lastname": "Oak",
        "picture": "assets/img/result3.png",
        "shortDescription": "Pokemon Go player at Nancy",
        "lessons": ["MAT", "JAP"],
        "longDescription": "That's the power of cards Yugi ! Oh snap, I mixed up the mangas... One day, I will be the Pirate King !!! No, not this one... Well, oh I remember ! Red, go catch all the Pokemon ! In the meantime, I am going to see your mother...",
        "askmessage": true,
      }
    ]
  }

}
