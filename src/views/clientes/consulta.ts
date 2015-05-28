/// <reference path="../../_references" />

import {View, Inject} from 'tng';

@View({
    controllerAs: 'consulta',
    templateUrl: 'consulta.html'
})
export class Consulta {
    
    constructor(@Inject('$http') private $http:ng.IHttpService, @Inject('$q') private $q:ng.IQService) {
        console.log('consulta started');
    }
    
    // add(@Inject('$timeout') $timeout:ng.ITimeoutService) {
        
    // }
    
}