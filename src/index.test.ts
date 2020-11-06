import { Theme, Color, RGBColor } from './index';

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
        expect(theme.palette.primary.hex).toBe("#99CC66");
        theme.replaceColor("primary", "#BD0000")
        expect(theme.palette.primary.hex).toBe("#BD0000");
    });
})

describe("Color", () => {
    
    test('should return hex color.', () => {
        const color = new Color("#99CC66");

        expect(color.hex).toBe("#99CC66");
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

        expect(color.opaqueness(25)).toBe("#99CC6640");
    });
})