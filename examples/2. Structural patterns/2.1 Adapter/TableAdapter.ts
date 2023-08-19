import { DataSegment } from './DataSegment';
import { TableColumn } from './TableColumn';
import { DataPoint } from './DataPoint';

export class TableAdapter extends DataSegment {
  tableColumn: TableColumn;

  constructor(tableColumn: TableColumn) {
    super(tableColumn.title);
    this.tableColumn = tableColumn;
  }

  get values(): DataPoint[] {
    return this.tableColumn.cells.map((cell) => cell.value ?? null);
  }

  get first(): DataPoint {
    if (this.tableColumn.nObservations === 0) return null;
    return this.tableColumn.cells[0].value ?? null;
  }

  reverse(): this {
    this.tableColumn.cells = this.tableColumn.cells.reverse();
    return this;
  }
}
