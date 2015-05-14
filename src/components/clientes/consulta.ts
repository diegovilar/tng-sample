import {Component, View, Inject, Optional} from 'tng';
import {Route} from 'tng/router';

@Component({
    selector: 'todo-app'
})
@View({
    templateUrl: 'consulta.html'
})
@Route({
    path: '/clientes/consulta'
})
export class Consulta {
    
    constructor(@Inject('$http') private $http:any, @Optional('$q') private $q:any) {
            
    }
    
    add(@Inject('$timeout') $timeout:any) {
        
    }
    
    static config(@Inject('$httpProvider') $httpProvider:any) {
        // execute on config phase
    }
    
    static run($http:any, $q:any) {
        // execute on run phase
    }
    
}
