#### ForEach with sorthandler

Use this parameter to sort the input
````
<script>
    // you define the sort handler
    decHandler(function sortDescending(a,b) {
        return b.received - a.received;
    });
</script>
<div data-htmldec>
    <!-- You give the sortHandler parameter the handler name -->
    @ForEach(data=${__array__},sortHandler=sortDescending)
    <tbody>
    ...
</div>
````