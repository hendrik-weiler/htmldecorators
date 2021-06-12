#### ForEach with filterHandler

Use this parameter to filter the input
````
<script>
    // you define the filter handler
    decHandler(function filterData(elm) {
        // if its true the elm will not be removed
        return elm.condition > 1;
    });
</script>
<div data-htmldec>
    <!-- You give the filterHandler parameter the handler name -->
    @ForEach(data=${__array__},filterHandler=filterData)
    <tbody>
    ...
</div>
````