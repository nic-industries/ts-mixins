export default class LocalStorage {

  /**
   * @method LocalStorage.Write
   * @param key {string}
   * @param data {object|array}
   */

  static Write(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }


  /**
   * @method LocalStorage.Read
   * @param key {string}
   * @return object
   */

  static Read(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }


  /**
   * @method LocalStorage.Remove
   * @param key
   * @return boolean
   */

  static Remove(key: string) {
    return localStorage.removeItem(key);
  }

}
