export interface ITheme<P> {
    readonly palette: { [key in keyof P]: IColor };
    replaceColor: (key: keyof P, color: string) => void;
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

export type TThemePalette = {
    [key: string]: IColor;
};

export type Dictionary<T, K extends string = string> = {
    [key in K]: T
}