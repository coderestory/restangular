import { Path } from './path';
import { BaseCreator } from './base-creator';

export const Configurer = {};

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

  config.urlCreatorFactory.path = Path;
};
