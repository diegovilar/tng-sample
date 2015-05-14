import {Module, Inject} from 'tng';
import {Consulta} from './consulta'

@Module({
    name: 'adc-cliente',
    modules: [],
    components: [Consulta],
    directives: [],
    services: []
})
export class ModuloCliente {
    
    @Inject('$httpProvider')
    config($httpProvider:any) {
        
    }
    
    @Inject('$http', '$q')
    run($http:any, $q:any) {
        
    }
    
}
