#### LoadHTMLStack loading a single html file with multiple components

With the ```@LoadHTMLStack``` decorator you can load single files with multiple components inside.
````
...
<!-- Load the standard components -->
<template data-htmldec>
    @Init
    @LoadHTMLStack(
    id=appStack,
    stateHandler=pageLoaderState,
    combined0=../build/htmldecorators-std.html
    )
</template>
...
<!-- After the file was loaded it can used like this -->
@Component(fromStack=appStack,withId=fileSelect)
<div></div>
````
The format the html files needs to have is the following:
```
/*
A comment at the top is optional
*/
--------------component=$componentname
<template>
...
</template>

<script>
...
</script>

<style>
...
</style>
--------------component=$componentname2
<template>
...
</template>

<script>
...
</script>

<style>
...
</style>
```