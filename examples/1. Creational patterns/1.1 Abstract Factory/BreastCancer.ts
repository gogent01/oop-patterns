import { Patient, GuidelineFactory, Diagnostics, Therapy, FollowUp } from './Abstractions';

export class BreastCancerGuidelineFactory implements GuidelineFactory {
  makeDiagnostics(): Diagnostics {
    return new BreastCancerDiagnostics();
  }

  makeTherapy(): Therapy {
    return new BreastCancerTherapy();
  }

  makeFollowUp(): FollowUp {
    return new BreastCancerFollowUp();
  }
}

class BreastCancerDiagnostics implements Diagnostics {
  explain(): string {
    return 'Diagnosis of breast cancer is usually suspected by changes detected during mammography. Diagnosis is confirmed by using breast ultrasonography or MRI. Detailed characteristics of tumor are determined with a biopsy.';
  }

  schedule(patient: Patient): void {
    console.log(`Scheduled breast ultrasonography and fine-needle biopsy for patient ${patient.fullname}.`);
  }
}

class BreastCancerTherapy implements Therapy {
  prescribe(): string {
    return 'Adjuvant therapy for stage II HER2- HR- breast cancer: doxorubicin 60 mg/m² with cyclophosphamide 600 mg/m² once in 3 weeks, 4 cycles. Then docetaxel 75 mg/m² once in 3 weeks, 4 cycles.';
  }

  supply(patient: Patient): void {
    console.log(
      `Requested from pharmacy for ${patient.fullname}:\n- Doxorubicin 105 mg x 4 doses\n- Cyclophosphamide 1050 mg x 4 doses\n- Docetaxel 131,25 mg x 4 doses`
    );
  }
}

class BreastCancerFollowUp implements FollowUp {
  remind(): string {
    return 'Visit an oncologist twice a year for 5 years after surgery.';
  }

  schedule(patient: Patient): void {
    console.log(`Scheduled a visit to oncologist for ${patient.fullname}.`);
  }
}
