import { Component } from '@angular/core';

import { fadeInAnimation } from './_animations/index';
import { slideInOutAnimation } from './_animations/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInOutAnimation, fadeInAnimation],

})
export class AppComponent {
  title = 'app';
}
