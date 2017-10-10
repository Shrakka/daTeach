# MASProject

## Introduction

This is the repository of the mobile app project of the class Mobile Apps & Services (Georgia Tech). The developers are:
* Alexis Lozano
* Enzo Testa
* Arnaud Yankwa

## Backend

#### How to use

* Install dependencies: `npm install`
* Run server (last for live reload): `npm run dev` or `nodemon server.js`

#### Documentation

* [**Tuto** : Build a RESTful API with node](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
* [**Tuto** : Authentication with node](https://scotch.io/tutorials/easy-node-authentication-setup-and-local)
* [**Doc** : Passport (auth library)](http://passportjs.org/docs)
* [**Doc** : Mongoose (db library)](http://mongoosejs.com/docs/guide.html)

#### Routes

##### Auth

| HTML word | Route | Data | Need logged | Return |
| --- | --- | --- | --- | --- |
| POST | `/login` | `{email, password}` | no | User |
| POST | `/signup` | `{email, password, firstname, lastname, birthyear, gender}` | no | User |
| POST | `/facebook` | Facebook data | no | User |

##### User

| HTML word | Route | Data | Need logged | Return |
| --- | --- | --- | --- | --- |
| GET | `/user` | ... | no | [User] |
| GET | `/user/:id` | ... | no | User |

##### Discussion

| HTML word | Route | Data | Need logged | Return |
| --- | --- | --- | --- | --- |
| GET | `/discussion/:id` | ... | yes | Discussion |
| GET | `/discussion/user/:id` | ... | yes | [{Discussion, User}] |
| POST | `/discussion` | `{user1, user2}` | yes | Discussion |

##### Needs

| HTML word | Route | Data | Need logged | Return |
| --- | --- | --- | --- | --- |
| ... | ... | ... | ... | ... |

## Database

#### How to use

* Run: `mongod --dbpath=database`
* Command line: `mongo`

#### Documentation

* [**Tuto & Doc** : Mongo on Tutorialspoint](https://www.tutorialspoint.com/mongodb/)

## Frontend

#### How to use

* Install dependencies: `npm install`
* Run server: `ionic serve`
* Run server (Android): `ionic cordova run android -l -c`

#### Documentation

* [**Doc** : Ionic](http://ionicframework.com/docs/)
* [**Doc** : Angular](https://angular.io/docs)

#### Custom components

| Name | Inputs | Outputs |
| --- | --- | --- |
| calendar | mode | dates |
| footer | ... | ... |
| header | ... | ... |
| message-card | message | ... |
| profile-banner | firstname, lastname, picture, shortDescription | ... |
| result | result, mode | ... |
