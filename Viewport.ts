/**
 * @class Viewport
 * @description TypeScript methods for interacting with the viewport.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 * @constructor
 */

export default {


  /**
   * @method Viewport.Width
   * @description Determines the width of the screen viewport.
   * @return number
   */

  Width() {
    return window.innerWidth || document.documentElement.clientWidth;
  },


  /**
   * @method Viewport.Height
   * @description Determines the height of the screen viewport.
   * @return number
   */

  Height() {
    return window.innerHeight || document.documentElement.clientHeight;
  },


  /**
   * @method Viewport.ElementIsVisible
   * @description Determines if the provided element is visible within the viewport.
   * @param element
   * @return boolean
   */

  ElementIsVisible(element: any) {
    if(!element) return false;
    let bounds = element.getBoundingClientRect();

    return (
      bounds.top <= this.Height() &&
      bounds.left <= this.Width()
    );
  },


  /**
   * @method Viewport.ScrollTo
   * @description Scrolls the viewport to the provided position.
   * @param position
   * @param smooth
   * @constructor
   */

  ScrollTo(position: number, smooth: boolean = false) {
    return window.scroll({
      ...{top: position},
      ...smooth ? {behavior: "smooth"} : {}
    });
  }

}
