import { Component, Input } from '@angular/core';

/**
 * Generated class for the LessonCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'lesson-card',
  templateUrl: 'lesson-card.html'
})
export class LessonCardComponent {
  @Input() lesson;

  constructor() {
  }

}
