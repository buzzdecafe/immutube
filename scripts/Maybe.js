define([], function() {
  'use strict';
  function isNil(x) {
    return x === null || x === undefined || x !== x;
  }

  function Maybe(x) {
    this.value = x;
  }

  Maybe.of = function(x) {
    return new Maybe(x);
  };

  Maybe.prototype.map = function(f) {
    return isNil(this.value) ? this : new Maybe(f(this.value));
  };

  Maybe.prototype.of = Maybe.of;

  return Maybe.of;


});

