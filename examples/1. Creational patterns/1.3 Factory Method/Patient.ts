import { Pill } from './Pill';

export abstract class Patient {
  name: string;
  disease!: string;
  symptoms!: string[];

  protected constructor(name: string) {
    this.name = name;
  }

  introduce(): void {
    console.log(`Good afternoon! My name is ${this.name} and I have a bad case of ${this.disease}.`);
  }

  showSymptoms(): void {
    if (this.symptoms.length === 0) console.log('The patient exhibits no symptoms');
    else if (this.symptoms.length === 1) console.log(`The patient exhibits ${this.symptoms[0]}.`);
    else
      console.log(
        `The patient exhibits ${this.symptoms.slice(0, this.symptoms.length - 1).join(', ')} and ${
          this.symptoms[this.symptoms.length - 1]
        }.`
      );
  }

  protected abstract getPill(): Pill;

  getTreatment(): void {
    const pill = this.getPill();
    pill.doWork();
  }
}
