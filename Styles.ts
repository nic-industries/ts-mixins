/**
 * @class Styles
 * @description TypeScript class for handling styles.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 */

export default class Styles {

  root: any = getComputedStyle(document.documentElement);


  /**
   * @method Styles.RootVarExists
   * @description Checks if a CSS root variable is defined.
   * @param property
   * @returns boolean
   */

  public RootVarExists(property: string) {

    return this.root.getPropertyValue(property) || false;

  }


  /**
   * @method Styles.RootVar
   * @description Returns the requested CSS root variable value.
   * @param property
   * @returns boolean
   */

  public RootVar(property: string) {

    return this.root.getPropertyValue(property) || undefined;

  }

}
