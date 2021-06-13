#### ForEach with multiple instances

You can use ```@ForEach``` decorators insides of another ```@ForEach``` decorator.
````
<!-- example with 3 loops in eachother -->
<ul id="multipleRenderInOne" data-htmldec-render>
    <!-- notice one @ and $ -->
    @ForEach(data=${__array__})
    <ul class="multipleRenderInOne">
        <li>
            $${name}
            <!-- notice two @@ and $$ -->
            @@ForEach(data=$${children})
            <ul>
                <li>
                    <!-- notice two @@@ and $$$ -->
                    $$${name}
                    @@@ForEach(data=$$${toys})
                    <ul>
                        <!-- notice two @@@@ and $$$$ -->
                        <li>$$$${__entry__}</li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</ul>
<script>
window.onload = function() {
    var exampleData = [
        {
            name:'Petra',age:'44',children:
                [
                    {name:'Philipp',age:10,toys:['Lego','Toy car']}
                ]
        },
        {
            name:'Max',age:'32',children:
                [
                    {name:'Paula',age:8,toys:[]},
                    {name:'Felix',age:3,toys:[]}
                ]
        },
        {
            name:'Hans',age:'11',children:
                [

                ]
        }
    ];

    HTMLDecorators.EvaluateTag(document.querySelector('#multipleRenderInOne'),exampleData);

}
</script>
````