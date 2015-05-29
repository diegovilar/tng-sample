/// <reference path="../../_references" />

import {Module, Inject} from 'tng';
import {Consulta} from './consulta'
import {States, Routes} from 'tng/ui-router';

@Module({
    dependencies: []
})
@States({
    'consulta' : {path: '/consulta', view: Consulta}
})
export class ModuloCliente implements Module {
    
    /*onConfig(@Inject('$httpProvider') $httpProvider:any) {
        
    }
    
    onRun(@Inject('$http') $http:any, @Inject('$q') $q:any) {
        
    }*/
    
}
