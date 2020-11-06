import { ITheme, TColorPalette, IRGBColor, IColor } from "./types";
import { hexToRgb, getAlphaFromHex, invertColor } from "./helpers";

export class Theme implements ITheme {
    readonly palette: TColorPalette;

    constructor(palette: TColorPalette) {
        this.palette = palette;
    }
}

export class RGBColor implements IRGBColor {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;
    public readonly alpha: number;

    constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = a;
    }

    // @ts-ignore
    get toString() {
        const format = this.alpha < 1 ? "rgba" : "rgb";
        const colorString = `${this.r}, ${this.g}, ${this.b}`;
        const alphaString = this.alpha < 1 ? `, ${this.alpha}` : "";

        return `${format}(${colorString}${alphaString})`;
    }

    public opaqueness(alpha: number) {
        const colorString = `${this.r}, ${this.g}, ${this.b}`;

        return `rgba(${colorString}, ${alpha})`;
    }
}

export class Color implements IColor {
    private readonly value: string;

    constructor(value: string) {
        this.value = value;

        if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(this.value))
            throw new Error(`Expected hex value, got ${this.value}`);
    }

    // @ts-ignore
    get hex() {
        let val = this.value;
        // @ts-ignore
        if (val.length === 9) return val.substring(0, val.length - 2);
        if (val.length === 4) return "#" + val.replace(/#/g, "").repeat(2);
        return val;
    }

    // @ts-ignore
    get invert() {
        return invertColor(this.hex);
    }

    // @ts-ignore
    get rgb() {
        const value = hexToRgb(this.hex);
        if (!value) return null;

        return new RGBColor(value.r, value.g, value.b);
    }

    // @ts-ignore
    get alpha() {
        const alpha = getAlphaFromHex(this.value);

        if (alpha !== null || alpha !== undefined) return alpha;

        return 1;
    }

    // @ts-ignore
    get light() {
        return this.hex;
    }

    // @ts-ignore
    get dark() {
        return this.hex;
    }

    public opaqueness(alpha: number) {
        return this.hex + (alpha * 255).toString(16).toUpperCase();
    }
}

export const makePalette = <R, K extends keyof R>(
    rawPalette: { [key in K]: string }
) => {
    const parsedPalette = {} as { [key in K]: IColor };
    Object.keys(rawPalette).forEach(
        (key) => (parsedPalette[key as K] = new Color(rawPalette[key as K]))
    );

    return parsedPalette;
};