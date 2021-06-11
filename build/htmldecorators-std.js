/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.2

Build: 2021-06-11 16:14:18
*/
HTMLDecorators.StdDecorators.Init = (function (document, window) {

    /**
     * Sets a handler
     *
     * Note: The function must have a name
     * Note: Alias to HTMLDecorators.Handler
     *
     * @function decHandler
     * @param func The handler function
     * @param uid (optional) A unique identifier for the handler
     * @return void
     */
    window.decHandler = function (func, uid) {
        HTMLDecorators.Handler(func, uid);
    }

    /**
     * Evaluates all tags with the "data-htmldec" attribute
     *
     * @param data (optional) A key,value object
     * @param cb (optional) The decorator applier handler
     * @function decHTMLEval
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
            decimalFixed : 10
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
     * Handles content of a navigation
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
     *
     * @constructor
     * @class HTMLDecorators.StdDecorators.LoadHTML
     * @extends HTMLDecorators.Decorator
     */
    function LoadHTML() {
        HTMLDecorators.Decorator.call(this,{
            putInElement : 'true',
            applyHandler : ''
        });
    }
    HTMLDecorators.ExtendsClass(LoadHTML, HTMLDecorators.Decorator);
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
        data.__uid__ = HTMLDecorators.RegisterUniqueId();
        if(this.paramExist('data')) {
            if(typeof this.config.data == 'object' && typeof this.config.data.length != 'undefined') {
                data.__array__ = this.config.data;
            } else {
                data = Object.assign(data,this.config.data);
            }
        }
        var parser = new HTMLDecorators.Parser(),
            parsedHTML = parser.parse(html, data),
            obj = {
                html : parsedHTML,
                decs : parser.DecoratorList
            };

        if(this.config.putInElement == 'true') {
            this.element.innerHTML = parsedHTML;
        }

        //console.log(html,parsedHTML)

        // use internal cb property
        if(this.config.applyHandler != '') {
            this.callFunction(this.config.applyHandler, obj);
        } else {
            var dec;
            // if init was defined
            if(dec = this.findById('stdInit')) {
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
     * @memberOf HTMLDecorators.StdDecorators.LoadHTML
     * @method render
     * @return void
     */
    LoadHTML.prototype.render = async function () {
        if(this.paramExist('path')) {
            var load = await fetch(this.config.path),
                loadHTML = await load.text();

            this.applyDecs(loadHTML);
        }
        if(this.paramExist('selector')) {
            var selectedElm = document.querySelector(this.config.selector);
            if(selectedElm) {
                this.applyDecs(selectedElm.innerHTML);
            } else {
                this.log('Could not select element with "' + this.config.selector + '"');
            }
        }
    }

    return LoadHTML;

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
        new Function('window,document',this.element.innerHTML).apply(window,[window,document]);
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
     *
     * @example foreach-id
     * @example foreach-data
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
         * @type {string}
         */
        this.template = '';

        this.iterationHTMLSum = '';

        this.decoratorsSum = [];
    }
    HTMLDecorators.ExtendsClass(ForEach, HTMLDecorators.Decorator);
    /**
     * A single iteration
     *
     * @param data A key,value object
     * @memberOf HTMLDecorators.StdDecorators.ForEach
     * @method iteration
     * @return void
     */
    ForEach.prototype.iteration = function (index, data) {
        if(typeof data == 'object') {
            var obj = Object.assign({
                    __index__ : index
                },data);
            obj.__entry__ = obj;
        } else {
            var obj = {
                __index__ : index,
                __entry__ : data
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
            this.iteration(i,data);
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
            if(dec = this.findById('stdInit')) {
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
            this.update(this.config.data);
        }
    }

    return ForEach;

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
        var dec = this.findById('stdInit');
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

})(document, window);HTMLDecorators.StdDecorators.Event = (function (document, window) {

    /**
     * Handles events
     *
     * @decorator Event
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string type The event type e.g. 'click','submit' ...
     * @decParam string handler The handler function name
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
        var args = 'e, decorator',
            body = 'return ' + this.config.handler + '(e, decorator)';
        new Function(args, body)(e, this);
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
         * Returns a list of registered HTMLDecorators.StdDecorators.Content instances
         *
         * @var contents
         * @memberOf HTMLDecorators.StdDecorators.Navigation
         * @type array
         */
        this.contents = [];
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
            j,
            content;
        for(i; i < len; ++i) {
            link = links[i];
            link.classList.remove(this.config.activeClass);
            if(link.dataset.id == id) {
                link.classList.add(this.config.activeClass);
            }
        }
        for(j=0; j < this.contents.length; ++j) {
            content = this.contents[j];
            content.visibility.hide();
            if(content.config.id == id) {
                content.visibility.show();
            }
        }
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
                } else {
                    this.log('Decorator with ID "' + dataset.id + '" does not exist');
                }
            }.bind(this);
        }

        if(this.paramExist('hashChangeHandler')) {
            window.addEventListener('hashchange', function (e) {
                this.callFunction(this.config.hashChangeHandler);
            }.bind(this),false);
            this.callFunction(this.config.hashChangeHandler);
        }
        if(this.paramExist('default')) {
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

        var dec;
        if(dec = this.findById(this.config.nav)) {
            if(dec.name == 'Navigation') {
                dec.contents.push(this);
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

})(document, window);HTMLDecorators.StdDecorators.Visible = (function (document, window) {

    /**
     * Handles visibility
     *
     * @decorator Visible
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string state 'show' or 'hide'
     * @decParam string if When if is 'true' show will be executed else hide
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