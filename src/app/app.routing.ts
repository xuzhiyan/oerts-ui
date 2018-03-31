import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {FullLayoutComponent} from './layouts/full-layout.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {EditPasswordComponent} from './pages/edit-password/edit-password.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'layout', component: FullLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'edit-password', component: EditPasswordComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
