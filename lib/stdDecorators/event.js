HTMLDecorators.StdDecorators.Event = (function (document, window) {

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

})(document, window);