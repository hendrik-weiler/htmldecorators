var pages = {};

var pageInit = '';

var originalHash = '';

async function loadPage(filename) {
    var test1 = await fetch('pages/' + filename),
        test1html = await test1.text();

    var parser = new HTMLDecorators.Parser();
    return {
        html : parser.parse(test1html),
        decs : parser.DecoratorList
    };
}

async function showPage(filename) {
    for(var key in pages) {
        pages[key].classList.remove('show');
        if(key == filename) {
            pages[key].classList.add('show');
            pages[key].classList.add(filename);
            if(originalHash == '') originalHash = key;
            location.hash = originalHash;
        }
    }
}

async function route() {
    var hash = location.hash.replace('#','');
    hash = hash.replace('.html','');
    originalHash = hash;
    hash = hash.split('/');
    hash = hash.shift();
    if(hash == '') {
        showPage(pageInit);
    }
    if(pages[hash]) {
        showPage(hash);
    }
}