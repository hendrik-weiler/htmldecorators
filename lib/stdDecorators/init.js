HTMLDecorators.StdDecorators.Init = (function (document, window) {

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

})(document, window);