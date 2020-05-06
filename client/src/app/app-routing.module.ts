import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { AuthGuard } from './_helpers';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component'


const routes: Routes = [
    { path: '', component: LoginComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
    { path: 'register', component: RegisterComponent, canActivate:[AuthGuard] },
    { path: 'main', component: MainComponent, canActivate:[AuthGuard] },
    { path: 'main-treat', component: MainComponent, canActivate:[AuthGuard] },
    { path: 'main-map', component: MainComponent, canActivate:[AuthGuard] },
    { path: 'main-users', component: MainComponent, canActivate:[AuthGuard] },
    { path: 'account', component: AccountComponent, canActivate:[AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }