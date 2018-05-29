import ext from "./ext";

export class DomainGetter {
  /**
   * @private
   * @param {function({string})} callback - get back url
   * @returns {void}
   */
  static getPageDomain(callback) {
    DomainGetter.getPageUrl(function (url) {
      subdomain = subdomain || false;

      url = url.replace(/(https?:\/\/)?(www.)?/i, '');

      if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
      }

      if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
      }

      callback(url);
    });
  }


  /**
   * @private
   * @param {function({string})} callback - get back url
   * @returns {void}
   */
  static getPageUrl(callback) {
    /**
     * Script is loaded to popup and content script due to their different privalages this 'if statement' is neccessarily
     */
    if (ext.tabs && ext.tabs.getSelected) {
      ext.tabs.getSelected(null, function (tab) {
        callback(tab.url)
      });
    }
    else
      callback(location.href);
  }
}