import {Service, Inject} from 'tng';

@Service({
	name: 'clienteService'
})
@Inject('$http', '$q')
export class ClienteService {
	
	constructor(private $http:any, private $q:any) {
		
	}
	
	@Inject()
	static provider() {
		
	}
	
	@Inject()
	static factory() {
		
	}
	
}