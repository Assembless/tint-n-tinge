import { Theme, makePalette, Color } from './index';

const palette = makePalette({
    background: "#FFF",
    primary: "#99CC66",
    secondary: "#BD0000FF",
});

describe("Theme", () => {
    const theme = new Theme(palette);

    test('palette should not be empty', () => {
        expect(typeof theme.palette).toBe("object");
    });
})

describe("Color", () => {

    test('should return hex color.', () => {
        const redColor = new Color("#BD0000");
        //const greenColor = new Color("#9C6");

        expect(redColor.hex).toBe("#BD0000");
        //expect(greenColor.hex).toBe("#99CC66");
    });
})
