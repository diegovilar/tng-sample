require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"tng/animation":[function(require,module,exports){
/// <reference path="./_references" />
var reflection_1 = require('./reflection');
var di_1 = require('./di');
var utils_1 = require('./utils');
var utils_2 = require('./utils');
/**
 * @internal
 */
var AnimationAnnotation = (function () {
    function AnimationAnnotation(options) {
        this.name = '';
        utils_1.setIfInterface(this, options);
    }
    return AnimationAnnotation;
})();
exports.AnimationAnnotation = AnimationAnnotation;
/**
 * A decorator to annotate a class as being an animation controller
 */
exports.Animation = utils_1.makeDecorator(AnimationAnnotation);
/**
 * @internal
 */
function registerAnimation(animationClass, ngModule) {
    var aux = reflection_1.getAnnotations(animationClass, AnimationAnnotation);
    if (!aux.length) {
        throw new Error("Filter annotation not found");
    }
    var name = utils_2.merge.apply(void 0, [utils_2.create(AnimationAnnotation)].concat(aux)).name;
    // TODO validate implementation?
    ngModule.animation(name, di_1.bind(['$injector'], function ($injector) {
        var singleton = $injector.instantiate(animationClass);
        utils_2.bindAll(singleton);
        return singleton;
    }));
}
exports.registerAnimation = registerAnimation;

},{"./di":"tng/di","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/application":[function(require,module,exports){
/// <reference path="./_references" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var utils_1 = require('./utils');
var module_1 = require('./module');
/**
 * @internal
 */
var ApplicationAnnotation = (function (_super) {
    __extends(ApplicationAnnotation, _super);
    function ApplicationAnnotation(options) {
        _super.call(this, options);
        this.selector = '';
        utils_1.setIfInterface(this, options);
    }
    return ApplicationAnnotation;
})(module_1.ModuleAnnotation);
exports.ApplicationAnnotation = ApplicationAnnotation;
/**
 * A decorator to annotate a class as being an application
 */
exports.Application = utils_1.makeDecorator(ApplicationAnnotation);

},{"./module":"tng/module","./utils":"tng/utils"}],"tng/bootstrap":[function(require,module,exports){
/// <reference path="./_references" />
/*
Applications must have:
    - Module annotation

Steps to bootstrap:

    - Process submodules (recursively)
    - Process the application module
    - Bootstrap
    
To process a module is to:
    - Iterate through it's submodules and process them (recurse)
        - Register the module on Angular
        - Register services on Angular
        - Register directives on Angular
        - Register components on Angular
            - Gather route annotations
        - Register config and run functions
*/
var reflection_1 = require('./reflection');
var utils_1 = require('./utils');
var application_1 = require('./application');
var module_1 = require('./module');
function bootstrap(moduleClass, selectorOrElement) {
    var aux;
    var appNotes;
    aux = reflection_1.getAnnotations(moduleClass, module_1.ModuleAnnotation);
    if (!aux.length) {
        throw new Error('No module annotation found');
    }
    appNotes = utils_1.merge.apply(void 0, [utils_1.create(application_1.ApplicationAnnotation)].concat(aux));
    selectorOrElement = selectorOrElement || appNotes.selector;
    if (!selectorOrElement) {
        throw new Error('No selector specified');
    }
    var ngModule = module_1.registerModule(moduleClass);
    return angular.bootstrap(selectorOrElement, [ngModule.name]);
}
exports.bootstrap = bootstrap;
//export function bootstrapWhenReady(moduleClass: ModuleConstructor): Promise<ng.auto.IInjectorService>;
//export function bootstrapWhenReady(moduleClass: ModuleConstructor, element: Element): Promise<ng.auto.IInjectorService>;
//export function bootstrapWhenReady(moduleClass: ModuleConstructor, selector: string): Promise<ng.auto.IInjectorService>;
//export function bootstrapWhenReady(moduleClass: ModuleConstructor, selectorOrElement?: any): Promise<ng.auto.IInjectorService> {
//    
//    var promise = new Promise<ng.auto.IInjectorService>((resolve, reject) => {
//        // TODO
//    });
//    
//    return promise;
//    
//} 

},{"./application":"tng/application","./module":"tng/module","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/component-view":[function(require,module,exports){
/// <reference path="./_references" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var utils_1 = require('./utils');
var view_1 = require('./view');
/**
 * TODO document
 */
(function (ComponentTemplateNamespace) {
    ComponentTemplateNamespace[ComponentTemplateNamespace["HTML"] = 0] = "HTML";
    ComponentTemplateNamespace[ComponentTemplateNamespace["SVG"] = 1] = "SVG";
    ComponentTemplateNamespace[ComponentTemplateNamespace["MathML"] = 2] = "MathML";
})(exports.ComponentTemplateNamespace || (exports.ComponentTemplateNamespace = {}));
var ComponentTemplateNamespace = exports.ComponentTemplateNamespace;
/**
 * @internal
 */
exports.NAMESPACE_MAP = ['html', 'svg', 'math'];
/**
 * @internal
 */
var ComponentViewAnnotation = (function (_super) {
    __extends(ComponentViewAnnotation, _super);
    function ComponentViewAnnotation(options) {
        _super.call(this, options);
        this.namespace = 0 /* HTML */;
        this.replace = false;
        utils_1.setIfInterface(this, options);
    }
    return ComponentViewAnnotation;
})(view_1.ViewAnnotation);
exports.ComponentViewAnnotation = ComponentViewAnnotation;
/**
 * A decorator to annotate a component with view information
 */
exports.ComponentView = utils_1.makeDecorator(ComponentViewAnnotation);

},{"./utils":"tng/utils","./view":"tng/view"}],"tng/component":[function(require,module,exports){
/// <reference path="./_references" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var di_1 = require('./di');
var utils_1 = require('./utils');
var reflection_1 = require('./reflection');
var component_view_1 = require('./component-view');
var directive_1 = require('./directive');
var directive_2 = require('./directive');
/**
 * @internal
 */
var ComponentAnnotation = (function (_super) {
    __extends(ComponentAnnotation, _super);
    function ComponentAnnotation() {
        _super.apply(this, arguments);
    }
    return ComponentAnnotation;
})(directive_1.CommonDirectiveAnnotation);
exports.ComponentAnnotation = ComponentAnnotation;
/**
 * A decorator to annotate a class as being a component controller
 */
exports.Component = utils_1.makeDecorator(ComponentAnnotation);
/**
 * @internal
 */
function registerComponent(componentClass, ngModule) {
    var aux = reflection_1.getAnnotations(componentClass, ComponentAnnotation);
    if (!aux.length) {
        throw new Error("Component annotation not found");
    }
    var _a = makeComponentFactory(componentClass), name = _a.name, factory = _a.factory;
    ngModule.directive(name, factory);
}
exports.registerComponent = registerComponent;
/**
 * @internal
 */
function makeComponentDO(componentClass) {
    var cdo = directive_2.makeDirectiveDO(componentClass);
    // var component = merge(create(ComponentAnnotation), ...getAnnotations(componentClass, ComponentAnnotation));
    var template = utils_1.merge.apply(void 0, [utils_1.create(component_view_1.ComponentViewAnnotation)].concat(reflection_1.getAnnotations(componentClass, component_view_1.ComponentViewAnnotation)));
    // TODO Component restrictions
    if (template.controllerAs)
        cdo.controllerAs = template.controllerAs;
    if (template.namespace)
        cdo.templateNamespace = component_view_1.NAMESPACE_MAP[template.namespace];
    // TODO styleUrl
    if (template.template)
        cdo.template = template.template;
    else if (template.templateUrl)
        cdo.templateUrl = template.templateUrl;
    else
        throw new Error('Components must have an inline or remote template');
    return cdo;
}
exports.makeComponentDO = makeComponentDO;
/**
 * @internal
 */
function inFactory(cdo, $injector) {
    if (utils_1.isFunction(cdo.template)) {
        cdo.template = !di_1.hasInjectAnnotation(cdo.template) ? cdo.template : function (tElement, tAttrs) {
            return $injector.invoke(cdo.template, null, {
                element: tElement,
                attributes: tAttrs
            });
        };
    }
    if (utils_1.isFunction(cdo.templateUrl)) {
        cdo.templateUrl = !di_1.hasInjectAnnotation(cdo.templateUrl) ? cdo.templateUrl : function (tElement, tAttrs) {
            return $injector.invoke(cdo.templateUrl, null, {
                element: tElement,
                attributes: tAttrs
            });
        };
    }
    // TODO styleUrl
    return cdo;
}
exports.inFactory = inFactory;
/**
 * @internal
 */
function makeComponentFactory(componentClass) {
    var cdo = makeComponentDO(componentClass);
    var factory = di_1.bind(['$injector'], function directiveFactory($injector) {
        return inFactory(directive_2.inFactory(cdo, $injector), $injector);
    });
    return {
        name: cdo.imperativeName,
        factory: factory
    };
}
exports.makeComponentFactory = makeComponentFactory;

},{"./component-view":"tng/component-view","./di":"tng/di","./directive":"tng/directive","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/constant":[function(require,module,exports){
/// <reference path="./_references" />
var utils_1 = require('./utils');
var reflection_1 = require('./reflection');
/**
 * Wraps a constant to be made available for dependency injection
 *
 * @param name The name of the constant through which it will made available
 * @param constant The constant to be injected, as is
 *
 * @return A wrapper, to be used as a module dependency
 */
function Constant(name, constant) {
    var wrapper = {};
    reflection_1.setAnnotations(wrapper, [new ConstantAnnotation({
            name: name,
            constant: constant
        })], 'value');
    return wrapper;
}
exports.Constant = Constant;
/**
 * @internal
 */
var ConstantAnnotation = (function () {
    function ConstantAnnotation(options) {
        this.name = '';
        this.constant = null;
        utils_1.setIfInterface(this, options);
    }
    return ConstantAnnotation;
})();
exports.ConstantAnnotation = ConstantAnnotation;
/**
 * @internal
 */
function registerConstant(constant, ngModule) {
    var aux = reflection_1.getAnnotations(constant, ConstantAnnotation, 'value');
    if (!aux.length) {
        throw new Error("Constant annotation not found");
    }
    var annotation = aux[0];
    ngModule.constant(annotation.name, annotation.constant);
}
exports.registerConstant = registerConstant;

},{"./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/controller":[function(require,module,exports){
/// <reference path="./_references" />
// import {makeDecorator} from './utils';
// export interface ControllerOptions {
// }
// export class ControllerAnnotation {
//     constructor(options:ControllerOptions) {
//     }
// }
// type ControllerAnnotationDecorator = (options:ControllerOptions) => ClassDecorator;
// export var Controller = <ControllerAnnotationDecorator> makeDecorator(ControllerAnnotation);

},{}],"tng/decorator":[function(require,module,exports){
/// <reference path="./_references" />
var di_1 = require('./di');
var reflection_1 = require('./reflection');
var utils_1 = require('./utils');
/**
 * @internal
 */
var DecoratorAnnotation = (function () {
    function DecoratorAnnotation(options) {
        this.name = '';
        utils_1.setIfInterface(this, options);
    }
    return DecoratorAnnotation;
})();
exports.DecoratorAnnotation = DecoratorAnnotation;
/**
 * A decorator to annotate a class as being a service decorator
 */
exports.Decorator = utils_1.makeDecorator(DecoratorAnnotation);
/**
 * @inernal
 */
function registerDecorator(decoratorClass, ngModule) {
    var aux = reflection_1.getAnnotations(decoratorClass, DecoratorAnnotation);
    if (!aux.length) {
        throw new Error("Decorator annotation not found");
    }
    var name = utils_1.merge.apply(void 0, [utils_1.create(DecoratorAnnotation)].concat(aux)).name;
    if (!utils_1.isFunction(decoratorClass.prototype.decorate)) {
        throw new Error("Decorator \"" + name + "\" does not implement a decorate method");
    }
    ngModule.config(di_1.bind(['$provide'], function ($provide) {
        $provide.decorator(name, di_1.bind(['$delegate', '$injector'], function ($delegate, $injector) {
            var instance = $injector.instantiate(decoratorClass, {
                $delegate: $delegate
            });
            return $injector.invoke(instance.decorate, instance, {
                $delegate: $delegate
            });
        }));
    }));
}
exports.registerDecorator = registerDecorator;

},{"./di":"tng/di","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/directive":[function(require,module,exports){
/// <reference path="./_references" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var di_1 = require('./di');
var utils_1 = require('./utils');
var utils_2 = require('./utils');
var reflection_1 = require('./reflection');
/**
 * TODO document
 */
(function (Transclusion) {
    Transclusion[Transclusion["Content"] = 0] = "Content";
    Transclusion[Transclusion["Element"] = 1] = "Element";
})(exports.Transclusion || (exports.Transclusion = {}));
var Transclusion = exports.Transclusion;
var TRANSCLUSION_MAP = [true, 'element'];
/**
 * @internal
 */
var CommonDirectiveAnnotation = (function () {
    function CommonDirectiveAnnotation(options) {
        this.selector = '';
        this.scope = false;
        this.bind = false;
        this.require = null;
        this.transclude = 0 /* Content */;
        this.compile = null;
        this.link = null;
        utils_1.setIfInterface(this, options);
    }
    return CommonDirectiveAnnotation;
})();
exports.CommonDirectiveAnnotation = CommonDirectiveAnnotation;
/**
 * @internal
 */
var DirectiveAnnotation = (function (_super) {
    __extends(DirectiveAnnotation, _super);
    function DirectiveAnnotation(options) {
        _super.call(this, options); // TODO WTF needs casting?
        this.multiElement = false;
        this.priority = 0;
        this.terminal = false;
        utils_1.setIfInterface(this, options);
    }
    return DirectiveAnnotation;
})(CommonDirectiveAnnotation);
exports.DirectiveAnnotation = DirectiveAnnotation;
/**
 *
 */
exports.Directive = utils_1.makeDecorator(DirectiveAnnotation);
var RESTRICTION_MAP = (_a = {},
    _a[0 /* Attribute */] = 'A',
    _a[2 /* Tag */] = 'E',
    _a[1 /* Class */] = 'C',
    _a
);
/**
 * @internal
 */
function makeDirectiveDO(directiveClass) {
    var directive = utils_1.merge.apply(void 0, [utils_1.create(DirectiveAnnotation)].concat(reflection_1.getAnnotations(directiveClass, DirectiveAnnotation)));
    var selectorData = utils_2.parseSelector(directive.selector);
    var ddo = {
        semanticName: selectorData.semanticeName,
        imperativeName: selectorData.imperativeName,
        restrict: RESTRICTION_MAP[selectorData.type],
        controller: directiveClass,
        multiElement: directive.multiElement,
        priority: directive.priority,
        terminal: directive.terminal,
    };
    if (directive.scope)
        ddo.scope = directive.scope;
    if (directive.bind)
        ddo.bindToController = directive.bind;
    if (directive.transclude)
        ddo.transclude = TRANSCLUSION_MAP[directive.transclude];
    if (directive.compile)
        ddo.compile = directive.compile;
    if (directive.link)
        ddo.link = directive.link;
    return ddo;
}
exports.makeDirectiveDO = makeDirectiveDO;
/**
 * @internal
 */
function inFactory(ddo, $injector) {
    if (utils_1.isFunction(ddo.compile)) {
        ddo.compile = !di_1.hasInjectAnnotation(ddo.compile) ? ddo.compile :
            function (tElement, tAttrs, transclude) {
                return $injector.invoke(ddo.compile, null, {
                    element: tElement,
                    attributes: tAttrs,
                    transclude: transclude
                });
            };
    }
    if (utils_1.isFunction(ddo.link)) {
        ddo.link = !di_1.hasInjectAnnotation(ddo.link) ? ddo.link :
            function (scope, iElement, iAttrs, controllers, transclude) {
                return $injector.invoke(ddo.link, null, {
                    scope: scope,
                    element: iElement,
                    attributes: iAttrs,
                    controller: controllers,
                    transclude: transclude
                });
            };
    }
    return ddo;
}
exports.inFactory = inFactory;
/**
 * @internal
 */
function makeDirectiveFactory(directiveClass) {
    var ddo = makeDirectiveDO(directiveClass);
    var factory = di_1.bind(['$injector'], function directiveFactory($injector) {
        return inFactory(ddo, $injector);
    });
    return {
        name: ddo.imperativeName,
        factory: factory
    };
}
exports.makeDirectiveFactory = makeDirectiveFactory;
/**
 * @internal
 */
function registerDirective(directiveClass, ngModule) {
    var aux = reflection_1.getAnnotations(directiveClass, DirectiveAnnotation);
    if (!aux.length) {
        throw new Error("Directive annotation not found");
    }
    var _a = makeDirectiveFactory(directiveClass), name = _a.name, factory = _a.factory;
    ngModule.directive(name, factory);
}
exports.registerDirective = registerDirective;
var _a;

},{"./di":"tng/di","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/di":[function(require,module,exports){
/// <reference path="./_references" />
/**
 * Annotates a function with information of dependencies to be injected as parameters
 *
 * * Overrides previous annotation (logs warning)
 * * All parameters should be annotated (logs warning)
 * * Dependencies will be injected in the order they are specified in the dependencies parameter
 *
 * @param dependencies Names of the dependencies to be injected, in order
 * @returns The provided function
 */
function bind(dependencies, func) {
    // TODO warn about overriding annotation
    // TODO warn about mismatching number of parameters and dependencies
    func.$inject = dependencies.slice();
    return func;
}
exports.bind = bind;
/**
 * A decorator to annotate method parameterss with dependencies to be injected
 *
 * * Overrides previous annotation (logs warning)
 * * All parameters should be annotated (logs warning)
 *
 * @param dependency The name of the dependency to be injected
 */
function Inject(dependency) {
    return function (target, propertyKey, parameterIndex) {
        // TODO warn about overriding annotation
        // TODO warn about mismatching number of parameters and dependencies
        // If propertyKey is defined, we're decorating a parameter of a method
        // If not, we're decorating a parameter of class constructor
        target = (typeof propertyKey == 'undefined') ? target : target = target[propertyKey];
        // TODO what about missing elements in the $inject arrey?
        // ie. annotated the 2nd but not the 1st parameter
        var $inject = (target.$inject = target.$inject || []);
        $inject[parameterIndex] = dependency;
    };
}
exports.Inject = Inject;
/**
 * Inspects an object for dependency injection annotation
 *
 * @internal
 *
 * @param target The object to be inspected
 */
function hasInjectAnnotation(target) {
    return !target ? false : target.hasOwnProperty('$inject');
}
exports.hasInjectAnnotation = hasInjectAnnotation;

},{}],"tng/filter":[function(require,module,exports){
/// <reference path="./_references" />
var reflection_1 = require('./reflection');
var utils_1 = require('./utils');
var di_1 = require('./di');
/**
 * @internal
 */
var FilterAnnotation = (function () {
    function FilterAnnotation(options) {
        this.name = '';
        utils_1.setIfInterface(this, options);
    }
    return FilterAnnotation;
})();
exports.FilterAnnotation = FilterAnnotation;
/**
 * A decorator to annotate a class as being a filter
 */
exports.Filter = utils_1.makeDecorator(FilterAnnotation);
/**
 * @internal
 */
function registerFilter(filterClass, ngModule) {
    var aux = reflection_1.getAnnotations(filterClass, FilterAnnotation);
    if (!aux.length) {
        throw new Error("Filter annotation not found");
    }
    var name = utils_1.merge.apply(void 0, [utils_1.create(FilterAnnotation)].concat(aux)).name;
    if (!utils_1.isFunction(filterClass.prototype.filter)) {
        throw new Error("Filter \"" + name + "\" does not implement a filter method");
    }
    ngModule.filter(name, di_1.bind(['$injector'], function ($injector) {
        var filterSingleton = $injector.instantiate(filterClass);
        return filterSingleton.filter.bind(filterSingleton);
    }));
}
exports.registerFilter = registerFilter;

},{"./di":"tng/di","./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/module":[function(require,module,exports){
/// <reference path="./_references" />
var reflection_1 = require('./reflection');
var utils_1 = require('./utils');
var utils_2 = require('./utils');
var value_1 = require('./value');
var constant_1 = require('./constant');
var filter_1 = require('./filter');
var animation_1 = require('./animation');
var service_1 = require('./service');
var decorator_1 = require('./decorator');
var directive_1 = require('./directive');
var component_1 = require('./component');
var states_1 = require('./ui-router/states');
var routes_1 = require('./ui-router/routes');
var PUBLISHED_ANNOTATION_KEY = 'tng:module-published-as';
/**
 * @internal
 */
var ModuleAnnotation = (function () {
    function ModuleAnnotation(options) {
        this.dependencies = null;
        this.config = null;
        this.run = null;
        this.name = '';
        this.modules = null;
        this.components = null;
        this.services = null;
        this.filters = null;
        this.decorators = null;
        this.animations = null;
        this.values = null;
        this.constants = null;
        if (options) {
            utils_1.setIfInterface(this, options);
        }
    }
    return ModuleAnnotation;
})();
exports.ModuleAnnotation = ModuleAnnotation;
/**
 * A decorator to annotate a class as being a module
 */
exports.Module = utils_1.makeDecorator(ModuleAnnotation);
var moduleCount = 0;
function getNewModuleName() {
    return "tng_generated_module#" + ++moduleCount;
}
/**
 * @internal
 */
function registerModule(moduleClass, name) {
    var aux;
    var moduleNotes;
    aux = reflection_1.getAnnotations(moduleClass, ModuleAnnotation);
    if (!aux.length) {
        throw new Error('No module annotation found');
    }
    moduleNotes = utils_2.merge.apply(void 0, [utils_2.create(ModuleAnnotation)].concat(aux));
    var constants = [];
    var values = [];
    var services = [];
    var decorators = [];
    var filters = [];
    var animations = [];
    var components = [];
    var directives = [];
    var modules = [];
    // TODO optimize this.. to much reflection queries    
    if (moduleNotes.dependencies) {
        for (var _i = 0, _a = moduleNotes.dependencies; _i < _a.length; _i++) {
            var dep = _a[_i];
            // Regular angular module
            if (utils_2.isString(dep)) {
                modules.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, ModuleAnnotation)) {
                // If the module has alrady been published to Angular, we add it's name
                // to de dependency list
                if (reflection_1.Reflect.hasOwnMetadata(PUBLISHED_ANNOTATION_KEY, dep)) {
                    modules.push(reflection_1.Reflect.getOwnMetadata(PUBLISHED_ANNOTATION_KEY, dep));
                }
                else {
                    modules.push(registerModule(dep).name);
                }
            }
            else if (reflection_1.hasAnnotation(dep, constant_1.ConstantAnnotation, 'constant')) {
                constants.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, value_1.ValueAnnotation, 'value')) {
                values.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, service_1.ServiceAnnotation)) {
                services.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, decorator_1.DecoratorAnnotation)) {
                decorators.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, filter_1.FilterAnnotation)) {
                filters.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, animation_1.AnimationAnnotation)) {
                animations.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, component_1.ComponentAnnotation)) {
                components.push(dep);
            }
            else if (reflection_1.hasAnnotation(dep, directive_1.DirectiveAnnotation)) {
                directives.push(dep);
            }
            else {
                // TODO WTF?
                throw new Error("I don't recognize what kind of dependency is this: " + dep);
            }
        }
    }
    name = name || moduleNotes.name || getNewModuleName();
    // Register the module on Angular
    var ngModule = angular.module(name, modules);
    // Instantiate the module
    var module = new moduleClass(ngModule);
    // Register config functions
    var configFns = [];
    if (utils_2.isFunction(module.onConfig))
        configFns.push(utils_2.safeBind(module.onConfig, module));
    if (moduleNotes.config) {
        if (utils_2.isFunction(moduleNotes.config))
            configFns.push(moduleNotes.config);
        else
            configFns = configFns.concat(moduleNotes.config);
    }
    for (var _b = 0; _b < configFns.length; _b++) {
        var fn = configFns[_b];
        ngModule.config(fn);
    }
    // Register initialization functions
    var runFns = [];
    if (utils_2.isFunction(module.onRun))
        runFns.push(utils_2.safeBind(module.onRun, module));
    if (moduleNotes.run) {
        if (utils_2.isFunction(moduleNotes.run))
            runFns.push(moduleNotes.run);
        else
            runFns = runFns.concat(moduleNotes.run);
    }
    for (var _c = 0; _c < runFns.length; _c++) {
        var fn = runFns[_c];
        ngModule.run(fn);
    }
    states_1.registerStates(moduleClass, ngModule);
    routes_1.registerRoutes(moduleClass, ngModule);
    for (var _d = 0; _d < values.length; _d++) {
        var item = values[_d];
        value_1.registerValue(item, ngModule);
    }
    for (var _e = 0; _e < constants.length; _e++) {
        var item = constants[_e];
        constant_1.registerConstant(item, ngModule);
    }
    for (var _f = 0; _f < filters.length; _f++) {
        var item = filters[_f];
        filter_1.registerFilter(item, ngModule);
    }
    for (var _g = 0; _g < animations.length; _g++) {
        var item = animations[_g];
        animation_1.registerAnimation(item, ngModule);
    }
    for (var _h = 0; _h < services.length; _h++) {
        var item = services[_h];
        service_1.registerService(item, ngModule);
    }
    for (var _j = 0; _j < decorators.length; _j++) {
        var item = decorators[_j];
        decorator_1.registerDecorator(item, ngModule);
    }
    for (var _k = 0; _k < components.length; _k++) {
        var item = components[_k];
        component_1.registerComponent(item, ngModule);
    }
    for (var _l = 0; _l < directives.length; _l++) {
        var item = directives[_l];
        directive_1.registerDirective(item, ngModule);
    }
    reflection_1.Reflect.defineMetadata(PUBLISHED_ANNOTATION_KEY, name, moduleClass);
    return ngModule;
}
exports.registerModule = registerModule;
exports.publishModule = exports.registerModule;
/**
 * Publishe a TNG module, registering it and its dependencies on Angular.
 */

},{"./animation":"tng/animation","./component":"tng/component","./constant":"tng/constant","./decorator":"tng/decorator","./directive":"tng/directive","./filter":"tng/filter","./reflection":"tng/reflection","./service":"tng/service","./ui-router/routes":"tng/ui-router/routes","./ui-router/states":"tng/ui-router/states","./utils":"tng/utils","./value":"tng/value"}],"tng/reflection":[function(require,module,exports){
/// <reference path="./_references" />
exports.ANNOTATIONS_METADATA_KEY = 'tng';
var _Reflect = Reflect;
exports.Reflect = _Reflect;
function getKey(key) {
    return !key ? exports.ANNOTATIONS_METADATA_KEY : exports.ANNOTATIONS_METADATA_KEY + ":" + key;
}
function getAnnotations(target, type, key) {
    var annotations = Reflect.getOwnMetadata(getKey(key), target) || [];
    if (type) {
        return annotations.filter(function (value) { return value instanceof type; });
    }
    return annotations;
}
exports.getAnnotations = getAnnotations;
function setAnnotations(target, annotations, key) {
    Reflect.defineMetadata(getKey(key), annotations, target);
}
exports.setAnnotations = setAnnotations;
function addAnnotation(target, annotation, key) {
    var annotations = getAnnotations(target, null, key);
    annotations.push(annotation);
    setAnnotations(target, annotations, key);
}
exports.addAnnotation = addAnnotation;
function hasAnnotation(target, type, key) {
    if (!type) {
        return Reflect.hasOwnMetadata(getKey(key), target);
    }
    return getAnnotations(target, type, key).length > 0;
}
exports.hasAnnotation = hasAnnotation;

},{}],"tng/service":[function(require,module,exports){
/// <reference path="./_references" />
var reflection_1 = require('./reflection');
var utils_1 = require('./utils');
/**
 * @internal
 */
var ServiceAnnotation = (function () {
    function ServiceAnnotation(options) {
        this.name = '';
        this.provider = null;
        this.factory = null;
        utils_1.setIfInterface(this, options);
    }
    return ServiceAnnotation;
})();
exports.ServiceAnnotation = ServiceAnnotation;
/**
 * A decorator to annotate a class as being a service
 */
exports.Service = utils_1.makeDecorator(ServiceAnnotation);
/**
 * @internal
 */
function registerService(serviceClass, ngModule) {
    var aux = reflection_1.getAnnotations(serviceClass, ServiceAnnotation);
    if (!aux.length) {
        throw new Error("Service annotation not found");
    }
    var annotation = utils_1.merge.apply(void 0, [utils_1.create(ServiceAnnotation)].concat(aux));
    var name = annotation.name;
    if (annotation.provider) {
        ngModule.provider(name, annotation.provider);
    }
    else if (utils_1.isFunction(annotation.factory)) {
        ngModule.factory(name, annotation.factory);
    }
    else {
        // TODO Is it invoked later with $injector.invoke()?
        ngModule.service(name, serviceClass);
    }
}
exports.registerService = registerService;

},{"./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/ui-router/routes":[function(require,module,exports){
/// <reference path="../_references" />
var di_1 = require('../di');
var utils_1 = require('../utils');
var reflection_1 = require('../reflection');
/**
 * @internal
 */
var RoutesAnnotation = (function () {
    function RoutesAnnotation(routes) {
        this.routes = routes;
    }
    return RoutesAnnotation;
})();
exports.RoutesAnnotation = RoutesAnnotation;
/**
 * A decorator to annotate a class with states
 */
exports.Routes = utils_1.makeDecorator(RoutesAnnotation);
/**
 * @internal
 */
function registerRoutes(moduleController, ngModule) {
    var notes = reflection_1.getAnnotations(moduleController, RoutesAnnotation);
    if (!notes.length)
        return;
    var routes = {};
    notes.forEach(function (note) { return utils_1.merge(routes, note.routes); });
    ngModule.config(di_1.bind(['$urlRouterProvider'], function ($urlRouterProvider) {
        utils_1.forEach(routes, function (handler, route) {
            if (route === '?') {
                $urlRouterProvider.otherwise(handler);
            }
            else {
                $urlRouterProvider.when(route, handler);
            }
        });
    }));
}
exports.registerRoutes = registerRoutes;

},{"../di":"tng/di","../reflection":"tng/reflection","../utils":"tng/utils"}],"tng/ui-router/states":[function(require,module,exports){
/// <reference path="../_references" />
var di_1 = require('../di');
var utils_1 = require('../utils');
var reflection_1 = require('../reflection');
var view_1 = require('../view');
/**
 * @internal
 */
var StatesAnnotation = (function () {
    function StatesAnnotation(states) {
        utils_1.forEach(states, function (state, name) { return state.name = name; });
        this.states = states;
    }
    return StatesAnnotation;
})();
exports.StatesAnnotation = StatesAnnotation;
/**
 * A decorator to annotate a class with states
 */
exports.States = utils_1.makeDecorator(StatesAnnotation);
/**
 * @internal
 */
function registerStates(moduleController, ngModule) {
    var notes = reflection_1.getAnnotations(moduleController, StatesAnnotation);
    if (!notes.length)
        return;
    var states = [];
    utils_1.forEach(notes, function (note) {
        return utils_1.forEach(note.states, function (state) {
            return states.push(state);
        });
    });
    ngModule.config(di_1.bind(['$stateProvider'], function ($stateProvider) {
        for (var _i = 0; _i < states.length; _i++) {
            var state = states[_i];
            $stateProvider.state(translateToUiState(state));
        }
    }));
}
exports.registerStates = registerStates;
function translateToUiState(state) {
    var translatedState = {};
    if (state.name)
        translatedState.name = state.name;
    if (state.path)
        translatedState.url = state.path;
    if (state.abstract)
        translatedState.abstract = state.abstract;
    // If the state has a parent, we force the string way
    if (state.parent) {
        var parent_1 = state.parent;
        if (!utils_1.isString(parent_1)) {
            parent_1 = parent_1.name;
        }
        // ng.ui.IState is missing parent
        translatedState.parent = parent_1;
    }
    if (state.view && state.views) {
        throw Error('Cannot provide both view and views');
    }
    else if (!state.view && !state.views) {
        throw Error('Must provide either view or views');
    }
    else {
        var views = {};
        if (state.view) {
            views[''] = extractViewData(state.view);
        }
        else {
            utils_1.forEach(state.views, function (controller, outlet) { return views[outlet] = extractViewData(controller); });
        }
        translatedState.views = views;
    }
    return translatedState;
}
function extractViewData(viewModel) {
    var notes = reflection_1.getAnnotations(viewModel, view_1.ViewAnnotation);
    if (!notes.length) {
        throw new Error('Template not defined');
    }
    var template = utils_1.merge.apply(void 0, [utils_1.create(view_1.ViewAnnotation)].concat(notes));
    var data = {};
    data.controller = viewModel;
    if (template.controllerAs)
        data.controllerAs = template.controllerAs;
    if (template.template)
        data.template = template.template;
    if (template.templateUrl)
        data.templateUrl = template.templateUrl;
    // TODO style?
    return data;
}

},{"../di":"tng/di","../reflection":"tng/reflection","../utils":"tng/utils","../view":"tng/view"}],"tng/ui-router":[function(require,module,exports){
var routes_1 = require('./ui-router/routes');
exports.Routes = routes_1.Routes;
var states_1 = require('./ui-router/states');
exports.States = states_1.States;

},{"./ui-router/routes":"tng/ui-router/routes","./ui-router/states":"tng/ui-router/states"}],"tng/utils":[function(require,module,exports){
/// <reference path="./_references" />
var reflection_1 = require('./reflection');
exports.isDefined = angular.isDefined;
exports.isString = angular.isString;
exports.isNumber = angular.isNumber;
exports.isObject = angular.isObject;
exports.isElement = angular.isElement;
exports.isDate = angular.isDate;
exports.isArray = angular.isArray;
exports.isFunction = angular.isFunction;
exports.forEach = angular.forEach;
exports.extend = angular.extend;
exports.copy = angular.copy;
exports.merge = angular.merge;
function create(constructor) {
    return Object.create(constructor.prototype);
}
exports.create = create;
function setIf(target, source) {
    if (target == null || source == null) {
        return;
    }
    for (var key in source)
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
}
exports.setIf = setIf;
function setIfInterface(target, source) {
    if (target == null || source == null) {
        return;
    }
    for (var key in source)
        if (source.hasOwnProperty(key)) {
            if (target.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
}
exports.setIfInterface = setIfInterface;
function makeDecorator(annotationClass) {
    return function () {
        var annotationInstance = Object.create(annotationClass.prototype);
        annotationClass.apply(annotationInstance, arguments);
        return function (target) {
            reflection_1.addAnnotation(target, annotationInstance);
            return target;
        };
    };
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(annotationClass) {
    return function () {
        var annotationInstance = Object.create(annotationClass.prototype);
        annotationClass.apply(annotationInstance, arguments);
        return function (target, unusedKey, index) {
            var parameters = reflection_1.Reflect.getMetadata('parameters', target);
            parameters = parameters || [];
            // there might be gaps if some in between parameters do not have annotations.
            // we pad with nulls.
            while (parameters.length <= index) {
                parameters.push(null);
            }
            parameters[index] = annotationInstance;
            reflection_1.Reflect.defineMetadata('parameters', parameters, target);
            return target;
        };
    };
}
exports.makeParamDecorator = makeParamDecorator;
(function (SelectorType) {
    SelectorType[SelectorType["Attribute"] = 0] = "Attribute";
    SelectorType[SelectorType["Class"] = 1] = "Class";
    //Comment,
    SelectorType[SelectorType["Tag"] = 2] = "Tag";
})(exports.SelectorType || (exports.SelectorType = {}));
var SelectorType = exports.SelectorType;
;
var RE_SELECTOR_ATTRIBUTE = /^\[([a-z\-_]+)\]$/i;
var RE_SELECTOR_CLASS = /^\.([a-z\-_]+)$/i;
//const RE_SELECTOR_COMMENT = /^\/\/([a-z\-_]+)$/i;
var RE_SELECTOR_TAG = /^([a-z\-_]+)$/i;
function parseSelector(selector) {
    var semanticeName;
    var type;
    var m;
    if (m = RE_SELECTOR_TAG.exec(selector)) {
        type = 2 /* Tag */;
    }
    else if (m = RE_SELECTOR_ATTRIBUTE.exec(selector)) {
        type = 0 /* Attribute */;
    }
    else if (m = RE_SELECTOR_CLASS.exec(selector)) {
        type = 1 /* Class */;
    }
    else {
        throw new Error("Invalid selector: " + selector);
    }
    return {
        semanticeName: m[1],
        imperativeName: 'TODO',
        type: type
    };
}
exports.parseSelector = parseSelector;
/**
 * @internal
 */
function bindAll(host) {
    var aux = host;
    if (aux) {
        for (var key in aux) {
            if (exports.isFunction(aux[key])) {
                aux[key] = safeBind(aux[key], aux);
            }
        }
    }
    return host;
}
exports.bindAll = bindAll;
function safeBind(func, context) {
    var bound = func.bind(context);
    exports.forEach(func, function (value, name) { return bound[name] = value; });
    return bound;
}
exports.safeBind = safeBind;

},{"./reflection":"tng/reflection"}],"tng/value":[function(require,module,exports){
/// <reference path="./_references" />
var utils_1 = require('./utils');
var reflection_1 = require('./reflection');
/**
 * Wraps a value to be made available for dependency injection
 *
 * @param name The name of the value through which it will made available
 * @param value The value to be injected, as is
 *
 * @return A wrapper instance, to be used as a module dependency
 */
function Value(name, value) {
    var wrapper = {};
    reflection_1.setAnnotations(wrapper, [new ValueAnnotation({
            name: name,
            value: value
        })], 'value');
    return wrapper;
}
exports.Value = Value;
/**
 * @internal
 */
var ValueAnnotation = (function () {
    function ValueAnnotation(options) {
        this.name = '';
        this.value = null;
        utils_1.setIfInterface(this, options);
    }
    return ValueAnnotation;
})();
exports.ValueAnnotation = ValueAnnotation;
/**
 * @intenal
 */
function registerValue(value, ngModule) {
    var aux = reflection_1.getAnnotations(value, ValueAnnotation, 'value');
    if (!aux.length) {
        throw new Error("Value annotation not found");
    }
    var annotation = aux[0];
    ngModule.value(annotation.name, annotation.value);
}
exports.registerValue = registerValue;

},{"./reflection":"tng/reflection","./utils":"tng/utils"}],"tng/view":[function(require,module,exports){
/// <reference path="./_references" />
var utils_1 = require('./utils');
/**
 * @internal
 */
var ViewAnnotation = (function () {
    function ViewAnnotation(options) {
        this.template = '';
        this.templateUrl = '';
        this.styleUrl = '';
        this.controllerAs = '';
        utils_1.setIfInterface(this, options);
    }
    return ViewAnnotation;
})();
exports.ViewAnnotation = ViewAnnotation;
/**
 * A decorator to annotate a controller with view information
 */
exports.View = utils_1.makeDecorator(ViewAnnotation);

},{"./utils":"tng/utils"}],"tng":[function(require,module,exports){
var di_1 = require('./di');
exports.Inject = di_1.Inject;
exports.bind = di_1.bind;
var value_1 = require('./value');
exports.Value = value_1.Value;
var constant_1 = require('./constant');
exports.Constant = constant_1.Constant;
var filter_1 = require('./filter');
exports.Filter = filter_1.Filter;
var animation_1 = require('./animation');
exports.Animation = animation_1.Animation;
var service_1 = require('./service');
exports.Service = service_1.Service;
var decorator_1 = require('./decorator');
exports.Decorator = decorator_1.Decorator;
var view_1 = require('./view');
exports.View = view_1.View;
var component_view_1 = require('./component-view');
exports.ComponentView = component_view_1.ComponentView;
var directive_1 = require('./directive');
exports.Directive = directive_1.Directive;
var component_1 = require('./component');
exports.Component = component_1.Component;
var module_1 = require('./module');
exports.Module = module_1.Module;
exports.publishModule = module_1.publishModule;
var application_1 = require('./application');
exports.Application = application_1.Application;
var bootstrap_1 = require('./bootstrap');
exports.bootstrap = bootstrap_1.bootstrap;

},{"./animation":"tng/animation","./application":"tng/application","./bootstrap":"tng/bootstrap","./component":"tng/component","./component-view":"tng/component-view","./constant":"tng/constant","./decorator":"tng/decorator","./di":"tng/di","./directive":"tng/directive","./filter":"tng/filter","./module":"tng/module","./service":"tng/service","./value":"tng/value","./view":"tng/view"}]},{},[])


//# sourceMappingURL=tng.js.map