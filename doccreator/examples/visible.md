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
    decEvalTag(document.querySelector('#test'),{
        list : []
    });
}
</script>
````
If a list was manipulated through a ```@ForEach``` decorators filter parameter above the
```@Visible``` decorator the value of the list is not changed from the value before the ```@ForEach```.
So its not possible to compare against 0 entries ```${list.length == 0}```.
```
<div id="test2" data-htmldec-render>
    @ForEach(data=${list}, filterHandler=filter)
    <ul>
        <li>$${name}</li>
    </ul>
    @Visible(if=${list.length == 0})
    <div>No Persons within that age range found</div>
</div>
<script>
    window.onload = function() {
        decHandler(function filter(elm) {
            return elm.age > 25;
        });
        decEvalTag(document.querySelector('#test2'),{
            list : [
                {id:1,name:'Paul', age: 22},
                {id:2,name:'Jana', age: 12},
                {id:1,name:'Hans', age: 15}
            ]
        });
    }
</script>
```
For that theres the ```ifEmpty``` parameter. You give the ```@ForEach``` an id
and set ```ifEmpty``` to the id.
```
<div id="test2" data-htmldec-render>
    @ForEach(data=${list}, filterHandler=filter, id=foreach)
    <ul>
        <li>$${name}</li>
    </ul>
    @Visible(ifEmpty=foreach)
    <div>No Persons within that age range found</div>
</div>
<script>
    window.onload = function() {
        decHandler(function filter(elm) {
            return elm.age > 30;
        });
        decEvalTag(document.querySelector('#test2'),{
            list : [
                {id:1,name:'Paul', age: 22},
                {id:2,name:'Jana', age: 12},
                {id:1,name:'Hans', age: 15}
            ]
        });
    }
</script>
```