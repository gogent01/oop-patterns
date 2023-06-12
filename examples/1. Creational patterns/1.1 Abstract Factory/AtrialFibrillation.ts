import { Patient, GuidelineFactory, Diagnostics, Therapy, FollowUp } from './Abstractions';

export class AtrialFibrillationGuidelineFactory implements GuidelineFactory {
  makeDiagnostics(): Diagnostics {
    return new AtrialFibrillationDiagnostics();
  }

  makeTherapy(): Therapy {
    return new AtrialFibrillationTherapy();
  }

  makeFollowUp(): FollowUp {
    return new AtrialFibrillationFollowUp();
  }
}

class AtrialFibrillationDiagnostics implements Diagnostics {
  explain(): string {
    return 'A screening for atrial fibrillation may be performed with single-lead ECG or with certified smartphone apps. 12-lead ECG and echocardiography are used to confirm the diagnosis.';
  }

  schedule(patient: Patient): void {
    console.log(`Scheduled 12-lead ECG and echocardiography for patient ${patient.fullname}.`);
  }
}

class AtrialFibrillationTherapy implements Therapy {
  prescribe(): string {
    return 'Metoprolol 50 mg twice daily, dabigatran 150 mg twice daily.';
  }

  supply(patient: Patient): void {
    console.log(`Requested from pharmacy for ${patient.fullname}:\n- Metoprolol 50 mg N40\n- Dabigatran 150 mg N40`);
  }
}

class AtrialFibrillationFollowUp implements FollowUp {
  remind(): string {
    return 'Visit a cardiologist twice a year or whenever your symptoms become worse.';
  }

  schedule(patient: Patient): void {
    console.log(`Scheduled a visit to cardiologist for ${patient.fullname}.`);
  }
}
