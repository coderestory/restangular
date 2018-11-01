import { restangularProvider } from './restangular-provider';

const restangular = angular.module('restangular', []);

restangular.provider('Restangular', restangularProvider);

export default restangular.name;
