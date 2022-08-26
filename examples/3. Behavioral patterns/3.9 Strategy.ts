namespace Strategy {
    abstract class FormattingStrategy {
        abstract format(s: string, width: number): string[];
    }

    class FixedWidthFormattingStrategy extends FormattingStrategy {
        format(s: string, width: number): string[] {
            const result = [];
            let position = 0;

            do {
                result.push(s.slice(position, position + width));
                position += width;
            } while (position < s.length)

            return result;
        }
    }

    class CircleFormattingStrategy extends FormattingStrategy {
        format(s: string, width: number): string[] {
            const radius = this.radiusFromCircleArea(s.length);
            const contentLengthsByRows = this.stripAreas(radius);
            const padding = { x: 5, y: 2 };
            const canvasScheme = this.buildCanvasScheme(padding.x, padding.y, radius, contentLengthsByRows);

            return this.buildCanvas(canvasScheme, s, ' ');
        }

        radiusFromCircleArea(area: number): number {
            return Math.ceil(Math.sqrt(area / Math.PI));
        }

        stripAreas(radius: number): number[] {
            const upperHalfAreas = [];
            for (let i = 1; i <= radius; i++) {
                const stripArea = this.stripArea(radius - i, 1, radius);
                upperHalfAreas.push(stripArea);
            }

            return [...upperHalfAreas, ...(upperHalfAreas.reverse())];
        }

        stripArea(l: number, h: number, radius: number): number {
            const greaterSegmentArea = this.segmentArea(radius - l, radius);
            const lesserSegmentArea = this.segmentArea(radius - l - h, radius);

            return greaterSegmentArea - lesserSegmentArea;
        }

        segmentArea(sagitta: number, radius: number): number {
            const angle = this.sectorAngle(sagitta, radius);
            const sectorArea = this.sectorArea(angle, radius);
            const triangleArea = this.sectorTriangleArea(angle, radius);

            return sectorArea - triangleArea;
        }

        sectorAngle(sagitta: number, radius: number): number {
            const angleInRadians = Math.acos((radius - sagitta) / radius) * 2;

            return this.radiansToDegrees(angleInRadians);
        }

        radiansToDegrees(radians: number): number {
            return radians * 180 / Math.PI;
        }

        degreesToRadians(degrees: number): number {
            return degrees * (Math.PI / 180);
        }

        sectorArea(angle: number, radius: number): number {
            return angle / 360 * Math.PI * radius ** 2;
        }

        sectorTriangleArea(angle: number, radius: number) {
            const chord = this.chordLength(angle, radius);
            const l = this.lLength(angle, radius);

            return chord * l / 2;
        }

        chordLength(angle: number, radius: number) {
            return Math.sin(this.degreesToRadians(angle) / 2) * radius * 2;
        }

        lLength(angle: number, radius: number) {
            return Math.cos(this.degreesToRadians(angle) / 2) * radius;
        }

        buildCanvasScheme(paddingX: number, paddingY: number, radius: number, content: number[]): CanvasScheme {
            const canvasWidth = (radius + paddingX) * 2;

            const canvas = [];

            for (let i = 0; i < paddingY; i++) {
                const row = [];
                row.push({ kind: "space", length: canvasWidth } as CanvasSchemeSegment);
                canvas.push(row);
            }

            for (let i = 0; i < content.length; i++) {
                const row = [];
                const leftSpaceLength = Math.floor((canvasWidth - content[i]) / 2);
                const rightSpaceLength = Math.ceil((canvasWidth - content[i]) / 2);
                row.push({ kind: "space", length: leftSpaceLength } as CanvasSchemeSegment);
                row.push({ kind: "content", length: Math.floor(content[i]) } as CanvasSchemeSegment);
                row.push({ kind: "space", length: rightSpaceLength } as CanvasSchemeSegment);
                canvas.push(row);
            }

            for (let i = 0; i < paddingY; i++) {
                const row = [];
                row.push({kind: "space", length: canvasWidth} as CanvasSchemeSegment);
                canvas.push(row);
            }

            return canvas;
        }

        buildCanvas(canvasScheme: CanvasScheme, content: string, filler: string): string[] {
            let position = 0;

            return canvasScheme.map((row: CanvasSchemeRow): string => {
                let str = '';
                for (let i = 0; i < row.length; i++) {
                    const segment = row[i];
                    if (segment.kind === 'space') {
                        str += filler.repeat(segment.length)
                    } else if (segment.kind === 'content') {
                        let contentToAdd = content.slice(position, position + segment.length);
                        if (contentToAdd.length < segment.length) {
                            const postfixLength = segment.length - contentToAdd.length;
                            contentToAdd += filler.repeat(postfixLength);
                        }
                        str = str + contentToAdd;
                        position += segment.length;
                    }
                }
                return str;
            });
        }
    }

    type CanvasSchemeSegment = {
        kind: "space" | "content";
        length: number;
    }

    type CanvasSchemeRow = Array<CanvasSchemeSegment>;

    type CanvasScheme = Array<CanvasSchemeRow>;

    class Context {
        content: string;
        strategy: FormattingStrategy;

        constructor(content: string, strategy: FormattingStrategy) {
            this.content = content;
            this.strategy = strategy;
        }

        format(width?: number) {
            return this.strategy.format(this.content, width || 20);
        }
    }

    const content = '*'.repeat(1000);
    const strategy = new CircleFormattingStrategy();
    const context = new Context(content, strategy);
    const formatted = context.format(10);

    const html = `
        <html>
            <head>
                <title>Strategy Implementation Example</title>
            </head>
            <body>
                <p class="output" id="output"></p>
            </body>
        </html>
        <style>
            html {
                font-size: 16pt;
            }
            
            .output {
                white-space: pre;
                font-family: "Andale Mono", monospace;
                line-height: 0.8rem;
                letter-spacing: 0.25rem;
            }
        </style>
    `;

    document.write(html);
    const p = document.getElementById('output');
    p!.innerHTML = formatted.join('\n');
}

// TODO: front-end with custom inputs
