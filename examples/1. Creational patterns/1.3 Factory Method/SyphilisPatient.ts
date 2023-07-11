import { Patient } from './Patient';
import { Pill } from './Pill';
import { MonodoxPill } from './MonodoxPill';

export class SyphilisPatient extends Patient {
  constructor(name: string) {
    super(name);
    this.disease = 'primary syphilis';
    this.symptoms = ['genital chancre', 'inguinal lymphadenopathy'];
  }

  getPill(): Pill {
    return new MonodoxPill();
  }
}
