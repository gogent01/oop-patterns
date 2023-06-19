interface Handler<R, H> {
  handle: (request: R) => void;
  setNext: (handler: H) => void;
}

interface Patient {
  symptomsOf: 'superficial skin cut' | 'acne' | 'melanoma' | string;
}

abstract class Doctor implements Handler<Patient, Doctor> {
  protected next?: Doctor;

  constructor() {}

  handle(patient: Patient): void {
    if (this.next) this.next.handle(patient);
    else this.terminateChain();
  }

  terminateChain(): void {
    console.log('The patient was redirected to a clinic, specialized on their condition.');
  }

  setNext(handler: Doctor): void {
    this.next = handler;
  }
}

class GeneralPractitioner extends Doctor {
  constructor() {
    super();
  }

  handle(patient: Patient): void {
    if (patient.symptomsOf === 'superficial skin cut') {
      console.log('The condition of the patient was treated by a general practitioner.');
    } else if (this.next) {
      this.next.handle(patient);
    } else {
      this.terminateChain();
    }
  }
}

class Dermatologist extends Doctor {
  constructor() {
    super();
  }

  handle(patient: Patient): void {
    if (patient.symptomsOf === 'acne') {
      console.log('The condition of the patient was treated by a dermatologist.');
    } else if (this.next) {
      this.next.handle(patient);
    } else {
      this.terminateChain();
    }
  }
}

class DermatologistOncologist extends Doctor {
  constructor() {
    super();
  }

  handle(patient: Patient): void {
    if (patient.symptomsOf === 'melanoma') {
      console.log('The condition of the patient was treated by a dermatologist, specialized in Oncology.');
    } else if (this.next) {
      this.next.handle(patient);
    } else {
      this.terminateChain();
    }
  }
}

class DermatologyClinic {
  private specialists: Doctor[];
  private firstLevelSpecialist: Doctor;

  constructor() {
    const gp = new GeneralPractitioner();
    const dermatologist = new Dermatologist();
    const oncodermatologist = new DermatologistOncologist();

    gp.setNext(dermatologist);
    dermatologist.setNext(oncodermatologist);

    this.firstLevelSpecialist = gp;
    this.specialists = [gp, dermatologist, oncodermatologist];
  }

  admit(patient: Patient): void {
    this.firstLevelSpecialist.handle(patient);
  }
}

const clinic = new DermatologyClinic();
const patient1: Patient = { symptomsOf: 'superficial skin cut' };
const patient2: Patient = { symptomsOf: 'acne' };
const patient3: Patient = { symptomsOf: 'melanoma' };
const patient4: Patient = { symptomsOf: 'chronic kidney disease' };

clinic.admit(patient1); // 'The condition of the patient was treated by a general practitioner.'
clinic.admit(patient2); // 'The condition of the patient was treated by a dermatologist.'
clinic.admit(patient3); // 'The condition of the patient was treated by a dermatologist, specialized in Oncology.'
clinic.admit(patient4); // 'The patient was redirected to a clinic, specialized on their condition.'
