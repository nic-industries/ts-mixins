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
   * @method Viewport.ScrollPercentage
   * @description Determines the percentage of the screen scrolled.
   * @reference https://stackoverflow.com/a/8028584
   * @return number
   */

  ScrollPercentage() {

    let h = document.documentElement;
    let b = document.body;

    let st = 'scrollTop';
    let sh = 'scrollHeight';

    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;

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
   */

  ScrollTo(position: number, smooth: boolean = false) {

    return window.scroll({
      ...{top: position},
      ...smooth ? {behavior: "smooth"} : {}
    });

  },


  /**
   * @method Viewport.ScrollToElement
   * @description Scrolls the viewport to the provided element.
   * @param elementID
   * @param smooth
   */

  ScrollToElement(elementID: string, smooth: boolean = true) {

    let element = document.getElementById(elementID);

    if(!element) return false;
    let bounds = element.getBoundingClientRect();

    this.ScrollTo(bounds.top, smooth);

  }

}
