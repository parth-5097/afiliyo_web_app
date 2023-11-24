import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from '../../pages/common/calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const calcRoutes: Routes = [
  {
    path: '',
    component: CalculatorComponent,
  },
];

@NgModule({
  declarations: [CalculatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(calcRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CalculatorModule {}
