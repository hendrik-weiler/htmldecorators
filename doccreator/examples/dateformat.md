#### DateFormat with init

You use the ```@DateFormat``` decorator to format a unix timestamp.
You init the std library and configure it
````
<template data-htmldec>
    @Init(
        dateFormat="d.m.Y H:i"
    )
</template>
````
After you use init you can format numbers
````
<div data-htmldec>
    @DateFormat
    <div>1623343453000</div>
    <!-- The output will be 10.06.2021 18:44 -->
</div>
````

#### DateFormat without init
You can use the format configuration in the DateFormat decorator directly
````
<div data-htmldec>
    @NumberFormat(
        format="d.m.Y H:i"
    )
    <div>1623343453000</div>
    <!-- The output will be 10.06.2021 18:44 -->
</div>
````
It will ignore the ```@Init``` settings and will use the own paramters instead.