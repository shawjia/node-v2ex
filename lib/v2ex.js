/*
 * V2EX
 * https://github.com/shawjia/node-v2ex
 *
 * Copyright (c) 2012 shawjia
 * Licensed under the MIT license.
 */

var
  request = require('request'),
  cheerio = require('cheerio');

var getV2EX = function(node, callback){
  var url = 'http://www.v2ex.com/?tab=' + node;

  request(url, function(err, res, body){
    if (err) {
      callback(err);
      return;
    }

    var
      items = [],
      $     = cheerio.load(body);

    $('.item').each(function(i, ele){
      var
        self   = $(this),
        $title = self.find('.item_title'),
        $fade  = self.find('.fade'),
        item   = {};

      item.title  = $title.text();
      item.url    = $title.find('a').attr('href');
      item.id     = (item.url.match(/[0-9]+/))[0];
      item.url    = 'http://v2ex.com' + item.url;
      item.author = $fade.find('strong').eq(0).text();
      item.reply  = self.find('.count_livid').text() || '0';
      item.node   = $fade.find('.node').text();

      items.push(item);

    });

    callback(null, items);

  });
};

// 全部
exports.home = exports.all = function(callback){
  getV2EX('all', callback);
};
