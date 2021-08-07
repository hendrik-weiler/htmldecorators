HTMLDecorators.StdDecorators.Navigation = (function (document, window) {

    /**
     * Handles navigation
     *
     * @decorator Navigation
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string activeClass The active classname for the links
     * @decParam string hashHandler The handler function for hash detection
     * @decParam string default The id of a @Content decorator to set active as default
     * @decParam boolean routes If routes are used or not
     *
     * @example navigation-content
     * @example navigation-hashhandler
     *
     * @class HTMLDecorators.StdDecorators.Navigation
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Navigation() {
        HTMLDecorators.Decorator.call(this, {
            activeClass : 'active'
        });

        /**
         * Returns a map of registered HTMLDecorators.StdDecorators.Content instances
         *
         * @var contentsMap
         * @memberOf HTMLDecorators.StdDecorators.Navigation
         * @type array
         */
        this.contentsMap = {};
    }
    HTMLDecorators.ExtendsClass(Navigation, HTMLDecorators.Decorator);
    /**
     * Sets a link active
     *
     * @param id The link id
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method setActive
     * @return void
     */
    Navigation.prototype.setActive = function (id) {
        var links = this.element.querySelectorAll('a'),
            i = 0,
            len = links.length,
            link,
            content;

        for(i; i < len; ++i) {
            link = links[i];
            link.classList.remove(this.config.activeClass);
            if(link.dataset.id == id) {
                link.classList.add(this.config.activeClass);
            }
        }

        for(var contentId in this.contentsMap) {
            content = this.contentsMap[contentId];
            content.visibility.hide();
            if(contentId == id) {
                content.visibility.show();
            }
        }
    }
    /**
     * Routes to the default content
     *
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method toDefault
     * @return void
     */
    Navigation.prototype.toDefault = function () {
        var dec;
        // timeout to wait till the decators have been rendered
        setTimeout(function() {
            if(dec = this.findById(this.config.default)) {
                this.setActive(this.config.default);
            } else {
                this.log('Cant find @Content with id "' + this.config.default + '"');
            }
        }.bind(this),0);
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Navigation
     * @method render
     * @return void
     */
    Navigation.prototype.render = function () {
        var links = this.element.querySelectorAll('a'),
            i = 0,
            len = links.length,
            link;

        for(i; i < len; ++i) {
            link = links[i];
            link.onclick = function (e) {
                var dataset = e.currentTarget.dataset,
                    dec,
                    href = e.currentTarget.getAttribute('href');
                if(typeof dataset.external != 'undefined') {
                    return true;
                }
                if(href[0] != '#') {
                    e.preventDefault();
                }
                if(dec = this.findById(dataset.id)) {
                    this.setActive(dataset.id);
                    location.hash = dataset.id;
                } else {
                    this.log('Decorator with ID "' + dataset.id + '" does not exist');
                }
            }.bind(this);
        }

        if(this.paramExist('default')) {
            this.toDefault();
        }
        if(this.paramExist('hashChangeHandler')) {
            window.addEventListener('hashchange', function (e) {
                this.callFunction(this.config.hashChangeHandler);
            }.bind(this),false);
            this.callFunction(this.config.hashChangeHandler);
        }
    }

    return Navigation;

})(document, window);

HTMLDecorators.StdDecorators.Content = (function (document, window) {

    /**
     * Handles content of a navigation
     *
     * @decorator Content
     * @decNamespace std
     * @decParam string nav The id of the @Navigation decorator
     * @decParam string id The id to the @Navigations a[data-id] attribute
     *
     * @example navigation-content
     *
     * @class HTMLDecorators.StdDecorators.Content
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Content() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Content, HTMLDecorators.Decorator);
    /**
     * Initializes the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Content
     * @method initialized
     * @return void
     */
    Content.prototype.initialized = function () {
        this.visibility = this.createDecorator('Visible', HTMLDecorators.StdDecorators.Visible);
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Content
     * @method render
     * @return void
     */
    Content.prototype.render = function () {
        this.visibility.hide();

        // update references for when put with a @Component decorator
        this.visibility.element = this.element;
        this.visibility.id = this.id;

        var dec;
        if(dec = this.findById(this.config.nav)) {
            if(dec.name == 'Navigation') {
                dec.contentsMap[this.config.id] = this;
            } else {
                this.log('Decorator must be from type "Navigation"');
            }
        } else {
            this.log('Could not find decorator with id "' + this.config.nav + '"');
        }
        if(this.paramExist('visible') && this.config.visible=='true') {
            this.visibility.show();
        }
    }

    return Content;

})(document, window);