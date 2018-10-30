/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var restangular = angular.module('restangular', []);

restangular.provider('Restangular', function() {
  // Configuration
  var Configurer = {};
  Configurer.init = function(object, config) {
    object.configuration = config;

    /**
     * Those are HTTP safe methods for which there is no need to pass any data with the request.
     */
    var safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];
    config.isSafe = function(operation) {
      return _.includes(safeMethods, operation.toLowerCase());
    };

    var absolutePattern = /^https?:\/\//i;
    config.isAbsoluteUrl = function(string) {
      return _.isUndefined(config.absoluteUrl) || _.isNull(config.absoluteUrl) ?
        string && absolutePattern.test(string) :
        config.absoluteUrl;
    };

    config.absoluteUrl = _.isUndefined(config.absoluteUrl) ? true : config.absoluteUrl;
    object.setSelfLinkAbsoluteUrl = function(value) {
      config.absoluteUrl = value;
    };
    /**
     * This is the BaseURL to be used with Restangular
     */
    config.baseUrl = _.isUndefined(config.baseUrl) ? '' : config.baseUrl;
    object.setBaseUrl = function(newBaseUrl) {
      config.baseUrl = /\/$/.test(newBaseUrl) ?
        newBaseUrl.substring(0, newBaseUrl.length - 1) :
        newBaseUrl;
      return this;
    };

    /**
     * Sets the extra fields to keep from the parents
     */
    config.extraFields = config.extraFields || [];
    object.setExtraFields = function(newExtraFields) {
      config.extraFields = newExtraFields;
      return this;
    };

    /**
     * Some default $http parameter to be used in EVERY call
     **/
    config.defaultHttpFields = config.defaultHttpFields || {};
    object.setDefaultHttpFields = function(values) {
      config.defaultHttpFields = values;
      return this;
    };

    /**
     * Always return plain data, no restangularized object
     **/
    config.plainByDefault = config.plainByDefault || false;
    object.setPlainByDefault = function(value) {
      config.plainByDefault = value === true ? true : false;
      return this;
    };

    config.withHttpValues = function(httpLocalConfig, obj) {
      return _.defaults(obj, httpLocalConfig, config.defaultHttpFields);
    };

    config.encodeIds = _.isUndefined(config.encodeIds) ? true : config.encodeIds;
    object.setEncodeIds = function(encode) {
      config.encodeIds = encode;
    };

    config.defaultRequestParams = config.defaultRequestParams || {
      get: {},
      post: {},
      put: {},
      remove: {},
      common: {}
    };

    object.setDefaultRequestParams = function(param1, param2) {
      var methods = [],
        params = param2 || param1;
      if (!_.isUndefined(param2)) {
        if (_.isArray(param1)) {
          methods = param1;
        } else {
          methods.push(param1);
        }
      } else {
        methods.push('common');
      }

      _.each(methods, function(method) {
        config.defaultRequestParams[method] = params;
      });
      return this;
    };

    object.requestParams = config.defaultRequestParams;

    config.defaultHeaders = config.defaultHeaders || {};
    object.setDefaultHeaders = function(headers) {
      config.defaultHeaders = headers;
      object.defaultHeaders = config.defaultHeaders;
      return this;
    };

    object.defaultHeaders = config.defaultHeaders;

    /**
     * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
     **/
    config.methodOverriders = config.methodOverriders || [];
    object.setMethodOverriders = function(values) {
      var overriders = _.extend([], values);
      if (config.isOverridenMethod('delete', overriders)) {
        overriders.push('remove');
      }
      config.methodOverriders = overriders;
      return this;
    };

    config.jsonp = _.isUndefined(config.jsonp) ? false : config.jsonp;
    object.setJsonp = function(active) {
      config.jsonp = active;
    };

    config.isOverridenMethod = function(method, values) {
      var search = values || config.methodOverriders;
      return !_.isUndefined(_.find(search, function(one) {
        return one.toLowerCase() === method.toLowerCase();
      }));
    };

    /**
     * Sets the URL creator type. For now, only Path is created. In the future we'll have queryParams
     **/
    config.urlCreator = config.urlCreator || 'path';
    object.setUrlCreator = function(name) {
      if (!_.has(config.urlCreatorFactory, name)) {
        throw new Error('URL Path selected isn\'t valid');
      }

      config.urlCreator = name;
      return this;
    };

    /**
     * You can set the restangular fields here. The 3 required fields for Restangular are:
     *
     * id: Id of the element
     * route: name of the route of this element
     * parentResource: the reference to the parent resource
     *
     *  All of this fields except for id, are handled (and created) by Restangular. By default,
     *  the field values will be id, route and parentResource respectively
     */
    config.restangularFields = config.restangularFields || {
      id: 'id',
      route: 'route',
      parentResource: 'parentResource',
      restangularCollection: 'restangularCollection',
      cannonicalId: '__cannonicalId',
      etag: 'restangularEtag',
      selfLink: 'href',
      get: 'get',
      getList: 'getList',
      put: 'put',
      post: 'post',
      remove: 'remove',
      head: 'head',
      trace: 'trace',
      options: 'options',
      patch: 'patch',
      getRestangularUrl: 'getRestangularUrl',
      getRequestedUrl: 'getRequestedUrl',
      putElement: 'putElement',
      addRestangularMethod: 'addRestangularMethod',
      getParentList: 'getParentList',
      clone: 'clone',
      ids: 'ids',
      httpConfig: '_$httpConfig',
      reqParams: 'reqParams',
      one: 'one',
      all: 'all',
      several: 'several',
      oneUrl: 'oneUrl',
      allUrl: 'allUrl',
      customPUT: 'customPUT',
      customPATCH: 'customPATCH',
      customPOST: 'customPOST',
      customDELETE: 'customDELETE',
      customGET: 'customGET',
      customGETLIST: 'customGETLIST',
      customOperation: 'customOperation',
      doPUT: 'doPUT',
      doPATCH: 'doPATCH',
      doPOST: 'doPOST',
      doDELETE: 'doDELETE',
      doGET: 'doGET',
      doGETLIST: 'doGETLIST',
      fromServer: 'fromServer',
      withConfig: 'withConfig',
      withHttpConfig: 'withHttpConfig',
      singleOne: 'singleOne',
      plain: 'plain',
      save: 'save',
      restangularized: 'restangularized'
    };
    object.setRestangularFields = function(resFields) {
      config.restangularFields =
        _.extend(config.restangularFields, resFields);
      return this;
    };

    config.isRestangularized = function(obj) {
      return !!obj[config.restangularFields.restangularized];
    };

    config.setFieldToElem = function(field, elem, value) {
      var properties = field.split('.');
      var idValue = elem;
      _.each(_.initial(properties), function(prop) {
        idValue[prop] = {};
        idValue = idValue[prop];
      });
      idValue[_.last(properties)] = value;
      return this;
    };

    config.getFieldFromElem = function(field, elem) {
      var properties = field.split('.');
      var idValue = elem;
      _.each(properties, function(prop) {
        if (idValue) {
          idValue = idValue[prop];
        }
      });
      return angular.copy(idValue);
    };

    config.setIdToElem = function(elem, id /*, route */ ) {
      config.setFieldToElem(config.restangularFields.id, elem, id);
      return this;
    };

    config.getIdFromElem = function(elem) {
      return config.getFieldFromElem(config.restangularFields.id, elem);
    };

    config.isValidId = function(elemId) {
      return '' !== elemId && !_.isUndefined(elemId) && !_.isNull(elemId);
    };

    config.setUrlToElem = function(elem, url /*, route */ ) {
      config.setFieldToElem(config.restangularFields.selfLink, elem, url);
      return this;
    };

    config.getUrlFromElem = function(elem) {
      return config.getFieldFromElem(config.restangularFields.selfLink, elem);
    };

    config.useCannonicalId = _.isUndefined(config.useCannonicalId) ? false : config.useCannonicalId;
    object.setUseCannonicalId = function(value) {
      config.useCannonicalId = value;
      return this;
    };

    config.getCannonicalIdFromElem = function(elem) {
      var cannonicalId = elem[config.restangularFields.cannonicalId];
      var actualId = config.isValidId(cannonicalId) ? cannonicalId : config.getIdFromElem(elem);
      return actualId;
    };

    /**
     * Sets the Response parser. This is used in case your response isn't directly the data.
     * For example if you have a response like {meta: {'meta'}, data: {name: 'Gonto'}}
     * you can extract this data which is the one that needs wrapping
     *
     * The ResponseExtractor is a function that receives the response and the method executed.
     */

    config.responseInterceptors = config.responseInterceptors || [];

    config.defaultResponseInterceptor = function(data /*, operation, what, url, response, deferred */ ) {
      return data;
    };

    config.responseExtractor = function(data, operation, what, url, response, deferred) {
      var interceptors = angular.copy(config.responseInterceptors);
      interceptors.push(config.defaultResponseInterceptor);
      var theData = data;
      _.each(interceptors, function(interceptor) {
        theData = interceptor(theData, operation,
          what, url, response, deferred);
      });
      return theData;
    };

    object.addResponseInterceptor = function(extractor) {
      config.responseInterceptors.push(extractor);
      return this;
    };

    config.errorInterceptors = config.errorInterceptors || [];
    object.addErrorInterceptor = function(interceptor) {
      config.errorInterceptors.push(interceptor);
      return this;
    };

    object.setResponseInterceptor = object.addResponseInterceptor;
    object.setResponseExtractor = object.addResponseInterceptor;
    object.setErrorInterceptor = object.addErrorInterceptor;

    /**
     * Response interceptor is called just before resolving promises.
     */


    /**
     * Request interceptor is called before sending an object to the server.
     */
    config.requestInterceptors = config.requestInterceptors || [];

    config.defaultInterceptor = function(element, operation, path, url, headers, params, httpConfig) {
      return {
        element: element,
        headers: headers,
        params: params,
        httpConfig: httpConfig
      };
    };

    config.fullRequestInterceptor = function(element, operation, path, url, headers, params, httpConfig) {
      var interceptors = angular.copy(config.requestInterceptors);
      var defaultRequest = config.defaultInterceptor(element, operation, path, url, headers, params, httpConfig);
      return _.reduce(interceptors, function(request, interceptor) {
        return _.extend(request, interceptor(request.element, operation,
          path, url, request.headers, request.params, request.httpConfig));
      }, defaultRequest);
    };

    object.addRequestInterceptor = function(interceptor) {
      config.requestInterceptors.push(function(elem, operation, path, url, headers, params, httpConfig) {
        return {
          headers: headers,
          params: params,
          element: interceptor(elem, operation, path, url),
          httpConfig: httpConfig
        };
      });
      return this;
    };

    object.setRequestInterceptor = object.addRequestInterceptor;

    object.addFullRequestInterceptor = function(interceptor) {
      config.requestInterceptors.push(interceptor);
      return this;
    };

    object.setFullRequestInterceptor = object.addFullRequestInterceptor;

    config.onBeforeElemRestangularized = config.onBeforeElemRestangularized || function(elem) {
      return elem;
    };
    object.setOnBeforeElemRestangularized = function(post) {
      config.onBeforeElemRestangularized = post;
      return this;
    };

    object.setRestangularizePromiseInterceptor = function(interceptor) {
      config.restangularizePromiseInterceptor = interceptor;
      return this;
    };

    /**
     * This method is called after an element has been "Restangularized".
     *
     * It receives the element, a boolean indicating if it's an element or a collection
     * and the name of the model
     *
     */
    config.onElemRestangularized = config.onElemRestangularized || function(elem) {
      return elem;
    };
    object.setOnElemRestangularized = function(post) {
      config.onElemRestangularized = post;
      return this;
    };

    config.shouldSaveParent = config.shouldSaveParent || function() {
      return true;
    };
    object.setParentless = function(values) {
      if (_.isArray(values)) {
        config.shouldSaveParent = function(route) {
          return !_.includes(values, route);
        };
      } else if (_.isBoolean(values)) {
        config.shouldSaveParent = function() {
          return !values;
        };
      }
      return this;
    };

    /**
     * This lets you set a suffix to every request.
     *
     * For example, if your api requires that for JSon requests you do /users/123.json, you can set that
     * in here.
     *
     *
     * By default, the suffix is null
     */
    config.suffix = _.isUndefined(config.suffix) ? null : config.suffix;
    object.setRequestSuffix = function(newSuffix) {
      config.suffix = newSuffix;
      return this;
    };

    /**
     * Add element transformers for certain routes.
     */
    config.transformers = config.transformers || {};
    config.matchTransformers = config.matchTransformers || [];
    object.addElementTransformer = function(type, secondArg, thirdArg) {
      var isCollection = null;
      var transformer = null;
      if (arguments.length === 2) {
        transformer = secondArg;
      } else {
        transformer = thirdArg;
        isCollection = secondArg;
      }

      var transformerFn = function(coll, elem) {
        if (_.isNull(isCollection) || (coll === isCollection)) {
          return transformer(elem);
        }
        return elem;
      };

      if (_.isRegExp(type)) {
        config.matchTransformers.push({
          regexp: type,
          transformer: transformerFn
        });
      } else {
        if (!config.transformers[type]) {
          config.transformers[type] = [];
        }
        config.transformers[type].push(transformerFn);
      }

      return object;
    };

    object.extendCollection = function(route, fn) {
      return object.addElementTransformer(route, true, fn);
    };

    object.extendModel = function(route, fn) {
      return object.addElementTransformer(route, false, fn);
    };

    config.transformElem = function(elem, isCollection, route, Restangular, force) {
      if (!force && !config.transformLocalElements && !elem[config.restangularFields.fromServer]) {
        return elem;
      }

      var changedElem = elem;

      var matchTransformers = config.matchTransformers;
      if (matchTransformers) {
        _.each(matchTransformers, function(transformer) {
          if (transformer.regexp.test(route)) {
            changedElem = transformer.transformer(isCollection, changedElem);
          }
        });
      }

      var typeTransformers = config.transformers[route];
      if (typeTransformers) {
        _.each(typeTransformers, function(transformer) {
          changedElem = transformer(isCollection, changedElem);
        });
      }
      return config.onElemRestangularized(changedElem, isCollection, route, Restangular);
    };

    config.transformLocalElements = _.isUndefined(config.transformLocalElements) ?
      false :
      config.transformLocalElements;

    object.setTransformOnlyServerElements = function(active) {
      config.transformLocalElements = !active;
    };

    config.fullResponse = _.isUndefined(config.fullResponse) ? false : config.fullResponse;
    object.setFullResponse = function(full) {
      config.fullResponse = full;
      return this;
    };


    //Internal values and functions
    config.urlCreatorFactory = {};

    /**
     * Base URL Creator. Base prototype for everything related to it
     **/

    var BaseCreator = function() {};

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

    function RestangularResource(config, $http, url, configurer) {
      var resource = {};
      _.each(_.keys(configurer), function(key) {
        var value = configurer[key];

        // Add default parameters
        value.params = _.extend({}, value.params, config.defaultRequestParams[value.method.toLowerCase()]);
        // We don't want the ? if no params are there
        if (_.isEmpty(value.params)) {
          delete value.params;
        }

        if (config.isSafe(value.method)) {

          resource[key] = function() {
            return $http(_.extend(value, {
              url: url
            }));
          };

        } else {

          resource[key] = function(data) {
            return $http(_.extend(value, {
              url: url,
              data: data
            }));
          };

        }
      });

      return resource;
    }

    BaseCreator.prototype.resource = function(current, $http, localHttpConfig, callHeaders, callParams, what, etag, operation) {

      var params = _.defaults(callParams || {}, this.config.defaultRequestParams.common);
      var headers = _.defaults(callHeaders || {}, this.config.defaultHeaders);

      if (etag) {
        if (!config.isSafe(operation)) {
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

    /**
     * This is the Path URL creator. It uses Path to show Hierarchy in the Rest API.
     * This means that if you have an Account that then has a set of Buildings, a URL to a building
     * would be /accounts/123/buildings/456
     **/
    var Path = function() {};

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

            if (config.isValidId(elemId) && !elem.singleOne) {
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
      var params = current[config.restangularFields.reqParams];

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

    config.urlCreatorFactory.path = Path;
  };

  var globalConfiguration = {};

  Configurer.init(this, globalConfiguration);



  this.$get = ['$http', '$q', function($http, $q) {

    function createServiceForConfiguration(config) {
      var service = {};

      var urlHandler = new config.urlCreatorFactory[config.urlCreator]();
      urlHandler.setConfig(config);

      function restangularizeBase(parent, elem, route, reqParams, fromServer) {
        elem[config.restangularFields.route] = route;
        elem[config.restangularFields.getRestangularUrl] = _.bind(urlHandler.fetchUrl, urlHandler, elem);
        elem[config.restangularFields.getRequestedUrl] = _.bind(urlHandler.fetchRequestedUrl, urlHandler, elem);
        elem[config.restangularFields.addRestangularMethod] = _.bind(addRestangularMethodFunction, elem);
        elem[config.restangularFields.clone] = _.bind(copyRestangularizedElement, elem, elem);
        elem[config.restangularFields.reqParams] = _.isEmpty(reqParams) ? null : reqParams;
        elem[config.restangularFields.withHttpConfig] = _.bind(withHttpConfig, elem);
        elem[config.restangularFields.plain] = _.bind(stripRestangular, elem, elem);

        // Tag element as restangularized
        elem[config.restangularFields.restangularized] = true;

        // RequestLess connection
        elem[config.restangularFields.one] = _.bind(one, elem, elem);
        elem[config.restangularFields.all] = _.bind(all, elem, elem);
        elem[config.restangularFields.several] = _.bind(several, elem, elem);
        elem[config.restangularFields.oneUrl] = _.bind(oneUrl, elem, elem);
        elem[config.restangularFields.allUrl] = _.bind(allUrl, elem, elem);

        elem[config.restangularFields.fromServer] = !!fromServer;

        if (parent && config.shouldSaveParent(route)) {
          var parentId = config.getIdFromElem(parent);
          var parentUrl = config.getUrlFromElem(parent);

          var restangularFieldsForParent = _.union(
            _.values(_.pick(config.restangularFields, ['route', 'singleOne', 'parentResource'])),
            config.extraFields
          );
          var parentResource = _.pick(parent, restangularFieldsForParent);

          if (config.isValidId(parentId)) {
            config.setIdToElem(parentResource, parentId, route);
          }
          if (config.isValidId(parentUrl)) {
            config.setUrlToElem(parentResource, parentUrl, route);
          }

          elem[config.restangularFields.parentResource] = parentResource;
        } else {
          elem[config.restangularFields.parentResource] = null;
        }
        return elem;
      }

      function one(parent, route, id, singleOne) {
        var error;
        if (_.isNumber(route) || _.isNumber(parent)) {
          error = 'You\'re creating a Restangular entity with the number ';
          error += 'instead of the route or the parent. For example, you can\'t call .one(12).';
          throw new Error(error);
        }
        if (_.isUndefined(route)) {
          error = 'You\'re creating a Restangular entity either without the path. ';
          error += 'For example you can\'t call .one(). Please check if your arguments are valid.';
          throw new Error(error);
        }
        var elem = {};
        config.setIdToElem(elem, id, route);
        config.setFieldToElem(config.restangularFields.singleOne, elem, singleOne);
        return restangularizeElem(parent, elem, route, false);
      }


      function all(parent, route) {
        return restangularizeCollection(parent, [], route, false);
      }

      function several(parent, route /*, ids */ ) {
        var collection = [];
        collection[config.restangularFields.ids] = Array.prototype.splice.call(arguments, 2);
        return restangularizeCollection(parent, collection, route, false);
      }

      function oneUrl(parent, route, url) {
        if (!route) {
          throw new Error('Route is mandatory when creating new Restangular objects.');
        }
        var elem = {};
        config.setUrlToElem(elem, url, route);
        return restangularizeElem(parent, elem, route, false);
      }


      function allUrl(parent, route, url) {
        if (!route) {
          throw new Error('Route is mandatory when creating new Restangular objects.');
        }
        var elem = {};
        config.setUrlToElem(elem, url, route);
        return restangularizeCollection(parent, elem, route, false);
      }
      // Promises
      function restangularizePromise(promise, isCollection, valueToFill) {
        promise.call = _.bind(promiseCall, promise);
        promise.get = _.bind(promiseGet, promise);
        promise[config.restangularFields.restangularCollection] = isCollection;
        if (isCollection) {
          promise.push = _.bind(promiseCall, promise, 'push');
        }
        promise.$object = valueToFill;
        if (config.restangularizePromiseInterceptor) {
          config.restangularizePromiseInterceptor(promise);
        }
        return promise;
      }

      function promiseCall(method) {
        var deferred = $q.defer();
        var callArgs = arguments;
        var filledValue = {};
        this.then(function(val) {
          var params = Array.prototype.slice.call(callArgs, 1);
          var func = val[method];
          func.apply(val, params);
          filledValue = val;
          deferred.resolve(val);
        });
        return restangularizePromise(deferred.promise, this[config.restangularFields.restangularCollection], filledValue);
      }

      function promiseGet(what) {
        var deferred = $q.defer();
        var filledValue = {};
        this.then(function(val) {
          filledValue = val[what];
          deferred.resolve(filledValue);
        });
        return restangularizePromise(deferred.promise, this[config.restangularFields.restangularCollection], filledValue);
      }

      function resolvePromise(deferred, response, data, filledValue) {
        _.extend(filledValue, data);

        // Trigger the full response interceptor.
        if (config.fullResponse) {
          return deferred.resolve(_.extend(response, {
            data: data
          }));
        } else {
          deferred.resolve(data);
        }
      }


      // Elements
      function stripRestangular(elem) {
        if (_.isArray(elem)) {
          var array = [];
          _.each(elem, function(value) {
            array.push(config.isRestangularized(value) ? stripRestangular(value) : value);
          });
          return array;
        } else {
          return _.omit(elem, _.values(_.omit(config.restangularFields, 'id')));
        }
      }

      function addCustomOperation(elem) {
        elem[config.restangularFields.customOperation] = _.bind(customFunction, elem);
        var requestMethods = {
          get: customFunction,
          delete: customFunction
        };
        _.each(['put', 'patch', 'post'], function(name) {
          requestMethods[name] = function(operation, elem, path, params, headers) {
            return _.bind(customFunction, this)(operation, path, params, headers, elem);
          };
        });
        _.each(requestMethods, function(requestFunc, name) {
          var callOperation = name === 'delete' ? 'remove' : name;
          _.each(['do', 'custom'], function(alias) {
            elem[config.restangularFields[alias + name.toUpperCase()]] = _.bind(requestFunc, elem, callOperation);
          });
        });
        elem[config.restangularFields.customGETLIST] = _.bind(fetchFunction, elem);
        elem[config.restangularFields.doGETLIST] = elem[config.restangularFields.customGETLIST];
      }

      function copyRestangularizedElement(element) {
        var copiedElement = angular.copy(element);

        // check if we're dealing with a collection (i.e. an array)
        // and restangularize the element using the proper restangularizer,
        // element / collection
        if (_.isArray(element)) {
          return restangularizeCollection(
            element[config.restangularFields.parentResource],
            copiedElement,
            element[config.restangularFields.route],
            element[config.restangularFields.fromServer],
            element[config.restangularFields.reqParams]
          );
        }

        // not a collection, restangularize it as an element
        return restangularizeElem(
          element[config.restangularFields.parentResource],
          copiedElement,
          element[config.restangularFields.route],
          element[config.restangularFields.fromServer],
          element[config.restangularFields.restangularCollection],
          element[config.restangularFields.reqParams]
        );
      }

      function restangularizeElem(parent, element, route, fromServer, collection, reqParams) {
        var elem = config.onBeforeElemRestangularized(element, false, route);

        var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);

        if (config.useCannonicalId) {
          localElem[config.restangularFields.cannonicalId] = config.getIdFromElem(localElem);
        }

        if (collection) {
          localElem[config.restangularFields.getParentList] = function() {
            return collection;
          };
        }

        localElem[config.restangularFields.restangularCollection] = false;
        localElem[config.restangularFields.get] = _.bind(getFunction, localElem);
        localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem);
        localElem[config.restangularFields.put] = _.bind(putFunction, localElem);
        localElem[config.restangularFields.post] = _.bind(postFunction, localElem);
        localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
        localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
        localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
        localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
        localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
        localElem[config.restangularFields.save] = _.bind(save, localElem);

        addCustomOperation(localElem);
        return config.transformElem(localElem, false, route, service, true);
      }

      function restangularizeCollection(parent, element, route, fromServer, reqParams) {
        var elem = config.onBeforeElemRestangularized(element, true, route);

        var localElem = restangularizeBase(parent, elem, route, reqParams, fromServer);
        localElem[config.restangularFields.restangularCollection] = true;
        localElem[config.restangularFields.post] = _.bind(postFunction, localElem, null);
        localElem[config.restangularFields.remove] = _.bind(deleteFunction, localElem);
        localElem[config.restangularFields.head] = _.bind(headFunction, localElem);
        localElem[config.restangularFields.trace] = _.bind(traceFunction, localElem);
        localElem[config.restangularFields.putElement] = _.bind(putElementFunction, localElem);
        localElem[config.restangularFields.options] = _.bind(optionsFunction, localElem);
        localElem[config.restangularFields.patch] = _.bind(patchFunction, localElem);
        localElem[config.restangularFields.get] = _.bind(getById, localElem);
        localElem[config.restangularFields.getList] = _.bind(fetchFunction, localElem, null);

        addCustomOperation(localElem);
        return config.transformElem(localElem, true, route, service, true);
      }

      function restangularizeCollectionAndElements(parent, element, route, fromServer) {
        var collection = restangularizeCollection(parent, element, route, fromServer);
        _.each(collection, function(elem) {
          if (elem) {
            restangularizeElem(parent, elem, route, fromServer);
          }
        });
        return collection;
      }

      function getById(id, reqParams, headers) {
        return this.customGET(id.toString(), reqParams, headers);
      }

      function putElementFunction(idx, params, headers) {
        var __this = this;
        var elemToPut = this[idx];
        var deferred = $q.defer();
        var filledArray = [];
        filledArray = config.transformElem(filledArray, true, elemToPut[config.restangularFields.route], service);
        elemToPut.put(params, headers).then(function(serverElem) {
          var newArray = copyRestangularizedElement(__this);
          newArray[idx] = serverElem;
          filledArray = newArray;
          deferred.resolve(newArray);
        }, function(response) {
          deferred.reject(response);
        });

        return restangularizePromise(deferred.promise, true, filledArray);
      }

      function parseResponse(resData, operation, route, fetchUrl, response, deferred) {
        var data = config.responseExtractor(resData, operation, route, fetchUrl, response, deferred);
        var etag = response.headers('ETag');
        if (data && etag) {
          data[config.restangularFields.etag] = etag;
        }
        return data;
      }


      function fetchFunction(what, reqParams, headers) {
        var __this = this;
        var deferred = $q.defer();
        var operation = 'getList';
        var url = urlHandler.fetchUrl(this, what);
        var whatFetched = what || __this[config.restangularFields.route];

        var request = config.fullRequestInterceptor(null, operation,
          whatFetched, url, headers || {}, reqParams || {}, this[config.restangularFields.httpConfig] || {});

        var filledArray = [];
        filledArray = config.transformElem(filledArray, true, whatFetched, service);

        var method = 'getList';

        if (config.jsonp) {
          method = 'jsonp';
        }

        var okCallback = function(response) {
          var resData = response.data;
          var fullParams = response.config.params;
          var data = parseResponse(resData, operation, whatFetched, url, response, deferred);

          // support empty response for getList() calls (some APIs respond with 204 and empty body)
          if (_.isUndefined(data) || '' === data) {
            data = [];
          }
          if (!_.isArray(data)) {
            throw new Error('Response for getList SHOULD be an array and not an object or something else');
          }

          if (true === config.plainByDefault) {
            return resolvePromise(deferred, response, data, filledArray);
          }

          var processedData = _.map(data, function(elem) {
            if (!__this[config.restangularFields.restangularCollection]) {
              return restangularizeElem(__this, elem, what, true, data);
            } else {
              return restangularizeElem(__this[config.restangularFields.parentResource],
                elem, __this[config.restangularFields.route], true, data);
            }
          });

          processedData = _.extend(data, processedData);

          if (!__this[config.restangularFields.restangularCollection]) {
            resolvePromise(
              deferred,
              response,
              restangularizeCollection(
                __this,
                processedData,
                what,
                true,
                fullParams
              ),
              filledArray
            );
          } else {
            resolvePromise(
              deferred,
              response,
              restangularizeCollection(
                __this[config.restangularFields.parentResource],
                processedData,
                __this[config.restangularFields.route],
                true,
                fullParams
              ),
              filledArray
            );
          }
        };

        urlHandler.resource(this, $http, request.httpConfig, request.headers, request.params, what,
          this[config.restangularFields.etag], operation)[method]().then(okCallback, function error(response) {
          if (response.status === 304 && __this[config.restangularFields.restangularCollection]) {
            resolvePromise(deferred, response, __this, filledArray);
          } else if (_.every(config.errorInterceptors, function(cb) {
              return cb(response, deferred, okCallback) !== false;
            })) {
            // triggered if no callback returns false
            deferred.reject(response);
          }
        });

        return restangularizePromise(deferred.promise, true, filledArray);
      }

      function withHttpConfig(httpConfig) {
        this[config.restangularFields.httpConfig] = httpConfig;
        return this;
      }

      function save(params, headers) {
        if (this[config.restangularFields.fromServer]) {
          return this[config.restangularFields.put](params, headers);
        } else {
          return _.bind(elemFunction, this)('post', undefined, params, undefined, headers);
        }
      }

      function elemFunction(operation, what, params, obj, headers) {
        var __this = this;
        var deferred = $q.defer();
        var resParams = params || {};
        var route = what || this[config.restangularFields.route];
        var fetchUrl = urlHandler.fetchUrl(this, what);

        var callObj = obj || this;
        // fallback to etag on restangular object (since for custom methods we probably don't explicitly specify the etag field)
        var etag = callObj[config.restangularFields.etag] || (operation !== 'post' ? this[config.restangularFields.etag] : null);

        if (_.isObject(callObj) && config.isRestangularized(callObj)) {
          callObj = stripRestangular(callObj);
        }
        var request = config.fullRequestInterceptor(callObj, operation, route, fetchUrl,
          headers || {}, resParams || {}, this[config.restangularFields.httpConfig] || {});

        var filledObject = {};
        filledObject = config.transformElem(filledObject, false, route, service);

        var okCallback = function(response) {
          var resData = response.data;
          var fullParams = response.config.params;
          var elem = parseResponse(resData, operation, route, fetchUrl, response, deferred);

          // accept 0 as response
          if (elem !== null && elem !== undefined && elem !== '') {
            var data;

            if (true === config.plainByDefault) {
              return resolvePromise(deferred, response, elem, filledObject);
            }

            if (operation === 'post' && !__this[config.restangularFields.restangularCollection]) {
              data = restangularizeElem(
                __this[config.restangularFields.parentResource],
                elem,
                route,
                true,
                null,
                fullParams
              );
              resolvePromise(deferred, response, data, filledObject);
            } else {
              data = restangularizeElem(
                __this[config.restangularFields.parentResource],
                elem,
                __this[config.restangularFields.route],
                true,
                null,
                fullParams
              );

              data[config.restangularFields.singleOne] = __this[config.restangularFields.singleOne];
              resolvePromise(deferred, response, data, filledObject);
            }

          } else {
            resolvePromise(deferred, response, undefined, filledObject);
          }
        };

        var errorCallback = function(response) {
          if (response.status === 304 && config.isSafe(operation)) {
            resolvePromise(deferred, response, __this, filledObject);
          } else if (_.every(config.errorInterceptors, function(cb) {
              return cb(response, deferred, okCallback) !== false;
            })) {
            // triggered if no callback returns false
            deferred.reject(response);
          }
        };
        // Overriding HTTP Method
        var callOperation = operation;
        var callHeaders = _.extend({}, request.headers);
        var isOverrideOperation = config.isOverridenMethod(operation);
        if (isOverrideOperation) {
          callOperation = 'post';
          callHeaders = _.extend(callHeaders, {
            'X-HTTP-Method-Override': operation === 'remove' ? 'DELETE' : operation.toUpperCase()
          });
        } else if (config.jsonp && callOperation === 'get') {
          callOperation = 'jsonp';
        }

        if (config.isSafe(operation)) {
          if (isOverrideOperation) {
            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
              what, etag, callOperation)[callOperation]({}).then(okCallback, errorCallback);
          } else {
            urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
              what, etag, callOperation)[callOperation]().then(okCallback, errorCallback);
          }
        } else {
          urlHandler.resource(this, $http, request.httpConfig, callHeaders, request.params,
            what, etag, callOperation)[callOperation](request.element).then(okCallback, errorCallback);
        }

        return restangularizePromise(deferred.promise, false, filledObject);
      }

      function getFunction(params, headers) {
        return _.bind(elemFunction, this)('get', undefined, params, undefined, headers);
      }

      function deleteFunction(params, headers) {
        return _.bind(elemFunction, this)('remove', undefined, params, undefined, headers);
      }

      function putFunction(params, headers) {
        return _.bind(elemFunction, this)('put', undefined, params, undefined, headers);
      }

      function postFunction(what, elem, params, headers) {
        return _.bind(elemFunction, this)('post', what, params, elem, headers);
      }

      function headFunction(params, headers) {
        return _.bind(elemFunction, this)('head', undefined, params, undefined, headers);
      }

      function traceFunction(params, headers) {
        return _.bind(elemFunction, this)('trace', undefined, params, undefined, headers);
      }

      function optionsFunction(params, headers) {
        return _.bind(elemFunction, this)('options', undefined, params, undefined, headers);
      }

      function patchFunction(elem, params, headers) {
        return _.bind(elemFunction, this)('patch', undefined, params, elem, headers);
      }

      function customFunction(operation, path, params, headers, elem) {
        return _.bind(elemFunction, this)(operation, path, params, elem, headers);
      }

      function addRestangularMethodFunction(name, operation, path, defaultParams, defaultHeaders, defaultElem) {
        var bindedFunction;
        if (operation === 'getList') {
          bindedFunction = _.bind(fetchFunction, this, path);
        } else {
          bindedFunction = _.bind(customFunction, this, operation, path);
        }

        var createdFunction = function(params, headers, elem) {
          var callParams = _.defaults({
            params: params,
            headers: headers,
            elem: elem
          }, {
            params: defaultParams,
            headers: defaultHeaders,
            elem: defaultElem
          });
          return bindedFunction(callParams.params, callParams.headers, callParams.elem);
        };

        if (config.isSafe(operation)) {
          this[name] = createdFunction;
        } else {
          this[name] = function(elem, params, headers) {
            return createdFunction(params, headers, elem);
          };
        }
      }

      function withConfigurationFunction(configurer) {
        var newConfig = angular.copy(_.omit(config, 'configuration'));
        Configurer.init(newConfig, newConfig);
        configurer(newConfig);
        return createServiceForConfiguration(newConfig);
      }

      function toService(route, parent) {
        var knownCollectionMethods = _.values(config.restangularFields);
        var serv = {};
        var collection = (parent || service).all(route);
        serv.one = _.bind(one, (parent || service), parent, route);
        serv.post = _.bind(collection.post, collection);
        serv.getList = _.bind(collection.getList, collection);
        serv.withHttpConfig = _.bind(collection.withHttpConfig, collection);
        serv.get = _.bind(collection.get, collection);

        for (var prop in collection) {
          if (collection.hasOwnProperty(prop) && _.isFunction(collection[prop]) && !_.includes(knownCollectionMethods, prop)) {
            serv[prop] = _.bind(collection[prop], collection);
          }
        }

        return serv;
      }


      Configurer.init(service, config);

      service.copy = _.bind(copyRestangularizedElement, service);

      service.service = _.bind(toService, service);

      service.withConfig = _.bind(withConfigurationFunction, service);

      service.one = _.bind(one, service, null);

      service.all = _.bind(all, service, null);

      service.several = _.bind(several, service, null);

      service.oneUrl = _.bind(oneUrl, service, null);

      service.allUrl = _.bind(allUrl, service, null);

      service.stripRestangular = _.bind(stripRestangular, service);

      service.restangularizeElement = _.bind(restangularizeElem, service);

      service.restangularizeCollection = _.bind(restangularizeCollectionAndElements, service);

      return service;
    }

    return createServiceForConfiguration(globalConfiguration);
  }];
});

/* harmony default export */ __webpack_exports__["default"] = (restangular.name);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWE7QUFDYixjQUFjO0FBQ2QsYUFBYTtBQUNiLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRCxPQUFPLE9BQU8sU0FBUztBQUN2RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7O0FBRUEsOENBQThDO0FBQzlDLGdEQUFnRDs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7QUFJQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsaUJBQWlCLGlEQUFpRDs7QUFFM0c7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixpQkFBaUIsaURBQWlEOztBQUV6RjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVjLCtFQUFnQixFQUFDIiwiZmlsZSI6InJlc3Rhbmd1bGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJ2YXIgcmVzdGFuZ3VsYXIgPSBhbmd1bGFyLm1vZHVsZSgncmVzdGFuZ3VsYXInLCBbXSk7XG5cbnJlc3Rhbmd1bGFyLnByb3ZpZGVyKCdSZXN0YW5ndWxhcicsIGZ1bmN0aW9uKCkge1xuICAvLyBDb25maWd1cmF0aW9uXG4gIHZhciBDb25maWd1cmVyID0ge307XG4gIENvbmZpZ3VyZXIuaW5pdCA9IGZ1bmN0aW9uKG9iamVjdCwgY29uZmlnKSB7XG4gICAgb2JqZWN0LmNvbmZpZ3VyYXRpb24gPSBjb25maWc7XG5cbiAgICAvKipcbiAgICAgKiBUaG9zZSBhcmUgSFRUUCBzYWZlIG1ldGhvZHMgZm9yIHdoaWNoIHRoZXJlIGlzIG5vIG5lZWQgdG8gcGFzcyBhbnkgZGF0YSB3aXRoIHRoZSByZXF1ZXN0LlxuICAgICAqL1xuICAgIHZhciBzYWZlTWV0aG9kcyA9IFsnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucycsICd0cmFjZScsICdnZXRsaXN0J107XG4gICAgY29uZmlnLmlzU2FmZSA9IGZ1bmN0aW9uKG9wZXJhdGlvbikge1xuICAgICAgcmV0dXJuIF8uaW5jbHVkZXMoc2FmZU1ldGhvZHMsIG9wZXJhdGlvbi50b0xvd2VyQ2FzZSgpKTtcbiAgICB9O1xuXG4gICAgdmFyIGFic29sdXRlUGF0dGVybiA9IC9eaHR0cHM/OlxcL1xcLy9pO1xuICAgIGNvbmZpZy5pc0Fic29sdXRlVXJsID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICByZXR1cm4gXy5pc1VuZGVmaW5lZChjb25maWcuYWJzb2x1dGVVcmwpIHx8IF8uaXNOdWxsKGNvbmZpZy5hYnNvbHV0ZVVybCkgP1xuICAgICAgICBzdHJpbmcgJiYgYWJzb2x1dGVQYXR0ZXJuLnRlc3Qoc3RyaW5nKSA6XG4gICAgICAgIGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgICB9O1xuXG4gICAgY29uZmlnLmFic29sdXRlVXJsID0gXy5pc1VuZGVmaW5lZChjb25maWcuYWJzb2x1dGVVcmwpID8gdHJ1ZSA6IGNvbmZpZy5hYnNvbHV0ZVVybDtcbiAgICBvYmplY3Quc2V0U2VsZkxpbmtBYnNvbHV0ZVVybCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBjb25maWcuYWJzb2x1dGVVcmwgPSB2YWx1ZTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgdGhlIEJhc2VVUkwgdG8gYmUgdXNlZCB3aXRoIFJlc3Rhbmd1bGFyXG4gICAgICovXG4gICAgY29uZmlnLmJhc2VVcmwgPSBfLmlzVW5kZWZpbmVkKGNvbmZpZy5iYXNlVXJsKSA/ICcnIDogY29uZmlnLmJhc2VVcmw7XG4gICAgb2JqZWN0LnNldEJhc2VVcmwgPSBmdW5jdGlvbihuZXdCYXNlVXJsKSB7XG4gICAgICBjb25maWcuYmFzZVVybCA9IC9cXC8kLy50ZXN0KG5ld0Jhc2VVcmwpID9cbiAgICAgICAgbmV3QmFzZVVybC5zdWJzdHJpbmcoMCwgbmV3QmFzZVVybC5sZW5ndGggLSAxKSA6XG4gICAgICAgIG5ld0Jhc2VVcmw7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZXh0cmEgZmllbGRzIHRvIGtlZXAgZnJvbSB0aGUgcGFyZW50c1xuICAgICAqL1xuICAgIGNvbmZpZy5leHRyYUZpZWxkcyA9IGNvbmZpZy5leHRyYUZpZWxkcyB8fCBbXTtcbiAgICBvYmplY3Quc2V0RXh0cmFGaWVsZHMgPSBmdW5jdGlvbihuZXdFeHRyYUZpZWxkcykge1xuICAgICAgY29uZmlnLmV4dHJhRmllbGRzID0gbmV3RXh0cmFGaWVsZHM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU29tZSBkZWZhdWx0ICRodHRwIHBhcmFtZXRlciB0byBiZSB1c2VkIGluIEVWRVJZIGNhbGxcbiAgICAgKiovXG4gICAgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzID0gY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzIHx8IHt9O1xuICAgIG9iamVjdC5zZXREZWZhdWx0SHR0cEZpZWxkcyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzID0gdmFsdWVzO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsd2F5cyByZXR1cm4gcGxhaW4gZGF0YSwgbm8gcmVzdGFuZ3VsYXJpemVkIG9iamVjdFxuICAgICAqKi9cbiAgICBjb25maWcucGxhaW5CeURlZmF1bHQgPSBjb25maWcucGxhaW5CeURlZmF1bHQgfHwgZmFsc2U7XG4gICAgb2JqZWN0LnNldFBsYWluQnlEZWZhdWx0ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCA9IHZhbHVlID09PSB0cnVlID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGNvbmZpZy53aXRoSHR0cFZhbHVlcyA9IGZ1bmN0aW9uKGh0dHBMb2NhbENvbmZpZywgb2JqKSB7XG4gICAgICByZXR1cm4gXy5kZWZhdWx0cyhvYmosIGh0dHBMb2NhbENvbmZpZywgY29uZmlnLmRlZmF1bHRIdHRwRmllbGRzKTtcbiAgICB9O1xuXG4gICAgY29uZmlnLmVuY29kZUlkcyA9IF8uaXNVbmRlZmluZWQoY29uZmlnLmVuY29kZUlkcykgPyB0cnVlIDogY29uZmlnLmVuY29kZUlkcztcbiAgICBvYmplY3Quc2V0RW5jb2RlSWRzID0gZnVuY3Rpb24oZW5jb2RlKSB7XG4gICAgICBjb25maWcuZW5jb2RlSWRzID0gZW5jb2RlO1xuICAgIH07XG5cbiAgICBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgPSBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXMgfHwge1xuICAgICAgZ2V0OiB7fSxcbiAgICAgIHBvc3Q6IHt9LFxuICAgICAgcHV0OiB7fSxcbiAgICAgIHJlbW92ZToge30sXG4gICAgICBjb21tb246IHt9XG4gICAgfTtcblxuICAgIG9iamVjdC5zZXREZWZhdWx0UmVxdWVzdFBhcmFtcyA9IGZ1bmN0aW9uKHBhcmFtMSwgcGFyYW0yKSB7XG4gICAgICB2YXIgbWV0aG9kcyA9IFtdLFxuICAgICAgICBwYXJhbXMgPSBwYXJhbTIgfHwgcGFyYW0xO1xuICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKHBhcmFtMikpIHtcbiAgICAgICAgaWYgKF8uaXNBcnJheShwYXJhbTEpKSB7XG4gICAgICAgICAgbWV0aG9kcyA9IHBhcmFtMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtZXRob2RzLnB1c2gocGFyYW0xKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kcy5wdXNoKCdjb21tb24nKTtcbiAgICAgIH1cblxuICAgICAgXy5lYWNoKG1ldGhvZHMsIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICBjb25maWcuZGVmYXVsdFJlcXVlc3RQYXJhbXNbbWV0aG9kXSA9IHBhcmFtcztcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIG9iamVjdC5yZXF1ZXN0UGFyYW1zID0gY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zO1xuXG4gICAgY29uZmlnLmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzIHx8IHt9O1xuICAgIG9iamVjdC5zZXREZWZhdWx0SGVhZGVycyA9IGZ1bmN0aW9uKGhlYWRlcnMpIHtcbiAgICAgIGNvbmZpZy5kZWZhdWx0SGVhZGVycyA9IGhlYWRlcnM7XG4gICAgICBvYmplY3QuZGVmYXVsdEhlYWRlcnMgPSBjb25maWcuZGVmYXVsdEhlYWRlcnM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgb2JqZWN0LmRlZmF1bHRIZWFkZXJzID0gY29uZmlnLmRlZmF1bHRIZWFkZXJzO1xuXG4gICAgLyoqXG4gICAgICogTWV0aG9kIG92ZXJyaWRlcnMgd2lsbCBzZXQgd2hpY2ggbWV0aG9kcyBhcmUgc2VudCB2aWEgUE9TVCB3aXRoIGFuIFgtSFRUUC1NZXRob2QtT3ZlcnJpZGVcbiAgICAgKiovXG4gICAgY29uZmlnLm1ldGhvZE92ZXJyaWRlcnMgPSBjb25maWcubWV0aG9kT3ZlcnJpZGVycyB8fCBbXTtcbiAgICBvYmplY3Quc2V0TWV0aG9kT3ZlcnJpZGVycyA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIG92ZXJyaWRlcnMgPSBfLmV4dGVuZChbXSwgdmFsdWVzKTtcbiAgICAgIGlmIChjb25maWcuaXNPdmVycmlkZW5NZXRob2QoJ2RlbGV0ZScsIG92ZXJyaWRlcnMpKSB7XG4gICAgICAgIG92ZXJyaWRlcnMucHVzaCgncmVtb3ZlJyk7XG4gICAgICB9XG4gICAgICBjb25maWcubWV0aG9kT3ZlcnJpZGVycyA9IG92ZXJyaWRlcnM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgY29uZmlnLmpzb25wID0gXy5pc1VuZGVmaW5lZChjb25maWcuanNvbnApID8gZmFsc2UgOiBjb25maWcuanNvbnA7XG4gICAgb2JqZWN0LnNldEpzb25wID0gZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICBjb25maWcuanNvbnAgPSBhY3RpdmU7XG4gICAgfTtcblxuICAgIGNvbmZpZy5pc092ZXJyaWRlbk1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCwgdmFsdWVzKSB7XG4gICAgICB2YXIgc2VhcmNoID0gdmFsdWVzIHx8IGNvbmZpZy5tZXRob2RPdmVycmlkZXJzO1xuICAgICAgcmV0dXJuICFfLmlzVW5kZWZpbmVkKF8uZmluZChzZWFyY2gsIGZ1bmN0aW9uKG9uZSkge1xuICAgICAgICByZXR1cm4gb25lLnRvTG93ZXJDYXNlKCkgPT09IG1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBVUkwgY3JlYXRvciB0eXBlLiBGb3Igbm93LCBvbmx5IFBhdGggaXMgY3JlYXRlZC4gSW4gdGhlIGZ1dHVyZSB3ZSdsbCBoYXZlIHF1ZXJ5UGFyYW1zXG4gICAgICoqL1xuICAgIGNvbmZpZy51cmxDcmVhdG9yID0gY29uZmlnLnVybENyZWF0b3IgfHwgJ3BhdGgnO1xuICAgIG9iamVjdC5zZXRVcmxDcmVhdG9yID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgaWYgKCFfLmhhcyhjb25maWcudXJsQ3JlYXRvckZhY3RvcnksIG5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIFBhdGggc2VsZWN0ZWQgaXNuXFwndCB2YWxpZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25maWcudXJsQ3JlYXRvciA9IG5hbWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogWW91IGNhbiBzZXQgdGhlIHJlc3Rhbmd1bGFyIGZpZWxkcyBoZXJlLiBUaGUgMyByZXF1aXJlZCBmaWVsZHMgZm9yIFJlc3Rhbmd1bGFyIGFyZTpcbiAgICAgKlxuICAgICAqIGlkOiBJZCBvZiB0aGUgZWxlbWVudFxuICAgICAqIHJvdXRlOiBuYW1lIG9mIHRoZSByb3V0ZSBvZiB0aGlzIGVsZW1lbnRcbiAgICAgKiBwYXJlbnRSZXNvdXJjZTogdGhlIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IHJlc291cmNlXG4gICAgICpcbiAgICAgKiAgQWxsIG9mIHRoaXMgZmllbGRzIGV4Y2VwdCBmb3IgaWQsIGFyZSBoYW5kbGVkIChhbmQgY3JlYXRlZCkgYnkgUmVzdGFuZ3VsYXIuIEJ5IGRlZmF1bHQsXG4gICAgICogIHRoZSBmaWVsZCB2YWx1ZXMgd2lsbCBiZSBpZCwgcm91dGUgYW5kIHBhcmVudFJlc291cmNlIHJlc3BlY3RpdmVseVxuICAgICAqL1xuICAgIGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyA9IGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyB8fCB7XG4gICAgICBpZDogJ2lkJyxcbiAgICAgIHJvdXRlOiAncm91dGUnLFxuICAgICAgcGFyZW50UmVzb3VyY2U6ICdwYXJlbnRSZXNvdXJjZScsXG4gICAgICByZXN0YW5ndWxhckNvbGxlY3Rpb246ICdyZXN0YW5ndWxhckNvbGxlY3Rpb24nLFxuICAgICAgY2Fubm9uaWNhbElkOiAnX19jYW5ub25pY2FsSWQnLFxuICAgICAgZXRhZzogJ3Jlc3Rhbmd1bGFyRXRhZycsXG4gICAgICBzZWxmTGluazogJ2hyZWYnLFxuICAgICAgZ2V0OiAnZ2V0JyxcbiAgICAgIGdldExpc3Q6ICdnZXRMaXN0JyxcbiAgICAgIHB1dDogJ3B1dCcsXG4gICAgICBwb3N0OiAncG9zdCcsXG4gICAgICByZW1vdmU6ICdyZW1vdmUnLFxuICAgICAgaGVhZDogJ2hlYWQnLFxuICAgICAgdHJhY2U6ICd0cmFjZScsXG4gICAgICBvcHRpb25zOiAnb3B0aW9ucycsXG4gICAgICBwYXRjaDogJ3BhdGNoJyxcbiAgICAgIGdldFJlc3Rhbmd1bGFyVXJsOiAnZ2V0UmVzdGFuZ3VsYXJVcmwnLFxuICAgICAgZ2V0UmVxdWVzdGVkVXJsOiAnZ2V0UmVxdWVzdGVkVXJsJyxcbiAgICAgIHB1dEVsZW1lbnQ6ICdwdXRFbGVtZW50JyxcbiAgICAgIGFkZFJlc3Rhbmd1bGFyTWV0aG9kOiAnYWRkUmVzdGFuZ3VsYXJNZXRob2QnLFxuICAgICAgZ2V0UGFyZW50TGlzdDogJ2dldFBhcmVudExpc3QnLFxuICAgICAgY2xvbmU6ICdjbG9uZScsXG4gICAgICBpZHM6ICdpZHMnLFxuICAgICAgaHR0cENvbmZpZzogJ18kaHR0cENvbmZpZycsXG4gICAgICByZXFQYXJhbXM6ICdyZXFQYXJhbXMnLFxuICAgICAgb25lOiAnb25lJyxcbiAgICAgIGFsbDogJ2FsbCcsXG4gICAgICBzZXZlcmFsOiAnc2V2ZXJhbCcsXG4gICAgICBvbmVVcmw6ICdvbmVVcmwnLFxuICAgICAgYWxsVXJsOiAnYWxsVXJsJyxcbiAgICAgIGN1c3RvbVBVVDogJ2N1c3RvbVBVVCcsXG4gICAgICBjdXN0b21QQVRDSDogJ2N1c3RvbVBBVENIJyxcbiAgICAgIGN1c3RvbVBPU1Q6ICdjdXN0b21QT1NUJyxcbiAgICAgIGN1c3RvbURFTEVURTogJ2N1c3RvbURFTEVURScsXG4gICAgICBjdXN0b21HRVQ6ICdjdXN0b21HRVQnLFxuICAgICAgY3VzdG9tR0VUTElTVDogJ2N1c3RvbUdFVExJU1QnLFxuICAgICAgY3VzdG9tT3BlcmF0aW9uOiAnY3VzdG9tT3BlcmF0aW9uJyxcbiAgICAgIGRvUFVUOiAnZG9QVVQnLFxuICAgICAgZG9QQVRDSDogJ2RvUEFUQ0gnLFxuICAgICAgZG9QT1NUOiAnZG9QT1NUJyxcbiAgICAgIGRvREVMRVRFOiAnZG9ERUxFVEUnLFxuICAgICAgZG9HRVQ6ICdkb0dFVCcsXG4gICAgICBkb0dFVExJU1Q6ICdkb0dFVExJU1QnLFxuICAgICAgZnJvbVNlcnZlcjogJ2Zyb21TZXJ2ZXInLFxuICAgICAgd2l0aENvbmZpZzogJ3dpdGhDb25maWcnLFxuICAgICAgd2l0aEh0dHBDb25maWc6ICd3aXRoSHR0cENvbmZpZycsXG4gICAgICBzaW5nbGVPbmU6ICdzaW5nbGVPbmUnLFxuICAgICAgcGxhaW46ICdwbGFpbicsXG4gICAgICBzYXZlOiAnc2F2ZScsXG4gICAgICByZXN0YW5ndWxhcml6ZWQ6ICdyZXN0YW5ndWxhcml6ZWQnXG4gICAgfTtcbiAgICBvYmplY3Quc2V0UmVzdGFuZ3VsYXJGaWVsZHMgPSBmdW5jdGlvbihyZXNGaWVsZHMpIHtcbiAgICAgIGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyA9XG4gICAgICAgIF8uZXh0ZW5kKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgcmVzRmllbGRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiAhIW9ialtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJpemVkXTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnNldEZpZWxkVG9FbGVtID0gZnVuY3Rpb24oZmllbGQsIGVsZW0sIHZhbHVlKSB7XG4gICAgICB2YXIgcHJvcGVydGllcyA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgaWRWYWx1ZSA9IGVsZW07XG4gICAgICBfLmVhY2goXy5pbml0aWFsKHByb3BlcnRpZXMpLCBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIGlkVmFsdWVbcHJvcF0gPSB7fTtcbiAgICAgICAgaWRWYWx1ZSA9IGlkVmFsdWVbcHJvcF07XG4gICAgICB9KTtcbiAgICAgIGlkVmFsdWVbXy5sYXN0KHByb3BlcnRpZXMpXSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtID0gZnVuY3Rpb24oZmllbGQsIGVsZW0pIHtcbiAgICAgIHZhciBwcm9wZXJ0aWVzID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBpZFZhbHVlID0gZWxlbTtcbiAgICAgIF8uZWFjaChwcm9wZXJ0aWVzLCBmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIGlmIChpZFZhbHVlKSB7XG4gICAgICAgICAgaWRWYWx1ZSA9IGlkVmFsdWVbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShpZFZhbHVlKTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnNldElkVG9FbGVtID0gZnVuY3Rpb24oZWxlbSwgaWQgLyosIHJvdXRlICovICkge1xuICAgICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSwgaWQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGNvbmZpZy5nZXRJZEZyb21FbGVtID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICAgcmV0dXJuIGNvbmZpZy5nZXRGaWVsZEZyb21FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZCwgZWxlbSk7XG4gICAgfTtcblxuICAgIGNvbmZpZy5pc1ZhbGlkSWQgPSBmdW5jdGlvbihlbGVtSWQpIHtcbiAgICAgIHJldHVybiAnJyAhPT0gZWxlbUlkICYmICFfLmlzVW5kZWZpbmVkKGVsZW1JZCkgJiYgIV8uaXNOdWxsKGVsZW1JZCk7XG4gICAgfTtcblxuICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0gPSBmdW5jdGlvbihlbGVtLCB1cmwgLyosIHJvdXRlICovICkge1xuICAgICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zZWxmTGluaywgZWxlbSwgdXJsKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBjb25maWcuZ2V0VXJsRnJvbUVsZW0gPSBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gY29uZmlnLmdldEZpZWxkRnJvbUVsZW0oY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNlbGZMaW5rLCBlbGVtKTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnVzZUNhbm5vbmljYWxJZCA9IF8uaXNVbmRlZmluZWQoY29uZmlnLnVzZUNhbm5vbmljYWxJZCkgPyBmYWxzZSA6IGNvbmZpZy51c2VDYW5ub25pY2FsSWQ7XG4gICAgb2JqZWN0LnNldFVzZUNhbm5vbmljYWxJZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBjb25maWcudXNlQ2Fubm9uaWNhbElkID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgY29uZmlnLmdldENhbm5vbmljYWxJZEZyb21FbGVtID0gZnVuY3Rpb24oZWxlbSkge1xuICAgICAgdmFyIGNhbm5vbmljYWxJZCA9IGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmNhbm5vbmljYWxJZF07XG4gICAgICB2YXIgYWN0dWFsSWQgPSBjb25maWcuaXNWYWxpZElkKGNhbm5vbmljYWxJZCkgPyBjYW5ub25pY2FsSWQgOiBjb25maWcuZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICAgIHJldHVybiBhY3R1YWxJZDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgUmVzcG9uc2UgcGFyc2VyLiBUaGlzIGlzIHVzZWQgaW4gY2FzZSB5b3VyIHJlc3BvbnNlIGlzbid0IGRpcmVjdGx5IHRoZSBkYXRhLlxuICAgICAqIEZvciBleGFtcGxlIGlmIHlvdSBoYXZlIGEgcmVzcG9uc2UgbGlrZSB7bWV0YTogeydtZXRhJ30sIGRhdGE6IHtuYW1lOiAnR29udG8nfX1cbiAgICAgKiB5b3UgY2FuIGV4dHJhY3QgdGhpcyBkYXRhIHdoaWNoIGlzIHRoZSBvbmUgdGhhdCBuZWVkcyB3cmFwcGluZ1xuICAgICAqXG4gICAgICogVGhlIFJlc3BvbnNlRXh0cmFjdG9yIGlzIGEgZnVuY3Rpb24gdGhhdCByZWNlaXZlcyB0aGUgcmVzcG9uc2UgYW5kIHRoZSBtZXRob2QgZXhlY3V0ZWQuXG4gICAgICovXG5cbiAgICBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMgPSBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMgfHwgW107XG5cbiAgICBjb25maWcuZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihkYXRhIC8qLCBvcGVyYXRpb24sIHdoYXQsIHVybCwgcmVzcG9uc2UsIGRlZmVycmVkICovICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcblxuICAgIGNvbmZpZy5yZXNwb25zZUV4dHJhY3RvciA9IGZ1bmN0aW9uKGRhdGEsIG9wZXJhdGlvbiwgd2hhdCwgdXJsLCByZXNwb25zZSwgZGVmZXJyZWQpIHtcbiAgICAgIHZhciBpbnRlcmNlcHRvcnMgPSBhbmd1bGFyLmNvcHkoY29uZmlnLnJlc3BvbnNlSW50ZXJjZXB0b3JzKTtcbiAgICAgIGludGVyY2VwdG9ycy5wdXNoKGNvbmZpZy5kZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcik7XG4gICAgICB2YXIgdGhlRGF0YSA9IGRhdGE7XG4gICAgICBfLmVhY2goaW50ZXJjZXB0b3JzLCBmdW5jdGlvbihpbnRlcmNlcHRvcikge1xuICAgICAgICB0aGVEYXRhID0gaW50ZXJjZXB0b3IodGhlRGF0YSwgb3BlcmF0aW9uLFxuICAgICAgICAgIHdoYXQsIHVybCwgcmVzcG9uc2UsIGRlZmVycmVkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRoZURhdGE7XG4gICAgfTtcblxuICAgIG9iamVjdC5hZGRSZXNwb25zZUludGVyY2VwdG9yID0gZnVuY3Rpb24oZXh0cmFjdG9yKSB7XG4gICAgICBjb25maWcucmVzcG9uc2VJbnRlcmNlcHRvcnMucHVzaChleHRyYWN0b3IpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIGNvbmZpZy5lcnJvckludGVyY2VwdG9ycyA9IGNvbmZpZy5lcnJvckludGVyY2VwdG9ycyB8fCBbXTtcbiAgICBvYmplY3QuYWRkRXJyb3JJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGludGVyY2VwdG9yKSB7XG4gICAgICBjb25maWcuZXJyb3JJbnRlcmNlcHRvcnMucHVzaChpbnRlcmNlcHRvcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgb2JqZWN0LnNldFJlc3BvbnNlSW50ZXJjZXB0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgICBvYmplY3Quc2V0UmVzcG9uc2VFeHRyYWN0b3IgPSBvYmplY3QuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgICBvYmplY3Quc2V0RXJyb3JJbnRlcmNlcHRvciA9IG9iamVjdC5hZGRFcnJvckludGVyY2VwdG9yO1xuXG4gICAgLyoqXG4gICAgICogUmVzcG9uc2UgaW50ZXJjZXB0b3IgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIHJlc29sdmluZyBwcm9taXNlcy5cbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBpbnRlcmNlcHRvciBpcyBjYWxsZWQgYmVmb3JlIHNlbmRpbmcgYW4gb2JqZWN0IHRvIHRoZSBzZXJ2ZXIuXG4gICAgICovXG4gICAgY29uZmlnLnJlcXVlc3RJbnRlcmNlcHRvcnMgPSBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycyB8fCBbXTtcblxuICAgIGNvbmZpZy5kZWZhdWx0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbihlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgaHR0cENvbmZpZzogaHR0cENvbmZpZ1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uZmlnLmZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3IgPSBmdW5jdGlvbihlbGVtZW50LCBvcGVyYXRpb24sIHBhdGgsIHVybCwgaGVhZGVycywgcGFyYW1zLCBodHRwQ29uZmlnKSB7XG4gICAgICB2YXIgaW50ZXJjZXB0b3JzID0gYW5ndWxhci5jb3B5KGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzKTtcbiAgICAgIHZhciBkZWZhdWx0UmVxdWVzdCA9IGNvbmZpZy5kZWZhdWx0SW50ZXJjZXB0b3IoZWxlbWVudCwgb3BlcmF0aW9uLCBwYXRoLCB1cmwsIGhlYWRlcnMsIHBhcmFtcywgaHR0cENvbmZpZyk7XG4gICAgICByZXR1cm4gXy5yZWR1Y2UoaW50ZXJjZXB0b3JzLCBmdW5jdGlvbihyZXF1ZXN0LCBpbnRlcmNlcHRvcikge1xuICAgICAgICByZXR1cm4gXy5leHRlbmQocmVxdWVzdCwgaW50ZXJjZXB0b3IocmVxdWVzdC5lbGVtZW50LCBvcGVyYXRpb24sXG4gICAgICAgICAgcGF0aCwgdXJsLCByZXF1ZXN0LmhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLCByZXF1ZXN0Lmh0dHBDb25maWcpKTtcbiAgICAgIH0sIGRlZmF1bHRSZXF1ZXN0KTtcbiAgICB9O1xuXG4gICAgb2JqZWN0LmFkZFJlcXVlc3RJbnRlcmNlcHRvciA9IGZ1bmN0aW9uKGludGVyY2VwdG9yKSB7XG4gICAgICBjb25maWcucmVxdWVzdEludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uKGVsZW0sIG9wZXJhdGlvbiwgcGF0aCwgdXJsLCBoZWFkZXJzLCBwYXJhbXMsIGh0dHBDb25maWcpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGVsZW1lbnQ6IGludGVyY2VwdG9yKGVsZW0sIG9wZXJhdGlvbiwgcGF0aCwgdXJsKSxcbiAgICAgICAgICBodHRwQ29uZmlnOiBodHRwQ29uZmlnXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBvYmplY3Quc2V0UmVxdWVzdEludGVyY2VwdG9yID0gb2JqZWN0LmFkZFJlcXVlc3RJbnRlcmNlcHRvcjtcblxuICAgIG9iamVjdC5hZGRGdWxsUmVxdWVzdEludGVyY2VwdG9yID0gZnVuY3Rpb24oaW50ZXJjZXB0b3IpIHtcbiAgICAgIGNvbmZpZy5yZXF1ZXN0SW50ZXJjZXB0b3JzLnB1c2goaW50ZXJjZXB0b3IpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIG9iamVjdC5zZXRGdWxsUmVxdWVzdEludGVyY2VwdG9yID0gb2JqZWN0LmFkZEZ1bGxSZXF1ZXN0SW50ZXJjZXB0b3I7XG5cbiAgICBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZCB8fCBmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9O1xuICAgIG9iamVjdC5zZXRPbkJlZm9yZUVsZW1SZXN0YW5ndWxhcml6ZWQgPSBmdW5jdGlvbihwb3N0KSB7XG4gICAgICBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkID0gcG9zdDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBvYmplY3Quc2V0UmVzdGFuZ3VsYXJpemVQcm9taXNlSW50ZXJjZXB0b3IgPSBmdW5jdGlvbihpbnRlcmNlcHRvcikge1xuICAgICAgY29uZmlnLnJlc3Rhbmd1bGFyaXplUHJvbWlzZUludGVyY2VwdG9yID0gaW50ZXJjZXB0b3I7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGFmdGVyIGFuIGVsZW1lbnQgaGFzIGJlZW4gXCJSZXN0YW5ndWxhcml6ZWRcIi5cbiAgICAgKlxuICAgICAqIEl0IHJlY2VpdmVzIHRoZSBlbGVtZW50LCBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBpdCdzIGFuIGVsZW1lbnQgb3IgYSBjb2xsZWN0aW9uXG4gICAgICogYW5kIHRoZSBuYW1lIG9mIHRoZSBtb2RlbFxuICAgICAqXG4gICAgICovXG4gICAgY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQgfHwgZnVuY3Rpb24oZWxlbSkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfTtcbiAgICBvYmplY3Quc2V0T25FbGVtUmVzdGFuZ3VsYXJpemVkID0gZnVuY3Rpb24ocG9zdCkge1xuICAgICAgY29uZmlnLm9uRWxlbVJlc3Rhbmd1bGFyaXplZCA9IHBvc3Q7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgY29uZmlnLnNob3VsZFNhdmVQYXJlbnQgPSBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCB8fCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgb2JqZWN0LnNldFBhcmVudGxlc3MgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIGlmIChfLmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICBjb25maWcuc2hvdWxkU2F2ZVBhcmVudCA9IGZ1bmN0aW9uKHJvdXRlKSB7XG4gICAgICAgICAgcmV0dXJuICFfLmluY2x1ZGVzKHZhbHVlcywgcm91dGUpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChfLmlzQm9vbGVhbih2YWx1ZXMpKSB7XG4gICAgICAgIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuICF2YWx1ZXM7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBsZXRzIHlvdSBzZXQgYSBzdWZmaXggdG8gZXZlcnkgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlLCBpZiB5b3VyIGFwaSByZXF1aXJlcyB0aGF0IGZvciBKU29uIHJlcXVlc3RzIHlvdSBkbyAvdXNlcnMvMTIzLmpzb24sIHlvdSBjYW4gc2V0IHRoYXRcbiAgICAgKiBpbiBoZXJlLlxuICAgICAqXG4gICAgICpcbiAgICAgKiBCeSBkZWZhdWx0LCB0aGUgc3VmZml4IGlzIG51bGxcbiAgICAgKi9cbiAgICBjb25maWcuc3VmZml4ID0gXy5pc1VuZGVmaW5lZChjb25maWcuc3VmZml4KSA/IG51bGwgOiBjb25maWcuc3VmZml4O1xuICAgIG9iamVjdC5zZXRSZXF1ZXN0U3VmZml4ID0gZnVuY3Rpb24obmV3U3VmZml4KSB7XG4gICAgICBjb25maWcuc3VmZml4ID0gbmV3U3VmZml4O1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBlbGVtZW50IHRyYW5zZm9ybWVycyBmb3IgY2VydGFpbiByb3V0ZXMuXG4gICAgICovXG4gICAgY29uZmlnLnRyYW5zZm9ybWVycyA9IGNvbmZpZy50cmFuc2Zvcm1lcnMgfHwge307XG4gICAgY29uZmlnLm1hdGNoVHJhbnNmb3JtZXJzID0gY29uZmlnLm1hdGNoVHJhbnNmb3JtZXJzIHx8IFtdO1xuICAgIG9iamVjdC5hZGRFbGVtZW50VHJhbnNmb3JtZXIgPSBmdW5jdGlvbih0eXBlLCBzZWNvbmRBcmcsIHRoaXJkQXJnKSB7XG4gICAgICB2YXIgaXNDb2xsZWN0aW9uID0gbnVsbDtcbiAgICAgIHZhciB0cmFuc2Zvcm1lciA9IG51bGw7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0cmFuc2Zvcm1lciA9IHNlY29uZEFyZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybWVyID0gdGhpcmRBcmc7XG4gICAgICAgIGlzQ29sbGVjdGlvbiA9IHNlY29uZEFyZztcbiAgICAgIH1cblxuICAgICAgdmFyIHRyYW5zZm9ybWVyRm4gPSBmdW5jdGlvbihjb2xsLCBlbGVtKSB7XG4gICAgICAgIGlmIChfLmlzTnVsbChpc0NvbGxlY3Rpb24pIHx8IChjb2xsID09PSBpc0NvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyKGVsZW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgfTtcblxuICAgICAgaWYgKF8uaXNSZWdFeHAodHlwZSkpIHtcbiAgICAgICAgY29uZmlnLm1hdGNoVHJhbnNmb3JtZXJzLnB1c2goe1xuICAgICAgICAgIHJlZ2V4cDogdHlwZSxcbiAgICAgICAgICB0cmFuc2Zvcm1lcjogdHJhbnNmb3JtZXJGblxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghY29uZmlnLnRyYW5zZm9ybWVyc1t0eXBlXSkge1xuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1lcnNbdHlwZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWcudHJhbnNmb3JtZXJzW3R5cGVdLnB1c2godHJhbnNmb3JtZXJGbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIG9iamVjdC5leHRlbmRDb2xsZWN0aW9uID0gZnVuY3Rpb24ocm91dGUsIGZuKSB7XG4gICAgICByZXR1cm4gb2JqZWN0LmFkZEVsZW1lbnRUcmFuc2Zvcm1lcihyb3V0ZSwgdHJ1ZSwgZm4pO1xuICAgIH07XG5cbiAgICBvYmplY3QuZXh0ZW5kTW9kZWwgPSBmdW5jdGlvbihyb3V0ZSwgZm4pIHtcbiAgICAgIHJldHVybiBvYmplY3QuYWRkRWxlbWVudFRyYW5zZm9ybWVyKHJvdXRlLCBmYWxzZSwgZm4pO1xuICAgIH07XG5cbiAgICBjb25maWcudHJhbnNmb3JtRWxlbSA9IGZ1bmN0aW9uKGVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyLCBmb3JjZSkge1xuICAgICAgaWYgKCFmb3JjZSAmJiAhY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgJiYgIWVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICAgIHJldHVybiBlbGVtO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2hhbmdlZEVsZW0gPSBlbGVtO1xuXG4gICAgICB2YXIgbWF0Y2hUcmFuc2Zvcm1lcnMgPSBjb25maWcubWF0Y2hUcmFuc2Zvcm1lcnM7XG4gICAgICBpZiAobWF0Y2hUcmFuc2Zvcm1lcnMpIHtcbiAgICAgICAgXy5lYWNoKG1hdGNoVHJhbnNmb3JtZXJzLCBmdW5jdGlvbih0cmFuc2Zvcm1lcikge1xuICAgICAgICAgIGlmICh0cmFuc2Zvcm1lci5yZWdleHAudGVzdChyb3V0ZSkpIHtcbiAgICAgICAgICAgIGNoYW5nZWRFbGVtID0gdHJhbnNmb3JtZXIudHJhbnNmb3JtZXIoaXNDb2xsZWN0aW9uLCBjaGFuZ2VkRWxlbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdmFyIHR5cGVUcmFuc2Zvcm1lcnMgPSBjb25maWcudHJhbnNmb3JtZXJzW3JvdXRlXTtcbiAgICAgIGlmICh0eXBlVHJhbnNmb3JtZXJzKSB7XG4gICAgICAgIF8uZWFjaCh0eXBlVHJhbnNmb3JtZXJzLCBmdW5jdGlvbih0cmFuc2Zvcm1lcikge1xuICAgICAgICAgIGNoYW5nZWRFbGVtID0gdHJhbnNmb3JtZXIoaXNDb2xsZWN0aW9uLCBjaGFuZ2VkRWxlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbmZpZy5vbkVsZW1SZXN0YW5ndWxhcml6ZWQoY2hhbmdlZEVsZW0sIGlzQ29sbGVjdGlvbiwgcm91dGUsIFJlc3Rhbmd1bGFyKTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnRyYW5zZm9ybUxvY2FsRWxlbWVudHMgPSBfLmlzVW5kZWZpbmVkKGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzKSA/XG4gICAgICBmYWxzZSA6XG4gICAgICBjb25maWcudHJhbnNmb3JtTG9jYWxFbGVtZW50cztcblxuICAgIG9iamVjdC5zZXRUcmFuc2Zvcm1Pbmx5U2VydmVyRWxlbWVudHMgPSBmdW5jdGlvbihhY3RpdmUpIHtcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1Mb2NhbEVsZW1lbnRzID0gIWFjdGl2ZTtcbiAgICB9O1xuXG4gICAgY29uZmlnLmZ1bGxSZXNwb25zZSA9IF8uaXNVbmRlZmluZWQoY29uZmlnLmZ1bGxSZXNwb25zZSkgPyBmYWxzZSA6IGNvbmZpZy5mdWxsUmVzcG9uc2U7XG4gICAgb2JqZWN0LnNldEZ1bGxSZXNwb25zZSA9IGZ1bmN0aW9uKGZ1bGwpIHtcbiAgICAgIGNvbmZpZy5mdWxsUmVzcG9uc2UgPSBmdWxsO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuXG4gICAgLy9JbnRlcm5hbCB2YWx1ZXMgYW5kIGZ1bmN0aW9uc1xuICAgIGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQmFzZSBVUkwgQ3JlYXRvci4gQmFzZSBwcm90b3R5cGUgZm9yIGV2ZXJ5dGhpbmcgcmVsYXRlZCB0byBpdFxuICAgICAqKi9cblxuICAgIHZhciBCYXNlQ3JlYXRvciA9IGZ1bmN0aW9uKCkge307XG5cbiAgICBCYXNlQ3JlYXRvci5wcm90b3R5cGUuc2V0Q29uZmlnID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBCYXNlQ3JlYXRvci5wcm90b3R5cGUucGFyZW50c0FycmF5ID0gZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICAgIHdoaWxlIChjdXJyZW50KSB7XG4gICAgICAgIHBhcmVudHMucHVzaChjdXJyZW50KTtcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBhcmVudHMucmV2ZXJzZSgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBSZXN0YW5ndWxhclJlc291cmNlKGNvbmZpZywgJGh0dHAsIHVybCwgY29uZmlndXJlcikge1xuICAgICAgdmFyIHJlc291cmNlID0ge307XG4gICAgICBfLmVhY2goXy5rZXlzKGNvbmZpZ3VyZXIpLCBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gY29uZmlndXJlcltrZXldO1xuXG4gICAgICAgIC8vIEFkZCBkZWZhdWx0IHBhcmFtZXRlcnNcbiAgICAgICAgdmFsdWUucGFyYW1zID0gXy5leHRlbmQoe30sIHZhbHVlLnBhcmFtcywgY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zW3ZhbHVlLm1ldGhvZC50b0xvd2VyQ2FzZSgpXSk7XG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdGhlID8gaWYgbm8gcGFyYW1zIGFyZSB0aGVyZVxuICAgICAgICBpZiAoXy5pc0VtcHR5KHZhbHVlLnBhcmFtcykpIHtcbiAgICAgICAgICBkZWxldGUgdmFsdWUucGFyYW1zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbmZpZy5pc1NhZmUodmFsdWUubWV0aG9kKSkge1xuXG4gICAgICAgICAgcmVzb3VyY2Vba2V5XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKF8uZXh0ZW5kKHZhbHVlLCB7XG4gICAgICAgICAgICAgIHVybDogdXJsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgcmVzb3VyY2Vba2V5XSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cChfLmV4dGVuZCh2YWx1ZSwge1xuICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNvdXJjZTtcbiAgICB9XG5cbiAgICBCYXNlQ3JlYXRvci5wcm90b3R5cGUucmVzb3VyY2UgPSBmdW5jdGlvbihjdXJyZW50LCAkaHR0cCwgbG9jYWxIdHRwQ29uZmlnLCBjYWxsSGVhZGVycywgY2FsbFBhcmFtcywgd2hhdCwgZXRhZywgb3BlcmF0aW9uKSB7XG5cbiAgICAgIHZhciBwYXJhbXMgPSBfLmRlZmF1bHRzKGNhbGxQYXJhbXMgfHwge30sIHRoaXMuY29uZmlnLmRlZmF1bHRSZXF1ZXN0UGFyYW1zLmNvbW1vbik7XG4gICAgICB2YXIgaGVhZGVycyA9IF8uZGVmYXVsdHMoY2FsbEhlYWRlcnMgfHwge30sIHRoaXMuY29uZmlnLmRlZmF1bHRIZWFkZXJzKTtcblxuICAgICAgaWYgKGV0YWcpIHtcbiAgICAgICAgaWYgKCFjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICBoZWFkZXJzWydJZi1NYXRjaCddID0gZXRhZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZWFkZXJzWydJZi1Ob25lLU1hdGNoJ10gPSBldGFnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB1cmwgPSB0aGlzLmJhc2UoY3VycmVudCk7XG5cbiAgICAgIGlmICh3aGF0IHx8IHdoYXQgPT09IDApIHtcbiAgICAgICAgdmFyIGFkZCA9ICcnO1xuICAgICAgICBpZiAoIS9cXC8kLy50ZXN0KHVybCkpIHtcbiAgICAgICAgICBhZGQgKz0gJy8nO1xuICAgICAgICB9XG4gICAgICAgIGFkZCArPSB3aGF0O1xuICAgICAgICB1cmwgKz0gYWRkO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb25maWcuc3VmZml4ICYmXG4gICAgICAgIHVybC5pbmRleE9mKHRoaXMuY29uZmlnLnN1ZmZpeCwgdXJsLmxlbmd0aCAtIHRoaXMuY29uZmlnLnN1ZmZpeC5sZW5ndGgpID09PSAtMSAmJlxuICAgICAgICAhdGhpcy5jb25maWcuZ2V0VXJsRnJvbUVsZW0oY3VycmVudCkpIHtcbiAgICAgICAgdXJsICs9IHRoaXMuY29uZmlnLnN1ZmZpeDtcbiAgICAgIH1cblxuICAgICAgY3VycmVudFt0aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSA9IHVuZGVmaW5lZDtcblxuICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyUmVzb3VyY2UodGhpcy5jb25maWcsICRodHRwLCB1cmwsIHtcbiAgICAgICAgZ2V0TGlzdDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLCB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGdldDogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLCB7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGpzb25wOiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsIHtcbiAgICAgICAgICBtZXRob2Q6ICdqc29ucCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgICBwdXQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZywge1xuICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgICAgICAgaGVhZGVyczogaGVhZGVyc1xuICAgICAgICB9KSxcblxuICAgICAgICBwb3N0OiB0aGlzLmNvbmZpZy53aXRoSHR0cFZhbHVlcyhsb2NhbEh0dHBDb25maWcsIHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICAgIHJlbW92ZTogdGhpcy5jb25maWcud2l0aEh0dHBWYWx1ZXMobG9jYWxIdHRwQ29uZmlnLCB7XG4gICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGhlYWQ6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZywge1xuICAgICAgICAgIG1ldGhvZDogJ0hFQUQnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgICAgdHJhY2U6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZywge1xuICAgICAgICAgIG1ldGhvZDogJ1RSQUNFJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pLFxuXG4gICAgICAgIG9wdGlvbnM6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZywge1xuICAgICAgICAgIG1ldGhvZDogJ09QVElPTlMnLFxuICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnNcbiAgICAgICAgfSksXG5cbiAgICAgICAgcGF0Y2g6IHRoaXMuY29uZmlnLndpdGhIdHRwVmFsdWVzKGxvY2FsSHR0cENvbmZpZywge1xuICAgICAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICBoZWFkZXJzOiBoZWFkZXJzXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyB0aGUgUGF0aCBVUkwgY3JlYXRvci4gSXQgdXNlcyBQYXRoIHRvIHNob3cgSGllcmFyY2h5IGluIHRoZSBSZXN0IEFQSS5cbiAgICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgeW91IGhhdmUgYW4gQWNjb3VudCB0aGF0IHRoZW4gaGFzIGEgc2V0IG9mIEJ1aWxkaW5ncywgYSBVUkwgdG8gYSBidWlsZGluZ1xuICAgICAqIHdvdWxkIGJlIC9hY2NvdW50cy8xMjMvYnVpbGRpbmdzLzQ1NlxuICAgICAqKi9cbiAgICB2YXIgUGF0aCA9IGZ1bmN0aW9uKCkge307XG5cbiAgICBQYXRoLnByb3RvdHlwZSA9IG5ldyBCYXNlQ3JlYXRvcigpO1xuXG4gICAgUGF0aC5wcm90b3R5cGUubm9ybWFsaXplVXJsID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICB2YXIgcGFydHMgPSAvKCg/Omh0dHBbc10/Oik/XFwvXFwvKT8oLiopPy8uZXhlYyh1cmwpO1xuICAgICAgcGFydHNbMl0gPSBwYXJ0c1syXS5yZXBsYWNlKC9bXFxcXFxcL10rL2csICcvJyk7XG4gICAgICByZXR1cm4gKHR5cGVvZiBwYXJ0c1sxXSAhPT0gJ3VuZGVmaW5lZCcpID8gcGFydHNbMV0gKyBwYXJ0c1syXSA6IHBhcnRzWzJdO1xuICAgIH07XG5cbiAgICBQYXRoLnByb3RvdHlwZS5iYXNlID0gZnVuY3Rpb24oY3VycmVudCkge1xuICAgICAgdmFyIF9fdGhpcyA9IHRoaXM7XG4gICAgICByZXR1cm4gXy5yZWR1Y2UodGhpcy5wYXJlbnRzQXJyYXkoY3VycmVudCksIGZ1bmN0aW9uKGFjdW0sIGVsZW0pIHtcbiAgICAgICAgdmFyIGVsZW1Vcmw7XG4gICAgICAgIHZhciBlbGVtU2VsZkxpbmsgPSBfX3RoaXMuY29uZmlnLmdldFVybEZyb21FbGVtKGVsZW0pO1xuICAgICAgICBpZiAoZWxlbVNlbGZMaW5rKSB7XG4gICAgICAgICAgaWYgKF9fdGhpcy5jb25maWcuaXNBYnNvbHV0ZVVybChlbGVtU2VsZkxpbmspKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbVNlbGZMaW5rO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtVXJsID0gZWxlbVNlbGZMaW5rO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtVXJsID0gZWxlbVtfX3RoaXMuY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXTtcblxuICAgICAgICAgIGlmIChlbGVtW19fdGhpcy5jb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgdmFyIGlkcyA9IGVsZW1bX190aGlzLmNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5pZHNdO1xuICAgICAgICAgICAgaWYgKGlkcykge1xuICAgICAgICAgICAgICBlbGVtVXJsICs9ICcvJyArIGlkcy5qb2luKCcsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlbGVtSWQ7XG4gICAgICAgICAgICBpZiAoX190aGlzLmNvbmZpZy51c2VDYW5ub25pY2FsSWQpIHtcbiAgICAgICAgICAgICAgZWxlbUlkID0gX190aGlzLmNvbmZpZy5nZXRDYW5ub25pY2FsSWRGcm9tRWxlbShlbGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsZW1JZCA9IF9fdGhpcy5jb25maWcuZ2V0SWRGcm9tRWxlbShlbGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQoZWxlbUlkKSAmJiAhZWxlbS5zaW5nbGVPbmUpIHtcbiAgICAgICAgICAgICAgZWxlbVVybCArPSAnLycgKyAoX190aGlzLmNvbmZpZy5lbmNvZGVJZHMgPyBlbmNvZGVVUklDb21wb25lbnQoZWxlbUlkKSA6IGVsZW1JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFjdW0gPSBhY3VtLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLycgKyBlbGVtVXJsO1xuICAgICAgICByZXR1cm4gX190aGlzLm5vcm1hbGl6ZVVybChhY3VtKTtcblxuICAgICAgfSwgdGhpcy5jb25maWcuYmFzZVVybCk7XG4gICAgfTtcblxuXG5cbiAgICBQYXRoLnByb3RvdHlwZS5mZXRjaFVybCA9IGZ1bmN0aW9uKGN1cnJlbnQsIHdoYXQpIHtcbiAgICAgIHZhciBiYXNlVXJsID0gdGhpcy5iYXNlKGN1cnJlbnQpO1xuICAgICAgaWYgKHdoYXQpIHtcbiAgICAgICAgYmFzZVVybCArPSAnLycgKyB3aGF0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGJhc2VVcmw7XG4gICAgfTtcblxuICAgIFBhdGgucHJvdG90eXBlLmZldGNoUmVxdWVzdGVkVXJsID0gZnVuY3Rpb24oY3VycmVudCwgd2hhdCkge1xuICAgICAgdmFyIHVybCA9IHRoaXMuZmV0Y2hVcmwoY3VycmVudCwgd2hhdCk7XG4gICAgICB2YXIgcGFyYW1zID0gY3VycmVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXTtcblxuICAgICAgLy8gRnJvbSBoZXJlIG9uIGFuZCB1bnRpbCB0aGUgZW5kIG9mIGZldGNoUmVxdWVzdGVkVXJsLFxuICAgICAgLy8gdGhlIGNvZGUgaGFzIGJlZW4ga2luZGx5IGJvcnJvd2VkIGZyb20gYW5ndWxhci5qc1xuICAgICAgLy8gVGhlIHJlYXNvbiBmb3Igc3VjaCBjb2RlIGJsb2F0aW5nIGlzIGNvaGVyZW5jZTpcbiAgICAgIC8vICAgSWYgdGhlIHVzZXIgd2VyZSB0byB1c2UgdGhpcyBmb3IgY2FjaGUgbWFuYWdlbWVudCwgdGhlXG4gICAgICAvLyAgIHNlcmlhbGl6YXRpb24gb2YgcGFyYW1ldGVycyB3b3VsZCBuZWVkIHRvIGJlIGlkZW50aWNhbFxuICAgICAgLy8gICB0byB0aGUgb25lIGRvbmUgYnkgYW5ndWxhciBmb3IgY2FjaGUga2V5cyB0byBtYXRjaC5cbiAgICAgIGZ1bmN0aW9uIHNvcnRlZEtleXMob2JqKSB7XG4gICAgICAgIHZhciBrZXlzID0gW107XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5cy5zb3J0KCk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGZvckVhY2hTb3J0ZWQob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgICAgICB2YXIga2V5cyA9IHNvcnRlZEtleXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5c1tpXV0sIGtleXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBrZXlzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbmNvZGVVcmlRdWVyeSh2YWwsIHBjdEVuY29kZVNwYWNlcykge1xuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICAgICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgICAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICAgICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgICAgICByZXBsYWNlKC8lMjAvZywgKHBjdEVuY29kZVNwYWNlcyA/ICclMjAnIDogJysnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgIHJldHVybiB1cmwgKyAodGhpcy5jb25maWcuc3VmZml4IHx8ICcnKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICBmb3JFYWNoU29ydGVkKHBhcmFtcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZSA9IFt2YWx1ZV07XG4gICAgICAgIH1cblxuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsdWUsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdCh2KSkge1xuICAgICAgICAgICAgdiA9IGFuZ3VsYXIudG9Kc29uKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZVVyaVF1ZXJ5KGtleSkgKyAnPScgKyBlbmNvZGVVcmlRdWVyeSh2KSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB1cmwgKyAodGhpcy5jb25maWcuc3VmZml4IHx8ICcnKSArICgodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEpID8gJz8nIDogJyYnKSArIHBhcnRzLmpvaW4oJyYnKTtcbiAgICB9O1xuXG4gICAgY29uZmlnLnVybENyZWF0b3JGYWN0b3J5LnBhdGggPSBQYXRoO1xuICB9O1xuXG4gIHZhciBnbG9iYWxDb25maWd1cmF0aW9uID0ge307XG5cbiAgQ29uZmlndXJlci5pbml0KHRoaXMsIGdsb2JhbENvbmZpZ3VyYXRpb24pO1xuXG5cblxuICB0aGlzLiRnZXQgPSBbJyRodHRwJywgJyRxJywgZnVuY3Rpb24oJGh0dHAsICRxKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihjb25maWcpIHtcbiAgICAgIHZhciBzZXJ2aWNlID0ge307XG5cbiAgICAgIHZhciB1cmxIYW5kbGVyID0gbmV3IGNvbmZpZy51cmxDcmVhdG9yRmFjdG9yeVtjb25maWcudXJsQ3JlYXRvcl0oKTtcbiAgICAgIHVybEhhbmRsZXIuc2V0Q29uZmlnKGNvbmZpZyk7XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQmFzZShwYXJlbnQsIGVsZW0sIHJvdXRlLCByZXFQYXJhbXMsIGZyb21TZXJ2ZXIpIHtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdID0gcm91dGU7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldFJlc3Rhbmd1bGFyVXJsXSA9IF8uYmluZCh1cmxIYW5kbGVyLmZldGNoVXJsLCB1cmxIYW5kbGVyLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UmVxdWVzdGVkVXJsXSA9IF8uYmluZCh1cmxIYW5kbGVyLmZldGNoUmVxdWVzdGVkVXJsLCB1cmxIYW5kbGVyLCBlbGVtKTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuYWRkUmVzdGFuZ3VsYXJNZXRob2RdID0gXy5iaW5kKGFkZFJlc3Rhbmd1bGFyTWV0aG9kRnVuY3Rpb24sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jbG9uZV0gPSBfLmJpbmQoY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXFQYXJhbXNdID0gXy5pc0VtcHR5KHJlcVBhcmFtcykgPyBudWxsIDogcmVxUGFyYW1zO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy53aXRoSHR0cENvbmZpZ10gPSBfLmJpbmQod2l0aEh0dHBDb25maWcsIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wbGFpbl0gPSBfLmJpbmQoc3RyaXBSZXN0YW5ndWxhciwgZWxlbSwgZWxlbSk7XG5cbiAgICAgICAgLy8gVGFnIGVsZW1lbnQgYXMgcmVzdGFuZ3VsYXJpemVkXG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyaXplZF0gPSB0cnVlO1xuXG4gICAgICAgIC8vIFJlcXVlc3RMZXNzIGNvbm5lY3Rpb25cbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub25lXSA9IF8uYmluZChvbmUsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5hbGxdID0gXy5iaW5kKGFsbCwgZWxlbSwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNldmVyYWxdID0gXy5iaW5kKHNldmVyYWwsIGVsZW0sIGVsZW0pO1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5vbmVVcmxdID0gXy5iaW5kKG9uZVVybCwgZWxlbSwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmFsbFVybF0gPSBfLmJpbmQoYWxsVXJsLCBlbGVtLCBlbGVtKTtcblxuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5mcm9tU2VydmVyXSA9ICEhZnJvbVNlcnZlcjtcblxuICAgICAgICBpZiAocGFyZW50ICYmIGNvbmZpZy5zaG91bGRTYXZlUGFyZW50KHJvdXRlKSkge1xuICAgICAgICAgIHZhciBwYXJlbnRJZCA9IGNvbmZpZy5nZXRJZEZyb21FbGVtKHBhcmVudCk7XG4gICAgICAgICAgdmFyIHBhcmVudFVybCA9IGNvbmZpZy5nZXRVcmxGcm9tRWxlbShwYXJlbnQpO1xuXG4gICAgICAgICAgdmFyIHJlc3Rhbmd1bGFyRmllbGRzRm9yUGFyZW50ID0gXy51bmlvbihcbiAgICAgICAgICAgIF8udmFsdWVzKF8ucGljayhjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMsIFsncm91dGUnLCAnc2luZ2xlT25lJywgJ3BhcmVudFJlc291cmNlJ10pKSxcbiAgICAgICAgICAgIGNvbmZpZy5leHRyYUZpZWxkc1xuICAgICAgICAgICk7XG4gICAgICAgICAgdmFyIHBhcmVudFJlc291cmNlID0gXy5waWNrKHBhcmVudCwgcmVzdGFuZ3VsYXJGaWVsZHNGb3JQYXJlbnQpO1xuXG4gICAgICAgICAgaWYgKGNvbmZpZy5pc1ZhbGlkSWQocGFyZW50SWQpKSB7XG4gICAgICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudElkLCByb3V0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjb25maWcuaXNWYWxpZElkKHBhcmVudFVybCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5zZXRVcmxUb0VsZW0ocGFyZW50UmVzb3VyY2UsIHBhcmVudFVybCwgcm91dGUpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IHBhcmVudFJlc291cmNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZShwYXJlbnQsIHJvdXRlLCBpZCwgc2luZ2xlT25lKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgaWYgKF8uaXNOdW1iZXIocm91dGUpIHx8IF8uaXNOdW1iZXIocGFyZW50KSkge1xuICAgICAgICAgIGVycm9yID0gJ1lvdVxcJ3JlIGNyZWF0aW5nIGEgUmVzdGFuZ3VsYXIgZW50aXR5IHdpdGggdGhlIG51bWJlciAnO1xuICAgICAgICAgIGVycm9yICs9ICdpbnN0ZWFkIG9mIHRoZSByb3V0ZSBvciB0aGUgcGFyZW50LiBGb3IgZXhhbXBsZSwgeW91IGNhblxcJ3QgY2FsbCAub25lKDEyKS4nO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQocm91dGUpKSB7XG4gICAgICAgICAgZXJyb3IgPSAnWW91XFwncmUgY3JlYXRpbmcgYSBSZXN0YW5ndWxhciBlbnRpdHkgZWl0aGVyIHdpdGhvdXQgdGhlIHBhdGguICc7XG4gICAgICAgICAgZXJyb3IgKz0gJ0ZvciBleGFtcGxlIHlvdSBjYW5cXCd0IGNhbGwgLm9uZSgpLiBQbGVhc2UgY2hlY2sgaWYgeW91ciBhcmd1bWVudHMgYXJlIHZhbGlkLic7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbSA9IHt9O1xuICAgICAgICBjb25maWcuc2V0SWRUb0VsZW0oZWxlbSwgaWQsIHJvdXRlKTtcbiAgICAgICAgY29uZmlnLnNldEZpZWxkVG9FbGVtKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5zaW5nbGVPbmUsIGVsZW0sIHNpbmdsZU9uZSk7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtLCByb3V0ZSwgZmFsc2UpO1xuICAgICAgfVxuXG5cbiAgICAgIGZ1bmN0aW9uIGFsbChwYXJlbnQsIHJvdXRlKSB7XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24ocGFyZW50LCBbXSwgcm91dGUsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V2ZXJhbChwYXJlbnQsIHJvdXRlIC8qLCBpZHMgKi8gKSB7XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gW107XG4gICAgICAgIGNvbGxlY3Rpb25bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmlkc10gPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGNvbGxlY3Rpb24sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uZVVybChwYXJlbnQsIHJvdXRlLCB1cmwpIHtcbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUm91dGUgaXMgbWFuZGF0b3J5IHdoZW4gY3JlYXRpbmcgbmV3IFJlc3Rhbmd1bGFyIG9iamVjdHMuJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsZW0gPSB7fTtcbiAgICAgICAgY29uZmlnLnNldFVybFRvRWxlbShlbGVtLCB1cmwsIHJvdXRlKTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShwYXJlbnQsIGVsZW0sIHJvdXRlLCBmYWxzZSk7XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gYWxsVXJsKHBhcmVudCwgcm91dGUsIHVybCkge1xuICAgICAgICBpZiAoIXJvdXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSb3V0ZSBpcyBtYW5kYXRvcnkgd2hlbiBjcmVhdGluZyBuZXcgUmVzdGFuZ3VsYXIgb2JqZWN0cy4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbSA9IHt9O1xuICAgICAgICBjb25maWcuc2V0VXJsVG9FbGVtKGVsZW0sIHVybCwgcm91dGUpO1xuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKHBhcmVudCwgZWxlbSwgcm91dGUsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIC8vIFByb21pc2VzXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZVByb21pc2UocHJvbWlzZSwgaXNDb2xsZWN0aW9uLCB2YWx1ZVRvRmlsbCkge1xuICAgICAgICBwcm9taXNlLmNhbGwgPSBfLmJpbmQocHJvbWlzZUNhbGwsIHByb21pc2UpO1xuICAgICAgICBwcm9taXNlLmdldCA9IF8uYmluZChwcm9taXNlR2V0LCBwcm9taXNlKTtcbiAgICAgICAgcHJvbWlzZVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IGlzQ29sbGVjdGlvbjtcbiAgICAgICAgaWYgKGlzQ29sbGVjdGlvbikge1xuICAgICAgICAgIHByb21pc2UucHVzaCA9IF8uYmluZChwcm9taXNlQ2FsbCwgcHJvbWlzZSwgJ3B1c2gnKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9taXNlLiRvYmplY3QgPSB2YWx1ZVRvRmlsbDtcbiAgICAgICAgaWYgKGNvbmZpZy5yZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvcikge1xuICAgICAgICAgIGNvbmZpZy5yZXN0YW5ndWxhcml6ZVByb21pc2VJbnRlcmNlcHRvcihwcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcHJvbWlzZUNhbGwobWV0aG9kKSB7XG4gICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgIHZhciBjYWxsQXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIGZpbGxlZFZhbHVlID0ge307XG4gICAgICAgIHRoaXMudGhlbihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2FsbEFyZ3MsIDEpO1xuICAgICAgICAgIHZhciBmdW5jID0gdmFsW21ldGhvZF07XG4gICAgICAgICAgZnVuYy5hcHBseSh2YWwsIHBhcmFtcyk7XG4gICAgICAgICAgZmlsbGVkVmFsdWUgPSB2YWw7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSh2YWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUHJvbWlzZShkZWZlcnJlZC5wcm9taXNlLCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dLCBmaWxsZWRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHByb21pc2VHZXQod2hhdCkge1xuICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICB2YXIgZmlsbGVkVmFsdWUgPSB7fTtcbiAgICAgICAgdGhpcy50aGVuKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgIGZpbGxlZFZhbHVlID0gdmFsW3doYXRdO1xuICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUoZmlsbGVkVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUHJvbWlzZShkZWZlcnJlZC5wcm9taXNlLCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yZXN0YW5ndWxhckNvbGxlY3Rpb25dLCBmaWxsZWRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVQcm9taXNlKGRlZmVycmVkLCByZXNwb25zZSwgZGF0YSwgZmlsbGVkVmFsdWUpIHtcbiAgICAgICAgXy5leHRlbmQoZmlsbGVkVmFsdWUsIGRhdGEpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIGZ1bGwgcmVzcG9uc2UgaW50ZXJjZXB0b3IuXG4gICAgICAgIGlmIChjb25maWcuZnVsbFJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnJlc29sdmUoXy5leHRlbmQocmVzcG9uc2UsIHtcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG5cbiAgICAgIC8vIEVsZW1lbnRzXG4gICAgICBmdW5jdGlvbiBzdHJpcFJlc3Rhbmd1bGFyKGVsZW0pIHtcbiAgICAgICAgaWYgKF8uaXNBcnJheShlbGVtKSkge1xuICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgIF8uZWFjaChlbGVtLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgYXJyYXkucHVzaChjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQodmFsdWUpID8gc3RyaXBSZXN0YW5ndWxhcih2YWx1ZSkgOiB2YWx1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfLm9taXQoZWxlbSwgXy52YWx1ZXMoXy5vbWl0KGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcywgJ2lkJykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRDdXN0b21PcGVyYXRpb24oZWxlbSkge1xuICAgICAgICBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21PcGVyYXRpb25dID0gXy5iaW5kKGN1c3RvbUZ1bmN0aW9uLCBlbGVtKTtcbiAgICAgICAgdmFyIHJlcXVlc3RNZXRob2RzID0ge1xuICAgICAgICAgIGdldDogY3VzdG9tRnVuY3Rpb24sXG4gICAgICAgICAgZGVsZXRlOiBjdXN0b21GdW5jdGlvblxuICAgICAgICB9O1xuICAgICAgICBfLmVhY2goWydwdXQnLCAncGF0Y2gnLCAncG9zdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgcmVxdWVzdE1ldGhvZHNbbmFtZV0gPSBmdW5jdGlvbihvcGVyYXRpb24sIGVsZW0sIHBhdGgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICAgICAgcmV0dXJuIF8uYmluZChjdXN0b21GdW5jdGlvbiwgdGhpcykob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMsIGVsZW0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBfLmVhY2gocmVxdWVzdE1ldGhvZHMsIGZ1bmN0aW9uKHJlcXVlc3RGdW5jLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGNhbGxPcGVyYXRpb24gPSBuYW1lID09PSAnZGVsZXRlJyA/ICdyZW1vdmUnIDogbmFtZTtcbiAgICAgICAgICBfLmVhY2goWydkbycsICdjdXN0b20nXSwgZnVuY3Rpb24oYWxpYXMpIHtcbiAgICAgICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzW2FsaWFzICsgbmFtZS50b1VwcGVyQ2FzZSgpXV0gPSBfLmJpbmQocmVxdWVzdEZ1bmMsIGVsZW0sIGNhbGxPcGVyYXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY3VzdG9tR0VUTElTVF0gPSBfLmJpbmQoZmV0Y2hGdW5jdGlvbiwgZWxlbSk7XG4gICAgICAgIGVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmRvR0VUTElTVF0gPSBlbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5jdXN0b21HRVRMSVNUXTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY29weVJlc3Rhbmd1bGFyaXplZEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgY29waWVkRWxlbWVudCA9IGFuZ3VsYXIuY29weShlbGVtZW50KTtcblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSdyZSBkZWFsaW5nIHdpdGggYSBjb2xsZWN0aW9uIChpLmUuIGFuIGFycmF5KVxuICAgICAgICAvLyBhbmQgcmVzdGFuZ3VsYXJpemUgdGhlIGVsZW1lbnQgdXNpbmcgdGhlIHByb3BlciByZXN0YW5ndWxhcml6ZXIsXG4gICAgICAgIC8vIGVsZW1lbnQgLyBjb2xsZWN0aW9uXG4gICAgICAgIGlmIChfLmlzQXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKFxuICAgICAgICAgICAgZWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgY29waWVkRWxlbWVudCxcbiAgICAgICAgICAgIGVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSxcbiAgICAgICAgICAgIGVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdLFxuICAgICAgICAgICAgZWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3QgYSBjb2xsZWN0aW9uLCByZXN0YW5ndWxhcml6ZSBpdCBhcyBhbiBlbGVtZW50XG4gICAgICAgIHJldHVybiByZXN0YW5ndWxhcml6ZUVsZW0oXG4gICAgICAgICAgZWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgIGNvcGllZEVsZW1lbnQsXG4gICAgICAgICAgZWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgIGVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdLFxuICAgICAgICAgIGVsZW1lbnRbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0sXG4gICAgICAgICAgZWxlbWVudFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVxUGFyYW1zXVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXN0YW5ndWxhcml6ZUVsZW0ocGFyZW50LCBlbGVtZW50LCByb3V0ZSwgZnJvbVNlcnZlciwgY29sbGVjdGlvbiwgcmVxUGFyYW1zKSB7XG4gICAgICAgIHZhciBlbGVtID0gY29uZmlnLm9uQmVmb3JlRWxlbVJlc3Rhbmd1bGFyaXplZChlbGVtZW50LCBmYWxzZSwgcm91dGUpO1xuXG4gICAgICAgIHZhciBsb2NhbEVsZW0gPSByZXN0YW5ndWxhcml6ZUJhc2UocGFyZW50LCBlbGVtLCByb3V0ZSwgcmVxUGFyYW1zLCBmcm9tU2VydmVyKTtcblxuICAgICAgICBpZiAoY29uZmlnLnVzZUNhbm5vbmljYWxJZCkge1xuICAgICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuY2Fubm9uaWNhbElkXSA9IGNvbmZpZy5nZXRJZEZyb21FbGVtKGxvY2FsRWxlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sbGVjdGlvbikge1xuICAgICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0UGFyZW50TGlzdF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0gPSBmYWxzZTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5nZXRdID0gXy5iaW5kKGdldEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldExpc3RdID0gXy5iaW5kKGZldGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucHV0XSA9IF8uYmluZChwdXRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wb3N0XSA9IF8uYmluZChwb3N0RnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVtb3ZlXSA9IF8uYmluZChkZWxldGVGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5oZWFkXSA9IF8uYmluZChoZWFkRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMudHJhY2VdID0gXy5iaW5kKHRyYWNlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMub3B0aW9uc10gPSBfLmJpbmQob3B0aW9uc0Z1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhdGNoXSA9IF8uYmluZChwYXRjaEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnNhdmVdID0gXy5iaW5kKHNhdmUsIGxvY2FsRWxlbSk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIGZhbHNlLCByb3V0ZSwgc2VydmljZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyLCByZXFQYXJhbXMpIHtcbiAgICAgICAgdmFyIGVsZW0gPSBjb25maWcub25CZWZvcmVFbGVtUmVzdGFuZ3VsYXJpemVkKGVsZW1lbnQsIHRydWUsIHJvdXRlKTtcblxuICAgICAgICB2YXIgbG9jYWxFbGVtID0gcmVzdGFuZ3VsYXJpemVCYXNlKHBhcmVudCwgZWxlbSwgcm91dGUsIHJlcVBhcmFtcywgZnJvbVNlcnZlcik7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSA9IHRydWU7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucG9zdF0gPSBfLmJpbmQocG9zdEZ1bmN0aW9uLCBsb2NhbEVsZW0sIG51bGwpO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlbW92ZV0gPSBfLmJpbmQoZGVsZXRlRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaGVhZF0gPSBfLmJpbmQoaGVhZEZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnRyYWNlXSA9IF8uYmluZCh0cmFjZUZ1bmN0aW9uLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dEVsZW1lbnRdID0gXy5iaW5kKHB1dEVsZW1lbnRGdW5jdGlvbiwgbG9jYWxFbGVtKTtcbiAgICAgICAgbG9jYWxFbGVtW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5vcHRpb25zXSA9IF8uYmluZChvcHRpb25zRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGF0Y2hdID0gXy5iaW5kKHBhdGNoRnVuY3Rpb24sIGxvY2FsRWxlbSk7XG4gICAgICAgIGxvY2FsRWxlbVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZ2V0XSA9IF8uYmluZChnZXRCeUlkLCBsb2NhbEVsZW0pO1xuICAgICAgICBsb2NhbEVsZW1bY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmdldExpc3RdID0gXy5iaW5kKGZldGNoRnVuY3Rpb24sIGxvY2FsRWxlbSwgbnVsbCk7XG5cbiAgICAgICAgYWRkQ3VzdG9tT3BlcmF0aW9uKGxvY2FsRWxlbSk7XG4gICAgICAgIHJldHVybiBjb25maWcudHJhbnNmb3JtRWxlbShsb2NhbEVsZW0sIHRydWUsIHJvdXRlLCBzZXJ2aWNlLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uQW5kRWxlbWVudHMocGFyZW50LCBlbGVtZW50LCByb3V0ZSwgZnJvbVNlcnZlcikge1xuICAgICAgICB2YXIgY29sbGVjdGlvbiA9IHJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBmcm9tU2VydmVyKTtcbiAgICAgICAgXy5lYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICBpZiAoZWxlbSkge1xuICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVFbGVtKHBhcmVudCwgZWxlbSwgcm91dGUsIGZyb21TZXJ2ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCeUlkKGlkLCByZXFQYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tR0VUKGlkLnRvU3RyaW5nKCksIHJlcVBhcmFtcywgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEVsZW1lbnRGdW5jdGlvbihpZHgsIHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGVsZW1Ub1B1dCA9IHRoaXNbaWR4XTtcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIGVsZW1Ub1B1dFtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLCBzZXJ2aWNlKTtcbiAgICAgICAgZWxlbVRvUHV0LnB1dChwYXJhbXMsIGhlYWRlcnMpLnRoZW4oZnVuY3Rpb24oc2VydmVyRWxlbSkge1xuICAgICAgICAgIHZhciBuZXdBcnJheSA9IGNvcHlSZXN0YW5ndWxhcml6ZWRFbGVtZW50KF9fdGhpcyk7XG4gICAgICAgICAgbmV3QXJyYXlbaWR4XSA9IHNlcnZlckVsZW07XG4gICAgICAgICAgZmlsbGVkQXJyYXkgPSBuZXdBcnJheTtcbiAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKG5ld0FycmF5KTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVQcm9taXNlKGRlZmVycmVkLnByb21pc2UsIHRydWUsIGZpbGxlZEFycmF5KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIGRlZmVycmVkKSB7XG4gICAgICAgIHZhciBkYXRhID0gY29uZmlnLnJlc3BvbnNlRXh0cmFjdG9yKHJlc0RhdGEsIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLCByZXNwb25zZSwgZGVmZXJyZWQpO1xuICAgICAgICB2YXIgZXRhZyA9IHJlc3BvbnNlLmhlYWRlcnMoJ0VUYWcnKTtcbiAgICAgICAgaWYgKGRhdGEgJiYgZXRhZykge1xuICAgICAgICAgIGRhdGFbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmV0YWddID0gZXRhZztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cblxuXG4gICAgICBmdW5jdGlvbiBmZXRjaEZ1bmN0aW9uKHdoYXQsIHJlcVBhcmFtcywgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIG9wZXJhdGlvbiA9ICdnZXRMaXN0JztcbiAgICAgICAgdmFyIHVybCA9IHVybEhhbmRsZXIuZmV0Y2hVcmwodGhpcywgd2hhdCk7XG4gICAgICAgIHZhciB3aGF0RmV0Y2hlZCA9IHdoYXQgfHwgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG5cbiAgICAgICAgdmFyIHJlcXVlc3QgPSBjb25maWcuZnVsbFJlcXVlc3RJbnRlcmNlcHRvcihudWxsLCBvcGVyYXRpb24sXG4gICAgICAgICAgd2hhdEZldGNoZWQsIHVybCwgaGVhZGVycyB8fCB7fSwgcmVxUGFyYW1zIHx8IHt9LCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5odHRwQ29uZmlnXSB8fCB7fSk7XG5cbiAgICAgICAgdmFyIGZpbGxlZEFycmF5ID0gW107XG4gICAgICAgIGZpbGxlZEFycmF5ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkQXJyYXksIHRydWUsIHdoYXRGZXRjaGVkLCBzZXJ2aWNlKTtcblxuICAgICAgICB2YXIgbWV0aG9kID0gJ2dldExpc3QnO1xuXG4gICAgICAgIGlmIChjb25maWcuanNvbnApIHtcbiAgICAgICAgICBtZXRob2QgPSAnanNvbnAnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9rQ2FsbGJhY2sgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHZhciByZXNEYXRhID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICB2YXIgZnVsbFBhcmFtcyA9IHJlc3BvbnNlLmNvbmZpZy5wYXJhbXM7XG4gICAgICAgICAgdmFyIGRhdGEgPSBwYXJzZVJlc3BvbnNlKHJlc0RhdGEsIG9wZXJhdGlvbiwgd2hhdEZldGNoZWQsIHVybCwgcmVzcG9uc2UsIGRlZmVycmVkKTtcblxuICAgICAgICAgIC8vIHN1cHBvcnQgZW1wdHkgcmVzcG9uc2UgZm9yIGdldExpc3QoKSBjYWxscyAoc29tZSBBUElzIHJlc3BvbmQgd2l0aCAyMDQgYW5kIGVtcHR5IGJvZHkpXG4gICAgICAgICAgaWYgKF8uaXNVbmRlZmluZWQoZGF0YSkgfHwgJycgPT09IGRhdGEpIHtcbiAgICAgICAgICAgIGRhdGEgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFfLmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzcG9uc2UgZm9yIGdldExpc3QgU0hPVUxEIGJlIGFuIGFycmF5IGFuZCBub3QgYW4gb2JqZWN0IG9yIHNvbWV0aGluZyBlbHNlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRydWUgPT09IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlKGRlZmVycmVkLCByZXNwb25zZSwgZGF0YSwgZmlsbGVkQXJyYXkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBwcm9jZXNzZWREYXRhID0gXy5tYXAoZGF0YSwgZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgaWYgKCFfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXMsIGVsZW0sIHdoYXQsIHRydWUsIGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplRWxlbShfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLCBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSwgdHJ1ZSwgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwcm9jZXNzZWREYXRhID0gXy5leHRlbmQoZGF0YSwgcHJvY2Vzc2VkRGF0YSk7XG5cbiAgICAgICAgICBpZiAoIV9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoXG4gICAgICAgICAgICAgIGRlZmVycmVkLFxuICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICAgcmVzdGFuZ3VsYXJpemVDb2xsZWN0aW9uKFxuICAgICAgICAgICAgICAgIF9fdGhpcyxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWREYXRhLFxuICAgICAgICAgICAgICAgIHdoYXQsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGZpbGxlZEFycmF5XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlUHJvbWlzZShcbiAgICAgICAgICAgICAgZGVmZXJyZWQsXG4gICAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICAgICByZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb24oXG4gICAgICAgICAgICAgICAgX190aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5wYXJlbnRSZXNvdXJjZV0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkRGF0YSxcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJvdXRlXSxcbiAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgZmlsbGVkQXJyYXlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgcmVxdWVzdC5oZWFkZXJzLCByZXF1ZXN0LnBhcmFtcywgd2hhdCxcbiAgICAgICAgICB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5ldGFnXSwgb3BlcmF0aW9uKVttZXRob2RdKCkudGhlbihva0NhbGxiYWNrLCBmdW5jdGlvbiBlcnJvcihyZXNwb25zZSkge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDMwNCAmJiBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnJlc3Rhbmd1bGFyQ29sbGVjdGlvbl0pIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKGRlZmVycmVkLCByZXNwb25zZSwgX190aGlzLCBmaWxsZWRBcnJheSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmV2ZXJ5KGNvbmZpZy5lcnJvckludGVyY2VwdG9ycywgZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNiKHJlc3BvbnNlLCBkZWZlcnJlZCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3Rhbmd1bGFyaXplUHJvbWlzZShkZWZlcnJlZC5wcm9taXNlLCB0cnVlLCBmaWxsZWRBcnJheSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHdpdGhIdHRwQ29uZmlnKGh0dHBDb25maWcpIHtcbiAgICAgICAgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gPSBodHRwQ29uZmlnO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2F2ZShwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLmZyb21TZXJ2ZXJdKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnB1dF0ocGFyYW1zLCBoZWFkZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gXy5iaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3Bvc3QnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBlbGVtRnVuY3Rpb24ob3BlcmF0aW9uLCB3aGF0LCBwYXJhbXMsIG9iaiwgaGVhZGVycykge1xuICAgICAgICB2YXIgX190aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgdmFyIHJlc1BhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIHJvdXRlID0gd2hhdCB8fCB0aGlzW2NvbmZpZy5yZXN0YW5ndWxhckZpZWxkcy5yb3V0ZV07XG4gICAgICAgIHZhciBmZXRjaFVybCA9IHVybEhhbmRsZXIuZmV0Y2hVcmwodGhpcywgd2hhdCk7XG5cbiAgICAgICAgdmFyIGNhbGxPYmogPSBvYmogfHwgdGhpcztcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gZXRhZyBvbiByZXN0YW5ndWxhciBvYmplY3QgKHNpbmNlIGZvciBjdXN0b20gbWV0aG9kcyB3ZSBwcm9iYWJseSBkb24ndCBleHBsaWNpdGx5IHNwZWNpZnkgdGhlIGV0YWcgZmllbGQpXG4gICAgICAgIHZhciBldGFnID0gY2FsbE9ialtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZXRhZ10gfHwgKG9wZXJhdGlvbiAhPT0gJ3Bvc3QnID8gdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuZXRhZ10gOiBudWxsKTtcblxuICAgICAgICBpZiAoXy5pc09iamVjdChjYWxsT2JqKSAmJiBjb25maWcuaXNSZXN0YW5ndWxhcml6ZWQoY2FsbE9iaikpIHtcbiAgICAgICAgICBjYWxsT2JqID0gc3RyaXBSZXN0YW5ndWxhcihjYWxsT2JqKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVxdWVzdCA9IGNvbmZpZy5mdWxsUmVxdWVzdEludGVyY2VwdG9yKGNhbGxPYmosIG9wZXJhdGlvbiwgcm91dGUsIGZldGNoVXJsLFxuICAgICAgICAgIGhlYWRlcnMgfHwge30sIHJlc1BhcmFtcyB8fCB7fSwgdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuaHR0cENvbmZpZ10gfHwge30pO1xuXG4gICAgICAgIHZhciBmaWxsZWRPYmplY3QgPSB7fTtcbiAgICAgICAgZmlsbGVkT2JqZWN0ID0gY29uZmlnLnRyYW5zZm9ybUVsZW0oZmlsbGVkT2JqZWN0LCBmYWxzZSwgcm91dGUsIHNlcnZpY2UpO1xuXG4gICAgICAgIHZhciBva0NhbGxiYWNrID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICB2YXIgcmVzRGF0YSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICAgICAgdmFyIGZ1bGxQYXJhbXMgPSByZXNwb25zZS5jb25maWcucGFyYW1zO1xuICAgICAgICAgIHZhciBlbGVtID0gcGFyc2VSZXNwb25zZShyZXNEYXRhLCBvcGVyYXRpb24sIHJvdXRlLCBmZXRjaFVybCwgcmVzcG9uc2UsIGRlZmVycmVkKTtcblxuICAgICAgICAgIC8vIGFjY2VwdCAwIGFzIHJlc3BvbnNlXG4gICAgICAgICAgaWYgKGVsZW0gIT09IG51bGwgJiYgZWxlbSAhPT0gdW5kZWZpbmVkICYmIGVsZW0gIT09ICcnKSB7XG4gICAgICAgICAgICB2YXIgZGF0YTtcblxuICAgICAgICAgICAgaWYgKHRydWUgPT09IGNvbmZpZy5wbGFpbkJ5RGVmYXVsdCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2UoZGVmZXJyZWQsIHJlc3BvbnNlLCBlbGVtLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3BlcmF0aW9uID09PSAncG9zdCcgJiYgIV9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucmVzdGFuZ3VsYXJDb2xsZWN0aW9uXSkge1xuICAgICAgICAgICAgICBkYXRhID0gcmVzdGFuZ3VsYXJpemVFbGVtKFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucGFyZW50UmVzb3VyY2VdLFxuICAgICAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICAgICAgcm91dGUsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgIGZ1bGxQYXJhbXNcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoZGVmZXJyZWQsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0YSA9IHJlc3Rhbmd1bGFyaXplRWxlbShcbiAgICAgICAgICAgICAgICBfX3RoaXNbY29uZmlnLnJlc3Rhbmd1bGFyRmllbGRzLnBhcmVudFJlc291cmNlXSxcbiAgICAgICAgICAgICAgICBlbGVtLFxuICAgICAgICAgICAgICAgIF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMucm91dGVdLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBmdWxsUGFyYW1zXG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgZGF0YVtjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lXSA9IF9fdGhpc1tjb25maWcucmVzdGFuZ3VsYXJGaWVsZHMuc2luZ2xlT25lXTtcbiAgICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoZGVmZXJyZWQsIHJlc3BvbnNlLCBkYXRhLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmVQcm9taXNlKGRlZmVycmVkLCByZXNwb25zZSwgdW5kZWZpbmVkLCBmaWxsZWRPYmplY3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMzA0ICYmIGNvbmZpZy5pc1NhZmUob3BlcmF0aW9uKSkge1xuICAgICAgICAgICAgcmVzb2x2ZVByb21pc2UoZGVmZXJyZWQsIHJlc3BvbnNlLCBfX3RoaXMsIGZpbGxlZE9iamVjdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChfLmV2ZXJ5KGNvbmZpZy5lcnJvckludGVyY2VwdG9ycywgZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNiKHJlc3BvbnNlLCBkZWZlcnJlZCwgb2tDYWxsYmFjaykgIT09IGZhbHNlO1xuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIC8vIHRyaWdnZXJlZCBpZiBubyBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLy8gT3ZlcnJpZGluZyBIVFRQIE1ldGhvZFxuICAgICAgICB2YXIgY2FsbE9wZXJhdGlvbiA9IG9wZXJhdGlvbjtcbiAgICAgICAgdmFyIGNhbGxIZWFkZXJzID0gXy5leHRlbmQoe30sIHJlcXVlc3QuaGVhZGVycyk7XG4gICAgICAgIHZhciBpc092ZXJyaWRlT3BlcmF0aW9uID0gY29uZmlnLmlzT3ZlcnJpZGVuTWV0aG9kKG9wZXJhdGlvbik7XG4gICAgICAgIGlmIChpc092ZXJyaWRlT3BlcmF0aW9uKSB7XG4gICAgICAgICAgY2FsbE9wZXJhdGlvbiA9ICdwb3N0JztcbiAgICAgICAgICBjYWxsSGVhZGVycyA9IF8uZXh0ZW5kKGNhbGxIZWFkZXJzLCB7XG4gICAgICAgICAgICAnWC1IVFRQLU1ldGhvZC1PdmVycmlkZSc6IG9wZXJhdGlvbiA9PT0gJ3JlbW92ZScgPyAnREVMRVRFJyA6IG9wZXJhdGlvbi50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLmpzb25wICYmIGNhbGxPcGVyYXRpb24gPT09ICdnZXQnKSB7XG4gICAgICAgICAgY2FsbE9wZXJhdGlvbiA9ICdqc29ucCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29uZmlnLmlzU2FmZShvcGVyYXRpb24pKSB7XG4gICAgICAgICAgaWYgKGlzT3ZlcnJpZGVPcGVyYXRpb24pIHtcbiAgICAgICAgICAgIHVybEhhbmRsZXIucmVzb3VyY2UodGhpcywgJGh0dHAsIHJlcXVlc3QuaHR0cENvbmZpZywgY2FsbEhlYWRlcnMsIHJlcXVlc3QucGFyYW1zLFxuICAgICAgICAgICAgICB3aGF0LCBldGFnLCBjYWxsT3BlcmF0aW9uKVtjYWxsT3BlcmF0aW9uXSh7fSkudGhlbihva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICAgIHdoYXQsIGV0YWcsIGNhbGxPcGVyYXRpb24pW2NhbGxPcGVyYXRpb25dKCkudGhlbihva0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsSGFuZGxlci5yZXNvdXJjZSh0aGlzLCAkaHR0cCwgcmVxdWVzdC5odHRwQ29uZmlnLCBjYWxsSGVhZGVycywgcmVxdWVzdC5wYXJhbXMsXG4gICAgICAgICAgICB3aGF0LCBldGFnLCBjYWxsT3BlcmF0aW9uKVtjYWxsT3BlcmF0aW9uXShyZXF1ZXN0LmVsZW1lbnQpLnRoZW4ob2tDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdGFuZ3VsYXJpemVQcm9taXNlKGRlZmVycmVkLnByb21pc2UsIGZhbHNlLCBmaWxsZWRPYmplY3QpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF8uYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdnZXQnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZGVsZXRlRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfLmJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncmVtb3ZlJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHB1dEZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gXy5iaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ3B1dCcsIHVuZGVmaW5lZCwgcGFyYW1zLCB1bmRlZmluZWQsIGhlYWRlcnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBwb3N0RnVuY3Rpb24od2hhdCwgZWxlbSwgcGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfLmJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgncG9zdCcsIHdoYXQsIHBhcmFtcywgZWxlbSwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGhlYWRGdW5jdGlvbihwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF8uYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdoZWFkJywgdW5kZWZpbmVkLCBwYXJhbXMsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRyYWNlRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfLmJpbmQoZWxlbUZ1bmN0aW9uLCB0aGlzKSgndHJhY2UnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gb3B0aW9uc0Z1bmN0aW9uKHBhcmFtcywgaGVhZGVycykge1xuICAgICAgICByZXR1cm4gXy5iaW5kKGVsZW1GdW5jdGlvbiwgdGhpcykoJ29wdGlvbnMnLCB1bmRlZmluZWQsIHBhcmFtcywgdW5kZWZpbmVkLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcGF0Y2hGdW5jdGlvbihlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF8uYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKCdwYXRjaCcsIHVuZGVmaW5lZCwgcGFyYW1zLCBlbGVtLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY3VzdG9tRnVuY3Rpb24ob3BlcmF0aW9uLCBwYXRoLCBwYXJhbXMsIGhlYWRlcnMsIGVsZW0pIHtcbiAgICAgICAgcmV0dXJuIF8uYmluZChlbGVtRnVuY3Rpb24sIHRoaXMpKG9wZXJhdGlvbiwgcGF0aCwgcGFyYW1zLCBlbGVtLCBoZWFkZXJzKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkUmVzdGFuZ3VsYXJNZXRob2RGdW5jdGlvbihuYW1lLCBvcGVyYXRpb24sIHBhdGgsIGRlZmF1bHRQYXJhbXMsIGRlZmF1bHRIZWFkZXJzLCBkZWZhdWx0RWxlbSkge1xuICAgICAgICB2YXIgYmluZGVkRnVuY3Rpb247XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICdnZXRMaXN0Jykge1xuICAgICAgICAgIGJpbmRlZEZ1bmN0aW9uID0gXy5iaW5kKGZldGNoRnVuY3Rpb24sIHRoaXMsIHBhdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJpbmRlZEZ1bmN0aW9uID0gXy5iaW5kKGN1c3RvbUZ1bmN0aW9uLCB0aGlzLCBvcGVyYXRpb24sIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNyZWF0ZWRGdW5jdGlvbiA9IGZ1bmN0aW9uKHBhcmFtcywgaGVhZGVycywgZWxlbSkge1xuICAgICAgICAgIHZhciBjYWxsUGFyYW1zID0gXy5kZWZhdWx0cyh7XG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBlbGVtXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgcGFyYW1zOiBkZWZhdWx0UGFyYW1zLFxuICAgICAgICAgICAgaGVhZGVyczogZGVmYXVsdEhlYWRlcnMsXG4gICAgICAgICAgICBlbGVtOiBkZWZhdWx0RWxlbVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBiaW5kZWRGdW5jdGlvbihjYWxsUGFyYW1zLnBhcmFtcywgY2FsbFBhcmFtcy5oZWFkZXJzLCBjYWxsUGFyYW1zLmVsZW0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjb25maWcuaXNTYWZlKG9wZXJhdGlvbikpIHtcbiAgICAgICAgICB0aGlzW25hbWVdID0gY3JlYXRlZEZ1bmN0aW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbbmFtZV0gPSBmdW5jdGlvbihlbGVtLCBwYXJhbXMsIGhlYWRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVkRnVuY3Rpb24ocGFyYW1zLCBoZWFkZXJzLCBlbGVtKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHdpdGhDb25maWd1cmF0aW9uRnVuY3Rpb24oY29uZmlndXJlcikge1xuICAgICAgICB2YXIgbmV3Q29uZmlnID0gYW5ndWxhci5jb3B5KF8ub21pdChjb25maWcsICdjb25maWd1cmF0aW9uJykpO1xuICAgICAgICBDb25maWd1cmVyLmluaXQobmV3Q29uZmlnLCBuZXdDb25maWcpO1xuICAgICAgICBjb25maWd1cmVyKG5ld0NvbmZpZyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihuZXdDb25maWcpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB0b1NlcnZpY2Uocm91dGUsIHBhcmVudCkge1xuICAgICAgICB2YXIga25vd25Db2xsZWN0aW9uTWV0aG9kcyA9IF8udmFsdWVzKGNvbmZpZy5yZXN0YW5ndWxhckZpZWxkcyk7XG4gICAgICAgIHZhciBzZXJ2ID0ge307XG4gICAgICAgIHZhciBjb2xsZWN0aW9uID0gKHBhcmVudCB8fCBzZXJ2aWNlKS5hbGwocm91dGUpO1xuICAgICAgICBzZXJ2Lm9uZSA9IF8uYmluZChvbmUsIChwYXJlbnQgfHwgc2VydmljZSksIHBhcmVudCwgcm91dGUpO1xuICAgICAgICBzZXJ2LnBvc3QgPSBfLmJpbmQoY29sbGVjdGlvbi5wb3N0LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgc2Vydi5nZXRMaXN0ID0gXy5iaW5kKGNvbGxlY3Rpb24uZ2V0TGlzdCwgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYud2l0aEh0dHBDb25maWcgPSBfLmJpbmQoY29sbGVjdGlvbi53aXRoSHR0cENvbmZpZywgY29sbGVjdGlvbik7XG4gICAgICAgIHNlcnYuZ2V0ID0gXy5iaW5kKGNvbGxlY3Rpb24uZ2V0LCBjb2xsZWN0aW9uKTtcblxuICAgICAgICBmb3IgKHZhciBwcm9wIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoY29sbGVjdGlvbi5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBfLmlzRnVuY3Rpb24oY29sbGVjdGlvbltwcm9wXSkgJiYgIV8uaW5jbHVkZXMoa25vd25Db2xsZWN0aW9uTWV0aG9kcywgcHJvcCkpIHtcbiAgICAgICAgICAgIHNlcnZbcHJvcF0gPSBfLmJpbmQoY29sbGVjdGlvbltwcm9wXSwgY29sbGVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlcnY7XG4gICAgICB9XG5cblxuICAgICAgQ29uZmlndXJlci5pbml0KHNlcnZpY2UsIGNvbmZpZyk7XG5cbiAgICAgIHNlcnZpY2UuY29weSA9IF8uYmluZChjb3B5UmVzdGFuZ3VsYXJpemVkRWxlbWVudCwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2Uuc2VydmljZSA9IF8uYmluZCh0b1NlcnZpY2UsIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLndpdGhDb25maWcgPSBfLmJpbmQod2l0aENvbmZpZ3VyYXRpb25GdW5jdGlvbiwgc2VydmljZSk7XG5cbiAgICAgIHNlcnZpY2Uub25lID0gXy5iaW5kKG9uZSwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2UuYWxsID0gXy5iaW5kKGFsbCwgc2VydmljZSwgbnVsbCk7XG5cbiAgICAgIHNlcnZpY2Uuc2V2ZXJhbCA9IF8uYmluZChzZXZlcmFsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5vbmVVcmwgPSBfLmJpbmQob25lVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5hbGxVcmwgPSBfLmJpbmQoYWxsVXJsLCBzZXJ2aWNlLCBudWxsKTtcblxuICAgICAgc2VydmljZS5zdHJpcFJlc3Rhbmd1bGFyID0gXy5iaW5kKHN0cmlwUmVzdGFuZ3VsYXIsIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLnJlc3Rhbmd1bGFyaXplRWxlbWVudCA9IF8uYmluZChyZXN0YW5ndWxhcml6ZUVsZW0sIHNlcnZpY2UpO1xuXG4gICAgICBzZXJ2aWNlLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbiA9IF8uYmluZChyZXN0YW5ndWxhcml6ZUNvbGxlY3Rpb25BbmRFbGVtZW50cywgc2VydmljZSk7XG5cbiAgICAgIHJldHVybiBzZXJ2aWNlO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVTZXJ2aWNlRm9yQ29uZmlndXJhdGlvbihnbG9iYWxDb25maWd1cmF0aW9uKTtcbiAgfV07XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgcmVzdGFuZ3VsYXIubmFtZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=