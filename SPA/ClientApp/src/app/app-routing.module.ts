import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/not-auth.guard';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { NewProfileComponent } from './new-profile/new-profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/profiles', pathMatch: 'full' },
  {
    path: 'profiles',
    component: AllProfilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profiles/add',
    component: NewProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NotAuthGuard]
  },
  { path: 'profiles/details/:id', component: ProfileDetailsComponent, canActivate: [AuthGuard] },
  { path: 'profiles/edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
