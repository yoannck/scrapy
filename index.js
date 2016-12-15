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
   * @return {Array}
   */
  get: function(url, filter) {
    request(url, function(error, response, html) {
      var datas = [];
      if (!error) {
        var $ = cheerio.load(html);
        $(filter).each(function() {
          var data = $(this);
          datas.push({text: data.text()});
        })
      }
      return datas;
    });
  }
};
