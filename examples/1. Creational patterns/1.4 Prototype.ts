abstract class Prototype {
    abstract clone(): Prototype;
}

interface LetterBlock {
    name?: string;
    text?: string;
    size?: number;
    formatting?: Formatting;
}

class LetterBlockPrototype extends Prototype implements LetterBlock {
    name: string;
    text: string;
    size: number;
    formatting: Formatting;

    readonly DEFAULT_NAME = 'sample_block';
    readonly DEFAULT_TEXT = 'Lorem Ipsum';
    readonly DEFAULT_SIZE = 14;
    readonly DEFAULT_FORMATTING = 'plain';
    readonly PLACEHOLDER_PREFIX = '\{\{ ';
    readonly PLACEHOLDER_SUFFIX = ' \}\}';

    constructor(name?: string, text?: string, size?: number, formatting?: Formatting) {
        super();
        this.name = name ?? this.DEFAULT_NAME;
        this.text = text ?? this.DEFAULT_TEXT;
        this.size = size ?? this.DEFAULT_SIZE;
        this.formatting = formatting ?? this.DEFAULT_FORMATTING;
    }

    static fromLetterBlock(block: LetterBlockPrototype): LetterBlockPrototype {
        return new LetterBlockPrototype(block.name, block.text, block.size, block.formatting);
    }

    clone(): LetterBlockPrototype {
        return LetterBlockPrototype.fromLetterBlock(this);
    }

    fillPlaceholders(placeholders: Placeholder[]): LetterBlockPrototype {
        const placeholderKeysInBlock = this.getBlockPlaceholderKeys();
        for (const key of placeholderKeysInBlock) {
            const placeholder = placeholders.filter(p => p.key === key).pop();
            if (!placeholder) continue;

            const placeholderText = this.PLACEHOLDER_PREFIX + placeholder.key + this.PLACEHOLDER_SUFFIX;
            this.text = this.text.replace(placeholderText, placeholder.value);
        }
        return this;
    }

    getBlockPlaceholderKeys(): string[] {
        const placeholderExtractor = new RegExp(`${this.PLACEHOLDER_PREFIX}(.+?)${this.PLACEHOLDER_SUFFIX}`, 'g');
        const decorationExtractor = new RegExp(`${this.PLACEHOLDER_PREFIX}|${this.PLACEHOLDER_SUFFIX}`, 'g');

        return (this.text.match(placeholderExtractor) || [])
            .map(key => key.replace(decorationExtractor, ''));
    }

    toString(): string {
        const output = { text: this.text, size: this.size, formatting: this.formatting };
        return JSON.stringify(output, null, 2);
    }
}

type Formatting = 'plain' | 'italic' | 'bold';
type Placeholder = { key: string, value: string };

class PrototypeLibrary {
    data: { [key: string]: Prototype };

    constructor() {
        this.data = {};
    }

    add(key: string, value: Prototype): void {
        this.data[key] = value;
    }

    pick(key: string): Prototype {
        return this.data[key];
    }

    remove(key: string): void {
        delete this.data[key];
    }
}

abstract class LetterComposer {
    library: PrototypeLibrary;
    placeholders: Placeholder[];
    composition: LetterBlockPrototype[];

    constructor(library: PrototypeLibrary) {
        this.library = library;
        this.placeholders = [];
        this.composition = [];
    }

    addPlaceholders(placeholders: Placeholder[]): void {
        this.placeholders = placeholders;
    }

    printLetter(): string {
        this.pickBlocks();
        this.fillPlaceholders();
        return this.toString();
    }

    pickBlocks(): void { };

    fillPlaceholders(): void {
        for (const block of this.composition) {
            block.fillPlaceholders(this.placeholders);
        }
    }

    toString(): string {
        const blocks = this.composition.map(block => block.toString());
        return blocks.join('\n\n');
    }
}

class JobApplicationLetterComposer extends LetterComposer {
    constructor(library: PrototypeLibrary) {
        super(library);
    }

    pickBlocks(): void {
        const greeting = this.loadLetterBlock('greeting_formal');
        const introduction = this.loadLetterBlock('introduction_formal');
        const offer = this.loadLetterBlock('offer_formal');
        const ending = this.loadLetterBlock('ending_formal');

        this.composition.push(greeting, introduction, offer, ending);
    }

    loadLetterBlock(key: string) {
        const block = this.library.pick(key);
        if (block instanceof LetterBlockPrototype) return block;
        return new LetterBlockPrototype();
    }
}

const letterBlocks: LetterBlock[] = [
    {
        name: 'greeting_formal',
        text: 'Dear {{ receiverName }},',
        size: 18,
        formatting: 'bold',
    },
    {
        name: 'introduction_formal',
        text: 'My name is {{ senderName }}. I am a middle backend developer (JS/TS) and data analyst (R/Python).',
    },
    {
        name: 'offer_formal',
        text: 'I want to apply for a {{ position }} position. I really like the mission of your {{ companyName }} and I am fascinated with the results your team achieved to the moment. I look forward to hearing from you soon!',
        formatting: 'italic',
    },
    {
        name: 'ending_formal',
        text: 'Sincerely,\n{{ senderName }}',
    },
];

const placeholders: Placeholder[] = [
    { key: 'receiverName', value: 'John Greenfield' },
    { key: 'senderName', value: 'Georgy Mishurovsky' },
    { key: 'position', value: 'Middle TS Developer' },
    { key: 'companyName', value: 'IQVIA' },
];

const library = new PrototypeLibrary();
for (const block of letterBlocks) {
    const prototype = new LetterBlockPrototype(block.name, block.text, block.size, block.formatting);
    library.add(prototype.name, prototype);
}

const composer = new JobApplicationLetterComposer(library);
composer.addPlaceholders(placeholders);
console.log(composer.printLetter());
