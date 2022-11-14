class Breakfast {
    proteins: string[];
    carbs: string[];
    fats: string[];
    flavors: string[];
    drinks: string[];

    constructor() {
        this.proteins = [];
        this.carbs = [];
        this.fats = [];
        this.flavors = [];
        this.drinks = [];
    }

    addProtein(protein: string): void {
        this.proteins.push(protein);
    }

    addCarb(carb: string): void {
        this.carbs.push(carb);
    }

    addFat(fat: string): void {
        this.fats.push(fat);
    }

    addDrink(drink: string): void {
        this.drinks.push(drink);
    }

    addFlavor(flavor: string): void {
        this.flavors.push(flavor);
    }

    served(): void {
        const meals = [...this.proteins, ...this.carbs, ...this.fats];

        let breakfast = 'A breakfast, consisting of ';
        breakfast += `${this.list(meals)} is served!`;

        if (!!this.flavors) {
            const flavors = this.flavors;
            breakfast += ` Flavored with ${this.list(flavors)}.`;
        }

        if (!!this.drinks) {
            const drinks = this.drinks;
            breakfast += ` Includes ${this.list(drinks)} to drink and enjoy a new day!`;
        }

        console.log(breakfast);
    }

    list(items: string[]): string {
        if (items.length === 1) return items[0];
        const lastItem = items.pop();
        return `${items.join(', ')} and ${lastItem}`;
    }
}

class BreakfastDirector {
    chef: BreakfastBuilder;

    constructor(chef: BreakfastBuilder) {
        this.chef = chef;
    }

    cookBreakfast(): Breakfast {
        this.chef.startCooking();

        this.chef.addProteins();
        this.chef.addCarbs();
        this.chef.addFats();
        this.chef.addFlavors();
        this.chef.addDrinks();

        return this.chef.getBreakfast();
    }
}

abstract class BreakfastBuilder {
    breakfast: Breakfast;

    constructor() {
        this.breakfast = new Breakfast();
    }

    startCooking(): void {}
    addProteins(): void {}
    addCarbs(): void {}
    addFats(): void {}
    addFlavors(): void {}
    addDrinks(): void {}

    getBreakfast(): Breakfast {
        return this.breakfast;
    }
}

class EnglishBreakfastBuilder extends BreakfastBuilder {
    constructor() {
        super();
    }

    addProteins(): void {
        this.breakfast.addProtein('scrambled eggs');
        this.breakfast.addProtein('pork sausage');
    }

    addCarbs(): void {
        this.breakfast.addCarb('grilled tomato');
        this.breakfast.addCarb('toast');
    }

    addFats(): void {
        this.breakfast.addFat('back bacon');
        this.breakfast.addFat('butter');
    }

    addFlavors(): void {
        this.breakfast.addFlavor('fried mushrooms');
    }

    addDrinks(): void {
        this.breakfast.addDrink('coffee');
        this.breakfast.addDrink('fresh orange juice');
    }
}

class PorridgeBreakfastBuilder extends BreakfastBuilder {
    constructor() {
        super();
    }

    addCarbs(): void {
        this.breakfast.addCarb('oatmeal');
        this.breakfast.addCarb('raspberry jam');
        this.breakfast.addCarb('french baguette');
    }

    addFats(): void {
        this.breakfast.addFat('butter');
    }

    addFlavors(): void {
        this.breakfast.addFlavor('pine nuts');
    }

    addDrinks(): void {
        this.breakfast.addDrink('americano with hot milk');
    }
}

class MediterraneanBreakfastBuilder extends BreakfastBuilder {
    constructor() {
        super();
    }

    addProteins(): void {
        this.breakfast.addProtein('falafel');
        this.breakfast.addFat('feta cheese');
    }

    addCarbs(): void {
        this.breakfast.addCarb('sliced cucumbers');
        this.breakfast.addCarb('tomatoes');
        this.breakfast.addCarb('peppery radish');
        this.breakfast.addCarb('toasted pita');
    }

    addFats(): void {
        this.breakfast.addFat('creamy hummus');
    }

    addFlavors(): void {
        this.breakfast.addFlavor('marinated olives');
        this.breakfast.addFlavor('artichokes');
    }

    addDrinks(): void {
        this.breakfast.addDrink('fresh-squeezed apple juice');
    }
}

const englishChef = new EnglishBreakfastBuilder();
const englishRestaurant = new BreakfastDirector(englishChef);
const englishBreakfast = englishRestaurant.cookBreakfast();
englishBreakfast.served();

const russianChef = new PorridgeBreakfastBuilder();
const russianRestaurant = new BreakfastDirector(russianChef);
const russianBreakfast = russianRestaurant.cookBreakfast();
russianBreakfast.served();

const greekChef = new MediterraneanBreakfastBuilder();
const greekRestaurant = new BreakfastDirector(greekChef);
const greekBreakfast = greekRestaurant.cookBreakfast();
greekBreakfast.served();
