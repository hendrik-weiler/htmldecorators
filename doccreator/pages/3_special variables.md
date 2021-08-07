{
"id" : "special_variables",
"title" : "Special variables",
"description" : "Special variables in @ForEach, @Component"
}
# Special variables

There exist following special variables:
1. \__array__ - Represents an array that was given to a data attribute or data-inject
2. \__entry__ - Represents an object from an array or the value from an array index
3. \__index__ - Represents the index of an array
4. \__slot__ - Represents the html content of an component tag
5. \__uid__ - Represents an unique id. Used in components.

Example for \__array__:
```
<!-- 
If just an array is given theres no variable name present.
Thats why there exist the __array__ variable.
 -->
<script type="template" id="example">
    @ForEach(data=${__array__})
    <ul>
        <li>$${__entry__}</li>
    </ul>
</script>
<script>
HTMLDecorators.EvaluateTag(document.querySelector('#example'),[
   'Item 1', 'Item 2', 'Item 3'
]);
</script>
```

Example for \__entry__
```
<script type="template" id="example">
    @ForEach(data=${items})
    <ul>
        <li>$${__entry__.name} or $${name}</li>
    </ul>
</script>
<script>
HTMLDecorators.EvaluateTag(document.querySelector('#example'),[
   {name:'Max',age:24},
   {name:'Paula',age:14},
   {name:'Hans',age:44}
]);
</script>
```

Example for \__index__
```
<script type="template" id="example">
    @ForEach(data=${items})
    <ul>
        <li>$${__index__} - $${name}</li>
    </ul>
</script>
<script>
HTMLDecorators.EvaluateTag(document.querySelector('#example'),[
   {name:'Max',age:24},
   {name:'Paula',age:14},
   {name:'Hans',age:44}
]);
</script>
```

Example for \__slot__:
```
<!-- The component -->
<template>
  <select name="select" id="select">
    ${__slot__}
  </select>
  <!-- The __slot__ variable will be replaced with the contents of the @Component decorator tag -->
</template>

<script>
  class CustomSelect extends HTMLDecorators.Component {
  }
  HTMLDecorators.RegisterComponent('__uid__', CustomSelect);
</script>
...
<script type="template" id="example">
  @Component(path=components/customSelect.html)
  <span>
      <option value="0">Option 1</option>
      <option value="1">Option 2</option>
      <option value="2">Option 3</option>
  </span>
</script>
<script>
HTMLDecorators.EvaluateTag(document.querySelector('#example'));
</script>
```

[Next Chapter](${page=troubleshooting})