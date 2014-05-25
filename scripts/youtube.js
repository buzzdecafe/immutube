/* global define */
define([
  'jquery'
, 'ramda'
, 'http'
], function($, _, http) {
  'use strict';

  var prop = _.prop
    , split = _.split
    , last = function(s) { return s[s.length - 1]; }
    , compose = _.compose
    , fmap = _.map;

  // type Term = {q: String}
  // type Selector = String

  //+ searchUrl :: Term -> URL
  var searchUrl = function(t) { return 'http://gdata.youtube.com/feeds/api/videos?' + $.param(t) + '&alt=json'; };

  //+ search :: Term -> Future JSON
  var search = compose(http.getJSON, searchUrl)

  //+ getTitle :: {title: {$t: String}} -> String
  var getTitle = compose(prop('$t'), prop('title'));
  var getId    = compose(last, split('/'), prop('$t'), prop('id'));

  var toLi = function(t) { return $('<li/>', {text: getTitle(t), 'data-youtubeid': getId(t)}); };

  //+ render :: JSON -> HTML
  var render = compose(fmap(toLi), prop('entry'), prop('feed'));

  //+ displayResults :: Selector -> Term -> Future HTML
  var displayResults = compose(fmap(render), search);

  return displayResults;
});

