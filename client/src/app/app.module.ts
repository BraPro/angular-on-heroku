import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modules
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './_modal';


  //Mat_Modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule}  from '@angular/material/icon';
import { MatListModule}  from '@angular/material/list';
import { MatButtonModule}  from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';


//Components
import { AlertHeaderComponent } from './shared/alert/alert-header.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component'
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideComponent } from './shared/side/side.component';
import { AlertComponent } from './shared/alert/alert.component';
import { FieldErrorDisplayComponent } from './shared/field-error-display/field-error-display.component';
import { PassValidator } from './validators/pass-validators'
import { PassMatchValidator } from './validators/passmatch-validators'
import { ForgotPasswordComponent } from './login/forgotpassword.component';
import { InfoCardComponent } from './table/info-card.component';
import { GarageTableComponent } from './table/garagetable.component';
import { UserTableComponent } from './table/usertable.component';
import { BrandchartComponent } from './shared/brandchart/brandchart.component'
import { MapComponent } from './shared/map/map.component'


//services
import { SharedService } from './shared/shared.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarDialogBoxComponent } from './main/dialog-box/car-dialog-box.component';
import { UserDialogBoxComponent } from './main/dialog-box/user-dialog-box.component';
import { MapDialogBoxComponent } from './main/dialog-box/map-dialog-box.component';


  
@NgModule({
	declarations: [
    AlertHeaderComponent,
		AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    AccountComponent,
    AlertComponent,
		FooterComponent,
    HeaderComponent,
    SideComponent,
    FieldErrorDisplayComponent,
    PassValidator,
    PassMatchValidator,
    ForgotPasswordComponent,
    InfoCardComponent,
    UserTableComponent,
    BrandchartComponent,
    GarageTableComponent,
    CarDialogBoxComponent,
    UserDialogBoxComponent,
    MapDialogBoxComponent,
    MapComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    NgbModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    HighchartsChartModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent],
})
export class AppModule { }
