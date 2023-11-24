import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarConHFLayoutComponent } from './layouts/car-con-hf-layout/car-con-hf-layout.component';
import { HeaderFooterLayoutComponent } from './layouts/header-footer-layout/header-footer-layout.component';
import { AfilioApplyHeaderComponent } from './layouts/header/afilio-apply-header/afilio-apply-header.component';
import { NotFoundComponent } from './pages/common/not-found/not-found.component';
import { HomeComponent } from './pages/common/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'brand',
    component: AfilioApplyHeaderComponent,
    loadChildren: () =>
      import('./routes/lazyMain/brand.module')
        .then((m) => m.BrandModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'career',
    component: CarConHFLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/career.module')
        .then((m) => m.CareerModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'contactus',
    component: CarConHFLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/contactus.module')
        .then((m) => m.ContactusModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'faq',
    component: CarConHFLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/faq.module')
        .then((m) => m.FaqModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./routes/lazyAdmin/admin.module')
        .then((m) => m.AdminModule)
        .catch((e) => console.log(e)),
  },
  {
    path: 'influencer',
    component: HeaderFooterLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/influencer.module')
        .then((m) => m.InfluencerModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'forgotpassword',
    loadChildren: () =>
      import('./routes/lazyMain/forgotpass.module')
        .then((m) => m.ForgotpassModule)
        .catch((e) => console.log(e)),
  },
  {
    path: 'setpassword',
    loadChildren: () =>
      import('./routes/lazyMain/setpass.module')
        .then((m) => m.SetpassModule)
        .catch((e) => console.log(e)),
  },
  {
    path: 'calculator',
    loadChildren: () =>
      import('./routes/lazyMain/calculator.module')
        .then((m) => m.CalculatorModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'calc',
    loadChildren: () =>
      import('./routes/lazyMain/calc.module')
        .then((m) => m.CalcModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'privacy',
    component: HeaderFooterLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/privacy.module')
        .then((m) => m.PrivacyModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'cookie-policy',
    component: HeaderFooterLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/cookie-policy.module')
        .then((m) => m.CookiePolicyModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'how-it-works',
    component: CarConHFLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/how-it-works.module')
        .then((m) => m.HowItWorksModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'terms-condition',
    component: HeaderFooterLayoutComponent,
    loadChildren: () =>
      import('./routes/lazyMain/terms-conditions.module')
        .then((m) => m.TermsConditionsModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'signout',
    loadChildren: () =>
      import('./routes/lazyMain/signout.module')
        .then((m) => m.SignoutModule)
        .catch((err) => console.error(err)),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
