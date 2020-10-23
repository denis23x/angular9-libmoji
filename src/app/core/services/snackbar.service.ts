import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Snack } from '../models';

@Injectable()
export class SnackbarService {
  private id = 0;
  private subject = new Subject<Snack>();

  getObservable(): Observable<Snack> {
    return this.subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this.subject.next({ id: this.id++, class: 'alert-info', title, message, timeout });
  }

  success(title: string, message: string, timeout = 3000) {
    this.subject.next({ id: this.id++, class: 'alert-success', title, message, timeout });
  }

  warning(title: string, message: string, timeout = 5000) {
    this.subject.next({ id: this.id++, class: 'alert-warning', title, message, timeout });
  }

  error(title: string, message: string, timeout = 5000) {
    this.subject.next({ id: this.id++, class: 'alert-danger', title, message, timeout });
  }

}
