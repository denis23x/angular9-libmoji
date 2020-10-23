import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

  apiUrl: string = environment.api_url;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() { }

  onLogout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
