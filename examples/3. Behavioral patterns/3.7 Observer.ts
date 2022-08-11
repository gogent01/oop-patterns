abstract class Observer {
    abstract update(subject: Subject): void;
}

abstract class Subject {
    protected observers!: Observer[];

    constructor() {
        this.observers = [];
    }

    attach(observer: Observer): void {
        this.observers.push(observer);
    }

    detach(observer: Observer): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

class ClockTimer extends Subject {
    updateInterval: number = 1000;
    hours: number;
    minutes: number;
    seconds: number;

    constructor() {
        super();
        this.hours = (new Date()).getHours();
        this.minutes = (new Date()).getMinutes();
        this.seconds = (new Date()).getSeconds();
    }

    start(): void {
        setInterval(() => this.tick(), this.updateInterval);
    }

    tick(): void {
        this.seconds++;
        if (this.seconds > 59) {
            this.seconds = 0;
            this.minutes++;

            if (this.minutes > 59) {
                this.minutes = 0;
                this.hours++;

                if (this.hours > 23) {
                    this.hours = 0;
                }
            }
        }

        this.notify();
    }

    getHours(): number {
        return this.hours;
    }

    getMinutes(): number {
        return this.minutes;
    }

    getSeconds(): number {
        return this.seconds;
    }
}

class Thermometer extends Subject {
    updateInterval: number = 4000;
    temperature: number;

    constructor() {
        super();
        this.temperature = this.getTemperature();
    }

    start(): void {
        setInterval(() => this.tick(), this.updateInterval);
    }

    tick(): void {
        this.temperature = this.getTemperature();
        this.notify();
    }

    getTemperature(): number {
        const now = new Date();
        const hourWithFractions = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
        return this.temperatureFunction(hourWithFractions);
    }

    temperatureFunction(hourWithFractions: number): number {
        const x = hourWithFractions;
        const temperature =  10
            + 2 * (-4 * Math.sin(0.3 * x) - Math.sin(-2.5 * Math.E * x) + 2 * Math.sin(-0.3 * Math.PI * x))
            - 10 * Math.sin(x / 100);
        return this.roundBy(temperature, 2);
    }

    roundBy(num: number, digits: number): number {
        const multiplier = 10 ** digits;
        return Math.round(num * multiplier) / multiplier;
    }
}

class Clock {
    hours: number;
    minutes: number;
    seconds: number;

    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }

    draw(): void {
        console.log(`Drew clock with a time of ${this.padded(this.hours)}:${this.padded(this.minutes)}:${this.padded(this.seconds)}.`);
    }

    padded(num: number): string {
        let s = String(num);
        while (s.length < 2) { s = "0" + s; }
        return s;
    }
}

class DigitalClockWithTemperature extends Clock implements Observer {
    timer!: ClockTimer;
    thermometer!: Thermometer;
    hours: number;
    minutes: number;
    seconds: number;
    temperature: number;

    constructor(timer: ClockTimer, thermometer: Thermometer) {
        super();

        this.timer = timer;
        timer.attach(this);

        this.thermometer = thermometer;
        thermometer.attach(this);

        this.hours = timer.getHours();
        this.minutes = timer.getMinutes();
        this.seconds = timer.getSeconds();

        this.temperature = thermometer.getTemperature();

        this.draw();
    }

    update(subject: Subject): void {
        if (subject === this.timer) {
            const timer = subject as ClockTimer;
            this.hours = timer.getHours();
            this.minutes = timer.getMinutes();
            this.seconds = timer.getSeconds();
        } else if (subject === this.thermometer) {
            const thermometer = subject as Thermometer;
            this.temperature = thermometer.getTemperature();
        }
        this.draw();
    }

    draw(): void {
        console.log(`Drew analog clock with a time of ${this.padded(this.hours)}:${this.padded(this.minutes)}:${this.padded(this.seconds)} and temperature of ${this.temperature} \u2103.`);
    }
}

class AnalogClock extends Clock implements Observer {
    timer!: ClockTimer;
    hours: number;
    minutes: number;
    seconds: number;

    constructor(timer: ClockTimer) {
        super();

        this.timer = timer;
        timer.attach(this);

        this.hours = timer.getHours();
        this.minutes = timer.getMinutes();
        this.seconds = timer.getSeconds();

        this.draw();
    }

    update(subject: Subject): void {
        if (subject === this.timer) {
            const timer = subject as ClockTimer;
            this.hours = timer.getHours();
            this.minutes = timer.getMinutes();
            this.seconds = timer.getSeconds();
        }
        this.draw();
    }

    draw(): void {
        console.log(`Drew analog clock with a time of ${this.padded(this.hours)}:${this.padded(this.minutes)}:${this.padded(this.seconds)}.`);
    }
}

const timer = new ClockTimer();
timer.start();

const thermometer = new Thermometer();
thermometer.start();

new DigitalClockWithTemperature(timer, thermometer);

new AnalogClock(timer);
