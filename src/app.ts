/// <reference path="./_references" />

import {Application, Inject, bootstrap} from 'tng';

// Modulos
import {ModuloCliente} from './components/clientes/modulo'

// Serviços
import {ClienteService} from './services/cliente'

@Application({
    selector: 'app',
    services: []    
})
class AppController {
    
    config(@Inject('$httpProvider') $httpProvider:any) {
        
    }
    
    run(@Inject('$http') $http:any, @Inject('$q') $q:any) {
        
    }
    
}

bootstrap(AppController);