import { Dictionary } from "./types";
import { Color, makePalette } from './Palette';

/**
 * Theme manager class.
 */
export class Theme<P extends Dictionary<string>> {
    readonly palette: { [key in keyof P]: Color };

    constructor(palette: P) {
        this.palette = makePalette(palette) as { [key in keyof P]: Color };
    }

    replaceColor(key: keyof P, color: string) {
        this.palette[key] = new Color(color);
    }
}