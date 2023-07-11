import { Pill } from './Pill';

export class ChemetPill extends Pill {
  constructor() {
    super(100);
    this.activeIngredient = 'succimer';
  }

  distribute(): void {
    console.log(
      `About 20% of ${this.doseInMg} mg of ${this.activeIngredient} get absorbed in small intestine and distribute mainly in plasma, bound to plasma proteins.`
    );
  }

  act(): void {
    console.log('The drug chelates lead ions, which get excreted with urine.');
  }

  excrete(): void {
    console.log(
      `Chelates of ${this.activeIngredient} and lead get excreted with urine. About 20% of the dose remain unbound and also get excreted by kidneys.`
    );
  }
}
