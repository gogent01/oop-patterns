abstract class Visitor {
    abstract visitHTML(html: CustomHTML): void;
    abstract endVisitHTML(html: CustomHTML): void;

    abstract visitHead(head: Head): void;
    abstract endVisitHead(head: Head): void;

    abstract visitTitle(meta: Title): void;

    abstract visitBody(body: Body): void;
    abstract endVisitBody(body: Body): void;

    abstract visitDiv(div: Div): void;
    abstract endVisitDiv(div: Div): void;

    abstract visitH1(h1: H1): void;
    abstract visitP(p: P): void;
    abstract visitImg(img: Img): void;
}

export class HTMLGeneratorVisitor extends Visitor {
    htmlStrings: string[];
    indentLevel: number;
    styles: string;

    constructor() {
        super();
        this.htmlStrings = [];
        this.indentLevel = 0;
        this.styles = '';
    }

    visitHTML(html: CustomHTML): void {
        this.htmlStrings.push('<!DOCTYPE html>');
        this.htmlStrings.push(this.makeOpenHTMLString(html, 'html'));
        this.indentLevel++;
    };

    endVisitHTML(html: CustomHTML): void {
        this.indentLevel--;
        this.htmlStrings.push(`${this.formatIndent()}</html>`);
    };

    visitHead(head: Head): void {
        this.htmlStrings.push(this.makeOpenHTMLString(head, 'head'));
        this.indentLevel++;
    };

    endVisitHead(head: Head): void {
        this.indentLevel--;
        this.htmlStrings.push(`${this.formatIndent()}</head>`);
    };

    visitTitle(title: Title): void {
        this.htmlStrings.push(this.makeClosedHTMLString(title, 'title'));
    };

    visitBody(body: Body): void {
        this.htmlStrings.push(this.makeOpenHTMLString(body, 'body'));
        this.indentLevel++;
    };

    endVisitBody(body: Body): void {
        this.indentLevel--;
        this.htmlStrings.push(`${this.formatIndent()}</body>`);
    };

    visitDiv(div: Div): void {
        this.htmlStrings.push(this.makeOpenHTMLString(div, 'div'));
        this.indentLevel++;
    };

    endVisitDiv(div: Div): void {
        this.indentLevel--;
        this.htmlStrings.push(`${this.formatIndent()}</div>`);
    };

    visitH1(h1: H1): void {
        this.htmlStrings.push(this.makeClosedHTMLString(h1, 'h1'));
    };

    visitP(p: P): void {
        this.htmlStrings.push(this.makeClosedHTMLString(p, 'p'));
    };

    visitImg(img: Img): void {
        this.htmlStrings.push(this.makeOpenHTMLString(img, 'img'));
    };

    makeOpenHTMLString(el: CustomHTMLElement, tag: string): string {
        const indent = this.formatIndent();
        const attributes = this.formatAttributes(el);
        const content = el.content;

        if (!attributes) return `${indent}<${tag}>${content}`;

        return `${indent}<${tag} ${attributes}>${content}`;
    }

    makeClosedHTMLString(el: CustomHTMLElement, tag: string): string {
        const closingTag = `</${tag}>`
        return this.makeOpenHTMLString(el, tag) + closingTag;
    }

    formatIndent(): string {
        return '\t'.repeat(this.indentLevel);
    }

    formatAttributes(el: CustomHTMLElement): string {
        const attributesArray = [];
        if (!!el.cl) attributesArray.push(`class="${el.cl}"`);
        if (!!el.id) attributesArray.push(`id="${el.id}"`);

        if (el instanceof Img) {
            if (!!el.src) attributesArray.push(`src="${el.src}"`);
            if (!!el.alt) attributesArray.push(`alt="${el.alt}"`);
        }

        return attributesArray.join(' ');
    }

    addStyles(styles: string): void {
        this.styles = styles;
    }

    getHTML(): string {
        return this.htmlStrings.join('\n') + '\n\n' + this.styles;
    }
}

interface CustomHTMLElementArgs {
    content?: string;
    id?: string;
    cl?: string;
}

interface ImgElementArgs extends CustomHTMLElementArgs {
    src: string;
    alt?: string;
}

abstract class CustomHTMLElement {
    content: string;
    id: string;
    cl: string;
    parent: CustomHTMLElement;
    children: CustomHTMLElement[];

    constructor(args: CustomHTMLElementArgs = {}) {
        this.content = args.content || '';
        this.id = args.id || '';
        this.cl = args.cl || '';
        this.parent = this;
        this.children = [];
    }

    addChild(el: CustomHTMLElement): void {
        el.setParent(this);
        this.children.push(el);
    }

    setParent(el: CustomHTMLElement): void {
        this.parent = el;
    }

    abstract accept(visitor: Visitor): void;
}

export class CustomHTML extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitHTML(this);

        for (const child of this.children) {
            child.accept(visitor);
        }

        visitor.endVisitHTML(this);
    }
}

export class Head extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitHead(this);

        for (const child of this.children) {
            child.accept(visitor);
        }

        visitor.endVisitHead(this);
    }
}

export class Title extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitTitle(this);
    }
}

export class Body extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitBody(this);

        for (const child of this.children) {
            child.accept(visitor);
        }

        visitor.endVisitBody(this);
    }
}

export class Div extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitDiv(this);

        for (const child of this.children) {
            child.accept(visitor);
        }

        visitor.endVisitDiv(this);
    }
}

export class H1 extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitH1(this);
    }
}

export class P extends CustomHTMLElement {
    constructor(args: CustomHTMLElementArgs = {}) {
        super(args);
    }

    accept(visitor: Visitor): void {
        visitor.visitP(this);
    }
}

export class Img extends CustomHTMLElement {
    src: string;
    alt: string;

    constructor(args: ImgElementArgs) {
        super(args);
        this.src = args.src;
        this.alt = args.alt || '';
    }

    accept(visitor: Visitor): void {
        visitor.visitImg(this);
    }
}
