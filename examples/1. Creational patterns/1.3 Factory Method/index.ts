import { Patient } from './Patient';
import { AcuteLeadPoisoningPatient } from './AcuteLeadPoisoningPatient';
import { SyphilisPatient } from './SyphilisPatient';

const acuteLeadPoisoningPatient: Patient = new AcuteLeadPoisoningPatient('Helen');
const syphilisPatient: Patient = new SyphilisPatient('David');

const patients: Patient[] = [acuteLeadPoisoningPatient, syphilisPatient];
for (const patient of patients) {
  patient.introduce();
  patient.showSymptoms();
  patient.getTreatment();
}
