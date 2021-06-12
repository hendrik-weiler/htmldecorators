#### LoadHTML with selector

With the ```@LoadHTML``` decorator you can parse nodes in the dom containing decorators and variables through css selectors.
````
<script id="parseableDomNode" type="template">
    <h1>${greeting}</h1>
</script>
<script>
window.data = {
    greeting : 'Hello World'
}
</script>
<div data-htmldec data-inject="window.data">
    @LoadHTML(selector=#parseableDomNode,data=${__entry__})
    <div></div>
</div>
````