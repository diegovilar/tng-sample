/// <reference path="../../_references" />

import {Module, Inject} from 'tng';
import {Consulta} from './consulta'
import {States, Routes} from 'tng/ui-router';

@Module()
@States({
    'consulta' : {path: '/consulta', view: Consulta}
})
// @StatesConfig({
//     basePath: '',
//     baseTemplateUrlPath: ''    
// })    
export class ModuloCliente implements Module {
    
    onConfig(@Inject('$httpProvider') $httpProvider:any) {
        console.log(`ModuloCliente configured with:`);
        console.debug(<any>$httpProvider);
    }
    
    onRun(@Inject('$http') $http:any, @Inject('$q') $q:any) {
        console.log(`ModuloCliente ran with:`);
        console.debug(<any>arguments);
    }
    
}
