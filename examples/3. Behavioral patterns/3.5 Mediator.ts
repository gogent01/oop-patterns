abstract class DialogMediator {
    abstract action(collegue: Collegue): void;
    abstract close(): void;
}

class FontSettingsDialogMediator extends DialogMediator {
    okButton: OKDialogButton = new OKDialogButton(this);
    cancelButton: CancelDialogButton = new CancelDialogButton(this);

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

    action(collegue: Collegue): void {
        if (collegue.type === 'button') {
            const button = collegue as DialogButton;
            if (button.code === 'OK') {
                this.applySettings();
                this.close();
            } else if (button.code === 'Cancel') {
                this.close();
            }
        }
    }

    applySettings(): void {
        console.log(`Applied settings:\nFont family: ${this.fontFamily}\nFont size: ${this.fontSize}\nFont weight: ${this.fontWeight}\nItalic: ${this.italic}`);
    }

    close(): void {
        console.log('FontSettingsDialog closed!');
    }
}

abstract class Collegue {
    dialogMediator: DialogMediator;
    type: string;

    constructor(dialogMediator: DialogMediator) {
        this.dialogMediator = dialogMediator;
    }
}

abstract class DialogButton extends Collegue {
    type: string = 'button';
    text: string;
    code: string;

    constructor(dialogMediator: DialogMediator) {
        super(dialogMediator);
    }

    click(): void {
        this.dialogMediator.action(this);
    }
}

class OKDialogButton extends DialogButton {
    text: string = 'OK';
    code: string = 'OK';

    constructor(dialogMediator: DialogMediator) {
        super(dialogMediator);
    }
}

class CancelDialogButton extends DialogButton {
    text: string = 'Cancel';
    code: string = 'cancel';

    constructor(dialogMediator: DialogMediator) {
        super(dialogMediator);
    }
}

const fontDialog = new FontSettingsDialogMediator('Helvetica', 14, 300, false);
fontDialog.okButton.click();
