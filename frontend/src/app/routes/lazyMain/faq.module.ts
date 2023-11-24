import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FaqComponent } from '../../pages/common/faq/faq.component';

const faqRoutes: Routes = [
  {
    path: '',
    component: FaqComponent,
  },
];

@NgModule({
  declarations: [FaqComponent],
  imports: [CommonModule, RouterModule.forChild(faqRoutes)],
})
export class FaqModule {}
