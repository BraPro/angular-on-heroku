import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { AuthGuard } from './_helpers';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component'


const routes: Routes = [
    { path: '', component: LoginComponent, canActivate:[AuthGuard] },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'main', component: MainComponent },
    { path: 'main-treat', component: MainComponent },
    { path: 'main-map', component: MainComponent },
    { path: 'main-users', component: MainComponent},
    { path: 'account', component: AccountComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }