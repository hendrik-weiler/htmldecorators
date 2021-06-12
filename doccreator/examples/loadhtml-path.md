#### LoadHTML with path

With the ```@LoadHTML``` decorator you can parse external html containing decorators and variables.
````
<div data-htmldec>
    <!-- You can use the data parameter aswell -->
    @LoadHTML(path=path/to/file.html)
    <div></div>
    <!-- The div above will be filled with the file.html content -->
</div>
````