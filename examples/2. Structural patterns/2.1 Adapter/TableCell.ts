export class TableCell {
  value: number | undefined;
  align: 'left' | 'center' | 'right';
  fontSize: number;
  fontStyle: 'regular' | 'bold' | 'italic';

  constructor(
    value: number | undefined,
    options?: { align?: 'left' | 'center' | 'right'; fontSize?: number; fontStyle?: 'regular' | 'bold' | 'italic' }
  ) {
    this.value = value;
    this.align = options?.align ?? 'left';
    this.fontSize = options?.fontSize ?? 12;
    this.fontStyle = options?.fontStyle ?? 'regular';
  }
}
