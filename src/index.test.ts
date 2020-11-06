import { Theme } from './index';
import { Color, RGBColor } from "./Palette";

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
        const color = new Color("#99CC66");
        const shortColor = new Color("#9C6");

        expect(color.hex).toBe("#99cc66");
        expect(shortColor.hex).toBe("#99cc66");
    });
    test('should return RGBColor object.', () => {
        const color = new Color("#99CC66");

        expect(color.rgb instanceof RGBColor).toBe(true);
    });
    test('should return alpha.', () => {
        const color = new Color("#99CC661A");

        expect(color.alpha).toBe(0.10);
    });
    test('should return hex with opaqueness.', () => {
        const color = new Color("#99CC66");

        expect(color.opaqueness(25)).toBe("#99cc6640");
    });
    test('should return lighten hex.', () => {
        const color = new Color("#99CC66");
        const whiteColor = new Color("#fff");

        expect(color.lighten(30).hex).toBe("#b7db94");
        expect(color.lighten(100).hex).toBe("#ffffff");

        expect(whiteColor.lighten(50).hex).toBe("#ffffff");
    });
    test('should return darken hex.', () => {
        const color = new Color("#99CC66");
        const blackColor = new Color("#000");

        expect(color.darken(30).hex).toBe("#7abc37");
        expect(color.darken(100).hex).toBe("#000000");

        expect(blackColor.darken(50).hex).toBe("#000000");
    });
})

describe("RGBColor", () => {

    test('should return rgb string.', () => {
        const color = new RGBColor(123, 42, 0);

        expect(color.toString()).toBe("rgb(123, 42, 0)");
    });
    test('should return rgb object.', () => {
        const color = new RGBColor(123, 42, 0, 0.5);

        expect(color.r).toBe(123);
        expect(color.g).toBe(42);
        expect(color.b).toBe(0);
        expect(color.alpha).toBe(0.5);
    });
})