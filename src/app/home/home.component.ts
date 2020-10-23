import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AvatarService, UserService } from '../core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {

  apiUrl: string = environment.api_url;

  route$: Subscription;
  login$ = new Subject<any>();

  preview: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private avatarService: AvatarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.onUpdate();

    this.login$.pipe(
      switchMap(body => this.userService.attemptAuth('/login', body)),
      catchError((error, observable) => observable)
    ).subscribe(() => this.router.navigateByUrl('/team/create'));

    this.route$ = this.route.queryParams.subscribe(params => {
      const email = params.email;
      const password = params.password || 'dummy';
      const social = ['googleId'].filter(i => params[i]).map((n) => ({ [n]: params[n] }))[0];

      if (email && social) {
        this.login$.next({ email, password, ...social });
      }
    });
  }

  onUpdate() {
    this.preview = this.avatarService.getRandAvatar();
  }
}
