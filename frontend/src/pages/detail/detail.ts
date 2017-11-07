import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LessonProvider } from '../../providers/lesson/lesson';
import { DiscussionProvider } from '../../providers/discussion/discussion';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  result: any;
  comment: string;
  placeholder: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public lessonProvider: LessonProvider, public discussionProvider: DiscussionProvider, public userProvider: UserProvider) {
    this.comment = "";
    this.result = this.navParams.get('result');
    this.placeholder = this.result.user.public.askmessage ? 'Write a short message to ' + this.result.user.public.firstname+ ' to present you and explain what you are looking for' : 'Hi '+ this.result.user.public.firstname + ', I am interesting in your announce';
  }

  ionViewDidLoad() {
  }

  sendMessage() {
    this.discussionProvider.postDiscussion({user1: this.userProvider.user.id, user2: this.result.user.id, lesson: this.result.lesson._id, message: this.comment})
    this.lessonProvider.addPeople({people: this.userProvider.user.id, role: (this.result.lesson.teachers.includes(this.result.user.id)) ? 'student' : 'teacher'}, this.result.lesson._id)
    const alert = this.alertCtrl.create({
      title: 'Message sent',
      message: 'Your message has been sent successfully to ' + this.result.user.public.firstname + '. He will certainly contact you soon and you will be notified.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }],
    })
    alert.present();
  }

  goToLogin(){
    this.navCtrl.push('LoginPage');
  }

}
