import { IRGBColor, IColor } from "./types";
import { hexToRgb, getAlphaFromHex, invertColor, increase_brightness, decrease_brightness, hexAlphaMap } from "./helpers";

/**
 * Implements rgb color api.
 */
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

    public toString() {
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

/**
 * THE Color.
 * Has everything you need from a color.
 */
export class Color implements IColor {
    private readonly value: string;

    constructor(value: string) {
        this.value = value.toLowerCase();

        if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(this.value))
            throw new Error(`Expected hex value, got ${this.value}`);
    }

    /**
     * Returns hex color string.
     * @example "#99CC66"
     */
    get hex() {
        let val = this.value;
        if (val.length === 9)
            return val.substring(0, val.length - 2);
        if (val.length === 4)
            return `#${val[1].repeat(2)}${val[2].repeat(2)}${val[3].repeat(2)}`//"#" + val.replace(/#/g, "").repeat(2); // ! This is so wrong...
        return val;
    }

    get invert() {
        return invertColor(this.hex);
    }

    /**
     * Returns RGBColor object.
     * @example
     * const color = new Color("#9C6");
     * color.rgb.toString(); // rgb(153, 204, 102)
     */
    get rgb() {
        const value = hexToRgb(this.hex);
        if (!value)
            return null;

        return new RGBColor(value.r, value.g, value.b);
    }

    get alpha() {
        const alpha = Math.round(getAlphaFromHex(this.value) * 100) / 100;

        if (alpha !== null || alpha !== undefined)
            return alpha;

        return 1;
    }

    public lighten(percentage: number) {
        if (percentage === 100) return new Color("#fff");
        return new Color(increase_brightness(this.hex, percentage));
    }

    public darken(percentage: number) {
        if (percentage === 100) return new Color("#000");
        return new Color(decrease_brightness(this.hex, percentage));
    }

    public opaqueness(alpha: keyof typeof hexAlphaMap) {
        return this.hex + (hexAlphaMap[Math.round(alpha) as keyof typeof hexAlphaMap]);
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