import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardIsSigned } from './auth-is-signed.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardIsSigned],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
