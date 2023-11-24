import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InfluencerApplyComponent } from '../../pages/common/influencer-apply/influencer-apply.component';
import { InfApplyComponent } from '../../pages/common/influencer-apply/inf-apply/inf-apply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const influencerRoutes: Routes = [
  {
    path: 'apply',
    component: InfluencerApplyComponent,
  },
  {
    path: 'infapply',
    component: InfApplyComponent,
  },
];

@NgModule({
  declarations: [InfluencerApplyComponent, InfApplyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(influencerRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InfluencerModule {}
