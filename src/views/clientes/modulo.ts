/// <reference path="../../_references" />

import {Module, Inject} from 'tng';
import {Consulta} from './consulta'

@Module({
    dependencies: [Consulta]
})
export class ModuloCliente implements Module {
    
    /*onConfig(@Inject('$httpProvider') $httpProvider:any) {
        
    }
    
    onRun(@Inject('$http') $http:any, @Inject('$q') $q:any) {
        
    }*/
    
}
