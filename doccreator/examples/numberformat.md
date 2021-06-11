#### NumberFormat with init

You use the ```@NumberFormat``` decorator to format a number.
You init the std library and configure it
````
<template data-htmldec>
    @Init(
        decimalFixed=2,
        decimalSeperator=","
    )
</template>
````
After you use init you can format numbers
````
<div data-htmldec>
    @NumberFormat
    <div>2</div>
    <!-- The output will be 2,00 -->
    @NumberFormat
    <div>15.234</div>
    <!-- The output will be 15,23 -->
    @NumberFormat
    <div>${number}</div>
    <!-- The number format will be applied to the variable value -->
</div>
````

#### NumberFormat without init
You can use the format configuration in the NumberFormat decorator directly
````
<div data-htmldec>
    @NumberFormat(
        decimalFixed=2,
        decimalSeperator=","
    )
    <div>2</div>
    <!-- The output will be 2,00 -->
</div>
````
It will ignore the ```@Init``` settings and will use the own paramters instead.