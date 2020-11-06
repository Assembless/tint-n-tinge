import { ITheme, IRGBColor, IColor, Dictionary } from "./types";
import { hexToRgb, getAlphaFromHex, invertColor } from "./helpers";

export class Theme<P extends Dictionary<string>> implements ITheme<P> {
    readonly palette: { [key in keyof P]: IColor };

    constructor(palette: P) {
        this.palette = makePalette(palette) as { [key in keyof P]: IColor };
    }

    replaceColor(key: keyof P, color: string) {
        this.palette[key] = new Color(color);
    }

    // addColor(key: string, color: IColor) {
    //     this.palette[key] = color;
    // }
}

const makePalette = <R, K extends keyof R>(
    rawPalette: { [key in K]: string }
) => {
    const parsedPalette = {} as { [key in K]: IColor };
    Object.keys(rawPalette).forEach(
        (key) => (parsedPalette[key as K] = new Color(rawPalette[key as K]))
    );

    return parsedPalette;
};

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
        const alpha = Math.round(getAlphaFromHex(this.value) * 100) / 100;

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

    public opaqueness(alpha: keyof typeof hexAlphaMap) {
        return this.hex + (hexAlphaMap[Math.round(alpha) as keyof typeof hexAlphaMap]);
    }
}

const hexAlphaMap = {
    100: "FF",
    99: "FC",
    98: "FA",
    97: "F7",
    96: "F5",
    95: "F2",
    94: "F0",
    93: "ED",
    92: "EB",
    91: "E8",
    90: "E6",
    89: "E3",
    88: "E0",
    87: "DE",
    86: "DB",
    85: "D9",
    84: "D6",
    83: "D4",
    82: "D1",
    81: "CF",
    80: "CC",
    79: "C9",
    78: "C7",
    77: "C4",
    76: "C2",
    75: "BF",
    74: "BD",
    73: "BA",
    72: "B8",
    71: "B5",
    70: "B3",
    69: "B0",
    68: "AD",
    67: "AB",
    66: "A8",
    65: "A6",
    64: "A3",
    63: "A1",
    62: "9E",
    61: "9C",
    60: "99",
    59: "96",
    58: "94",
    57: "91",
    56: "8F",
    55: "8C",
    54: "8A",
    53: "87",
    52: "85",
    51: "82",
    50: "80",
    49: "7D",
    48: "7A",
    47: "78",
    46: "75",
    45: "73",
    44: "70",
    43: "6E",
    42: "6B",
    41: "69",
    40: "66",
    39: "63",
    38: "61",
    37: "5E",
    36: "5C",
    35: "59",
    34: "57",
    33: "54",
    32: "52",
    31: "4F",
    30: "4D",
    29: "4A",
    28: "47",
    27: "45",
    26: "42",
    25: "40",
    24: "3D",
    23: "3B",
    22: "38",
    21: "36",
    20: "33",
    19: "30",
    18: "2E",
    17: "2B",
    16: "29",
    15: "26",
    14: "24",
    13: "21",
    12: "1F",
    11: "1C",
    10: "1A",
    9: "17",
    8: "14",
    7: "12",
    6: "0F",
    5: "0D",
    4: "0A",
    3: "08",
    2: "05",
    1: "03",
    0: "00",
}