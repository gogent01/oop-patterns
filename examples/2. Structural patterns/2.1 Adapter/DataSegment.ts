import { DataPoint } from './DataPoint';

export class DataSegment {
  title: string;
  private _values: DataPoint[];

  constructor(title: string) {
    this.title = title;
    this._values = [];
  }

  get values(): DataPoint[] {
    return this._values;
  }

  get first(): DataPoint {
    if (this._values.length === 0) return null;
    return this._values[0];
  }

  addData(...values: (number | null)[]): void {
    this._values.push(...values);
  }

  reverse(): this {
    this._values = this._values.reverse();
    return this;
  }
}
