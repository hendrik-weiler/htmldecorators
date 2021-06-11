#### ForEach with id

You use the ```@ForEach``` decorator to start a loop.
````
<div data-htmldec>
    @ForEach(id=menu)
    <ul>
        <li>
            @@Bold @@Underline @@Italic
            <a href="$${link}">$${label} $${index}</a>
        </li>
    </ul>
</div>
````
Afterwards you can select the ForEach Decorator and
fill it with data.
```
<script>
    window.onload = function () {
        // decById is an alias to HTMLDecorators.FindById
        var menu = decById('menu');
        menu.update([
            {link:'Test',label:'Link 1'},
            {link:'Test',label:'Link 2'},
            {link:'Test',label:'Link 3'}
        ]);
    }
</script>
```