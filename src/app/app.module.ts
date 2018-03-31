import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AppRoutingModule} from './app.routing';

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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
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
    EditPasswordComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
