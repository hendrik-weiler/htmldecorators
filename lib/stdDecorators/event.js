HTMLDecorators.StdDecorators.Event = (function (document, window) {

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

        var component,
            globalCall = false,
            handler = this.config.handler;
        if(/^\$global\./.test(handler)) {
            globalCall = true;
            handler = handler.replace(/\$global\./,'');
        }
        if((component = this.getComponent()) && !globalCall) {
            var args = 'component, e, decorator',
                body = 'return component.' + handler + '(e, decorator)';
            new Function(args, body)(component, e, this);
        } else {
            var args = 'e, decorator',
                body = 'return ' + handler + '(e, decorator)';
            new Function(args, body)(e, this);
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

})(document, window);