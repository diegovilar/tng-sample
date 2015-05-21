import {Service, Inject} from 'tng';

@Service({
	name: 'clienteService'
})
export class ClienteService {
	
	constructor(@Inject('$http') private $http:any, @Inject('$q') private $q:any) {
		
	}
	
}