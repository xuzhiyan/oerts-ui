import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {EditPasswordComponent} from './pages/edit-password/edit-password.component';
import {TestRegistrationComponent} from './pages/test-registration/test-registration.component';
import {TestPayComponent} from './pages/test-pay/test-pay.component';
import {TestCompleteComponent} from './pages/test-complete/test-complete.component';
import {ScoreInquiryComponent} from './pages/score-inquiry/score-inquiry.component';
import {ScoreDetailsComponent} from './pages/score-details/score-details.component';
import {EditPersoninfComponent} from './pages/edit-personinf/edit-personinf.component';
import {OnlineQaComponent} from './pages/online-qa/online-qa.component';
import {RegistComponent} from './regist/regist.component';
import {TestDetailsComponent} from './pages/test-details/test-details.component';
import {LoginGuard} from './shared/guard/login.guard';
import {Pages404Component} from './pages/pages-404/pages-404.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'regist', component: RegistComponent},
  {
    path: 'layout', component: FullLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'test-registration', component: TestRegistrationComponent},
      {path: 'test-pay', component: TestPayComponent},
      {path: 'test-complete', component: TestCompleteComponent},
      {path: 'score-inquiry', component: ScoreInquiryComponent},
      {path: 'score-details', component: ScoreDetailsComponent},
      {path: 'edit-persioninf', component: EditPersoninfComponent},
      {path: 'edit-password', component: EditPasswordComponent},
      {path: 'online-qa', component: OnlineQaComponent},
      {path: 'test-details/:id', component: TestDetailsComponent}
    ], canActivate: [LoginGuard]
  },
  {path: '**', component: Pages404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule {
}
