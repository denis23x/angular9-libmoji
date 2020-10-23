import { Component, OnInit } from '@angular/core';

import { AvatarService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  preview: string;

  constructor(
    private avatarService: AvatarService
  ) { }

  ngOnInit() {
    this.onUpdate();
  }

  onUpdate() {
    this.preview = this.avatarService.getRandAvatar();
  }
}
