export interface ITheme<P> {
    readonly palette: { [key in keyof P]: IColor };
    replaceColor: (key: keyof P, color: string) => void;
}

export interface IColor {
    readonly hex: string;
    readonly alpha: number;
    readonly rgb: IRGBColor;
    readonly invert: IColor;
    readonly contrast: IColor;
    opacity(alpha: number): string;
    lighten(percentage: number): IColor;
    darken(percentage: number): IColor;
}

export interface IRGBColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly alpha: number;
    toString(): string;
    opacity(alpha: number): string;
}

export type TThemePalette = {
    [key: string]: IColor;
};

export type Dictionary<T, K extends string = string> = {
    [key in K]: T
}