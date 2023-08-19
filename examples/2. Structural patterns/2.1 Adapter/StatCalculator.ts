import { DataSegment } from './DataSegment';
import { DataPoint } from './DataPoint';

export class StatCalculator {
  median(data: DataSegment): DataPoint {
    const meaningfulData = data.values.filter((dp) => dp !== null) as number[];
    if (meaningfulData.length === 0) return null;

    meaningfulData.sort();
    const dataSize = meaningfulData.length;
    if (dataSize % 2 === 1) {
      return meaningfulData[Math.floor(dataSize / 2)];
    } else {
      return (meaningfulData[dataSize / 2 - 1] + meaningfulData[dataSize / 2]) / 2;
    }
  }
}
