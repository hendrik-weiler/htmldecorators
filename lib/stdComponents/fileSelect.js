if(typeof StdComponents == 'undefined') var StdComponents = {};

StdComponents.FileSelect = (function (document, window) {

    /**
     * A custom file select component
     *
     * @decorator FileSelect
     * @decNamespace StdComponents
     * @decParam boolean multi If multiple file selection is allowed or not
     *
     * @class StdComponents.FileSelect
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function FileSelect() {
        HTMLDecorators.Decorator.call(this);

        /**
         * Returns if the decorator is a component wrapper
         *
         * @memberOf StdComponents.FileSelect
         * @var compWrapper
         * @type {boolean}
         */
        this.compWrapper = true;
    }
    HTMLDecorators.ExtendsClass(FileSelect, HTMLDecorators.Decorator);
    FileSelect.prototype.initialized = function () {
        this.component = this.createDecorator('Component', HTMLDecorators.StdDecorators.Component,Object.assign({
            fromStack : 'appStack',
            withId : 'fileSelect'
        }, this.config));
    }
    FileSelect.prototype.render = async function () {
        await this.component.render();
    }

    return FileSelect;

})(document, window);