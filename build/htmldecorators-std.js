/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.1

Build: 2021-06-08 16:56:36
*/
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

})(document, window);HTMLDecorators.StdDecorators.Event = (function (document, window) {

    /**
     * Handles events
     *
     * Params:
     * string id - The id of the decorator
     * string type - The event type e.g. 'click','submit' ...
     * string handler - The handler function name
     *
     * @constructor
     */
    function Event() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Event, HTMLDecorators.Decorator);
    /**
     * Handles the event
     *
     * @param e A event
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function Click() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Click, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function Submit() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Submit, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function Change() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Change, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function KeyUp() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyUp, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function KeyDown() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyDown, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string handler - The handler function name
     *
     * @constructor
     */
    function KeyPress() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(KeyPress, HTMLDecorators.StdDecorators.Event);
    /**
     * Renders the decorator
     */
    KeyPress.prototype.render = function () {
        this.element.addEventListener('keypress', this.eventHandler.bind(this));
    }

    return KeyPress;

})(document, window);HTMLDecorators.StdDecorators.Init = (function (document, window) {

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
            id : 'stdInit'
        });

        this.includeDecs = [];
    }
    HTMLDecorators.ExtendsClass(Init, HTMLDecorators.Decorator);
    /**
     * Applies decorators set through configuration
     *
     * @param e The event
     * @param data The data
     */
    Init.prototype.internalApplyDecoration = function (e, data) {
        this.log('Apply internal');
        var i = 0,
            len = this.includeDecs.length,
            decsName;
        // apply std decorators
        HTMLDecorators.ApplyDecorators(data.decs);
        for (i; i < len; ++i) {
            decsName = this.includeDecs[i];
            if(window[decsName]) {
                HTMLDecorators.ApplyDecorators(data.decs, window[decsName], decsName);
            } else {
                this.log('"' + decsName + '" is not a valid namespace to include.');
            }
        }
    }
    /**
     * Renders the decorator
     */
    Init.prototype.render = async function () {
        if(this.config.applyDecorationsHandler == '') {
            this.includeDecs = [];
            var i = 0,
                len = 100,
                index;
            for (i; i < len; ++i) {
                index = 'includeDec'+ i;
                if(this.config[index]) {
                    this.includeDecs.push(this.config[index]);
                }
            }
        }
    }

    return Init;

})(document, window);HTMLDecorators.StdDecorators.Navigation = (function (document, window) {

    /**
     * Handles navigation
     *
     * Params:
     * string id - The id of the decorator
     * string activeClass - The active classname for the links
     * string hashHandler - The handler function for hash detection
     *
     * @constructor
     */
    function Navigation() {
        HTMLDecorators.Decorator.call(this, {
            activeClass : 'active'
        });

        this.contents = [];
    }
    HTMLDecorators.ExtendsClass(Navigation, HTMLDecorators.Decorator);
    /**
     * Sets a link active
     *
     * @param id The link id
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
    }

    return Navigation;

})(document, window);

HTMLDecorators.StdDecorators.Content = (function (document, window) {

    /**
     * Handles content of a navigation
     *
     * Params:
     * string nav - The id of the @Navigation decorator
     * string id - The id to the @Navigations a[data-id] attribute
     * bool visible - If the content should be displayed or not
     *
     * @constructor
     */
    function Content() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Content, HTMLDecorators.Decorator);
    /**
     * Initializes the decorator
     */
    Content.prototype.initialized = function () {
        this.visibility = this.createDecorator('Visible', HTMLDecorators.StdDecorators.Visible);
    }
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     *
     * @constructor
     */
    function Bold() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Bold, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     *
     * @constructor
     */
    function Italic() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Italic, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     *
     * @constructor
     */
    function Underline() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Underline, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string value - The hexadecimal or any other value
     *
     * @constructor
     */
    function Color() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Color, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Set the align of the element
     *
     * Params:
     * string id - The id of the decorator
     * string pos - The position left,center,right
     *
     * @constructor
     */
    function TAlign() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(TAlign, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string width - The width
     * string height - The height
     *
     * @constructor
     */
    function Size() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Size, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string color - The color
     *
     * @constructor
     */
    function Background() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Background, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string value - The value
     * string top - The top value
     * string left - The left value
     * string bottom - The bottom value
     * string right - The right value
     *
     * @constructor
     */
    function Padding() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Padding, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Params:
     * string id - The id of the decorator
     * string value - The value
     * string top - The top value
     * string left - The left value
     * string bottom - The bottom value
     * string right - The right value
     *
     * @constructor
     */
    function Margin() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Margin, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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

})(document, window);HTMLDecorators.StdDecorators.Visible = (function (document, window) {

    /**
     * Handles visibility
     *
     * Params:
     * string id - The id of the decorator
     * string state - 'show' or 'hide'
     *
     * @constructor
     */
    function Visible() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Visible, HTMLDecorators.Decorator);
    /**
     * Shows the element
     */
    Visible.prototype.show = function () {
        this.element.style.display = '';
    }
    /**
     * Hides the element
     */
    Visible.prototype.hide = function () {
        this.element.style.display = 'none';
    }
    /**
     * Renders the decorator
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
    }

    return Visible;

})(document, window);

HTMLDecorators.StdDecorators.Hide = (function (document, window) {

    /**
     * Handles hiding
     *
     * Params:
     * string id - The id of the decorator
     *
     * @constructor
     */
    function Hide() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Hide, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     */
    Hide.prototype.render = function () {
        this.hide();
    }

    return Hide;

})(document, window);

HTMLDecorators.StdDecorators.Show = (function (document, window) {

    /**
     * Handles hiding
     *
     * Params:
     * string id - The id of the decorator
     *
     * @constructor
     */
    function Show() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Show, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     */
    Show.prototype.render = function () {
        this.show();
    }

    return Show;

})(document, window);