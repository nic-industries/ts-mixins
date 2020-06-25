/**
 * @class Color
 * @description TypeScript class for handling color formats.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 */

export default class Color {


  /**
   * @method Color.Format
   * @description Determines the format of a color.
   * @param color
   * @param format
   * @constructor
   */

  static Format(color: any, format: "rgba"|"rgb"|"hex") {

    if(typeof color == "string") {

      if(String(color).startsWith("rgba(")) {
        color = Color.StringToRGBA(color);
        if(format == "rgba") color = Color.StringToRGBA(color);
        if(format == "rgb")  color = Color.RGBAToRGB(color);
        if(format == "hex")  color = Color.RGBAToHex(color);
      }

      if(String(color).startsWith("rgb(")) {
        color = Color.StringToRGB(color);
        if(format == "rgba") color = Color.RGBToRGBA(color);
        if(format == "rgb")  color = Color.StringToRGB(color);
        if(format == "hex")  color = Color.RGBToHex(color);
      }

      if(String(color).startsWith("#")) {
        if(format == "rgba") color = Color.HexToRGBA(color);
        if(format == "rgb")  color = Color.HexToRGB(color);
      }

    }

    if(Array.isArray(color)) {

      if (Object.keys(color).length == 4) {
        if(format == "rgb") color = Color.RGBAToRGB(color);
        if(format == "hex") color = Color.RGBAToHex(color);
      }

      if (Object.keys(color).length == 3) {
        if(format == "rgba") color = Color.RGBToRGBA(color);
        if(format == "hex")  color = Color.RGBToHex(color);
      }

    }

    return color;

  }


  /**
   * @method Color.StringToRGB
   * @description Converts a color string to RGB format.
   * @param color
   * @constructor
   */

  static StringToRGB(color: string) {

    color = color.replace("rgb(", "");
    color = color.replace(")",    "");
    color = color.replace(" ",    "");

    let rgb: number[] = [];
    Object.values(color.split(",")).map(i => rgb.push(+i));

    return rgb;

  }


  /**
   * @method Color.StringToRGBA
   * @description Converts a color string to RGBA format.
   * @param color
   * @constructor
   */

  static StringToRGBA(color: string) {

    color = color.replace("rgba(", "");
    color = color.replace(")",     "");
    color = color.replace(" ",     "");

    let rgba: number[] = [];
    Object.values(color.split(",")).map(i => rgba.push(+i));

    return rgba;

  }


  /**
   * @method Color.HexToRGB
   * @description Converts a hexadecimal color to RGB format.
   * @param hex
   * @constructor
   */

  static HexToRGB(hex: string) {

    let rgb: number[] = [0, 0, 0];

    hex = hex.replace(/[^a-zA-Z0-9]/g, '');

    if(hex.length == 3) {
      rgb[0] = +`0x${hex[0]}${hex[0]}`;
      rgb[1] = +`0x${hex[1]}${hex[1]}`;
      rgb[2] = +`0x${hex[2]}${hex[2]}`;
    }else if(hex.length == 6) {
      rgb[0] = +`0x${hex[0]}${hex[1]}`;
      rgb[1] = +`0x${hex[2]}${hex[3]}`;
      rgb[2] = +`0x${hex[4]}${hex[5]}`;
    }

    return rgb;

  }


  /**
   * @method Color.RGBToHex
   * @description Converts an RGB number to hexadecimal format.
   * @param rgb
   * @constructor
   */

  static RGBToHex(rgb: number[]) {

    let r: string = rgb[0].toString(16);
    let g: string = rgb[1].toString(16);
    let b: string = rgb[2].toString(16);

    if(r.length == 1) r = `0${r}`;
    if(g.length == 1) g = `0${g}`;
    if(b.length == 1) b = `0${b}`;

    return String(`#${r}${g}${b}`).toUpperCase();

  }


  /**
   * @method Color.HexToRGBA
   * @description Converts a hexadecimal color to RGBA format.
   * @param hex
   * @param alpha
   * @constructor
   */

  static HexToRGBA(hex: string, alpha: number = 1) {

    return [...Color.HexToRGB(hex), alpha];

  }


  /**
   * @method Color.RGBAToHex
   * @description Converts an RGBA number to hexadecimal format.
   * @param rgba
   * @constructor
   */

  static RGBAToHex(rgba: number[]) {

    let rgb: any = Color.RGBAToRGB(rgba);

    return Color.RGBToHex(rgb);

  }


  /**
   * @method Color.RGBToRGBA
   * @description Converts an RGB number to RGBA format.
   * @param rgb
   * @param alpha
   * @constructor
   */

  static RGBToRGBA(rgb: number[], alpha: number = 1) {

    return [...rgb, alpha];

  }


  /**
   * @method Color.RGBAToRGB
   * @description Converts an RGBA color to RGB format.
   * @param rgba
   * @constructor
   */

  static RGBAToRGB(rgba: number[]) {

    return [rgba[0], rgba[1], rgba[2]];

  }


  /**
   * @method Color.Brightness
   * @description Determines the "brightness" of a color.
   * @reference http://alienryderflex.com/hsp.html
   * @param color
   * @constructor
   */

  static Brightness(color: any) {

    let rgb = Color.Format(color, "rgb");

    let r: number = 0.299 * (rgb[0] * rgb[0]);
    let g: number = 0.587 * (rgb[1] * rgb[1]);
    let b: number = 0.114 * (rgb[2] * rgb[2]);

    let hsp: number = Math.sqrt(r + g + b);

    return hsp > 127.5 ? "light" : "dark";

  }


  /**
   * @method Color.IsDark
   * @description Determines if the color is dark.
   * @param color
   * @returns boolean
   */

  static IsDark(color: any) {
    return Color.Brightness(color) == "dark";
  }


  /**
   * @method Color.IsLight
   * @description Determines if the color is light.
   * @param color
   * @returns boolean
   */

  static IsLight(color: any) {
    return Color.Brightness(color) == "light";
  }

}