#### Visible with state

````
<div data-htmldec>
    @Visible(state=hide)
    <div>Hidden content</div>
</div>
````

#### Visible with if

````
<div id="test" data-htmldec-render>
    <!-- this will result in 'true' so its visible -->
    @Visible(if=${list.length == 0})
    <div>Hidden content</div>
</div>
<script>
window.onload = function() {
    decEvalTag(document.querySelector('test',{
        list : []
    });
}
</script>
````