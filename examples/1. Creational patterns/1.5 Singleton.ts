class Logger {
    private static instance: Logger;
    static file: string = '/etc/application/log.txt';
    private history: string[];

    private constructor() {
        this.history = [];
    }

    static Instance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }

    log(level: LogLevels, message: string) {
        const logString = `Appended a record to a log file at "${Logger.file}":\n${level}: ${message}`;
        this.history.push(logString);
        console.log(logString);
    }

    getHistory() {
        return this.history;
    }

    flush() {
        this.history = [];
        console.log(`Emptied a log file at "${Logger.file}".`)
    }
}

enum LogLevels {
    'INFO' = 'INFO',
    'WARNING' = 'WARNING',
    'ERROR' = 'ERROR',
    'FATAL' = 'FATAL',
}

const logger1 = Logger.Instance();
const logger2 = Logger.Instance();

if (logger1 === logger2)
    console.log('Both loggers are identical!');

logger1.log(LogLevels.INFO, 'This is the first message of identical loggers.');
logger2.log(LogLevels.WARNING, 'Switched to the second logger variable, but not instance!');
logger2.log(LogLevels.ERROR, 'No error actually, just kidding.');
logger1.log(LogLevels.FATAL, 'This is going to be the final log string.');

console.log('The history of the first logger...');
console.log(JSON.stringify(logger1.getHistory(), null, 2));
console.log('Is the same as the one of the second logger!');
console.log(JSON.stringify(logger2.getHistory(), null, 2));

logger1.flush();
console.log('Now only the first logger is flushed, but histories of both are empty.');
console.log(JSON.stringify(logger1.getHistory(), null, 2));
console.log(JSON.stringify(logger2.getHistory(), null, 2));
