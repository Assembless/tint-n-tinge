import { ITheme, IColor, Dictionary } from "./types";
import { Color, makePalette } from './Palette';

export class Theme<P extends Dictionary<string>> implements ITheme<P> {
    readonly palette: { [key in keyof P]: IColor };

    constructor(palette: P) {
        this.palette = makePalette(palette) as { [key in keyof P]: IColor };
    }

    replaceColor(key: keyof P, color: string) {
        this.palette[key] = new Color(color);
    }
}