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
    this.placeholder = "";
    this.result = this.navParams.get('result');
  }

  ionViewDidLoad() {
  }

  sendMessage() {
    this.discussionProvider.postDiscussion({user1: this.userProvider.user.id, user2: this.result.user.id, lesson: this.result.lesson._id, message: 'First message'})
    this.lessonProvider.addPeople({people: this.userProvider.user.id, role: (this.result.lesson.teachers.includes(this.result.user.id)) ? 'student' : 'teacher'}, this.result.lesson._id)
    const alert = this.alertCtrl.create({
      title: 'Message sent',
      message: this.result.user.public.firstname + ' will certainly contact you soon. You will be notified.',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            this.comment = "";
            this.placeholder = "You can still send 1 more message to " + this.result.user.public.firstname;

            console.log('OK clicked');
          }
        }],
    })
    alert.present();
  }

}
