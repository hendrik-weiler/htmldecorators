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
     * Renders the decorator
     */
    LoadHTML.prototype.render = async function () {
        if(this.paramExist('path')) {
            var load = await fetch(this.config.path),
                loadHTML = await load.text();

            var parser = new HTMLDecorators.Parser(),
                parsedHTML = parser.parse(loadHTML),
                obj = {
                    html : parsedHTML,
                    decs : parser.DecoratorList
                };
            if(this.config.putInElement == 'true') {
                this.element.innerHTML = parsedHTML;
            }
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
        } else {
            this.log('"Path" needs to be defined.');
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
        var parser = new HTMLDecorators.Parser(),
            parsedHTML = parser.parse(this.template, Object.assign({
                index : index
            },data)),
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
    }

    return ForEach;

})(document, window);