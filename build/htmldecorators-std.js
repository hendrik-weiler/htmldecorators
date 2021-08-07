/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.7

Build: 2021-08-07 06:10:55
*/
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
        if(this.paramExist(this.config.applyHandler)) {
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
     * @decParam string combined0-XXX The path to the file with multiple components
     *
     * @example loadhtmlstack
     * @example loadhtmlstack-combined
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
     * Parses a html file with multiple components
     *
     * @param text The text to parse
     * @memberOf HTMLDecorators.StdDecorators.LoadHTMLStack
     * @method render
     * @return void
     */
    LoadHTMLStack.prototype.parseCombined = function (text) {
        var split = text.split('--------------component='),
            i = 0,
            j,
            name,
            html;
        for(i; i < split.length; ++i) {
            html = split[i];
            if(/^\/\*/.test(html)) continue;
            split2 = html.split("\n");
            name = split2.shift();
            this.htmlStore[name] = split2.join("\n");
        }
    }
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
        for(i=0; i < len; ++i) {
            if(this.paramExist('combined'+ i)) {
                var load = await fetch(this.config['combined'+i]),
                    combinedHTML = await load.text();
                this.parseCombined(combinedHTML);
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
     * @decParam string handler The handler function after retrieving data
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
            if(this.paramExist('handler')) {
                this.callFunction(this.config.handler, this.responseData);
            }
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
     * Note: This should be used when html was loaded from an exernal source.
     * The tag will not be executed when inserting it into the dom.
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
     * @decorator Ref
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

HTMLDecorators.StdDecorators.Renderer = (function (document, window) {

    /**
     * Be able to rerender its tags content with data
     *
     * @decorator Renderer
     * @decNamespace std
     * @decParam string id The id
     * @decParam object data The data for rendering
     *
     * @class HTMLDecorators.StdDecorators.Renderer
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Renderer() {
        HTMLDecorators.Decorator.call(this);

        this.template = null;
    }
    HTMLDecorators.ExtendsClass(Renderer, HTMLDecorators.Decorator);
    Renderer.prototype.update = function () {
        var data = !this.paramExist('data') ? {} : this.config.data,
            parser = new HTMLDecorators.Parser(),
            parsedHTML = parser.parse(this.template, data);

        var obj = {
            html : parsedHTML,
            decs : parser.DecoratorList
        }
        this.element.innerHTML = obj.html;

        // use internal cb property
        if(this.paramExist(this.config.applyHandler)) {
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
    Renderer.prototype.render = function () {
        this.template = (' ' + this.element.innerHTML).slice(1);
        this.element.innerHTML = '';
    }

    return Renderer;

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
        if(this.paramExist(this.config.applyHandler)) {
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
        // only set the template if its empty
        if(this.template == '') {
            this.template = (' ' + this.element.innerHTML).slice(1);
        }
        this.element.innerHTML = '';
        if(this.paramExist('data')) {
            var loadDataDec;
            if(loadDataDec = this.findById(this.config.data)) {
                if(loadDataDec.name == 'LoadData') {
                    this.config.data = loadDataDec.responseData;
                } else {
                    this.log('"data" needs to point to a @LoadData decorator');
                }
            }
            // if invalid value
            if(typeof this.config.data == 'undefined') {
                this.log('Data is undefined');
                this.config.data = [];
            }
            if(!this.config.data.map) {
                this.log('Invalid data as input', this.config.data);
                this.config.data = [];
            }
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
     * @decParam string fromStack The @LoadHTMLStack id
     * @decParam string withId The stack loaded page id
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

        /**
         * Returns the components template
         *
         * @var template
         * @type string
         * @memberOf HTMLDecorators.StdDecorators.Component
         */
        this.template = '';

        /**
         * Returns the components slot template
         *
         * @var slotTemplate
         * @type string
         * @memberOf HTMLDecorators.StdDecorators.Component
         */
        this.slotTemplate = '';

        /**
         * Returns the component instances which need to be applied to the components node
         *
         * @var appliedDecorators
         * @type string
         * @memberOf HTMLDecorators.StdDecorators.Component
         */
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

        this.slotTemplate = this.element.innerHTML;

        // create a replacement for allowing setting any html later on
        var nodeReplace = document.createElement('div'),
            decorators = this.element.decorators;
        this.element.parentNode.insertBefore(nodeReplace, this.element);
        this.element.parentNode.removeChild(this.element);
        this.element = nodeReplace;
        this.element.decorators = decorators;

        this.element.innerHTML = this.loadHTML.beforeParsingObj.html;

        var template = this.element.querySelector('template'),
            scripts = this.element.querySelectorAll('script'),
            script = scripts.length > 0 ? scripts[0] : null,
            style = this.element.querySelector('style'),
            stylePath = document.querySelector('style[data-id="' + this.config.path + '"]'),
            styleSelector = document.querySelector('style[data-id="' + this.config.selector + '"]'),
            styleStack = document.querySelector('style[data-id="' + this.config.fromStack + '_' + this.config.withId + '"]'),
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
            if(!stylePath && !styleSelector && !styleStack) {
                if(this.paramExist('path')) {
                    style.dataset.id = this.config.path;
                }
                if(this.paramExist('selector')) {
                    style.dataset.id = this.config.selector;
                }
                if(this.paramExist('fromStack') && this.paramExist('withId')) {
                    style.dataset.id = this.config.fromStack + '_' + this.config.withId;
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
                // if theres an id set
                if(this.paramExist('id')) {
                    // make a reference to component with the given id
                    HTMLDecorators.ComponentMap[this.config.id] = HTMLDecorators.ComponentMap[this.loadHTML.uid];
                }
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

})(document, window);HTMLDecorators.StdDecorators.Event = (function (document, window) {

    /**
     * Handles events
     *
     * To force an event call in global
     * you have to add "$global." to the
     * id e.g. "$global.functionName"
     *
     * @decorator Event
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string type The event type e.g. 'click','submit' ...
     * @decParam string handler The handler function name
     * @decParam string param A parameter for the event function
     *
     * @example event
     *
     * @class HTMLDecorators.StdDecorators.Event
     * @constructor
     * @extends HTMLDecorators.Decorator
     */
    function Event() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Event, HTMLDecorators.Decorator);
    /**
     * Handles the event
     *
     * @param e A event
     * @memberOf HTMLDecorators.StdDecorators.Event
     * @method eventHandler
     * @return void
     */
    Event.prototype.eventHandler = function (e) {
        if(!this.paramExist('handler')) {
            this.log('"handler" is not defined.');
            return;
        }

        e.preventDefault();

        var component,
            globalCall = false,
            handler = this.config.handler;
        if(/^\$global\./.test(handler)) {
            globalCall = true;
            handler = handler.replace(/\$global\./,'');
        }
        if((component = this.getComponent()) && !globalCall) {
            var args = 'component, e, decorator, param',
                body = 'return component.' + handler + '(e, decorator, param)';
            new Function(args, body)(component, e, this, this.config.param);
        } else {
            var args = 'e, decorator, param',
                body = 'return ' + handler + '(e, decorator, param)';
            new Function(args, body)(e, this, this.config.param);
        }
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Event
     * @method render
     * @return void
     */
    Event.prototype.render = function () {
        if(this.paramExist('type')) {
            this.element.addEventListener(this.config.type, this.eventHandler.bind(this));
        } else {
            this.log('"type" is not defined.');
        }
    }

    return Event;

})(document, window);

HTMLDecorators.StdDecorators.Click = (function (document, window) {

    /**
     * Handles the click event
     *
     * @decorator Click
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @example click
     *
     * @class HTMLDecorators.StdDecorators.Click
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function Click() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Click, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Click
     * @method render
     * @return void
     */
    Click.prototype.render = function () {
        this.element.addEventListener('click', this.eventHandler.bind(this));
    }

    return Click;

})(document, window);

HTMLDecorators.StdDecorators.Submit = (function (document, window) {

    /**
     * Handles the submit event
     *
     * @decorator Submit
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @class HTMLDecorators.StdDecorators.Submit
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function Submit() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Submit, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Submit
     * @method render
     * @return void
     */
    Submit.prototype.render = function () {
        this.element.addEventListener('submit', this.eventHandler.bind(this));
    }

    return Submit;

})(document, window);

HTMLDecorators.StdDecorators.Change = (function (document, window) {

    /**
     * Handles the change event
     *
     * @decorator Change
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @class HTMLDecorators.StdDecorators.Change
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function Change() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Change, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Change
     * @return void
     * @method render
     */
    Change.prototype.render = function () {
        this.element.addEventListener('change', this.eventHandler.bind(this));
    }

    return Change;

})(document, window);

HTMLDecorators.StdDecorators.KeyUp = (function (document, window) {

    /**
     * Handles the keyup event
     *
     * @decorator KeyUp
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @class HTMLDecorators.StdDecorators.KeyUp
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function KeyUp() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyUp, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.KeyUp
     * @method render
     * @return void
     */
    KeyUp.prototype.render = function () {
        this.element.addEventListener('keyup', this.eventHandler.bind(this));
    }

    return KeyUp;

})(document, window);

HTMLDecorators.StdDecorators.KeyDown = (function (document, window) {

    /**
     * Handles the keyup event
     *
     * @decorator KeyDown
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @class HTMLDecorators.StdDecorators.KeyDown
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function KeyDown() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyDown, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.KeyDown
     * @return void
     * @method render
     */
    KeyDown.prototype.render = function () {
        this.element.addEventListener('keydown', this.eventHandler.bind(this));
    }

    return KeyDown;

})(document, window);

HTMLDecorators.StdDecorators.KeyPress = (function (document, window) {

    /**
     * Handles the keypress event
     *
     * @decorator KeyPress
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string handler The handler function name
     *
     * @class HTMLDecorators.StdDecorators.KeyPress
     * @extends HTMLDecorators.StdDecorators.Event
     * @constructor
     */
    function KeyPress() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyPress, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.KeyPress
     * @method render
     * @return void
     */
    KeyPress.prototype.render = function () {
        this.element.addEventListener('keypress', this.eventHandler.bind(this));
    }

    return KeyPress;

})(document, window);HTMLDecorators.StdDecorators.Navigation = (function (document, window) {

    /**
     * Handles navigation
     *
     * @decorator Navigation
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string activeClass The active classname for the links
     * @decParam string hashHandler The handler function for hash detection
     * @decParam string default The id of a @Content decorator to set active as default
     * @decParam boolean routes If routes are used or not
     *
     * @example navigation-content
     * @example navigation-hashhandler
     *
     * @class HTMLDecorators.StdDecorators.Navigation
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Navigation() {
        HTMLDecorators.Decorator.call(this, {
            activeClass : 'active'
        });

        /**
         * Returns a map of registered HTMLDecorators.StdDecorators.Content instances
         *
         * @var contentsMap
         * @memberOf HTMLDecorators.StdDecorators.Navigation
         * @type array
         */
        this.contentsMap = {};
    }
    HTMLDecorators.ExtendsClass(Navigation, HTMLDecorators.Decorator);
    /**
     * Sets a link active
     *
     * @param id The link id
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method setActive
     * @return void
     */
    Navigation.prototype.setActive = function (id) {
        var links = this.element.querySelectorAll('a'),
            i = 0,
            len = links.length,
            link,
            content;

        for(i; i < len; ++i) {
            link = links[i];
            link.classList.remove(this.config.activeClass);
            if(link.dataset.id == id) {
                link.classList.add(this.config.activeClass);
            }
        }

        for(var contentId in this.contentsMap) {
            content = this.contentsMap[contentId];
            content.visibility.hide();
            if(contentId == id) {
                content.visibility.show();
            }
        }
    }
    /**
     * Routes to the default content
     *
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method toDefault
     * @return void
     */
    Navigation.prototype.toDefault = function () {
        var dec;
        // timeout to wait till the decators have been rendered
        setTimeout(function() {
            if(dec = this.findById(this.config.default)) {
                this.setActive(this.config.default);
            } else {
                this.log('Cant find @Content with id "' + this.config.default + '"');
            }
        }.bind(this),0);
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method render
     * @return void
     */
    Navigation.prototype.render = function () {
        var links = this.element.querySelectorAll('a'),
            i = 0,
            len = links.length,
            link;

        for(i; i < len; ++i) {
            link = links[i];
            link.onclick = function (e) {
                var dataset = e.currentTarget.dataset,
                    dec,
                    href = e.currentTarget.getAttribute('href');
                if(typeof dataset.external != 'undefined') {
                    return true;
                }
                if(href[0] != '#') {
                    e.preventDefault();
                }
                if(dec = this.findById(dataset.id)) {
                    this.setActive(dataset.id);
                    location.hash = dataset.id;
                } else {
                    this.log('Decorator with ID "' + dataset.id + '" does not exist');
                }
            }.bind(this);
        }

        if(this.paramExist('default')) {
            this.toDefault();
        }
        if(this.paramExist('hashChangeHandler')) {
            window.addEventListener('hashchange', function (e) {
                this.callFunction(this.config.hashChangeHandler);
            }.bind(this),false);
            this.callFunction(this.config.hashChangeHandler);
        }
    }

    return Navigation;

})(document, window);

HTMLDecorators.StdDecorators.Content = (function (document, window) {

    /**
     * Handles content of a navigation
     *
     * @decorator Content
     * @decNamespace std
     * @decParam string nav The id of the @Navigation decorator
     * @decParam string id The id to the @Navigations a[data-id] attribute
     *
     * @example navigation-content
     *
     * @class HTMLDecorators.StdDecorators.Content
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Content() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Content, HTMLDecorators.Decorator);
    /**
     * Initializes the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Content
     * @method initialized
     * @return void
     */
    Content.prototype.initialized = function () {
        this.visibility = this.createDecorator('Visible', HTMLDecorators.StdDecorators.Visible);
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Content
     * @method render
     * @return void
     */
    Content.prototype.render = function () {
        this.visibility.hide();

        // update references for when put with a @Component decorator
        this.visibility.element = this.element;
        this.visibility.id = this.id;

        var dec;
        if(dec = this.findById(this.config.nav)) {
            if(dec.name == 'Navigation') {
                dec.contentsMap[this.config.id] = this;
            } else {
                this.log('Decorator must be from type "Navigation"');
            }
        } else {
            this.log('Could not find decorator with id "' + this.config.nav + '"');
        }
        if(this.paramExist('visible') && this.config.visible=='true') {
            this.visibility.show();
        }
    }

    return Content;

})(document, window);HTMLDecorators.StdDecorators.Bold = (function (document, window) {

    /**
     * Renders an element bold
     *
     * @decorator Bold
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Bold
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Bold() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Bold, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Bold
     * @return void
     * @method render
     */
    Bold.prototype.render = function () {
        this.element.style.fontWeight = 'bold';
    }

    return Bold;

})(document, window);

HTMLDecorators.StdDecorators.Italic = (function (document, window) {

    /**
     * Renders an element cursive
     *
     * @decorator Italic
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Italic
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Italic() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Italic, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Italic
     * @method render
     * @return void
     */
    Italic.prototype.render = function () {
        this.element.style.fontStyle = 'italic';
    }

    return Italic;

})(document, window);

HTMLDecorators.StdDecorators.Underline = (function (document, window) {

    /**
     * Underlines an element
     *
     * @decorator Underline
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Underline
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Underline() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Underline, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Underline
     * @method render
     * @return void
     */
    Underline.prototype.render = function () {
        this.element.style.textDecoration = 'underline';
    }

    return Underline;

})(document, window);

HTMLDecorators.StdDecorators.Color = (function (document, window) {

    /**
     * Set color of an element
     *
     * @decorator Color
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string value The hexadecimal or any other value
     *
     * @class HTMLDecorators.StdDecorators.Color
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Color() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Color, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Color
     * @method render
     * @return void
     */
    Color.prototype.render = function () {
        if(this.paramExist('value')) {
            this.element.style.color = this.config.value;
        }
    }

    return Color;

})(document, window);

HTMLDecorators.StdDecorators.TAlign = (function (document, window) {

    /**
     * Set the align of an element
     *
     * @decorator TAlign
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string pos The position left,center,right
     *
     * @class HTMLDecorators.StdDecorators.TAlign
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function TAlign() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(TAlign, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @method render
     * @memberOf HTMLDecorators.StdDecorators.TAlign
     * @return void
     */
    TAlign.prototype.render = function () {
        if(this.paramExist('pos')) {
            this.element.style.textAlign = this.config.pos;
        }
    }

    return TAlign;

})(document, window);

HTMLDecorators.StdDecorators.Size = (function (document, window) {

    /**
     * Set the size of the element
     *
     * @decorator Size
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string width The width
     * @decParam string height The height
     *
     * @class HTMLDecorators.StdDecorators.Size
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Size() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Size, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Size
     * @method render
     * @return void
     */
    Size.prototype.render = function () {
        if(this.paramExist('width')) {
            this.element.style.width = this.config.width;
        }
        if(this.paramExist('height')) {
            this.element.style.height = this.config.height;
        }
    }

    return Size;

})(document, window);

HTMLDecorators.StdDecorators.Background = (function (document, window) {

    /**
     * Set the background of the element
     *
     * @decorator Background
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string color The color
     *
     * @class HTMLDecorators.StdDecorators.Background
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Background() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Background, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Background
     * @method render
     * @return void
     */
    Background.prototype.render = function () {
        if(this.paramExist('color')) {
            this.element.style.backgroundColor = this.config.color;
        }
    }

    return Background;

})(document, window);

HTMLDecorators.StdDecorators.Padding = (function (document, window) {

    /**
     * Set the align of the element
     *
     * @decorator Padding
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string value The value
     * @decParam string top The top value
     * @decParam string left The left value
     * @decParam string bottom The bottom value
     * @decParam string right The right value
     *
     * @class HTMLDecorators.StdDecorators.Padding
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Padding() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Padding, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Padding
     * @return void
     * @method render
     */
    Padding.prototype.render = function () {
        if(this.paramExist('value')) {
            this.element.style.padding = this.config.value;
        }
        if(this.paramExist('top')) {
            this.element.style.paddingTop = this.config.top;
        }
        if(this.paramExist('right')) {
            this.element.style.paddingRight = this.config.right;
        }
        if(this.paramExist('bottom')) {
            this.element.style.paddingBottom = this.config.bottom;
        }
        if(this.paramExist('left')) {
            this.element.style.paddingLeft = this.config.left;
        }
    }

    return Padding;

})(document, window);

HTMLDecorators.StdDecorators.Margin = (function (document, window) {

    /**
     * Set the align of the element
     *
     * @decorator Margin
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string value The value
     * @decParam string top The top value
     * @decParam string left The left value
     * @decParam string bottom The bottom value
     * @decParam string right The right value
     *
     * @class HTMLDecorators.StdDecorators.Margin
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Margin() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Margin, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Margin
     * @method render
     * @return void
     */
    Margin.prototype.render = function () {
        if(this.paramExist('value')) {
            this.element.style.margin = this.config.value;
        }
        if(this.paramExist('top')) {
            this.element.style.marginTop = this.config.top;
        }
        if(this.paramExist('right')) {
            this.element.style.marginRight = this.config.right;
        }
        if(this.paramExist('bottom')) {
            this.element.style.marginBottom = this.config.bottom;
        }
        if(this.paramExist('left')) {
            this.element.style.marginLeft = this.config.left;
        }
    }

    return Margin;

})(document, window);

HTMLDecorators.StdDecorators.Cursor = (function (document, window) {

    /**
     * Set the cursor for an element
     *
     * @decorator Cursor
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string value The value e.g. pointer, not-allowed etc.
     *
     * @class HTMLDecorators.StdDecorators.Cursor
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Cursor() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Cursor, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Cursor
     * @method render
     * @return void
     */
    Cursor.prototype.render = function () {
        if(this.paramExist('value')) {
            this.element.style.cursor = this.config.value;
        }
    }

    return Cursor;

})(document, window);

HTMLDecorators.StdDecorators.Pointer = (function (document, window) {

    /**
     * Set the cursor to pointer
     *
     * @decorator Pointer
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string value The cursor value
     *
     * @class HTMLDecorators.StdDecorators.Pointer
     * @extends HTMLDecorators.StdDecorators.Cursor
     * @constructor
     */
    function Pointer() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Pointer, HTMLDecorators.StdDecorators.Cursor);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Pointer
     * @method render
     * @return void
     */
    Pointer.prototype.render = function () {
        this.config.value = 'pointer';
        HTMLDecorators.StdDecorators.Cursor.prototype.render.call(this);
    }

    return Pointer;

})(document, window);HTMLDecorators.StdDecorators.Table = (function (document, window) {

    /**
     * Set the align of the element
     *
     * @decorator Table
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string rowClickHandler The handler when any td was clicked of a tr
     * @decParam array data The data array
     * @decParam string emptyTableSelector The selector of the element if the row is empty starting from this.element
     *
     * @class HTMLDecorators.StdDecorators.Table
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Table() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Table, HTMLDecorators.Decorator);
    /**
     * Searches through the data array for a specific id
     *
     * @memberOf HTMLDecorators.StdDecorators.Table
     * @method findEntryFromId
     * @param id The id to search for
     * @return {null}
     */
    Table.prototype.findEntryFromId = function (id) {
        var data = this.config.data,
            i = 0,
            len = data.length,
            entry,
            result = null;
        for(i; i < len; ++i) {
            entry = data[i];
            if(entry.id == id) {
                result = entry;
                break;
            }
        }
        return result;
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Table
     * @method render
     * @return void
     */
    Table.prototype.render = function () {
        var trs = this.element.querySelectorAll('tr'),
            i = 0,
            tr,
            len = trs.length,
            dataEntry = null,
            tds,
            j,
            td;
        for(i; i < len; ++i) {
            tr = trs[i];
            tr.dataEntry = dataEntry;
            if(tr.dataset.id && this.paramExist('data')) {
                dataEntry = this.findEntryFromId(tr.dataset.id);
                tr.dataEntry = dataEntry;
            }
            if(this.paramExist('eachRowHandler')) {
                this.callFunction(this.config.eachRowHandler, {
                    row : tr,
                    data : tr.dataEntry
                });
            }
            tds = tr.querySelectorAll('td');
            for(j=0; j < tds.length; ++j) {
                td = tds[j];
                if(this.paramExist('rowClickHandler')) {
                    td.onclick = function (e) {
                        this.callFunction(this.config.rowClickHandler, {
                            evt : e,
                            td : e.currentTarget,
                            tr : e.currentTarget.parentNode,
                            dataEntry : e.currentTarget.parentNode.dataEntry
                        });
                    }.bind(this);
                }
            }
        }
        if(this.paramExist('emptyTableSelector')) {
            var feDec = this.element.decorators['ForEach'],
                tableElm = this.element;
                // if its on tbody get the parent table node
                if(this.element.tagName.toLowerCase() == 'tbody') {
                    tableElm = tableElm.parentNode;
                }
                emptyTableElm = tableElm.querySelector(this.config.emptyTableSelector);
            if(feDec) {
                if(feDec.afterManipulationData) {
                    emptyTableElm.style.display = 'none';
                    if(feDec.afterManipulationData.length == 0) {
                        emptyTableElm.style.display = '';
                    }
                } else {
                    this.log('The ForEach decorator has no data.');
                }
            } else {
                this.log('No ForEach decorator found. It must be placed above this decorator.');
            }
        }
        decEventOn('TableEachRowUpdate', function (id) {
            if(this.config.id != id) return;
            var trs = this.element.querySelectorAll('tr'),
                i = 0,
                tr,
                len = trs.length;
            for(i; i < len; ++i) {
                tr = trs[i];
                if(this.paramExist('eachRowHandler')) {
                    this.callFunction(this.config.eachRowHandler, {
                        row : tr,
                        data : tr.dataEntry
                    });
                }
            }
        }.bind(this));
    }

    return Table;

})(document, window);HTMLDecorators.StdDecorators.Visible = (function (document, window) {

    /**
     * Handles visibility
     *
     * @decorator Visible
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string state 'show' or 'hide'
     * @decParam string if When if is 'true' show will be executed else hide
     * @decParam string ifEmpty It compares an array length against 0 based on a @ForEach decorator (id of @ForEach)
     *
     * @example visible
     *
     * @class HTMLDecorators.StdDecorators.Visible
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Visible() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Visible, HTMLDecorators.Decorator);
    /**
     * Shows the element
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method show
     * @return void
     */
    Visible.prototype.show = function () {
        this.element.style.display = '';
    }
    /**
     * Hides the element
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method hide
     * @return void
     */
    Visible.prototype.hide = function () {
        this.element.style.display = 'none';
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method render
     * @return void
     */
    Visible.prototype.render = function () {
        if(this.paramExist('state')) {
            if(this.config.state == 'show') {
                this.show();
            }
            if(this.config.state == 'hide') {
                this.hide();
            }
        }
        if(this.paramExist('if')) {
            if(this.config.if == 'true') {
                this.show();
            } else {
                this.hide();
            }
        }
        if(this.paramExist('ifEmpty')) {
            var feDec;
            if(feDec = this.findById(this.config.ifEmpty)) {
                this.hide();
                if(feDec.afterManipulationData.length == 0) {
                    this.show();
                }
            } else {
                this.log('@ForEach decorator not found with id "' + this.config.ifEmpty + '"');
            }
        }
    }

    return Visible;

})(document, window);

HTMLDecorators.StdDecorators.Hide = (function (document, window) {

    /**
     * Handles hiding
     *
     * @decorator Hide
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Hide
     * @extends HTMLDecorators.StdDecorators.Visible
     * @constructor
     */
    function Hide() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Hide, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Hide
     * @method render
     * @return void
     */
    Hide.prototype.render = function () {
        this.hide();
        HTMLDecorators.StdDecorators.Visible.prototype.render.call(this);
    }

    return Hide;

})(document, window);

HTMLDecorators.StdDecorators.Show = (function (document, window) {

    /**
     * Handles hiding
     *
     * @decorator Show
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Show
     * @extends HTMLDecorators.StdDecorators.Visible
     * @constructor
     */
    function Show() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Show, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Show
     * @method render
     * @return void
     */
    Show.prototype.render = function () {
        this.show();
        HTMLDecorators.StdDecorators.Visible.prototype.render.call(this);
    }

    return Show;

})(document, window);