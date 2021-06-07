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
     * string cb - The callback when the load finished
     *
     * @constructor
     */
    function LoadHTML() {
        HTMLDecorators.Decorator.call(this,{
            putInElement : 'true',
            cb : ''
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
            if(this.config.cb != '') {
                this.callFunction(this.config.cb, obj);
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