import { Patient } from './Patient';
import { Pill } from './Pill';
import { ChemetPill } from './ChemetPill';

export class AcuteLeadPoisoningPatient extends Patient {
  constructor(name: string) {
    super(name);
    this.disease = 'acute lead poisoning';
    this.symptoms = ['abdominal pain', 'diarrhea', 'vomiting', 'muscle weakness'];
  }

  getPill(): Pill {
    return new ChemetPill();
  }
}
