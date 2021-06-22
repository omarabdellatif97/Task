import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProfile } from "../shared/profile";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators"
import { AppConsts } from "../app-consts";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = `${AppConsts.apiUrl}/api/profiles`;
  constructor(private http: HttpClient) { }

  getAllProfiles(): Observable<IProfile[]> {
    return this.http.get<IProfile[]>(this.url);
  }

  getProfileById(id: number) {
    return this.http.get<IProfile>(`${this.url}/${id}`);
  }

  addProfile(profile: IProfile) {
    return this.http.post(`${this.url}`, profile);
  }

  deleteProfile(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  updateProfile(profile: IProfile) {
    return this.http.put(`${this.url}/${profile.id}`, profile);
  }

}
