HTMLDecorators.StdDecorators.Init = (function (document, window) {

    /**
     * Sets a handler
     *
     * Note: The function must have a name
     * Note: Alias to HTMLDecorators.Handler
     *
     * @param func The handler function
     * @param uid (optional) A unique identifier for the handler
     */
    window.decHandler = function (func, uid) {
        HTMLDecorators.Handler(func, uid);
    }

    /**
     * Evaluates all tags with the "data-htmldec" attribute
     *
     * @param data (optional) A key,value object
     * @param cb (optional) The decorator applier handler
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
     */
    window.decEvalTag = function (tag, data, cb) {
        HTMLDecorators.EvaluateTag(tag, data, cb);
    }

    /**
     * Handles initialization
     *
     * Params:
     * string applyDecorationsHandler - The callback for applying decorators
     * string includeDec0-XX - A list of to namespaces to apply
     *
     * Note:
     * includeDec0=namespaceDec
     * Will try to use window.namespaceDec as object
     *
     * @constructor
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
     * Signature of cb
     * void cb(e, result:{html:string,decs:array<HTMLDecorators.DecoratorDef>})
     *
     * Params:
     * string path - The path to load
     * string id - The id to the @Navigations a[data-id] attribute
     * string applyHandler - The decoration applier function
     *
     * @constructor
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
     * @param html
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
     * @constructor
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
     */
    Script.prototype.render = async function () {
        new Function('window,document',this.element.innerHTML).apply(window,[window,document]);
    }

    return Script;

})(document, window);

HTMLDecorators.StdDecorators.Ref = (function (document, window) {

    /**
     * Gets a decorator
     *
     * @param id The id of the reference
     * @return {null|HTMLDecorators.Decorator}
     */
    window.decById = function (id) {
        return HTMLDecorators.FindById(id);
    }

    /**
     * Gets the element of the decorator
     *
     * @param id The id of the reference
     * @return {null|HTMLElement}
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
     * Params:
     * string id - The id
     *
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
     * Sets a reference
     *
     * Params:
     * string id - The id
     * string applyHandler - The decoration applier function
     * array data - A list of array<object>
     *
     * @constructor
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
     * Params:
     * string id - The id
     * string applyHandler - The decoration applier function
     * array data - A list of array<object>
     *
     * @constructor
     */
    function NumberFormat() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns the decimal seperator
         *
         * @type {string}
         */
        this.decimalSeperator = '.';

        /**
         * Returns the decimal numbers size
         *
         * @type {number}
         */
        this.decimalFixed = 10;
    }
    HTMLDecorators.ExtendsClass(NumberFormat, HTMLDecorators.Decorator);
    /**
     * Formats the number
     *
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