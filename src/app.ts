/// <reference path="./_references" />

import {Application, Inject, bootstrap} from 'tng';

// Modulos
import {ModuloCliente} from './views/clientes/modulo'

// Serviços
// import {ClienteService} from './services/cliente'

@Application({
    selector: 'html',
    dependencies: [ModuloCliente]
})
class AppController {
    
    run() {
        console.log('app started');
    }
    
}

bootstrap(AppController);