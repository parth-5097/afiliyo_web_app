import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CareerApplyComponent } from '../../pages/common/career-apply/career-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const careerRoutes: Routes = [
  {
    path: 'apply',
    component: CareerApplyComponent,
  },
];

@NgModule({
  declarations: [CareerApplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(careerRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CareerModule {}
