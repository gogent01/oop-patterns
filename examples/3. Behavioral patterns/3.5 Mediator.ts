/*
* This is an example of a Mediator design pattern usage.
* The code snippet represents business logic of a dialog window with font settings.
*
* An abstract class Colleague is extended into DialogButtons, SingleSelectionListBox,
* Input field and Checkbox. A DialogModerator class handles interactions between colleagues.
* The dialog window consists of:
* - one SingleSelectionListBox for font family;
* - two Inputs for font size and weight;
* - one Checkbox for italics;
* - two DialogButtons: 'OK' and 'Cancel'.
*
* After the dialog is closed the font information is either updated ('OK') or stays
* without modifications ('Cancel').
*/


abstract class Colleague {
    dialogMediator: DialogMediator;

    constructor(dialogMediator: DialogMediator) {
        this.dialogMediator = dialogMediator;
    }

    changed() {
        this.dialogMediator.widgetChanged(this);
    }
}

class DialogButton extends Colleague {
    text: string;

    constructor(dialogMediator: DialogMediator, text: string) {
        super(dialogMediator);
        this.text = text;
    }

    click(): void {
        this.changed();
    }
}

class SingleSelectionListBox extends Colleague {
    options: string[];
    selected: number;

    constructor(dialogMediator: DialogMediator, options: string[]) {
        super(dialogMediator);
        this.options = options;
        this.selected = 0;
    }

    click(e: any): void {
        this.selected = e.clickedItem.index; // get the value from the event of an actually drawn listbox
        this.changed();
    }

    getSelection(): string {
        return this.options[this.selected];
    }
}

class Input extends Colleague {
    text: string;

    constructor(dialogMediator: DialogMediator) {
        super(dialogMediator);
        this.text = '';
    }

    input(e: any): void {
        this.text = e.text; // get the value from the event of an actually drawn input
        this.changed();
    }

    getText(): string {
        return this.text;
    }
}

class Checkbox extends Colleague {
    label: string;
    checked: boolean;

    constructor(dialogMediator: DialogMediator, label: string) {
        super(dialogMediator);
        this.label = label;
        this.checked = false;
    }

    click(): void {
        this.checked = !this.checked; // get the value from the event of an actually drawn input
        this.changed();
    }

    getValue(): boolean {
        return this.checked;
    }
}


abstract class DialogMediator {
    abstract showDialog(): void;
    abstract createWidgets(): void;
    abstract widgetChanged(collegue: Colleague): void;
    abstract apply(): void;
    abstract close(): void;
}

class FontSettingsDialogMediator extends DialogMediator {
    fontListBox!: SingleSelectionListBox;
    fontSizeInput!: Input;
    fontWeightInput!: Input;
    italicCheckbox!: Checkbox;
    okButton!: DialogButton;
    cancelButton!: DialogButton;

    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    italic: boolean;

    constructor(fontFamily: string, fontSize: number, fontWeight: number, italic: boolean) {
        super();
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.italic = italic;
    }

    showDialog(): void {
        this.createWidgets();

        console.log('Drawing the dialog window and positioning all widgets inside...');
    }

    createWidgets(): void {
        this.fontListBox = new SingleSelectionListBox(this, ['Helvetica', 'Times', 'Fira Sans']);
        this.fontSizeInput = new Input(this);
        this.fontWeightInput = new Input(this);
        this.italicCheckbox = new Checkbox(this, 'Italic');
        this.okButton = new DialogButton(this, 'OK');
        this.cancelButton = new DialogButton(this, 'Cancel');

        console.log('Initializing widgets with additionally required values...');
    }

    widgetChanged(colleague: Colleague): void {
        if (colleague === this.fontListBox) {
            this.fontFamily = this.fontListBox.getSelection();
        } else if (colleague === this.fontSizeInput) {
            this.fontSize = parseInt(this.fontSizeInput.getText(), 10);
        } else if (colleague === this.fontWeightInput) {
            this.fontWeight = parseInt(this.fontWeightInput.getText(), 10);
        } else if (colleague === this.italicCheckbox) {
            this.italic = this.italicCheckbox.getValue();
        } else if (colleague === this.okButton) {
            this.apply();
            this.close();
        } else if (colleague === this.cancelButton) {
            this.close();
        }
    }

    apply(): void {
        console.log(`Applied settings:\nFont family: ${this.fontFamily}\nFont size: ${this.fontSize}\nFont weight: ${this.fontWeight}\nItalic: ${this.italic}`);
    }

    close(): void {
        console.log('FontSettingsDialog closed!');
    }
}

const fontDialog = new FontSettingsDialogMediator('Helvetica', 14, 300, false);
fontDialog.showDialog();

fontDialog.fontListBox.click({ clickedItem: { index: 2 } });
fontDialog.fontSizeInput.input({ text: '10' });
fontDialog.fontWeightInput.input({ text: '600' });
fontDialog.italicCheckbox.click();
fontDialog.okButton.click();
