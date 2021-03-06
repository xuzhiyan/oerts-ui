import {forwardRef, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy, DatePipe} from '@angular/common';
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
import {TestImproveinfoComponent} from './pages/test-improveinfo/test-improveinfo.component';
import {TestMessageComponent} from './pages/test-message/test-message.component';
import {PathKeyService} from './service/path-key.service';
import {ImagesService} from './service/images.service';
import {OnlineQaService} from './service/online-qa.service';
import {AdministratorService} from './service/administrator.service';
import {ManageUserinfoComponent} from './pages/manage-userinfo/manage-userinfo.component';
import {TestEntryComponent} from './pages/test-entry/test-entry.component';
import {ScoreEntryComponent} from './pages/score-entry/score-entry.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {StrLengthPipe} from './shared/pipe/StrLengthPipe';
import {PayPageComponent} from './pages/pay-page/pay-page.component';
import {TestSuccessinfoComponent} from './pages/test-successinfo/test-successinfo.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ExamPlaceManagementService} from './service/exam-place-management.service';
import {AlertModule} from 'ngx-bootstrap/alert';
import {PlaceEntryComponent} from './pages/place-entry/place-entry.component';
import {TestInfoComponent} from './pages/test-info/test-info.component';
import {ExcelService} from './service/excel.service';
import {PayRechargeComponent} from './pages/pay-recharge/pay-recharge.component';
import {QRCodeModule} from 'angular2-qrcode';
import {AlipayService} from './service/alipay.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    QRCodeModule
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
    TestMessageComponent,
    ManageUserinfoComponent,
    TestEntryComponent,
    ScoreEntryComponent,
    StrLengthPipe,
    PayPageComponent,
    TestSuccessinfoComponent,
    PlaceEntryComponent,
    TestInfoComponent,
    PayRechargeComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ExamManagementService,
    ExamineeService,
    ExamRegistrationService,
    PathKeyService,
    ImagesService,
    OnlineQaService,
    AdministratorService,
    DatePipe,
    ExamPlaceManagementService,
    ExcelService,
    AlipayService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
