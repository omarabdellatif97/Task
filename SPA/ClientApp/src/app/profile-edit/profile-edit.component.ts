import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../services/profile-service';
import { IProfile } from '../shared/profile';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile: IProfile = {
    id: 0,
    birthDate: null,
    currentEmployer: "",
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    jobTitle: "",
    skills: [],
    previousEmployer: "",
    yearsOfExperience: 0
  }

  id: number = 0;
  constructor(private notifier: NotifierService, private service: ProfileService, private router: Router, private myRoute: ActivatedRoute) {
    this.id = myRoute.snapshot.params.id;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.notifier.notify('error', 'All Fieled Are Required');
      return;
    }
    this.service.updateProfile(this.profile).subscribe({
      next: obj => {
        this.router.navigate(['/profiles']);
      },
      error: err => this.notifier.notify('error', err.message ? err.message : "Error")
    });
  }

  ngOnInit() {
    this.service.getProfileById(this.id).subscribe({
      next: profile => {
        this.profile = profile;
      },
      error: err => this.notifier.notify('error', err.message ? err.message : "Error")
    })
  }
}
