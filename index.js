
var request = require('request');
var cheerio = require('cheerio');

/**
 * Web Scraper
 */
module.exports = {
  /**
   * Get data from a URL with a parameter filter
   *
   * @param  {String} url
   * @param  {String} filter
   * @return {String}
   */
  get: function(url, filter) {

    /* Magic HERE */

    request(url, function(error, response, html) {
      if (!error) {
        var $ = cheerio.load(html);
        var name, release, rating;
        var json = { name : ""};

        filter = '.title';

        $(filter).each(function() {

          var data = $(this);

          console.log(data.text());

          // title = data.children().first().text();
          // name = data.text();
          // json.name = name;

        })
        res.send('OK LET CHECK IT !');
      } else {
        res.send('OHHHHH ERROR !');
      }
    });

    return String(url);
  }

};
