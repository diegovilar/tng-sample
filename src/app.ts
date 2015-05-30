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
    
    constructor() {
        console.debug(<string><any>arguments);
        console.log('app controller instantiated');
    }
    
    onConfig() {
        console.log('app configured');
    }

    onRun() {
        console.log('app started');
    }
    
}

bootstrap(AppController);