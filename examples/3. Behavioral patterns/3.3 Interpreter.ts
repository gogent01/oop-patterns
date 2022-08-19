/* A simple SQL parser and interpreter which supports SELECT queries using the following clauses:
 * - SELECT
 * - FROM
 * - WHERE
 * - ORDER BY
 *
 * Clause ::= Select | From | Where | OrderBy | Condition | Literal | LiteralGroup | Table | Direction
 * Select ::= 'SELECT' LiteralGroup From Where* OrderBy*
 * From ::= 'FROM' Literal
 * Where ::= 'WHERE' Condition
 * Condition ::= ConditionMore | ConditionLess | ConditionEqual | ConditionNotEqual
 * ConditionMore ::= Literal '>' Number
 * ConditionLess ::= Literal '<' Number
 * ConditionEqual ::= Literal '=' Number
 * ConditionNotEqual ::= Literal '<>' Number
 * OrderBy ::= 'ORDER BY' Literal Direction
 * Direction ::= 'asc' | 'desc'
 * Literal ::= string
 * LiteralGroup ::= Literal | Literal LiteralGroup | "*"
 */

interface Column<T> {
    [name: string]: T[];
}

class Table {
    columns: { [column: string]: any[] };

    constructor(...args: Column<any>[]) {
        this.columns = {};

        args.forEach(column => {
            const [[colName, values]] = Object.entries(column);
            this.columns[colName] = values;
        });
    }

    colnames(): string[] {
        return Object.keys(this.columns);
    }

    addColumn(column: Column<any>): Table {
        const [[colName, values]] = Object.entries(column);
        this.columns[colName] = values;

        return this;
    }

    removeColumn(colName: string): Table {
        delete this.columns[colName];

        return this;
    }
}

class Context {
    tables: { [key: string]: Table };

    constructor() {
        this.tables = {};
    }

    add(table: Table, name: string): void {
        this.tables[name] = table;
    }

    remove(name: string): void {
        delete this.tables[name];
    }

    get(name: string): Table {
        const table = this.tables[name];

        if (!table) {
            console.log(`No table named "${name}" was found!`);
            return new Table();
        }

        return table;
    }
}

abstract class Clause {
    abstract evaluate(context: Context): Table;
}

class Select extends Clause {
    colNames: string[];
    from: From;
    where: Where | undefined;

    constructor(colNames: LiteralGroup, from: From, where: Where | undefined) {
        super();
        this.colNames = colNames['literals'];
        this.from = from;
        this.where = where;
    }

    evaluate(context: Context): Table {
        let table = this.from.evaluate(context);

        if (!!this.where) {
            context.add(table, 'selection');
            table = this.where.evaluate(context);
            context.remove('selection');
        }

        if (this.colNames.includes('*')) return table;

        for (const colName of table.colnames()) {
            if (!this.colNames.includes(colName)) {
                table.removeColumn(colName);
            }
        }

        return table;
    }
}

class LiteralGroup extends Clause {
    literals: string[];

    constructor(literals: string[]) {
        super();
        this.literals = literals;
    }

    evaluate(context: Context): Table {
        return new Table({ literals: this.literals });
    }
}

class From extends Clause {
    tableName: string;

    constructor(tableName: string) {
        super();
        this.tableName = tableName;
    }

    evaluate(context: Context): Table {
        return context.get(this.tableName);
    }
}

class Where extends Clause {
    condition: Condition;

    constructor(condition: Condition) {
        super();
        this.condition = condition;
    }

    evaluate(context: Context): Table {
        const table = context.get('selection');
        const tableWithClassifier = this.condition.evaluate(context);
        const classifier = tableWithClassifier.columns.classifier;
        const resultingTable = new Table();
        for (const colName of table.colnames()) {
            const filteredColumn = { [colName]: table.columns[colName].filter((_, idx) => classifier[idx]) };
            resultingTable.addColumn(filteredColumn);
        }
        return resultingTable;
    }
}

abstract class Condition extends Clause {
    colName: string;
    threshold: number;

    constructor(colName: string, threshold: number) {
        super();
        this.colName = colName;
        this.threshold = threshold;
    }

    evaluate(context: Context): Table {
        const table = context.get('selection');
        let cells = table.columns[this.colName];

        if (!cells) {
            console.log(`No column named "${this.colName}" was found!`);
            cells = [];
        }

        const classifier = cells.map(cell => this.compare(cell, this.threshold));
        return new Table({ classifier });
    }

    abstract compare(cellValue: any, targetValue: any): boolean;
}

class ConditionEqual extends Condition {
    constructor(colName: string, threshold: number) {
        super(colName, threshold);
    }

    compare(cellValue: any, targetValue: any): boolean {
        return cellValue === targetValue;
    }
}

class ConditionNotEqual extends Condition {
    constructor(colName: string, threshold: number) {
        super(colName, threshold);
    }

    compare(cellValue: any, targetValue: any): boolean {
        return cellValue !== targetValue;
    }
}

class ConditionMore extends Condition {
    constructor(colName: string, threshold: number) {
        super(colName, threshold);
    }

    compare(cellValue: any, targetValue: any): boolean {
        return cellValue > targetValue;
    }
}

class ConditionLess extends Condition {
    constructor(colName: string, threshold: number) {
        super(colName, threshold);
    }

    compare(cellValue: any, targetValue: any): boolean {
        return cellValue < targetValue;
    }
}

const store_reports = new Table(
    { day: [1, 2, 3, 4, 5, 6, 7] },
    { customers: [75, 40, 84, 92, 48, 66, 103] },
    { revenue: [770, 450, 1030, 885, 516, 650, 1310] },
    { products_sold: [90, 63, 110, 95, 60, 84, 118] },
    { products_left: [400, 337, 227, 132, 72, 753, 635] }
);

const mt_cars = new Table(
    { mpg: [21, 21, 22.8, 21.4, 18.7, 18.1, 14.3] },
    { cyl: [6, 6, 4, 6, 8, 6, 8] },
    { disp: [160, 160, 108, 258, 360, 225, 360] },
    { hp: [110, 110, 93, 110, 175, 105, 245] },
    { carb: [4, 4, 1, 1, 2, 1, 4] }
);

const context = new Context();
context.add(store_reports, 'store_reports');
context.add(mt_cars, 'mt_cars');


let query = 'SELECT day,revenue FROM store_reports WHERE customers > 75';
console.log(query);

let columns = new LiteralGroup(['day', 'revenue']);
let from = new From('store_reports');
let condition = new ConditionMore('customers', 75);
let where = new Where(condition);
let select = new Select(columns, from, where);
let result = select.evaluate(context);
console.log(result);


query = 'SELECT day,revenue,products_sold FROM store_reports';
console.log(query);

columns = new LiteralGroup(['day', 'revenue', 'products_sold']);
from = new From('store_reports');
select = new Select(columns, from, undefined);
result = select.evaluate(context);
console.log(result);


query = 'SELECT mpg,disp,hp FROM mt_cars WHERE hp <> 110';
console.log(query);

columns = new LiteralGroup(['mpg', 'disp', 'hp']);
from = new From('mt_cars');
condition = new ConditionNotEqual('hp', 110);
where = new Where(condition);
select = new Select(columns, from, where);
result = select.evaluate(context);
console.log(result);


query = 'SELECT * FROM mt_cars WHERE hp = 110';
console.log(query);

columns = new LiteralGroup(['*']);
from = new From('mt_cars');
condition = new ConditionEqual('hp', 110);
where = new Where(condition);
select = new Select(columns, from, where);
result = select.evaluate(context);
console.log(result);


// TODO: ORDER_BY
// TODO: query parser
