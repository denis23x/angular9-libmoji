import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Snack, SnackbarService } from '../../../core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  snackbar: Snack[] = [];
  subscription$: Subscription;

  constructor(
    private notificationService: SnackbarService
  ) { }

  onNotification(snack: Snack) {
    this.snackbar.push(snack);

    if (snack.timeout !== 0) {
      setTimeout(() => this.onClose(snack), snack.timeout);
    }
  }

  ngOnInit() {
    this.subscription$ = this.notificationService.getObservable().subscribe(snack => this.onNotification(snack));
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onClose(snack: Snack) {
    this.snackbar = this.snackbar.filter(({ id }) => id !== snack.id);
  }

}
