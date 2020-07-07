/**
 * @class Data
 * @description TypeScript class for manipulating data objects.
 * @author Sebastian Inman <sebastian@nicindustries.com>
 * @copyright NIC Industries 2020
 */

export default class Data {


  /**
   * @method Data.Merge
   * @description Merges two data objects together into one object.
   * @param map
   * @param data
   */

  static Merge(map: {}, data: {}) {

    return {...map, ...data};

  }


  /**
   * @method Data.Filter
   * @description Filters a data object by key names.
   * @param data {}
   * @param whitelist []
   *
   * @example
   * let data = {id: 1, name: 'test', domain: 'test.com'};
   * let filter = Data.Filter(data, ['domain', 'name']);
   */

  static Filter(data: any, whitelist: any) {

    return Object.keys(data).filter(key =>
      whitelist.includes(key)).reduce((obj: {}, key: string) => {
      obj[key] = data[key];
      return obj;
    }, {});

  }

}