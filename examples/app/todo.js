var todoDec = {};

todoDec.Button = (function (document,window) {

    function Button() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Button, HTMLDecorators.Decorator);
    Button.prototype.render = function () {
        this.element.classList.add('button');
    }

    return Button;

})(document, window);

todoDec.Input = (function (document,window) {

    function Input() {
        HTMLDecorators.Decorator.call(this);
    }
    HTMLDecorators.ExtendsClass(Input, HTMLDecorators.Decorator);
    Input.prototype.render = function () {
        this.element.classList.add('input');
    }

    return Input;

})(document, window);

todoDec.ListAll = (function (document,window) {

    function ListAll() {
        HTMLDecorators.Decorator.call(this);

        this.entries = [];
    }
    HTMLDecorators.ExtendsClass(ListAll, HTMLDecorators.Decorator);
    ListAll.prototype.addEntry = function (text) {
        var entries = localStorage.getItem('entries');
        if(entries!=null) {
            this.entries = JSON.parse(entries);
        }
        this.entries.push(text);
        localStorage.entries = JSON.stringify(this.entries);
        this.update();
    }
    ListAll.prototype.removeEntry = function (index) {
        var entries = localStorage.getItem('entries'),
            newEntries = [],
            i = 0,
            entry;
        if(entries!=null) {
            this.entries = JSON.parse(entries);
        }
        for(i; i < this.entries.length; ++i) {
            entry = this.entries[i];
            if(i != index) {
                newEntries.push(entry);
            }
        }
        localStorage.entries = JSON.stringify(newEntries);
        this.update();
    }
    ListAll.prototype.removeAll = function () {
        localStorage.entries = '[]';
        this.update();
    }
    ListAll.prototype.update = function () {
        this.element.innerHTML = '';
        var entries = localStorage.getItem('entries'),
            i = 0,
            entry;
        if(entries!=null) {
            this.entries = JSON.parse(entries);
        }
        if(this.entries.length == 0) {
            var tr = document.createElement('tr'),
                td = document.createElement('td');
            td.setAttribute('colspan',2);
            td.innerText = this.config.noRowsText;
            tr.appendChild(td);
            tr.className = 'no-entries';
            this.element.appendChild(tr);
        } else {
            for(i; i < this.entries.length; ++i) {
                entry = this.entries[i];
                var tr = document.createElement('tr'),
                    td1 = document.createElement('td'),
                    td2 = document.createElement('td'),
                    a = document.createElement('a');
                a.innerText = 'Delete';
                a.dataset.index = i;
                a.href = '#';
                a.onclick = function (e) {
                    e.preventDefault();
                    this.removeEntry(e.currentTarget.dataset.index);
                }.bind(this);
                td1.innerText = entry;
                td2.appendChild(a);
                tr.appendChild(td1);
                tr.appendChild(td2);
                this.element.appendChild(tr);
            }
        }
    }
    ListAll.prototype.render = function () {
        this.update();
    }

    return ListAll;

})(document, window);
