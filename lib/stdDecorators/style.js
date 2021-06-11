HTMLDecorators.StdDecorators.Bold = (function (document, window) {

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

})(document, window);