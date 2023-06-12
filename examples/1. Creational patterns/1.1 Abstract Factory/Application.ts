import { GuidelineFactory, Patient } from './Abstractions';

export class Application {
  private guidelineFactory: GuidelineFactory;

  constructor(guidelineFactory: GuidelineFactory) {
    this.guidelineFactory = guidelineFactory;
  }

  set guideline(guidelineFactory: GuidelineFactory) {
    this.guidelineFactory = guidelineFactory;
  }

  showGuideline(): string {
    const diagnostics = this.guidelineFactory.makeDiagnostics();
    const therapy = this.guidelineFactory.makeTherapy();
    const followUp = this.guidelineFactory.makeFollowUp();
    return `Diagnostics:\n${diagnostics.explain()}\n\nTreatment:\n${therapy.prescribe()}\n\nFollow-up:\n${followUp.remind()}`;
  }

  actByGuideline(patient: Patient): void {
    const diagnostics = this.guidelineFactory.makeDiagnostics();
    const therapy = this.guidelineFactory.makeTherapy();
    const followUp = this.guidelineFactory.makeFollowUp();

    diagnostics.schedule(patient);
    therapy.supply(patient);
    followUp.schedule(patient);
  }
}
