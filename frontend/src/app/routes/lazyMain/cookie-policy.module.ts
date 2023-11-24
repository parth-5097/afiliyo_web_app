import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CookiePolicyComponent } from 'src/app/pages/common/cookie-policy/cookie-policy.component';

const routes: Routes = [
  {
    path: '',
    component: CookiePolicyComponent,
  },
];

@NgModule({
  declarations: [CookiePolicyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CookiePolicyModule {}
