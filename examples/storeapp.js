window.app = {
    cart : [],
    items : null,
    searchTerm : ''
};

decHandler(function dataLoaded(dec,data) {
    window.app.items = data;
});

decHandler(async function pageLoaderState(dec,state) {
    console.log(state)
    if(state == 'finished') {
        document.body.classList.add('body');
        decEvalTag(document.querySelector('body .body'));
    }
    if(state == 'loading') {
        // in loading state
    }
});

decHandler(function search(e,dec) {
    var nav = decById('nav'),
        artFE = decById('articles');
    nav.setActive('store');
    app.searchTerm = e.currentTarget.value;
    artFE.render();
});

decHandler(function articleFilter(article) {
    return new RegExp(app.searchTerm,'i').test(article.product);
});

decHandler(function toStore() {
    var nav = decById('nav');
    nav.setActive('store');
    location.hash = 'store';
});

decEventOn('goToCart', function(inBuyProcess) {
    var nav = decById('nav');
    nav.setActive('cart');
    decBroadcastEvent('cartRefresh');
    location.hash = 'cart';
});

decEventOn('goToArticleView', function () {
    var nav = decById('nav');
    nav.setActive('articleview');
});

decHandler(function globalThis() {
   console.log('test');
});

decHandler(function navHashChange(nav) {
    var hash = location.hash.replace('#',''),
        res;
    hash = hash.split('/');
    res = hash.shift();
    if(res == 'cart') {
        decBroadcastEvent('goToCart');
    } else if(res == 'articleview') {
        var item = null,
            i = 0,
            id = hash.shift();
        for(i; i < window.app.items.length; ++i) {
            item = window.app.items[i];
            if(item.id == id) {
                break;
            }
        }
        decBroadcastEvent('articleViewUpdate',item);
        decBroadcastEvent('goToArticleView');
    } else if(res == '') {
        nav.setActive('store');
    } else {
        nav.setActive(res);
    }
});