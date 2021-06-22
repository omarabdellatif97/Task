import { ISkill } from "./skill";

export interface IProfile {
  id: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  mobile: string;
  jobTitle: string;
  yearsOfExperience: number;
  previousEmployer: string;
  currentEmployer: string;
  skills: ISkill[];
}
