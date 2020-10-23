import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SnackbarService } from '../../core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  inviteForm: FormGroup;
  inviteMembers: FormArray;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.inviteForm = this.fb.group({
      inviteMembers: this.fb.array([this.getEmailInstance()])
    });
  }

  ngOnInit() { }

  getEmailInstance(): FormGroup {
    return this.fb.group({
      email: ['', [ Validators.required, Validators.email ]]
    });
  }

  onAddEmail() {
    this.inviteMembers = this.inviteForm.get('inviteMembers') as FormArray;
    this.inviteMembers.push(this.getEmailInstance());
  }

  onRemoveEmail(index: number) {
    this.inviteMembers = this.inviteForm.get('inviteMembers') as FormArray;
    this.inviteMembers.removeAt(index);
  }

  onSend() {
    this.snackbarService.success('', 'Приглашение отправлены!');
    this.router.navigate(['/team/control']);
  }

}
