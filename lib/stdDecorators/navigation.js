HTMLDecorators.StdDecorators.Navigation = (function (document, window) {

    /**
     * Handles navigation
     *
     * Params:
     * string id - The id of the decorator
     * string activeClass - The active classname for the links
     * string hashHandler - The handler function for hash detection
     *
     * @constructor
     */
    function Navigation() {
        HTMLDecorators.Decorator.call(this, {
            activeClass : 'active'
        });

        this.contents = [];
    }
    HTMLDecorators.ExtendsClass(Navigation, HTMLDecorators.Decorator);
    /**
     * Sets a link active
     *
     * @param id The link id
     */
    Navigation.prototype.setActive = function (id) {
        var links = this.element.querySelectorAll('a'),
            i = 0,
            len = links.length,
            link,
            j,
            content;
        for(i; i < len; ++i) {
            link = links[i];
            link.classList.remove(this.config.activeClass);
            if(link.dataset.id == id) {
                link.classList.add(this.config.activeClass);
            }
        }
        for(j=0; j < this.contents.length; ++j) {
            content = this.contents[j];
            content.visibility.hide();
            if(content.config.id == id) {
                content.visibility.show();
            }
        }
    }
    /**
     * Renders the decorator
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
                } else {
                    this.log('Decorator with ID "' + dataset.id + '" does not exist');
                }
            }.bind(this);
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
     * Params:
     * string nav - The id of the @Navigation decorator
     * string id - The id to the @Navigations a[data-id] attribute
     * bool visible - If the content should be displayed or not
     *
     * @constructor
     */
    function Content() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Content, HTMLDecorators.Decorator);
    /**
     * Initializes the decorator
     */
    Content.prototype.initialized = function () {
        this.visibility = this.createDecorator('Visible', HTMLDecorators.StdDecorators.Visible);
    }
    /**
     * Renders the decorator
     */
    Content.prototype.render = function () {
        this.visibility.hide();

        var dec;
        if(dec = this.findById(this.config.nav)) {
            if(dec.name == 'Navigation') {
                dec.contents.push(this);
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