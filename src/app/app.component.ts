import { Component, OnInit } from '@angular/core';
import { fadeRouting } from './app-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [fadeRouting]
})
export class AppComponent implements OnInit {
  constructor(
    // private userService: UserService
  ) { }

  ngOnInit() {
    // this.userService.populate();
  }
}
