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

decHandler(function toStore() {
    var nav = decById('nav');
    nav.setActive('store');
});

decEventOn('goToCart', function() {
    var nav = decById('nav');
    nav.setActive('card');
});

decEventOn('goToArticleView', function () {
    var nav = decById('nav');
    nav.setActive('articleview');
});