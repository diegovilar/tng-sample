import {Application, Inject, bootstrap} from 'tng';

// Modulos
import {ModuloCliente} from './components/clientes/modulo'

// Serviços
import {ClienteService} from './services/cliente'

@Application({
    name: 'app',
    selector: 'html',
    modules: [ModuloCliente],
    services: [ClienteService]    
})
class App {
    
    @Inject('$httpProvider')
    config($httpProvider:any) {
        
    }
    
    @Inject('$http', '$q')
    run($http:any, $q:any) {
        
    }
    
}

bootstrap(App);