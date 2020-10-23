import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { InviteComponent } from './invite/invite.component';
import { ControlComponent } from './control/control.component';
import { AuthGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/team/control',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'invite',
    component: InviteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'control',
    component: ControlComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
