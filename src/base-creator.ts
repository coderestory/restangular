import { RestangularResource } from './restangular-resource';

/**
 * Base URL Creator. Base prototype for everything related to it
 **/

export const BaseCreator = function() {};

BaseCreator.prototype.setConfig = function(config) {
  this.config = config;
  return this;
};

BaseCreator.prototype.parentsArray = function(current) {
  var parents = [];
  while (current) {
    parents.push(current);
    current = current[this.config.restangularFields.parentResource];
  }
  return parents.reverse();
};

BaseCreator.prototype.resource = function(current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {

  var params = _.defaults(callParams || {}, this.config.defaultRequestParams.common);
  var headers = _.defaults(callHeaders || {}, this.config.defaultHeaders);

  if (etag) {
    if (!this.config.isSafe(operation)) {
      headers['If-Match'] = etag;
    } else {
      headers['If-None-Match'] = etag;
    }
  }

  var url = this.base(current);

  if (what || what === 0) {
    var add = '';
    if (!/\/$/.test(url)) {
      add += '/';
    }
    add += what;
    url += add;
  }

  if (this.config.suffix &&
    url.indexOf(this.config.suffix, url.length - this.config.suffix.length) === -1 &&
    !this.config.getUrlFromElem(current)) {
    url += this.config.suffix;
  }

  current[this.config.restangularFields.httpConfig] = undefined;

  return RestangularResource(this.config, $http, url, {
    getList: this.config.withHttpValues(localHttpConfig, {
      method: 'GET',
      params: params,
      headers: headers
    }),

    get: this.config.withHttpValues(localHttpConfig, {
      method: 'GET',
      params: params,
      headers: headers
    }),

    jsonp: this.config.withHttpValues(localHttpConfig, {
      method: 'jsonp',
      params: params,
      headers: headers
    }),

    put: this.config.withHttpValues(localHttpConfig, {
      method: 'PUT',
      params: params,
      headers: headers
    }),

    post: this.config.withHttpValues(localHttpConfig, {
      method: 'POST',
      params: params,
      headers: headers
    }),

    remove: this.config.withHttpValues(localHttpConfig, {
      method: 'DELETE',
      params: params,
      headers: headers
    }),

    head: this.config.withHttpValues(localHttpConfig, {
      method: 'HEAD',
      params: params,
      headers: headers
    }),

    trace: this.config.withHttpValues(localHttpConfig, {
      method: 'TRACE',
      params: params,
      headers: headers
    }),

    options: this.config.withHttpValues(localHttpConfig, {
      method: 'OPTIONS',
      params: params,
      headers: headers
    }),

    patch: this.config.withHttpValues(localHttpConfig, {
      method: 'PATCH',
      params: params,
      headers: headers
    })
  });
};
