/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.7

Build: 2021-08-07 06:10:55
*/
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

})(document, window);if(typeof StdComponents == 'undefined') var StdComponents = {};

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