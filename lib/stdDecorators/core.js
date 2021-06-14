HTMLDecorators.StdDecorators.Init = (function (document, window) {

    /**
     * The standard window object
     *
     * @class window
     */

    /**
     * The alias property to the base component class
     *
     * @var decComponent
     * @memberOf window
     * @type HTMLDecorators.Component
     */
    window.decComponent = HTMLDecorators.Component;

    /**
     * Sets a handler
     *
     * Note: The function must have a name
     * Note: Alias to HTMLDecorators.Handler
     *
     * @function decHandler
     * @method decHandler
     * @memberOf window
     * @param func The handler function
     * @param uid (optional) A unique identifier for the handler
     * @return void
     */
    window.decHandler = function (func, uid) {
        HTMLDecorators.Handler(func, uid);
    }

    /**
     * Triggers an event to all component and global events
     *
     * Note: Alias to HTMLDecorators.BroadcastEvent
     *
     * @function decBroadcastEvent
     * @method decBroadcastEvent
     * @memberOf window
     * @param eventName The event name
     * @param obj Pass data to the event
     * @param sender The sender obj
     * @return void
     */
    window.decBroadcastEvent = function (eventName, obj, sender) {
        HTMLDecorators.BroadcastEvent(eventName, obj, sender);
    }

    /**
     * Registers a component
     *
     * @param uid A unique identifier for the handler
     * @param componentClass The component class
     * @function decRegisterComponent
     * @method decRegisterComponent
     * @memberOf window
     * @return void
     */
    window.decRegisterComponent = function (uid, componentClass) {
        HTMLDecorators.RegisterComponent(uid, componentClass);
    }

    /**
     * Creates an event
     *
     * @function decEventOn
     * @method decEventOn
     * @param eventName The event name
     * @param callback The event callback
     * @memberOf window
     * @return void
     */
    window.decEventOn = function (eventName, callback) {
        HTMLDecorators.Event.on(eventName, callback);
    }

    /**
     * Removes an event completely
     *
     * @function decEventOff
     * @method decEventOff
     * @memberOf window
     * @param eventName The event name
     * @return void
     */
    window.decEventOff = function (eventName) {
        HTMLDecorators.Event.off(eventName);
    }

    /**
     * Triggers an event
     *
     * @function decEventTrigger
     * @method decEventTrigger
     * @memberOf window
     * @param eventName The event name
     * @param obj Pass data to the event
     * @param sender The sender obj
     * @return void
     */
    window.decEventTrigger = function (eventName, obj, sender) {
        HTMLDecorators.Event.trigger(eventName, obj, sender);
    }

    /**
     * Evaluates all tags with the "data-htmldec" attribute
     *
     * @param data (optional) A key,value object
     * @param cb (optional) The decorator applier handler
     * @function decHTMLEval
     * @method decHTMLEval
     * @memberOf window
     * @return void
     */
    window.decHTMLEval = function (data, cb) {
        HTMLDecorators.EvaluateHTMLDecs(data, cb);
    }

    /**
     * Evaluates a tag
     *
     * @param tag The HTMLElement
     * @param data (optional) A key,value object
     * @param cb (optional) The decorator applier handler
     * @function decEvalTag
     * @method decEvalTag
     * @memberOf window
     * @return void
     */
    window.decEvalTag = function (tag, data, cb) {
        HTMLDecorators.EvaluateTag(tag, data, cb);
    }

    /**
     * Handles initialization
     *
     * @decorator Init
     * @decNamespace std
     * @decParam string applyDecorationsHandler The callback for applying decorators
     * @decParam string decimalSeperator The seperator for decimal values
     * @decParam number decimalFixed The set number of decimals of a value
     * @decParam string dateFormat Possible pattern Y,m,d,H,i,s
     *
     * @constructor
     * @class HTMLDecorators.StdDecorators.Init
     * @extends HTMLDecorators.Decorator
     */
    function Init() {
        HTMLDecorators.Decorator.call(this,{
            applyDecorationsHandler : '',
            id : 'stdInit',
            decimalSeperator : '.',
            decimalFixed : 10,
            dateFormat : 'Y/m/d H:i:s'
        });
    }
    HTMLDecorators.ExtendsClass(Init, HTMLDecorators.Decorator);
    /**
     * Applies decorators set through configuration
     *
     * @param e The event
     * @param data The data
     * @memberOf HTMLDecorators.StdDecorators.Init
     * @method internalApplyDecoration
     * @return void
     */
    Init.prototype.internalApplyDecoration = function (e, data) {
        // apply decorators
        HTMLDecorators.ApplyDecorators(data.decs);
    }
    /**
     * Renders the decorator
     */
    Init.prototype.render = function () {}

    return Init;

})(document, window);



HTMLDecorators.StdDecorators.LoadHTML = (function (document, window) {

    /**
     * Handles loading of html pages
     *
     * Signature of applyHandler
     * void applyHandler(e, result:{html:string,decs:array<HTMLDecorators.DecoratorDef>})
     *
     * @decorator LoadHTML
     * @decNamespace std
     * @decParam string path The path to load
     * @decParam string id The id to the @Navigations a[data-id] attribute
     * @decParam string applyHandler The decoration applier function
     * @decParam string selector The css selector to pull data from tag
     * @decParam string data The data expression or @LoadData id
     * @decParam bool skipRender Skips the rendering once if set to true
     * @decParam string fromStack The @LoadHTMLStack id
     * @decParam string withId The stack loaded page id
     *
     * @example loadhtml-path
     * @example loadhtml-selector
     *
     * @constructor
     * @class HTMLDecorators.StdDecorators.LoadHTML
     * @extends HTMLDecorators.Decorator
     */
    function LoadHTML() {
        HTMLDecorators.Decorator.call(this,{
            putInElement : 'true',
            applyHandler : '',
            dontParse : 'false',
            selectOuterHTML : 'false'
        });

        /**
         * Returns the unique id for the execution
         *
         * @memberOf HTMLDecorators.StdDecorators.LoadHTML
         * @var uid
         * @type string
         */
        this.uid = HTMLDecorators.RegisterUniqueId();

        /**
         * Returns the after parsing object
         *
         * @memberOf HTMLDecorators.StdDecorators.LoadHTML
         * @var afterParsingObj
         * @type {html:string;decs:HTMLDecorators.Decorator[]}
         */
        this.afterParsingObj = null;

        /**
         * Returns the object before parsing
         *
         * @memberOf HTMLDecorators.StdDecorators.LoadHTML
         * @var beforeParsingObj
         * @type {html:string;data:object}
         */
        this.beforeParsingObj = null;
    }
    HTMLDecorators.ExtendsClass(LoadHTML, HTMLDecorators.Decorator);
    /**
     * Calls the dec appliers
     *
     * Note:
     * obj = {html:string;decs:HTMLDecorators.DecoratorDef[]}
     *
     * @memberOf HTMLDecorators.StdDecorators.LoadHTML
     * @method callApplyDecs
     * @param obj The html and found decorators after parsing
     * @return void
     */
    LoadHTML.prototype.callApplyDecs = function (obj) {
        // use internal cb property
        if(this.config.applyHandler != '') {
            this.callFunction(this.config.applyHandler, obj);
        } else {
            var dec;
            // if init was defined
            if(dec = this.getStdInit()) {
                // if a custom apply decorator handler was defined
                if(dec.config.applyDecorationsHandler != '') {
                    this.callFunction(dec.config.applyDecorationsHandler, obj);
                } else {
                    // use internal apply decorator handler
                    dec.internalApplyDecoration(null, obj);
                }
            } else {
                this.log('No decoration applier found');
            }
        }
    }
    /**
     * Applies the decorators
     *
     * @memberOf HTMLDecorators.StdDecorators.LoadHTML
     * @method applyDecs
     * @param html The html to parse and apply decorators
     * @return void
     */
    LoadHTML.prototype.applyDecs = function (html) {
        var data = {};
        data.__uid__ = this.uid;
        if(this.paramExist('data')) {
            var loadDataDec;
            if(loadDataDec = this.findById(this.config.data)) {
                if(loadDataDec.name == 'LoadData') {
                    this.config.data = loadDataDec.responseData;
                } else {
                    this.log('"data" needs to point a @LoadData decorator');
                }
            }
            if(typeof this.config.data == 'object' && typeof this.config.data.length != 'undefined') {
                data.__array__ = this.config.data;
            } else {
                data = Object.assign(data,this.config.data);
            }
            data.__data__ = this.config.data;
        }

        this.beforeParsingObj = {
            html : html,
            data : data
        };

        if(this.config.dontParse == 'true') {
            return;
        }

        var parser = new HTMLDecorators.Parser(),
            parsedHTML = parser.parse(html, data),
            obj = {
                html : parsedHTML,
                decs : parser.DecoratorList
            };

        if(this.config.putInElement == 'true') {
            this.element.innerHTML = parsedHTML;

            this.callApplyDecs(obj);
        } else {
            this.afterParsingObj = obj;
        }

    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.LoadHTML
     * @method render
     * @return void
     */
    LoadHTML.prototype.render = async function () {
        if(this.paramExist('skipRender') && this.config.skipRender == 'true') {
            // after skipping the rendering remove it
            delete this.config.skipRender;
            return;
        }
        if(this.paramExist('path')) {
            var load = await fetch(this.config.path),
                loadHTML = await load.text();

            this.applyDecs(loadHTML);
        }
        if(this.paramExist('selector')) {
            var selectedElm = document.querySelector(this.config.selector);
            if(selectedElm) {
                var html = selectedElm.innerHTML;
                if(this.config.selectOuterHTML=='true') {
                    html = selectedElm.outerHTML;
                }
                this.applyDecs(html);
            } else {
                this.log('Could not select element with "' + this.config.selector + '"');
            }
        }
        if(this.paramExist('fromStack')) {
            if(this.paramExist('withId')) {
                var dec;
                if(dec = this.findById(this.config.fromStack)) {
                    if(dec.name == 'LoadHTMLStack') {
                        if(dec.htmlStore[this.config.withId]) {
                            this.applyDecs(dec.htmlStore[this.config.withId]);
                        } else {
                            this.log('Cant find html page with id "' + this.config.withId + '" in LoadHTMLStack');
                        }
                    } else {
                        this.log('Decorator with id "' + this.config.fromStack + '" needs to be from type LoadHTMLStack');
                    }
                } else {
                    this.log('Cant find decorator with id "'+ this.config.fromStack + '"');
                }
            } else {
                this.log('"fromStack" needs the "withId" parameter');
            }
        }
    }

    return LoadHTML;

})(document, window);

HTMLDecorators.StdDecorators.LoadHTMLStack = (function (document, window) {

    /**
     * Handles content of a navigation
     *
     * @decorator LoadHTMLStack
     * @decNamespace std
     * @decParam string id The id
     * @decParam string id0-XXX The ids of the pages to load
     * @decParam string path0-XXX The path to the pages to load
     * @decParam string stateHandler The handler for the different states loading,finished
     *
     * @example loadhtmlstack
     *
     * @constructor
     * @class HTMLDecorators.StdDecorators.LoadHTMLStack
     * @extends HTMLDecorators.Decorator
     */
    function LoadHTMLStack() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns a map of pages
         *
         * @memberOf HTMLDecorators.StdDecorators.LoadHTMLStack
         * @var htmlStore
         * @type object
         */
        this.htmlStore = {};
    }
    HTMLDecorators.ExtendsClass(LoadHTMLStack, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.LoadHTMLStack
     * @method render
     * @return void
     */
    LoadHTMLStack.prototype.render = async function () {
        var i = 0,
            len = 1000;
        if(this.paramExist('stateHandler')) {
            this.callFunction(this.config.stateHandler, 'loading');
        }
        for(i; i < len; ++i) {
            if(this.paramExist('id'+ i) && this.paramExist('path'+ i)) {
                var load = await fetch(this.config['path'+i]),
                    loadedHTML = await load.text();
                this.htmlStore[this.config['id'+i]] = loadedHTML;
            } else {
                break;
            }
        }
        if(this.paramExist('stateHandler')) {
            this.callFunction(this.config.stateHandler, 'finished');
        }
        decEventTrigger('LoadHTMLStackFinished', this);
    }

    return LoadHTMLStack;

})(document, window);

HTMLDecorators.StdDecorators.LoadData = (function (document, window) {

    /**
     * Handles content of a navigation
     *
     * Signature of applyHandler
     * void applyHandler(e, result:{html:string,decs:array<HTMLDecorators.DecoratorDef>})
     *
     * @decorator LoadData
     * @decNamespace std
     * @decParam string path The path to load
     * @decParam string id The id to the @Navigations a[data-id] attribute
     * @decParam string type The data type e.g json,text
     *
     *
     * @constructor
     * @class HTMLDecorators.StdDecorators.LoadData
     * @extends HTMLDecorators.Decorator
     */
    function LoadData() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns the loaded data
         *
         * @var responseData
         * @memberOf HTMLDecorators.StdDecorators.LoadData
         * @type {null|string}
         */
        this.responseData = null;
    }
    HTMLDecorators.ExtendsClass(LoadData, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.LoadData
     * @method render
     * @return void
     */
    LoadData.prototype.render = async function () {
        if(this.paramExist('type') && this.paramExist('path')) {
            var response = await fetch(this.config.path),
                output;
            switch(this.config.type) {
                case 'json':
                    output = await response.json();
                    break;
                default:
                    output = await response.text();
                    break;
            }
            this.responseData = output;
        } else {
            this.log('"type" and "path" needs to be defined');
        }
    }

    return LoadData;

})(document, window);

HTMLDecorators.StdDecorators.Script = (function (document, window) {

    /**
     * Executes a script
     *
     * @decorator Script
     * @decNamespace std
     *
     * @class HTMLDecorators.StdDecorators.Script
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function Script() {
        HTMLDecorators.Decorator.call(this,{
            putInElement : 'true',
            cb : ''
        });
    }
    HTMLDecorators.ExtendsClass(Script, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Script
     * @method render
     * @return void
     */
    Script.prototype.render = async function () {
        // replace
        var content = this.element.innerHTML;
        // if the decorator was applied to other than a script tag replace characters
        if(this.element.tagName.toLowerCase() != 'script') {
            content = content.replace(/\&lt;/g,'<');
            content = content.replace(/\&gt;/g,'>');
        }
        new Function('window,document',content).apply(window,[window,document]);
    }

    return Script;

})(document, window);

HTMLDecorators.StdDecorators.Ref = (function (document, window) {

    /**
     * Gets a decorator or returns null
     *
     * @param id The id of the reference
     * @function decById
     * @return HTMLDecorators.Decorator
     */
    window.decById = function (id) {
        return HTMLDecorators.FindById(id);
    }

    /**
     * Gets the element of the decorator or returns null
     *
     * @param id The id of the reference
     * @function decElmById
     * @return HTMLElement
     */
    window.decElmById = function (id) {
        var ref;
        if(ref = decById(id)) {
            return ref.element;
        }
        return null;
    }

    /**
     * Sets a reference
     *
     * @decorator
     * @decNamespace std
     * @decParam string id The id
     *
     * @class HTMLDecorators.StdDecorators.Ref
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Ref() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Ref, HTMLDecorators.Decorator);

    return Ref;

})(document, window);

HTMLDecorators.StdDecorators.ForEach = (function (document, window) {

    /**
     * Loops data from an object or array
     *
     * @decorator ForEach
     * @decNamespace std
     * @decParam string id The id
     * @decParam string applyHandler The decoration applier function
     * @decParam array data A list of objects
     * @decParam string sortHandler The sort function name
     * @decParam string filterHandler The filter function
     *
     * @example foreach-id
     * @example foreach-data
     * @example foreach-multiple-instances
     * @example foreach-sorthandler
     * @example foreach-filterhandler
     *
     * @class HTMLDecorators.StdDecorators.ForEach
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function ForEach() {
        HTMLDecorators.Decorator.call(this,{
            applyHandler : ''
        });

        /**
         * Returns the template for iteration
         *
         * @var template
         * @memberOf HTMLDecorators.StdDecorators.ForEach
         * @type {string}
         */
        this.template = '';

        /**
         * Returns the complete html after all iterations
         *
         * @var iterationHTMLSum
         * @memberOf HTMLDecorators.StdDecorators.ForEach
         * @type {string}
         */
        this.iterationHTMLSum = '';

        /**
         * Returns the complete list of decorators after all iterations
         *
         * @var decoratorsSum
         * @memberOf HTMLDecorators.StdDecorators.ForEach
         * @type {array}
         */
        this.decoratorsSum = [];

        /**
         * Returns the data after the manipulation through filter or sort has happened
         *
         * @var afterManipulationData
         * @memberOf HTMLDecorators.StdDecorators.ForEach
         * @type {array}
         */
        this.afterManipulationData = null;
    }
    HTMLDecorators.ExtendsClass(ForEach, HTMLDecorators.Decorator);
    /**
     * A single iteration
     *
     * @param index The iteration index
     * @param data A key,value object
     * @param initialData The initial data given by the update function
     * @memberOf HTMLDecorators.StdDecorators.ForEach
     * @method iteration
     * @return void
     */
    ForEach.prototype.iteration = function (index, data, initialData) {

        if(typeof data == 'object') {
            var obj = Object.assign({
                    __index__ : index
                },data);
            obj.__entry__ = obj;
            obj.__data__ = initialData;
        } else {
            var obj = {
                __index__ : index,
                __entry__ : data,
                __data__ : initialData
            };
        }

        var parser = new HTMLDecorators.Parser(),
            parsedHTML = parser.parse(this.template, obj),
            i = 0,
            len = parser.DecoratorList.length;

        this.iterationHTMLSum += parsedHTML;

        for(i; i < len; ++i) {
            this.decoratorsSum.push(parser.DecoratorList[i]);
        }

    }
    /**
     * Updates the element
     *
     * @param list A list of objects
     * @memberOf HTMLDecorators.StdDecorators.ForEach
     * @method update
     * @return void
     */
    ForEach.prototype.update = function (list) {
        // reset
        this.element.innerHTML = '';
        this.iterationHTMLSum = '';
        this.decoratorsSum = [];
        var i = 0,
            len = list.length,
            data;
        for (i; i < len; ++i) {
            data = list[i];
            // iterate over all data
            this.iteration(i,data,list);
        }

        var obj = {
            html : this.iterationHTMLSum,
            decs : this.decoratorsSum
        }
        this.element.innerHTML = obj.html;

        // use internal cb property
        if(this.config.applyHandler != '') {
            this.callFunction(this.config.applyHandler, obj);
        } else {
            var dec;
            // if init was defined
            if(dec = this.getStdInit()) {
                // if a custom apply decorator handler was defined
                if(dec.config.applyDecorationsHandler != '') {
                    this.callFunction(dec.config.applyDecorationsHandler, obj);
                } else {
                    // use internal apply decorator handler
                    dec.internalApplyDecoration(null, obj);
                }
            } else {
                this.log('No decoration applier found');
            }
        }
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.ForEach
     * @method render
     * @return void
     */
    ForEach.prototype.render = function () {
        this.template = (' ' + this.element.innerHTML).slice(1);
        this.element.innerHTML = '';
        if(this.paramExist('data')) {
            // if invalid value
            if(typeof this.config.data == 'string') this.config.data = [];
            var data = this.config.data.map(function(elm){return elm});
            if(this.paramExist('filterHandler')) {
                data = new Function('data','return data.filter(' + this.config.filterHandler + ')')
                    .apply(this,[data]);
            }
            if(this.paramExist('sortHandler')) {
                data = new Function('data','return data.sort(' + this.config.sortHandler + ')')
                    .apply(this,[data]);
            }

            this.afterManipulationData = data;

            this.update(data);
        }
    }

    return ForEach;

})(document, window);

HTMLDecorators.StdDecorators.Component = (function (document, window) {

    /**
     * Sets a reference
     *
     * @decorator Component
     * @decNamespace std
     * @decParam string path The path to load
     * @decParam string id The id
     * @decParam string applyHandler The decoration applier function
     * @decParam string selector The css selector to pull data from tag
     * @decParam string data The data expression or @LoadData id
     *
     * @example component
     *
     * @class HTMLDecorators.StdDecorators.Component
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function Component() {
        HTMLDecorators.Decorator.call(this,{
            putInElement : 'false',
            dontParse : 'true'
        });

        /**
         * Returns a @LoadHTML decorator instance
         *
         * @var loadHTML
         * @type HTMLDecorators.StdDecorators.LoadHTML
         * @memberOf HTMLDecorators.StdDecorators.Component
         */
        this.loadHTML = null;

        /**
         * Returns a @Script decorator instance
         *
         * @var script
         * @type HTMLDecorators.StdDecorators.Script
         * @memberOf HTMLDecorators.StdDecorators.Component
         */
        this.script = null;

        this.template = '';

        this.appliedDecorators = {};
    }
    HTMLDecorators.ExtendsClass(Component, HTMLDecorators.Decorator);
    /**
     * Creates a @LoadHTML and @Script decorator inside
     *
     * @memberOf HTMLDecorators.StdDecorators.Component
     * @method initialized
     * @return void
     */
    Component.prototype.initialized = function () {

        this.loadHTML = this.createDecorator('LoadHTML', HTMLDecorators.StdDecorators.LoadHTML,this.config);

        this.script = this.createDecorator('Script', HTMLDecorators.StdDecorators.Script,this.config);
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Component
     * @method render
     * @return void
     */
    Component.prototype.render = async function () {
        await this.loadHTML.render();

        this.element.innerHTML = this.loadHTML.beforeParsingObj.html;

        var template = this.element.querySelector('template'),
            scripts = this.element.querySelectorAll('script'),
            script = scripts.length > 0 ? scripts[0] : null,
            style = this.element.querySelector('style'),
            stylePath = document.querySelector('style[data-id="' + this.config.path + '"]'),
            styleSelector = document.querySelector('style[data-id="' + this.config.selector + '"]'),
            i = 0,
            scriptsLen = scripts.length;

        for(var key in this.element.decorators) {
            if(this.element.decorators[key].name == 'Component') continue;
            this.appliedDecorators[key] = this.element.decorators[key];
        }

        if(!template) {
            // check for type template scripts
            for(i; i < scriptsLen;++i) {
                if(scripts[i].getAttribute('type')=='template') {
                    template = scripts[i];
                } else {
                    script = scripts[i];
                }
            }
            if(!template) {
                this.log('A component must atleast have a template tag with a single children as base.');
                return;
            }
        }

        this.template = template.innerHTML;

        if(style) {
            style.innerHTML = style.innerHTML.replace(/__uid__/g,this.loadHTML.uid);
            // prevent adding multiple styles of components
            if(!stylePath && !styleSelector) {
                if(this.paramExist('path')) {
                    style.dataset.id = this.config.path;
                }
                if(this.paramExist('selector')) {
                    style.dataset.id = this.config.selector;
                }
                document.body.appendChild(style);
            }
        }

        // execute the script
        if(script) {
            script.textContent = script.textContent.replace(/__uid__/g,this.loadHTML.uid);
            this.script.element = script;
            this.script.render();

            if(HTMLDecorators.ComponentMap[this.loadHTML.uid]) {
                var component = HTMLDecorators.ComponentMap[this.loadHTML.uid];
                component.id = this.loadHTML.uid;
                component.parent = this.getComponent();
                component.element = this.element;
                component.decorator = this;
                await component.initializeData();
                await component.render();
                await component.created();
            } else {
                this.log('Theres no component registered');
            }
        }
    }

    return Component;

})(document, window);

HTMLDecorators.StdDecorators.NumberFormat = (function (document, window) {

    /**
     * Sets a reference
     *
     * @decorator NumberFormat
     * @decNamespace std
     * @decParam string id The id
     * @decParam string decimalSeperator The seperator for decimal values
     * @decParam number decimalFixed The set number of decimals of a value
     *
     * @example numberformat
     *
     * @class HTMLDecorators.StdDecorators.NumberFormat
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function NumberFormat() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns the decimal seperator
         *
         * @memberOf HTMLDecorators.StdDecorators.NumberFormat
         * @var decimalSeperator
         * @type {string}
         */
        this.decimalSeperator = '.';

        /**
         * Returns the decimal numbers size
         *
         * @memberOf HTMLDecorators.StdDecorators.NumberFormat
         * @var decimalFixed
         * @type {number}
         */
        this.decimalFixed = 10;
    }
    HTMLDecorators.ExtendsClass(NumberFormat, HTMLDecorators.Decorator);
    /**
     * Formats the number
     *
     * @memberOf HTMLDecorators.StdDecorators.NumberFormat
     * @method format
     * @param decimalSeperator The seperator for float
     * @param decimalFixed The decimal places number
     * @return {string}
     */
    NumberFormat.prototype.format = function (decimalSeperator, decimalFixed) {
        var value = parseFloat(this.element.innerHTML);
        value = value.toFixed(decimalFixed).toString();
        value = value.replace('.', decimalSeperator);
        return value;
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.NumberFormat
     * @method render
     * @return void
     */
    NumberFormat.prototype.render = function () {
        var dec = this.getStdInit();
        if(this.paramExist('decimalSeperator') || this.paramExist('decimalFixed')) {
            var dS = this.decimalSeperator,
                dF = this.decimalFixed;
            if(this.paramExist('decimalSeperator')) {
                dS = this.config.decimalSeperator;
            }
            if(this.paramExist('decimalFixed')) {
                dF = this.config.decimalFixed;
            }
            this.element.innerText = this.format(dS,dF);
        } else {
            if(dec) {
                this.element.innerText = this.format(
                    dec.config.decimalSeperator,
                    dec.config.decimalFixed
                );
            } else {
                this.log('No @Init set.');
            }
        }
    }

    return NumberFormat;

})(document, window);

HTMLDecorators.StdDecorators.DateFormat = (function (document, window) {

    /**
     * Sets a reference
     *
     * Pattern:
     * Y = Full year 2021
     * d = Day 01-31
     * m = Month 05
     * H = Hour 12
     * i = Minute 23
     * s = Seconds 58
     *
     * @decorator NumberFormat
     * @decNamespace std
     * @decParam string id The id
     * @decParam string format Possible pattern Y,d,m,H,i,s
     *
     * @example dateformat
     *
     * @class HTMLDecorators.StdDecorators.DateFormat
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function DateFormat() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(DateFormat, HTMLDecorators.Decorator);
    /**
     * Formats an unix timestamp
     *
     * @memberOf HTMLDecorators.StdDecorators.DateFormat
     * @method format
     * @param decimalSeperator The seperator for float
     * @param decimalFixed The decimal places number
     * @return {string}
     */
    DateFormat.prototype.format = function (format) {
        var timestamp = parseInt(this.element.innerHTML),
            date = new Date(timestamp),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            seconds = date.getSeconds();

        if(month < 10) month = '0' + month;
        if(day < 10) day = '0' + day;
        if(hour < 10) hour = '0' + hour;
        if(minute < 10) minute = '0' + minute;
        if(seconds < 10) seconds = '0' + seconds;

        format = format.replace(/Y/g,year);
        format = format.replace(/m/g,month);
        format = format.replace(/d/g,day);
        format = format.replace(/H/g,hour);
        format = format.replace(/i/g,minute);
        format = format.replace(/s/g,seconds);

        return format;
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.DateFormat
     * @method render
     * @return void
     */
    DateFormat.prototype.render = function () {
        var dec = this.getStdInit();
        if(this.paramExist('format')) {
            this.element.innerText = this.format(this.config.format);
        } else {
            if(dec) {
                this.element.innerText = this.format(dec.config.dateFormat);
            } else {
                this.log('No @Init set.');
            }
        }
    }

    return DateFormat;

})(document, window);