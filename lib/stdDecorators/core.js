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

})(document, window);