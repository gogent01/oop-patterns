import { Pill } from './Pill';

export class MonodoxPill extends Pill {
  constructor() {
    super(50);
    this.activeIngredient = 'doxycycline';
  }

  distribute(): void {
    console.log(
      `Almost all the dose of ${this.doseInMg} mg of ${this.activeIngredient} gets absorbed in small intestine. The drug distributes to all bodily fluids and reaches its peak concentration in 1-2 hours in blood bound by plasma proteins.`
    );
  }

  act(): void {
    console.log(
      'The drug inhibits bacterial growth by halting protein synthesis. This is achieved through binding and inhibition of 30S ribosomal subunits.'
    );
  }

  excrete(): void {
    console.log(
      `About half of ${this.activeIngredient} dose gets excreted in urine. The other half is excreted into the gut through gallbladder and intestinal walls. The biological half-life is about 20 hours.`
    );
  }
}
