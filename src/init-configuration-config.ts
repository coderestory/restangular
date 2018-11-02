import { Path } from './path';
import { BaseCreator } from './base-creator';

/**
 * Those are HTTP safe methods for which there is no need to pass any data with the request.
 */
const safeMethods = ['get', 'head', 'options', 'trace', 'getlist'];

const absolutePattern = /^https?:\/\//i;

export function initConfiguraionConfig(config) {
  config.isSafe = function(operation) {
    return _.includes(safeMethods, operation.toLowerCase());
  };

  config.isAbsoluteUrl = function(string) {
    return _.isUndefined(config.absoluteUrl) || _.isNull(config.absoluteUrl) ?
      string && absolutePattern.test(string) :
      config.absoluteUrl;
  };

  config.absoluteUrl = _.isUndefined(config.absoluteUrl) ? true : config.absoluteUrl;

  /**
   * This is the BaseURL to be used with Restangular
   */
  config.baseUrl = _.isUndefined(config.baseUrl) ? '' : config.baseUrl;

  /**
   * Sets the extra fields to keep from the parents
   */
  config.extraFields = config.extraFields || [];

  /**
   * Some default $http parameter to be used in EVERY call
   **/
  config.defaultHttpFields = config.defaultHttpFields || {};

  /**
   * Always return plain data, no restangularized object
   **/
  config.plainByDefault = config.plainByDefault || false;

  config.withHttpValues = function(httpLocalConfig, obj) {
    return _.defaults(obj, httpLocalConfig, config.defaultHttpFields);
  };

  config.encodeIds = _.isUndefined(config.encodeIds) ? true : config.encodeIds;

  config.defaultRequestParams = config.defaultRequestParams || {
    get: {},
    post: {},
    put: {},
    remove: {},
    common: {}
  };

  config.defaultHeaders = config.defaultHeaders || {};


  /**
   * Method overriders will set which methods are sent via POST with an X-HTTP-Method-Override
   **/
  config.methodOverriders = config.methodOverriders || [];

  config.jsonp = _.isUndefined(config.jsonp) ? false : config.jsonp;

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

  config.errorInterceptors = config.errorInterceptors || [];

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

  config.onBeforeElemRestangularized = config.onBeforeElemRestangularized || function(elem) {
    return elem;
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

  config.shouldSaveParent = config.shouldSaveParent || function() {
    return true;
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

  /**
   * Add element transformers for certain routes.
   */
  config.transformers = config.transformers || {};
  config.matchTransformers = config.matchTransformers || [];

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


  config.fullResponse = _.isUndefined(config.fullResponse) ? false : config.fullResponse;

  //Internal values and functions
  config.urlCreatorFactory = {};

  config.urlCreatorFactory.path = Path;
}
