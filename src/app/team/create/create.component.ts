import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../core/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  leaderForm: FormGroup;

  preview: string;
  loading = true;

  constructor(
    private avatarService: AvatarService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.leaderForm = this.fb.group({
      name: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      gender: [0, [ Validators.required ]]
    });
  }

  ngOnInit() {
    this.preview = this.avatarService.getRandAvatar();
  }

  onSubmitForm() {
    this.loading = true;
    this.preview = this.avatarService.getRandAvatar(this.leaderForm.get('gender').value);
  }

  onContinue() {
    this.router.navigate(['/team/invite']);
  }
}
