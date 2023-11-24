import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorSliderComponent } from '../../pages/common/calculator/calculator-slider/calculator-slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const calcRoutes: Routes = [
  {
    path: '',
    component: CalculatorSliderComponent,
  },
];

@NgModule({
  declarations: [CalculatorSliderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(calcRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CalcModule {}
