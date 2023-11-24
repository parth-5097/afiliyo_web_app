import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '../../pages/common/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const contactRoutes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
  },
];

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(contactRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ContactusModule {}
