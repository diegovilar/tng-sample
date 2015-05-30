/// <reference path="../../_references" />

import {View, Inject} from 'tng';
import {pathTo} from '../../utils';

@View({
    controllerAs: 'consulta',
    // template: '{{consulta.name}}',
    // templateUrl: 'views/clientes/consulta.html'
    templateUrl: pathTo(`${__dirname}/consulta.html`)
})
export class Consulta {
    
    name = 'consulta';
    
    constructor(@Inject('$http') private $http:ng.IHttpService, @Inject('$q') private $q:ng.IQService) {
        console.log('consulta started');
    }
    
    // add(@Inject('$timeout') $timeout:ng.ITimeoutService) {
        
    // }
    
}

console.log(`__filename = ${__filename}`);
console.log(`__dirname = ${__dirname}`);