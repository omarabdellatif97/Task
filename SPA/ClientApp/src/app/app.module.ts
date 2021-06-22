import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AppComponent } from './app.component';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { NotAuthGuard } from './auth/not-auth.guard';
import { NotifierModule } from 'angular-notifier';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AllProfilesComponent,
    ProfileComponent,
    NewProfileComponent,
    ProfileEditComponent,
    ProfileDetailsComponent

  ],
  imports: [
    BrowserModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule
  ],
  providers: [
    AuthGuard,
    NotAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
