import {Module, Inject} from 'tng';
import {Consulta} from './consulta'

@Module({
    name: 'adc-cliente',
    dependencies: [Consulta]
})
export class ModuloCliente implements Module {
    
    onConfig(@Inject('$httpProvider') $httpProvider:any) {
        
    }
    
    onRun(@Inject('$http') $http:any, @Inject('$q') $q:any) {
        
    }
    
}
