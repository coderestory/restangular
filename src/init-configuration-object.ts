export function initConfigurationObject(config, object) {
  object.configuration = config;

  object.setSelfLinkAbsoluteUrl = function(value) {
    config.absoluteUrl = value;
  };

  object.setBaseUrl = function(newBaseUrl) {
    config.baseUrl = /\/$/.test(newBaseUrl) ?
      newBaseUrl.substring(0, newBaseUrl.length - 1) :
      newBaseUrl;
    return this;
  };

  object.setExtraFields = function(newExtraFields) {
    config.extraFields = newExtraFields;
    return this;
  };

  object.setDefaultHttpFields = function(values) {
    config.defaultHttpFields = values;
    return this;
  };

  object.setPlainByDefault = function(value) {
    config.plainByDefault = value === true ? true : false;
    return this;
  };

  object.setEncodeIds = function(encode) {
    config.encodeIds = encode;
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

  object.setDefaultHeaders = function(headers) {
    config.defaultHeaders = headers;
    object.defaultHeaders = config.defaultHeaders;
    return this;
  };

  object.defaultHeaders = config.defaultHeaders;

  object.setMethodOverriders = function(values) {
    var overriders = _.extend([], values);
    if (config.isOverridenMethod('delete', overriders)) {
      overriders.push('remove');
    }
    config.methodOverriders = overriders;
    return this;
  };

  object.setJsonp = function(active) {
    config.jsonp = active;
  };

  object.setUrlCreator = function(name) {
    if (!_.has(config.urlCreatorFactory, name)) {
      throw new Error('URL Path selected isn\'t valid');
    }

    config.urlCreator = name;
    return this;
  };

  object.setRestangularFields = function(resFields) {
    config.restangularFields =
      _.extend(config.restangularFields, resFields);
    return this;
  };

  object.setUseCannonicalId = function(value) {
    config.useCannonicalId = value;
    return this;
  };

  object.addResponseInterceptor = function(extractor) {
    config.responseInterceptors.push(extractor);
    return this;
  };

  object.addErrorInterceptor = function(interceptor) {
    config.errorInterceptors.push(interceptor);
    return this;
  };

  object.setResponseInterceptor = object.addResponseInterceptor;
  object.setResponseExtractor = object.addResponseInterceptor;
  object.setErrorInterceptor = object.addErrorInterceptor;

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

  object.setOnBeforeElemRestangularized = function(post) {
    config.onBeforeElemRestangularized = post;
    return this;
  };

  object.setRestangularizePromiseInterceptor = function(interceptor) {
    config.restangularizePromiseInterceptor = interceptor;
    return this;
  };

  object.setOnElemRestangularized = function(post) {
    config.onElemRestangularized = post;
    return this;
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

  object.setRequestSuffix = function(newSuffix) {
    config.suffix = newSuffix;
    return this;
  };

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

  object.setTransformOnlyServerElements = function(active) {
    config.transformLocalElements = !active;
  };

  object.setFullResponse = function(full) {
    config.fullResponse = full;
    return this;
  };
}
