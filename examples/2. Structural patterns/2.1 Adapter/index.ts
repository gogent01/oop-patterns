import { StatCalculator } from './StatCalculator';
import { DataSegment } from './DataSegment';
import { TableColumn } from './TableColumn';
import { TableCell } from './TableCell';
import { TableAdapter } from './TableAdapter';

const calc = new StatCalculator();

const noonTemperatures = new DataSegment('temperatures');
noonTemperatures.addData(21.0, 22.3, null, 24.4, null, 19.6, 19.3);
console.log(`The noon temperature on the first day was ${noonTemperatures.first}`);
console.log(`The noon temperature on the last day was ${noonTemperatures.reverse().first}`);
console.log(`The median noon temperature during the week was ${calc.median(noonTemperatures)}`);

const studentAttendance = new TableColumn('students');
studentAttendance.insertCell(new TableCell(64));
studentAttendance.insertCell(new TableCell(53));
studentAttendance.insertCell(new TableCell(40, { align: 'right', fontStyle: 'bold' }));
studentAttendance.insertCell(new TableCell(undefined));
studentAttendance.insertCell(new TableCell(50));

const adaptedStudentAttendance = new TableAdapter(studentAttendance);
console.log(`The number of students on the first day of lectures was ${adaptedStudentAttendance.first}`);
console.log(`The number of students on the 5th day of lectures was ${adaptedStudentAttendance.reverse().first}`);
console.log(
  `The median number of students during the first five days of lectures was ${calc.median(adaptedStudentAttendance)}`
);
