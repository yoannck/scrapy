var request = require('request');
var cheerio = require('cheerio');

/**
 * Web Scraper
 */
module.exports = {
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
           var datas = [];
           var $ = cheerio.load(html);
           $(filter).each(function() {
             var data = $(this);
             datas.push({text: data.text().replace(/\r?\n|\r/g,'')});
           })
           success(datas);
         } else {
           reject(err);
         }
       });
     });
   }
};
