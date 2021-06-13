{
"id" : "components",
"title" : "Components",
"description" : "How to build and use components"
}
# Components

**There are 2 methods of creating a component**
1. Inside the html directly
2. Loaded through a file

You load a component through the ```@Component``` decorator. It accepts similiar
parameter as the ```@LoadHTML``` decorator like selector,path and data.
A component uses a file or a tag with the required template tag for the html, a optional script and style tag.
The ```@Component``` decorator will replace the main element with the template tags first element.

#### Create a component inside the html directly
```
<!-- 
    Note the use of the __uid__ variable.
    Each created component will have a unique id.
    This should be used for identification for
    interactions.
-->
<template id="componenttest">
    <template>
        @Click(handler=click${__uid__})
        <div class="component" id="${__uid__}">Test</div>
    </template>
    <script>
        decHandler(function click(e,dec) {
            console.log(e,dec);
        },'${__uid__}');
    </script>
    <style>
        .component {
            background: yellow;
        }
    </style>
</template>
...
<!-- In html you call it like that -->
@Component(selector=#componenttest)
<div></div>
```

#### Create a component in an external file

You create a file called ```componenttest.html``` and put in the following:
```
<!-- 
    Note the use of the __uid__ variable.
    Each created component will have a unique id.
    This should be used for identification for
    interactions.
-->
<template>
    @Click(handler=click${__uid__})
    <div class="component" id="${__uid__}">Test</div>
</template>
<script>
    decHandler(function click(e,dec) {
        console.log(e,dec);
    },'${__uid__}');
</script>
<style>
    .component {
        background: yellow;
    }
</style>
...
<!-- In html you call it like that -->
@Component(path=componenttest.html)
<div></div>
```
