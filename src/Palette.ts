import { hexToRgb, getAlphaFromHex, invertColor, increase_brightness, decrease_brightness, hexAlphaMap } from "./helpers";

/**
 * Implements rgb color api.
 */
export class RGBColor {
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

/**
 * Returns a string ready to be passed to CSS.
 * @returns {string} eg. "rgb(123, 43, 23)"
 */
    public toString() {
        const format = this.alpha < 1 ? "rgba" : "rgb";
        const colorString = `${this.r}, ${this.g}, ${this.b}`;
        const alphaString = this.alpha < 1 ? `, ${this.alpha}` : "";

        return `${format}(${colorString}${alphaString})`;
    }


    /**
     * Returns rgba value.
     * @param alpha A number from 0 to 1.
     * @returns {string}
     * @example 
     * const color = new RGBColor(12, 13, 16);
     * 
     * color.opacity(0.5); // "rgba(12, 13, 16, 0.5)"
     */
    public opacity(alpha: number) {
        const colorString = `${this.r}, ${this.g}, ${this.b}`;

        return `rgba(${colorString}, ${alpha})`;
    }
}

/**
 * THE Color.
 * Has everything you need from a color.
 */
export class Color {
    private readonly value: string;

    constructor(value: string) {
        this.value = value.toLowerCase();

        if (!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(this.value))
            throw new Error(`Expected hex value, got ${this.value}`);
    }

    /**
     * Returns hex color string.
     * @returns {string} "#99CC66"
     */
    get hex() {
        let val = this.value;
        if (val.length === 9)
            return val.substring(0, val.length - 2);
        if (val.length === 4)
            return `#${val[1].repeat(2)}${val[2].repeat(2)}${val[3].repeat(2)}`//"#" + val.replace(/#/g, "").repeat(2); // ! This is so wrong...
        return val;
    }

/**
 * Inverts current color.
 * @returns {IColor}
 */
    get invert() {
        return new Color(invertColor(this.hex));
    }

    /**
     * Returns contrasting color. Returns #000 or #fff depending on the calculated color brightness.
     * @returns {IColor}
     */
    get contrast() {
        return (this.rgb.r * 0.299 + this.rgb.g * 0.587 + this.rgb.b * 0.114) > 186 ?
            new Color("#000") : new Color("#FFF");
    }

    /**
     * Returns RGBColor object.
     * @returns {RGBColor}
     * @example
     * const color = new Color("#9C6");
     * color.rgb.toString(); // rgb(153, 204, 102)
     */
    get rgb() {
        const value = hexToRgb(this.hex);

        if (!value)
            throw new Error(`There was an error while converting hex to rgb.`);

        return new RGBColor(value.r, value.g, value.b);
    }

/**
 * Returns alpha from provided hex. (from 0 to 1)
 * @returns {number}
 */
    get alpha() {
        const alpha = Math.round(getAlphaFromHex(this.value) * 100) / 100;

        if (alpha !== null || alpha !== undefined)
            return alpha;

        return 1;
    }

/**
 * Increases brightness of the color.
 * @param percentage A number from 0 to 100.
 * @returns {IColor}
 * @example
 * const color = new Color("#9C6");
 *
 * color.darken(30).hex; // "#b7db94"
 */
    public lighten(percentage: number) {
        if (percentage === 100) return new Color("#fff");
        return new Color(increase_brightness(this.hex, percentage));
    }

/**
 * Decreases brightness of the color.
 * @param percentage A number from 0 to 100.
 * @returns {IColor}
 * @example
 * const color = new Color("#9C6");
 *
 * color.darken(30).hex; // "#7abc37"
 */
    public darken(percentage: number) {
        if (percentage === 100) return new Color("#000");
        return new Color(decrease_brightness(this.hex, percentage));
    }

    /**
     * Appends hex alpha at the end.
     * @param alpha A number from 0 to 1.
     * @returns {string}
     * @example 
     * const color = new Color("#9C6");
     * 
     * color.opacity(0.5); // "#99cc6640"
     */
    public opacity(alpha: keyof typeof hexAlphaMap) {
        return this.hex + (hexAlphaMap[Math.round(alpha) as keyof typeof hexAlphaMap]);
    }
}


export const makePalette = <R, K extends keyof R>(
    rawPalette: { [key in K]: string }
) => {
    const parsedPalette = {} as { [key in K]: Color };
    Object.keys(rawPalette).forEach(
        (key) => (parsedPalette[key as K] = new Color(rawPalette[key as K]))
    );

    return parsedPalette;
};