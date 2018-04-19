import {forwardRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {NAV_DROPDOWN_DIRECTIVES} from './shared/nav-dropdown.directive';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {SIDEBAR_TOGGLE_DIRECTIVES} from './shared/sidebar.directive';
import {AsideToggleDirective} from './shared/aside.directive';
import {BreadcrumbsComponent} from './shared/breadcrumb.component';

import {AppComponent} from './app.component';
import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {EditPasswordComponent} from './pages/edit-password/edit-password.component';
import {EditPersoninfComponent} from './pages/edit-personinf/edit-personinf.component';
import {ScoreInquiryComponent} from './pages/score-inquiry/score-inquiry.component';
import {ScoreDetailsComponent} from './pages/score-details/score-details.component';
import {TestCompleteComponent} from './pages/test-complete/test-complete.component';
import {TestPayComponent} from './pages/test-pay/test-pay.component';
import {TestRegistrationComponent} from './pages/test-registration/test-registration.component';
import {OnlineQaComponent} from './pages/online-qa/online-qa.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistComponent} from './regist/regist.component';
import {ExamManagementService} from './service/exam-management.service';
import {TestDetailsComponent} from './pages/test-details/test-details.component';
import {ExamineeService} from './service/examinee.service';
import {Pages404Component} from './pages/pages-404/pages-404.component';
import {ExamRegistrationService} from './service/exam-registration.service';
import { TestImproveinfoComponent } from './pages/test-improveinfo/test-improveinfo.component';
import { TestMessageComponent } from './pages/test-message/test-message.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    AppComponent,
    FullLayoutComponent,
    LoginComponent,
    HomeComponent,
    EditPasswordComponent,
    EditPersoninfComponent,
    ScoreInquiryComponent,
    ScoreDetailsComponent,
    TestCompleteComponent,
    TestPayComponent,
    TestRegistrationComponent,
    OnlineQaComponent,
    RegistComponent,
    TestDetailsComponent,
    Pages404Component,
    TestImproveinfoComponent,
    TestMessageComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ExamManagementService,
    ExamineeService,
    ExamRegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
