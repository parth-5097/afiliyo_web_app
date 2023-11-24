import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from '../../pages/common/signout/signout.component';

const signoutRoutes: Routes = [
  {
    path: '',
    component: SignoutComponent,
  },
];

@NgModule({
  declarations: [SignoutComponent],
  imports: [CommonModule, RouterModule.forChild(signoutRoutes)],
})
export class SignoutModule {}
