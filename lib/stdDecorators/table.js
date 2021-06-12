HTMLDecorators.StdDecorators.Table = (function (document, window) {

    /**
     * Set the align of the element
     *
     * @decorator Table
     * @decNamespace std
     * @decParam string id The id of the decorator
     * @decParam string rowClickHandler The handler when any td was clicked of a tr
     * @decParam array data The data array
     * @decParam string emptyTableSelector The selector of the element if the row is empty starting from this.element
     *
     * @class HTMLDecorators.StdDecorators.Table
     * @extends HTMLDecorators.Decorator
     * @constructor
     */
    function Table() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Table, HTMLDecorators.Decorator);
    /**
     * Searches through the data array for a specific id
     *
     * @memberOf HTMLDecorators.StdDecorators.Table
     * @method findEntryFromId
     * @param id The id to search for
     * @return {null}
     */
    Table.prototype.findEntryFromId = function (id) {
        var data = this.config.data,
            i = 0,
            len = data.length,
            entry,
            result = null;
        for(i; i < len; ++i) {
            entry = data[i];
            if(entry.id == id) {
                result = entry;
                break;
            }
        }
        return result;
    }
    /**
     * Renders the decorator
     *
     * @memberOf HTMLDecorators.StdDecorators.Table
     * @method render
     * @return void
     */
    Table.prototype.render = function () {
        var trs = this.element.querySelectorAll('tr'),
            i = 0,
            tr,
            len = trs.length,
            dataEntry = null,
            tds,
            j,
            td;
        for(i; i < len; ++i) {
            tr = trs[i];
            tr.dataEntry = dataEntry;
            if(tr.dataset.id && this.paramExist('data')) {
                dataEntry = this.findEntryFromId(tr.dataset.id);
                tr.dataEntry = dataEntry;
            }
            if(this.paramExist('eachRowHandler')) {
                this.callFunction(this.config.eachRowHandler, {
                    row : tr,
                    data : tr.dataEntry
                });
            }
            tds = tr.querySelectorAll('td');
            for(j=0; j < tds.length; ++j) {
                td = tds[j];
                if(this.paramExist('rowClickHandler')) {
                    td.onclick = function (e) {
                        this.callFunction(this.config.rowClickHandler, {
                            evt : e,
                            td : e.currentTarget,
                            tr : e.currentTarget.parentNode,
                            dataEntry : e.currentTarget.parentNode.dataEntry
                        });
                    }.bind(this);
                }
            }
        }
        if(this.paramExist('emptyTableSelector')) {
            var feDec = this.element.decorators['ForEach'],
                tableElm = this.element;
                // if its on tbody get the parent table node
                if(this.element.tagName.toLowerCase() == 'tbody') {
                    tableElm = tableElm.parentNode;
                }
                emptyTableElm = tableElm.querySelector(this.config.emptyTableSelector);
            if(feDec) {
                if(feDec.afterManipulationData) {
                    emptyTableElm.style.display = 'none';
                    if(feDec.afterManipulationData.length == 0) {
                        emptyTableElm.style.display = '';
                    }
                } else {
                    this.log('The ForEach decorator has no data.');
                }
            } else {
                this.log('No ForEach decorator found. It must be placed above this decorator.');
            }
        }
        decEventOn('TableEachRowUpdate', function (id) {
            if(this.config.id != id) return;
            var trs = this.element.querySelectorAll('tr'),
                i = 0,
                tr,
                len = trs.length;
            for(i; i < len; ++i) {
                tr = trs[i];
                if(this.paramExist('eachRowHandler')) {
                    this.callFunction(this.config.eachRowHandler, {
                        row : tr,
                        data : tr.dataEntry
                    });
                }
            }
        }.bind(this));
    }

    return Table;

})(document, window);