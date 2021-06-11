#### ForEach with data

You use the ```@ForEach``` decorator to start a loop.
````
<ul id="arrayTest" data-htmldec-render>
    <span>${__array__}</span>
    @ForEach(data=${__array__})
    <ul>
        <li>$${__entry__} = $${__index__}</li>
    </ul>
</ul>
````
Afterwards you can select the ForEach Decorator and
fill it with data.
```
<script>
    window.onload = function () {
        // evaluate the tag manually with custom data        
        HTMLDecorators.EvaluateTag(document.querySelector('#arrayTest'),[
           'Item 1', 'Item 2', 'Item 3'
        ]);
    }
</script>
```