import { BaseCreator } from './base-creator';

/**
 * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
 * This means that if you have an Account that then has a set of Buildings, a URL to a building
 * would be /accounts/123/buildings/456
 **/
export const Path = function() {};

Path.prototype = new BaseCreator();

Path.prototype.normalizeUrl = function(url) {
  var parts = /((?:http[s]?:)?\/\/)?(.*)?/.exec(url);
  parts[2] = parts[2].replace(/[\\\/]+/g, '/');
  return (typeof parts[1] !== 'undefined') ? parts[1] + parts[2] : parts[2];
};

Path.prototype.base = function(current) {
  var __this = this;
  return _.reduce(this.parentsArray(current), function(acum, elem) {
    var elemUrl;
    var elemSelfLink = __this.config.getUrlFromElem(elem);
    if (elemSelfLink) {
      if (__this.config.isAbsoluteUrl(elemSelfLink)) {
        return elemSelfLink;
      } else {
        elemUrl = elemSelfLink;
      }
    } else {
      elemUrl = elem[__this.config.restangularFields.route];

      if (elem[__this.config.restangularFields.restangularCollection]) {
        var ids = elem[__this.config.restangularFields.ids];
        if (ids) {
          elemUrl += '/' + ids.join(',');
        }
      } else {
        var elemId;
        if (__this.config.useCannonicalId) {
          elemId = __this.config.getCannonicalIdFromElem(elem);
        } else {
          elemId = __this.config.getIdFromElem(elem);
        }

        if (__this.config.isValidId(elemId) && !elem.singleOne) {
          elemUrl += '/' + (__this.config.encodeIds ? encodeURIComponent(elemId) : elemId);
        }
      }
    }
    acum = acum.replace(/\/$/, '') + '/' + elemUrl;
    return __this.normalizeUrl(acum);

  }, this.config.baseUrl);
};



Path.prototype.fetchUrl = function(current, what) {
  var baseUrl = this.base(current);
  if (what) {
    baseUrl += '/' + what;
  }
  return baseUrl;
};

Path.prototype.fetchRequestedUrl = function(current, what) {
  var url = this.fetchUrl(current, what);
  var params = current[this.config.restangularFields.reqParams];

  // From here on and until the end of fetchRequestedUrl,
  // the code has been kindly borrowed from angular.js
  // The reason for such code bloating is coherence:
  //   If the user were to use this for cache management, the
  //   serialization of parameters would need to be identical
  //   to the one done by angular for cache keys to match.
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }

  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }

  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
  }

  if (!params) {
    return url + (this.config.suffix || '');
  }

  var parts = [];
  forEachSorted(params, function(value, key) {
    if (value === null || value === undefined) {
      return;
    }
    if (!angular.isArray(value)) {
      value = [value];
    }

    angular.forEach(value, function(v) {
      if (angular.isObject(v)) {
        v = angular.toJson(v);
      }
      parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
    });
  });

  return url + (this.config.suffix || '') + ((url.indexOf('?') === -1) ? '?' : '&') + parts.join('&');
};
