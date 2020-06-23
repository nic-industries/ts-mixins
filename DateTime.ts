/**
 * @class DateTime
 * @description TypeScript class for validating input values.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 * @constructor
 */

export default class DateTime {

  public now: Date;

  constructor() {

    this.now = new Date();

  }


  /**
   * @method DateTime.TimeRemaining
   * @description Calculates the amount of time remaining between two dates.
   * @param future <Date>
   * @return boolean | object
   */

  public TimeRemaining(future: Date) {

    // Calculate delta between two dates.
    let delta = Math.abs(future.getTime() - this.now.getTime()) / 1000;

    // Calculate number of days.
    let dd = Math.floor(delta / 86400);
    delta -= dd * 86400;

    // Calculate number of hours.
    let hh = Math.floor(delta / 3600) % 24;
    delta -= hh * 3600;

    // Calculate number of minutes.
    let mm = Math.floor(delta / 60) % 60;
    delta -= mm * 60;

    // Calculate number of seconds.
    let ss = Math.floor(delta % 60);

    return (dd == 0 && hh == 0 && mm == 0 && ss <= 0) ? false : { dd, hh, mm, ss };

  }

}