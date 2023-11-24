import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrandApplyComponent } from '../../pages/common/brand-apply/brand-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const brandRoutes: Routes = [
  {
    path: 'apply',
    component: BrandApplyComponent,
  },
];

@NgModule({
  declarations: [BrandApplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(brandRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BrandModule {}
