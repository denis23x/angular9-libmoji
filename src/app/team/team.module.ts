import { NgModule } from '@angular/core';

import { CreateComponent } from './create/create.component';
import { InviteComponent } from './invite/invite.component';
import { ControlComponent } from './control/control.component';

import { SharedModule } from '../shared';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule
  ],
  declarations: [
    CreateComponent,
    InviteComponent,
    ControlComponent
  ]
})
export class TeamModule { }
