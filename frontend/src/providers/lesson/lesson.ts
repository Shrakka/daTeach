import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BackendProvider } from '../backend/backend';
import { UserProvider } from '../user/user';
import { RequestOptions } from '@angular/http';

/*
  Generated class for the LessonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LessonProvider {
  results = [];
  request;
  lessons = [];
  topics;

  constructor(public http: Http, public userProvider: UserProvider, public backendProvider: BackendProvider) {
  }

  postLesson(form) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      var students = (form.role === 'student') ? [this.userProvider.user.id] : [];
      var teachers = (form.role === 'teacher') ? [this.userProvider.user.id] : [];
      var body = {author: {id: this.userProvider.user.id, role: form.role}, students: students, teachers: teachers, topics: form.topics, location: form.location, moving: form.moving, dates: form.dates, type: form.type, active: true};
      this.http.post(this.backendProvider.url + '/lesson/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
        });
    });
  }

  postLessonRequest(form) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.request = {role: form.role, location: form.location, moving: form.moving, dates: form.dates, type: form.type, topics: form.topics};
      console.log(this.request)
      this.http.post(this.backendProvider.url + '/lesson/request/?apikey=' + this.backendProvider.apikey, this.request, options)
        .map(res => res.json())
        .subscribe(data => {
          this.results = data
          for (let result of this.results) {
            result.user.public.age = this.userProvider.getAge(result.user.public.birthyear)
          }
          console.log(this.results)
        });
    });
  }

  getUserLessons(id: string) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.get(this.backendProvider.url + '/lesson/user/' + id + '/?apikey=' + this.backendProvider.apikey, options)
        .map(res => res.json())
        .subscribe(data => {
          this.lessons = data
          for (let lesson of this.lessons) {
            for (let user of lesson.users) {
              user.public.age = this.userProvider.getAge(user.public.birthyear)
            }
          }
          console.log(this.lessons)
        });
    });
  }

  addPeople(body, id) {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.put(this.backendProvider.url + '/lesson/' + id + '/?apikey=' + this.backendProvider.apikey, body, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
        });
    });
  }

  desactivate(id) {
    this.lessons.map(lesson => {
      if(lesson.id === id){
        lesson.active = false;
      }}
    )
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.put(this.backendProvider.url + '/lesson/' + id + '/?apikey=' + this.backendProvider.apikey, {active: false}, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
        });
    });
  }

  deleteLesson(id) {
    let index = this.lessons.findIndex( lesson => {
      return lesson.id === id;
    })
    console.log(index);
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.delete(this.backendProvider.url + '/lesson/' + id + '/?apikey=' + this.backendProvider.apikey, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
        });
    });
  }

  getTopics() {
    return new Promise(resolve => {
      var options = new RequestOptions({withCredentials: true});
      this.http.get(this.backendProvider.url + '/lesson/topics/?apikey=' + this.backendProvider.apikey, options)
        .map(res => res.json())
        .subscribe(data => {
          //console.log(data);
          this.topics = data
        });
      });
    }
}
