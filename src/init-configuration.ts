import { initConfiguraionConfig } from './init-configuration-config';
import { initConfigurationObject } from './init-configuration-object';

export function initConfiguration(object, config) {
  initConfiguraionConfig(config);
  initConfigurationObject(config, object);
};
