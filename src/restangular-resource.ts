export function RestangularResource(config, $http, url, configurer) {
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
