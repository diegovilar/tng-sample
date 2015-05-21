import {Component, View, Inject} from 'tng';
//import {Route} from 'tng/router';

@Component({
    selector: 'consulta'
})
@View({
    controllerAs: 'consulta',
    templateUrl: 'consulta.html'
})
//@Route({
//    path: '/clientes/consulta'
//})
export class Consulta {
    
    constructor(@Inject('$http') private $http:any, @Inject('$q') private $q:any) {
            
    }
    
    add(@Inject('$timeout') $timeout:any) {
        
    }
    
}
