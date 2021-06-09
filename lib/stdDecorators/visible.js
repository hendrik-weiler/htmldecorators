HTMLDecorators.StdDecorators.Visible = (function (document, window) {

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
        if(this.paramExist('if')) {
            console.log(this.config.if)
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
        HTMLDecorators.StdDecorators.Visible.prototype.render.call(this);
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
        HTMLDecorators.StdDecorators.Visible.prototype.render.call(this);
    }

    return Show;

})(document, window);