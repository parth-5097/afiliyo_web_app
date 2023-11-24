import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TermsConditionComponent } from 'src/app/pages/common/terms-condition/terms-condition.component';

const routes: Routes = [
  {
    path: '',
    component: TermsConditionComponent,
  },
];

@NgModule({
  declarations: [TermsConditionComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class TermsConditionsModule {}
