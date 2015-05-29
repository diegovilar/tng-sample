/// <reference path="./_references" />

import {Application, Inject, bootstrap} from 'tng';
import {Routes} from 'tng/ui-router';

// Modulos
import {ModuloCliente} from './views/clientes/modulo'

// Serviços
// import {ClienteService} from './services/cliente'

@Application({
    selector: 'html',
    dependencies: ['ui.router', ModuloCliente]
})
@Routes({
    '' : '/consulta',
    '?' : '/consulta'
})
class AppController {
    
    run() {
        console.log('app started');
    }
    
}

bootstrap(AppController);