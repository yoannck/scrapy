var request = require('request');
var cheerio = require('cheerio');
var Browser = require('zombie');

/**
 * Web Scraper
 * Author : Yoann Chane Kive
 */
module.exports = {
  extract: function(html, filter) {
    var datas = [];
    var $ = cheerio.load(html);
    $(filter).each(function() {
      var data = $(this);
      datas.push({text: data.text().replace(/\r?\n|\r/g,'').trim()});
    });
    return datas;
  },
  /**
   * Get datas from a URL with a parameter filter
   *
   * @param  {String} url
   * @param  {String} filter
   * @return {Promise}
   */
   get: function(url, filter) {
     return new Promise(function (success, reject){
       request(url, function(error, response, html) {
         if (!error) {
           success(extract(html, filter));
         } else {
           reject(err);
         }
       });
     });
   },
   /**
    * Get datas from a URL (Authentification Required) with a parameter filter
    *
    * @param {Object} parameters
    * @return {Promise}
    */
   getWithAuthentification: function(parameters) {
     return new Promise(function (success, reject){
       var browser = new Browser();
       browser.visit(parameters.login.url, function(){
         browser.fill(parameters.login.selectorUser, parameters.login.user)
           .fill(parameters.login.selectorPassword, parameters.login.password)
           .pressButton(parameters.login.selectorSubmit, function() {
               var datas = [];
               browser.visit(parameters.wanted.url, function(){
                 success(extract(browser.html(), parameters.wanted.filter));
                // reject(err);
               });
           });
       });
     });
   }
};
