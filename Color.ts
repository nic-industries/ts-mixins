/**
 * @class Color
 * @description TypeScript class for handling color formats.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 */

export default class Color {


  /**
   * @method Color.Format
   * @description Determines the format of the color.
   * @param color
   * @returns string|undefined
   */

  public static Format(color: any) {

    let format: string|undefined = undefined;

    if(typeof color == "string") {
      color = color.replace(" ", "");
      if(String(color).startsWith("rgba(")) format = "rgba";
      if(String(color).startsWith("rgb("))  format = "rgb";
      if(String(color).startsWith("#"))     format = "hex";
    }

    if(Array.isArray(color)) {
      if (Object.keys(color).length == 4) format = "rgba";
      if (Object.keys(color).length == 3) format = "rgb";
    }

    return format;

  }


  /**
   * @method Color.Convert
   * @description Converts the color into the requested format.
   * @param color
   * @param format
   * @param alpha
   * @returns string|number[]
   */

  public static Convert(color: any, format: "rgba"|"rgb"|"hex", alpha: number = 1) {

    if(typeof color == "string") {

      color = color.replace(" ", "");

      if(String(color).startsWith("rgba(")) {
        color = Color.STR_RGBA(color);
        if(format == "rgb")  color = Color.RGBA_RGB(color);
        if(format == "hex")  color = Color.RGBA_HEX(color);
      }

      if(String(color).startsWith("rgb(")) {
        color = Color.STR_RGB(color);
        if(format == "rgba") color = Color.RGB_RGBA(color, alpha);
        if(format == "hex")  color = Color.RGB_HEX(color);
      }

      if(String(color).startsWith("#")) {
        if(format == "rgba") color = Color.HEX_RGBA(color, alpha);
        if(format == "rgb")  color = Color.HEX_RGB(color);
      }

    }

    if(Array.isArray(color)) {

      if (Object.keys(color).length == 4) {
        if(format == "rgb") color = Color.RGBA_RGB(color);
        if(format == "hex") color = Color.RGBA_HEX(color);
      }

      if (Object.keys(color).length == 3) {
        if(format == "rgba") color = Color.RGB_RGBA(color, alpha);
        if(format == "hex")  color = Color.RGB_HEX(color);
      }

    }

    return color;

  }


  /**
   * @method Color.STR_RGB
   * @description Converts a color string to RGB format.
   * @param color
   * @returns number[]
   */

  private static STR_RGB(color: string) {

    color = color.replace("rgb(", "");
    color = color.replace(")",    "");
    color = color.replace(" ",    "");

    let rgb: number[] = [];
    Object.values(color.split(",")).map(i => rgb.push(+i));

    return rgb;

  }


  /**
   * @method Color.STR_RGBA
   * @description Converts a color string to RGBA format.
   * @param color
   * @returns number[]
   */

  private static STR_RGBA(color: string) {

    color = color.replace("rgba(", "");
    color = color.replace(")",     "");
    color = color.replace(" ",     "");

    let rgba: number[] = [];
    Object.values(color.split(",")).map(i => rgba.push(+i));

    return rgba;

  }


  /**
   * @method Color.HEX_RGB
   * @description Converts a hexadecimal color to RGB format.
   * @param hex
   * @returns number[]
   */

  private static HEX_RGB(hex: string) {

    let rgb: number[] = [0, 0, 0];

    hex = hex.replace(/[^a-zA-Z0-9]/g, '');

    if(hex.length == 3) {
      rgb[0] = +`0x${hex[0]}${hex[0]}`;
      rgb[1] = +`0x${hex[1]}${hex[1]}`;
      rgb[2] = +`0x${hex[2]}${hex[2]}`;
    }

    if(hex.length == 6) {
      rgb[0] = +`0x${hex[0]}${hex[1]}`;
      rgb[1] = +`0x${hex[2]}${hex[3]}`;
      rgb[2] = +`0x${hex[4]}${hex[5]}`;
    }

    return rgb;

  }


  /**
   * @method Color.RGB_HEX
   * @description Converts an RGB number to hexadecimal format.
   * @param rgb
   * @returns string
   */

  private static RGB_HEX(rgb: number[]) {

    let r: string = rgb[0].toString(16);
    let g: string = rgb[1].toString(16);
    let b: string = rgb[2].toString(16);

    if(r.length == 1) r = `0${r}`;
    if(g.length == 1) g = `0${g}`;
    if(b.length == 1) b = `0${b}`;

    return String(`#${r}${g}${b}`).toUpperCase();

  }


  /**
   * @method Color.HEX_RGBA
   * @description Converts a hexadecimal color to RGBA format.
   * @param hex
   * @param alpha
   * @returns number[]
   */

  private static HEX_RGBA(hex: string, alpha: number = 1) {

    return [...Color.HEX_RGB(hex), alpha];

  }


  /**
   * @method Color.RGBA_HEX
   * @description Converts an RGBA number to hexadecimal format.
   * @param rgba
   * @returns string
   */

  private static RGBA_HEX(rgba: number[]) {

    return Color.RGB_HEX(Color.RGBA_RGB(rgba));

  }


  /**
   * @method Color.RGB_RGBA
   * @description Converts an RGB number to RGBA format.
   * @param rgb
   * @param alpha
   * @returns number[]
   */

  private static RGB_RGBA(rgb: number[], alpha: number = 1) {

    return [...rgb, alpha];

  }


  /**
   * @method Color.RGBA_RGB
   * @description Converts an RGBA color to RGB format.
   * @param rgba
   * @returns number[]
   */

  private static RGBA_RGB(rgba: number[]) {

    return [rgba[0], rgba[1], rgba[2]];

  }


  /**
   * @method Color.Brightness
   * @description Determines the "brightness" of a color.
   * @reference http://alienryderflex.com/hsp.html
   * @param color
   * @returns "light" | "dark"
   */

  private static Brightness(color: any) {

    let rgb = Color.Convert(color, "rgb");

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

  public static IsDark(color: any) {

    return Color.Brightness(color) == "dark";

  }


  /**
   * @method Color.IsLight
   * @description Determines if the color is light.
   * @param color
   * @returns boolean
   */

  public static IsLight(color: any) {

    return Color.Brightness(color) == "light";

  }

}
