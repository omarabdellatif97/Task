import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../services/profile-service';
import { IProfile } from '../shared/profile';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  id: number = 0;
  profile: IProfile | null = null;
  constructor(private service: ProfileService, private myRoot: ActivatedRoute,private notifier: NotifierService) {
    this.id = myRoot.snapshot.params.id;
  }



  ngOnInit(): void {
    this.service.getProfileById(this.id).subscribe({
      next: profile => this.profile = profile,
      error: err => err => this.notifier.notify('error', err.message ? err.message : "Error")
    })
  }

}
