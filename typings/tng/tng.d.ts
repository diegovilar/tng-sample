declare module "tng" {
	
	export interface ViewOptions {
		template?:string;
		templateUrl?:string;
		style?:string;
		styleUrl?:string;
	}
	
	export interface ComponentOptions {
		selector:string,
		inject?:string[]
		view?:ViewOptions;
	}
	
	export interface ModuleOptions {
		name:string;
		modules?:any[];
		components?:Function[];
		services?:Function[];
		directives?:Function[];
	}
	
	export interface ApplicationOptions extends ModuleOptions {
		selector?:string;
	}
	
	export interface ServiceOptions {
		name:string;
	}
	
	export interface DirectiveOptions {
		selector:string;
	}
	
	// Decorators
	export function Inject(...args:string[]):any;
	export function Optional(injectableName:string):any;
	export function InjectOptional(injectableName:string):any;
	
	export function View(options:ViewOptions):any;
	
	export function Directive(options:DirectiveOptions):any;
	
	export function Component(options:ComponentOptions):any;
	
	export function Service(options:ServiceOptions):any;

	export function Module(options:ModuleOptions):any;
	
	export function Application(options:ApplicationOptions):any;
		
	export function bootstrap(appController:Function, element?:Element):any;
	export function bootstrap(appController:Function, selector?:string):any;
	
}



declare module "tng/router" {
		
	export interface RouteOptions {
		path:string;
		controllerAs?:string;
	}
	
	export function Route(options:RouteOptions):any;
	
}