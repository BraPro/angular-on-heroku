import { __decorate } from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './_modal';
//Mat_Modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HighchartsChartModule } from 'highcharts-angular';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MainComponent } from './main/main.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideComponent } from './main/shared/side/side.component';
import { AlertComponent } from './shared/alert/alert.component';
import { FieldErrorDisplayComponent } from './shared/field-error-display/field-error-display.component';
import { PassValidator } from './validators/pass-validators';
import { PassMatchValidator } from './validators/passmatch-validators';
import { ForgotPasswordComponent } from './login/forgotpassword.component';
import { AllGaragesTableComponent } from './table/allgaragestable.component';
import { GarageTableComponent } from './table/garagetable.component';
import { BrandchartComponent } from './shared/brandchart/brandchart.component';
//services
import { SharedService } from './shared/shared.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            LoginComponent,
            RegisterComponent,
            ContactusComponent,
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
            AllGaragesTableComponent,
            BrandchartComponent,
            GarageTableComponent,
            DialogBoxComponent,
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
        ],
        providers: [SharedService],
        bootstrap: [AppComponent],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map