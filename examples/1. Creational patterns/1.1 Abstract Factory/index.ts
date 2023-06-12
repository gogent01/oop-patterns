import { Patient } from './Abstractions';
import { Application } from './Application';
import { BreastCancerGuidelineFactory } from './BreastCancer';
import { AtrialFibrillationGuidelineFactory } from './AtrialFibrillation';

const patientWithBreastCancer: Patient = { fullname: 'Liliana Lozano' };
const breastCancerGuideline = new BreastCancerGuidelineFactory();

const app = new Application(breastCancerGuideline);
app.showGuideline();
app.actByGuideline(patientWithBreastCancer);

const patientWithAtrialFibrillation: Patient = { fullname: 'Nicolas Wilkins' };
const atrialFibrillationGuideline = new AtrialFibrillationGuidelineFactory();

app.guideline = atrialFibrillationGuideline;
app.showGuideline();
app.actByGuideline(patientWithAtrialFibrillation);
