import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appVariable]'
})
export class AppVariableDirective {
  @Input()
  set appVariable(context: any) {
    this.context.$implicit = this.context.appVariable = context;
    this.updateView();
  }

  context: any = {};

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  updateView(): void {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }

}
