import { Configurer } from './configurer';
import { createServiceForConfiguration } from './create-service-for-configuration';

export function restangularProvider() {
  var globalConfiguration = {};
  Configurer.init(this, globalConfiguration);

  this.$get = ['$http', '$q', function($http, $q) {
    return createServiceForConfiguration(globalConfiguration, $http, $q);
  }];
}
