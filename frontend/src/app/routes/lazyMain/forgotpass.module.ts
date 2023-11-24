import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from '../../pages/common/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const forgotRoutes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(forgotRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ForgotpassModule {}
