import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ProfileService } from '../services/profile-service';
import { IProfile } from '../shared/profile';

@Component({
  selector: '[app-profile]',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Output() profileDeleted = new EventEmitter();
  @Input() profile: IProfile | null;

  constructor(private service: ProfileService, private notifier: NotifierService) { }

  ngOnInit() { }

  delete() {
    if (this.profile) {
      this.service.deleteProfile(this.profile.id).subscribe({
        next: obj => {
          this.profileDeleted.emit();
        },
        error: err => this.notifier.notify('error', err)
      });
    }
  }

}
