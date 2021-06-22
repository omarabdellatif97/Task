import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../services/profile-service';
import { IProfile } from '../shared/profile';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.css']
})
export class AllProfilesComponent implements OnInit {

  profiles: IProfile[] = [];
  allProfiles: IProfile[] = [];

  constructor(private service: ProfileService, private notifier: NotifierService) { }

  ngOnInit() {
    this.service.getAllProfiles().subscribe({
      next: profiles => {
        this.profiles = profiles;
        this.allProfiles = profiles
      },
      error: err => this.notifier.notify('error', err.message ? err.message : "Error")
    });
  }

  profileDeleted(): void {
    this.service.getAllProfiles().subscribe({
      next: profiles => this.profiles = profiles,
      error: err => this.notifier.notify('error', err.message ? err.message : "Error")
    });
  }
  searchState: number = 0;
  lastSearchQuery: string = "";
  skillSearch = "";
  titleSearch = "";

  searchTitle() {
    if(this.titleSearch == "" || !this.titleSearch) {
      this.profiles = this.allProfiles
      return;
    }
    this.profiles = this.allProfiles.filter(p => {
      return p.jobTitle.toLowerCase().includes(this.titleSearch.toLowerCase());
    });
    this.searchState = 1;
    this.lastSearchQuery = this.titleSearch;
  }
  searchSkills() {
    if(this.skillSearch == "" || !this.skillSearch) {
      this.profiles = this.allProfiles
      return;
    }
    this.profiles = this.allProfiles.filter(p => {
      return p.skills.map(s => s.skillName).some(s => s.toLowerCase().includes(this.skillSearch.toLowerCase()))
    });
    this.searchState = 2;
    this.lastSearchQuery = this.skillSearch;
  }

  reset() {
    this.searchState = 0;
    this.lastSearchQuery = "";
    this.skillSearch = "";
    this.titleSearch = "";
    this.profiles = this.allProfiles;
  }


}
