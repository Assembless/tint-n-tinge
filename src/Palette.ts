import * as parseColor from 'color-parse';
import { invertColor, increase_brightness, decrease_brightness, hexAlphaMap, rgbToHex } from "./helpers";

/**
 * THE Color.
 * Has everything you need from a color.
 */
export class Color {
    private readonly value: [number, number, number];
    public readonly alpha: number;

    constructor(value: string) {
        const parsedColor = parseColor(value);
        this.value = parsedColor.values ?? [0, 0, 0];
        this.alpha = parsedColor.alpha ?? 1;

        if (this.value === null)
            throw new Error(`Expected a color value, got ${this.value}`);
    }

    /**
     * Returns hex color string.
     * @returns {string} "#99CC66"
     */
    get hex() {
        return rgbToHex(...this.value);
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
     * Returns RGB color object.
     * @example
     * const color = new Color("#9C6");
     * color.rgb.toString(); // rgb(153, 204, 102)
     */
    get rgb() {
        return {
            r: this.value[0],
            g: this.value[1],
            b: this.value[2],
            toRGBString: () => `rgb(${this.value[0]}, ${this.value[1]}, ${this.value[2]})`,
            toRGBAString: (opacity?: number) => `rgba(${this.value[0]}, ${this.value[1]}, ${this.value[2]}, ${opacity ?? this.alpha})`
        }
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