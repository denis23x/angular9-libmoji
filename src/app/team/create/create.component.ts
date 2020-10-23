import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService, SnackbarService, User } from '../../core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private avatarsUrl = environment.avatar_url;

  leaderForm: FormGroup;
  user$: User = this.userService.getCurrentUser();

  preview: string;
  loading = false;

  constructor(
    private avatarService: AvatarService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {
    this.leaderForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      gender: [0, [ Validators.required ]]
    });
  }

  ngOnInit() {
    this.leaderForm.get('name').setValue(this.user$.name);

    if (this.user$.avatar) {
      this.preview = this.avatarsUrl + '/' + this.user$.avatar;
    } else {
      this.preview = this.avatarService.getRandAvatar(this.leaderForm.get('gender').value);
    }
  }

  onSubmitForm() {
    this.loading = true;
    this.preview = this.avatarService.getRandAvatar(this.leaderForm.get('gender').value);
  }

  onContinue() {
    this.userService.update(Object.assign(
      this.leaderForm.value, { avatar: this.preview }
    )).subscribe(() => {
      this.snackbarService.success('', 'Данные обновлены');
      this.router.navigate(['/team/invite']);
    });
  }

}
