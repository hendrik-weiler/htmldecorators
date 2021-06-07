var loginDec = {};

loginDec.TableSummary = (function (document,window) {

    function TableSummary() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(TableSummary, HTMLDecorators.Decorator);
    TableSummary.prototype.render = function () {
        var node = this.element;
        while (node.tagName.toLowerCase() != 'table') {
            node = node.parentNode;
        }
        if(this.paramExist('col')) {
            var summary = 0,
                trs = document.querySelectorAll('tr'),
                i = 0,
                tr,
                tds,
                index = parseInt(this.config.col)-1;
            for(i; i < trs.length; ++i) {
                tr = trs[i];
                tds = tr.querySelectorAll('td');
                if(tds.length > index) {
                    if(tds[index].innerText != '') {
                        summary += parseFloat(tds[index].innerText);
                    }
                }
            }
            this.element.innerText = summary;
        } else {
            this.log('Parameter "col" needs to be defined');
        }
    }

    return TableSummary;

})(document, window);