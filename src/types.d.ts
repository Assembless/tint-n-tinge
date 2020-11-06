export interface ITheme {
    readonly palette: TColorPalette;
}

export interface IColor {
    readonly hex: string;
    readonly alpha: number;
    readonly rgb: { r: number; g: number; b: number } | null;
    readonly invert: string;
    readonly light: string;
    readonly dark: string;
    opaqueness(alpha: number): string;
}

export interface IRGBColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly alpha: number;
    readonly toString: string;
    opaqueness(alpha: number): string;
}

export type TColorPalette = {
    [key: string]: IColor;
};