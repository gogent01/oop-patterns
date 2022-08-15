abstract class Animal {
    species: string;
    voice: string;

    constructor() {
        this.species = 'Animal';
        this.voice = '...';
    }

    liveADay(): void {
        this.wakeUp();
        this.doEat();
        this.mayDayChores();
        this.doEat();
        this.doEveningChores();
        this.goToSleep();
    }

    wakeUp(): void {
        console.log(`A ${this.species} wakes up, yawns and makes a sound: "${this.voice}!"`);
    }

    doEat(): void { }

    mayDayChores(): void {
        console.log(`A ${this.species} does nothing during the day.`);
    }

    doEveningChores(): void {
        console.log(`A ${this.species} does nothing during the evening.`);
    }

    goToSleep(): void {
        console.log(`A ${this.species} closes its eyes and goes to sleep.`);
    }
}

class Dog extends Animal {
    constructor() {
        super();
        this.species = 'Dog';
        this.voice = 'woof';
    }

    doEat(): void {
        console.log(`A ${this.species} waits for its owner to give some food and then eats eagerly.`);
    }

    mayDayChores(): void {
        console.log(`A ${this.species} lies in a bed and waits for its owner to come back from work.`);
    }

    doEveningChores(): void {
        console.log(`A ${this.species} goes for a walk and tries to catch some pigeons.`);
    }
}

class Snake extends Animal {
    constructor() {
        super();
        this.species = 'Snake';
        this.voice = 'hisss';
    }

    doEat(): void {
        console.log(`A ${this.species} hunts a mouse and gets the nutrients so longed for.`);
    }
}

const bulldog = new Dog();
bulldog.liveADay();

const cobra = new Snake();
cobra.liveADay();
