export interface Patient {
  fullname: string;
}

export interface GuidelineFactory {
  makeDiagnostics: () => Diagnostics;
  makeTherapy: () => Therapy;
  makeFollowUp: () => FollowUp;
}

export interface Diagnostics {
  explain: () => string;
  schedule: (patient: Patient) => void;
}

export interface Therapy {
  prescribe: () => string;
  supply: (patient: Patient) => void;
}

export interface FollowUp {
  remind: () => string;
  schedule: (patient: Patient) => void;
}
