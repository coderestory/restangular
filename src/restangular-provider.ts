import { initConfiguration } from './init-configuration';
import { createServiceForConfiguration } from './create-service-for-configuration';

export function restangularProvider() {
  var globalConfiguration = {};
  initConfiguration(this, globalConfiguration);

  this.$get = ['$http', '$q', function($http, $q) {
    return createServiceForConfiguration(globalConfiguration, $http, $q);
  }];
}
