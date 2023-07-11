export abstract class Pill {
  activeIngredient!: string;
  doseInMg: number;

  protected constructor(doseInMg: number) {
    this.doseInMg = doseInMg;
  }

  doWork(): void {
    this.distribute();
    this.act();
    this.excrete();
  }

  protected abstract distribute(): void;
  protected abstract act(): void;
  protected abstract excrete(): void;
}
