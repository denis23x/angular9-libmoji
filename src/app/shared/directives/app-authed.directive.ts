import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../core';

@Directive({
  selector: '[appAuthed]'
})
export class AppAuthedDirective implements OnInit, OnDestroy {
  @Input()
  set appAuthed(condition: boolean) {
    this.condition = condition;
  }

  user$: Subscription;
  condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.user$ = this.userService.isAuthenticated.subscribe(isAuthenticated => {
      const expression = isAuthenticated && this.condition || !isAuthenticated && !this.condition;

      expression ? this.viewContainer.createEmbeddedView(this.templateRef) : this.viewContainer.clear();
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

}
