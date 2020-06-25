/**
 * @class Styles
 * @description TypeScript class for handling styles.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 */

export default class Styles {


  /**
   * @method Styles.RootVarExists
   * @description Checks if a CSS root variable is defined.
   * @param property
   * @returns boolean
   */

  public static RootVarExists(property: string) {

    return getComputedStyle(document.documentElement).getPropertyValue(property) || false;

  }


  /**
   * @method Styles.RootVar
   * @description Returns the requested CSS root variable value.
   * @param property
   * @returns boolean
   */

  public static RootVar(property: string) {

    return getComputedStyle(document.documentElement).getPropertyValue(property) || undefined;

  }

}
