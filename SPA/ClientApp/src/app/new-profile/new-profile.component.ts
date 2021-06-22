import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../services/profile-service';
import { IProfile } from '../shared/profile';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {

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


  constructor(private notifier: NotifierService, private service: ProfileService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.notifier.notify('error', 'All Fieled Are Required');
      return;
    }
    this.service.addProfile(this.profile).subscribe({
      next: obj => {
        this.router.navigate(['/profiles']);
      },
      error: err => this.notifier.notify('error', err.message ? err.message : "Error")
    });
  }

  ngOnInit() {
  }

}
