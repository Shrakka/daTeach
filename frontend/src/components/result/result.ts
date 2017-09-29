import { Component, Input } from '@angular/core';

@Component({
  selector: 'result',
  templateUrl: 'result.html'
})
export class ResultComponent {
  @Input() firstname: string;
  @Input() lastname: string;
  @Input() picture: string;
  @Input() shortDescription: string;
  @Input() lessons: any;

  constructor() {
  }

}
