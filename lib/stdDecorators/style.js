HTMLDecorators.StdDecorators.Bold = (function (document, window) {

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

})(document, window);

HTMLDecorators.StdDecorators.Cursor = (function (document, window) {

    /**
     * Set the cursor for an element
     *
     * Params:
     * string id - The id of the decorator
     * string value - The value
     *
     * @constructor
     */
    function Cursor() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Cursor, HTMLDecorators.Decorator);
    /**
     * Renders the decorator
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
     * Set the cursor for an element
     *
     * Params:
     * string id - The id of the decorator
     * string value - The value
     *
     * @constructor
     */
    function Pointer() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Pointer, HTMLDecorators.StdDecorators.Cursor);
    /**
     * Renders the decorator
     */
    Pointer.prototype.render = function () {
        this.config.value = 'pointer';
        HTMLDecorators.StdDecorators.Cursor.prototype.render.call(this);
    }

    return Pointer;

})(document, window);