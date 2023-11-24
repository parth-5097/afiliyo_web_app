import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VerifypasswordComponent } from '../../pages/common/verifypassword/verifypassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const verifyRoutes: Routes = [
  {
    path: '',
    component: VerifypasswordComponent,
  },
];

@NgModule({
  declarations: [VerifypasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(verifyRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SetpassModule {}
