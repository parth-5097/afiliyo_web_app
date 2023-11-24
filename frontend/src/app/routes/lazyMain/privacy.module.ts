import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from '../../pages/common/privacy-policy/privacy-policy.component';

const privacyRoutes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent,
  },
];

@NgModule({
  declarations: [PrivacyPolicyComponent],
  imports: [CommonModule, RouterModule.forChild(privacyRoutes)],
})
export class PrivacyModule {}
