import { TableCell } from './TableCell';

export class TableColumn {
  title: string;
  cells: TableCell[];

  get nObservations(): number {
    return this.cells.length;
  }

  constructor(title: string) {
    this.title = title;
    this.cells = [];
  }

  insertCell(cell: TableCell): void {
    this.cells.push(cell);
  }
}
