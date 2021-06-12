HTMLDecorators.StdDecorators.Visible = (function (document, window) {

    /**
     * Handles visibility
     *
     * @decorator Visible
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string state 'show' or 'hide'
     * @decParam string if When if is 'true' show will be executed else hide
     * @decParam string ifEmpty It compares an array length against 0 based on a @ForEach decorator (id of @ForEach)
     *
     * @example visible
     *
     * @class HTMLDecorators.StdDecorators.Visible
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Visible() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Visible, HTMLDecorators.Decorator);
    /**
     * Shows the element
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method show
     * @return void
     */
    Visible.prototype.show = function () {
        this.element.style.display = '';
    }
    /**
     * Hides the element
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method hide
     * @return void
     */
    Visible.prototype.hide = function () {
        this.element.style.display = 'none';
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Visible
     * @method render
     * @return void
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
            if(this.config.if == 'true') {
                this.show();
            } else {
                this.hide();
            }
        }
        if(this.paramExist('ifEmpty')) {
            var feDec;
            if(feDec = this.findById(this.config.ifEmpty)) {
                this.hide();
                if(feDec.afterManipulationData.length == 0) {
                    this.show();
                }
            } else {
                this.log('@ForEach decorator not found with id "' + this.config.ifEmpty + '"');
            }
        }
    }

    return Visible;

})(document, window);

HTMLDecorators.StdDecorators.Hide = (function (document, window) {

    /**
     * Handles hiding
     *
     * @decorator Hide
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Hide
     * @extends HTMLDecorators.StdDecorators.Visible
     * @constructor
     */
    function Hide() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Hide, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Hide
     * @method render
     * @return void
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
     * @decorator Show
     * @decNamespace std
     * @decParam string id The id of the decorator
     *
     * @class HTMLDecorators.StdDecorators.Show
     * @extends HTMLDecorators.StdDecorators.Visible
     * @constructor
     */
    function Show() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Show, HTMLDecorators.StdDecorators.Visible);
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Show
     * @method render
     * @return void
     */
    Show.prototype.render = function () {
        this.show();
        HTMLDecorators.StdDecorators.Visible.prototype.render.call(this);
    }

    return Show;

})(document, window);