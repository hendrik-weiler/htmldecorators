if(typeof StdComponents == 'undefined') var StdComponents = {};

StdComponents.Select = (function (document, window) {

    /**
     * A custom selectbox
     *
     * Note: You can use the slot for static entries
     * <code>
     * (at)StdComponents.Select
     * &lt;select&gt;
     *     &lt;option value="1"&gt;Value 1&lt;/option&gt;
     * &lt;/select&gt;
     * </code>
     *
     * @decorator Select
     * @decNamespace StdComponents
     * @decParam object data A object for the option entries
     *
     * @class StdComponents.Select
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Select() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns if the decorator is a component wrapper
         *
         * @memberOf StdComponents.Select
         * @var compWrapper
         * @type {boolean}
         */
        this.compWrapper = true;
    }
    HTMLDecorators.ExtendsClass(Select, HTMLDecorators.Decorator);
    Select.prototype.initialized = function () {
        this.component = this.createDecorator('Component', HTMLDecorators.StdDecorators.Component,Object.assign({
            fromStack : 'appStack',
            withId : 'select'
        }, this.config));
    }
    Select.prototype.render = async function () {
        await this.component.render();
    }

    return Select;

})(document, window);