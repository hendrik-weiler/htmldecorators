You set a event and a handler for the element
````
<div data-htmldec>
    @Event(
        handler=clickHandler,
        type=click
    )
    <div>Click me</div>
</div>
<script>
// notice that a name for the function was given
decHandler(function clickHandler() {
    console.log('I was clicked');
});
</script>
````