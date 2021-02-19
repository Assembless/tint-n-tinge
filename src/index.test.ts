import { Theme } from './index';
import { Color } from "./Palette";

const palette = {
    background: "#FFF",
    primary: "#99CC66",
    secondary: "#BD0000FF",
};

describe("Theme", () => {
    const theme = new Theme(palette);

    test('palette should not be empty', () => {
        expect(typeof theme.palette).toBe("object");
    });

    test('should replace color', () => {
        expect(theme.palette.primary.hex).toBe("#99cc66");
        theme.replaceColor("primary", "#BD0000")
        expect(theme.palette.primary.hex).toBe("#bd0000");
    });
})

describe("Color", () => {
    
    test('should return hex color.', () => {
        expect(new Color("#99CC66").hex).toBe("#99cc66");
        expect(new Color("#9C6").hex).toBe("#99cc66");
    });
    test('should return RGBColor object.', () => {
        expect(new Color("#99CC66").rgb instanceof Object).toBe(true);
    });
    test('should return alpha.', () => {
        expect(new Color("#99CC661A").alpha).toBe(0.10196078431372549);
    });
    test('should return hex without alpha.', () => {
        expect(new Color("#99CC661A").hex).toBe("#99cc66");
    });
    test('should return contrast.', () => {
        expect(new Color("#99CC66").contrast.hex).toBe("#ffffff");
        expect(new Color("#BD0000").contrast.hex).toBe("#ffffff");
        expect(new Color("#FAFAFA").contrast.hex).toBe("#000000");
    });
    test('should return hex with opacity.', () => {
        expect(new Color("#99CC66").opacity(25)).toBe("#99cc6640");
    });
    test('should return lighten hex.', () => {
        const color = new Color("#99CC66");

        expect(color.lighten(30).hex).toBe("#b7db94");
        expect(color.lighten(100).hex).toBe("#ffffff");

        expect(new Color("#fff").lighten(50).hex).toBe("#ffffff");
    });
    test('should return darken hex.', () => {
        const color = new Color("#99CC66");

        expect(color.darken(30).hex).toBe("#7abc37");
        expect(color.darken(100).hex).toBe("#000000");

        expect(new Color("#000").darken(50).hex).toBe("#000000");
    });
    test('should accept return rgb string.', () => {
        const color = new Color('rgb(123, 42, 0)');

        expect(color.rgb.toRGBString()).toBe("rgb(123, 42, 0)");
    });
    test('should return rgb object.', () => {
        const color = new Color('rgba(123, 42, 0, 0.5)');

        expect(color.rgb.r).toBe(123);
        expect(color.rgb.g).toBe(42);
        expect(color.rgb.b).toBe(0);
        expect(color.alpha).toBe(0.5);
    });
    test('should accept hsl and parse to rgb.', () => {
        const color = new Color('hsla(12 10% 50% / .3)');

        expect(color.rgb.toRGBAString()).toBe("rgba(12, 10, 50, 0.3)");

        expect(color.rgb.r).toBe(12);
        expect(color.rgb.g).toBe(10);
        expect(color.rgb.b).toBe(50);
        expect(color.alpha).toBe(0.3);
    });
})