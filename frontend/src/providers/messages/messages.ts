import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MessagesProvider {
  messages: any;

  constructor(public http: Http) {
    this.load();
  }

  load() {
    this.messages = [
      {
        "firstname": "Sheldon",
        "lastname": "Cooper",
        "picture": "assets/img/result1.png",
        "lessons": ["MAT", "PHY"],
        "messages": [
          {
            "user": "me",
            "message": "Hi Sheldon, I'm very interested taking lessons with you, are you available?"
          }
        ]
      },
      {
        "firstname": "Samuel",
        "lastname": "Oak",
        "picture": "assets/img/result3.png",
        "shortDescription": "Pokemon Go player at Nancy",
        "lessons": ["MAT", "JAP"],
        "messages": [
          {
            "user": "me",
            "message": "Hi Samuel!"
          },
          {
            "user": "me",
            "message": "How are you? I would like to take a lesson with you."
          },
          {
            "user": "you",
            "message": "Fine, thanks for asking, actually I'm only available on Tuesday"
          },
          {
            "user": "me",
            "message": "Seems great for me!"
          },
          {
            "user": "me",
            "message": "Here's my phone number: 01 23 45 67 89"
          },
          {
            "user": "me",
            "message": "Feel free to call to schedule a lesson! See ya!"
          },
          {
            "user": "you",
            "message": "Calling you soon ;)"
          }
        ]
      }
    ]
  }

}
