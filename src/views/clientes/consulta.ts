/// <reference path="../../_references" />

import {View, Inject} from 'tng';

@View({
    controllerAs: 'consulta',
    template: '{{consulta.name}}'
})
export class Consulta {
    
    name = 'consulta';
    
    constructor(@Inject('$http') private $http:ng.IHttpService, @Inject('$q') private $q:ng.IQService) {
        console.log('consulta started');
    }
    
    // add(@Inject('$timeout') $timeout:ng.ITimeoutService) {
        
    // }
    
}