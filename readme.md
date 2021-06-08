# htmldecorators

This library parses html and adds decorators to html tags.

### Files

The files to include
- htmldecorators.js - The parser and core functionality
- htmldecorators-std.js - A list of standard decorators
- htmldecorators.css - The core css

### Examples

There are several examples in the ```examples``` folder.
You can use the ```examples/build.html``` can be used as base.

**Include to your html file**
```
<script data-evalhtmldec src="../build/htmldecorators.js"></script>
<script src="../build/htmldecorators-std.js"></script>
<link rel="stylesheet" href="../build/htmldecorators.css">
```
Notice that "data-evalhtmldec" was added as attribute to the script tag for ```htmldecorators.js```. With this
all elements with the "data-htmldec" attribute will be parsed.
If you remove this attribute you have to add this to your page:
```
<script>
window.onload = function () {
    HTMLDecorators.EvaluateHTMLDecs();
}
</script>
```

**Basic usage**
```
<!-- Format tags using decorators -->
@Bold @Underline @Italic
<div>My Text</div>

<!-- Load html into a element -->
@LoadHTML(page=page.html)
<div></div>

<!-- In page.html -->
<h1>Headline</h1>
<!-- Use decorators inside -->
@Click(handler=hello)
<button>Say hello</button>
@Script
<script>
HTMLDecorators.Handler(function hello() {
    alert('hello');
});
</script>

<!-- ref -->
@Ref(id=paragraph)
<p></p>
<script>
// get the decorator instance
var p = decById('paragraph');
p.element.innerHTML = 'Content';
</script>

<!-- foreach -->
<ul data-htmldec>
    @ForEach(id=menu)
    <ul>
        <li>
            @@Bold @@Underline @@Italic
            <a href="$${link}">$${label} $${index}</a>
        </li>
    </ul>
</ul>
<script>
    window.onload = function () {
        // decById is an alias to HTMLDecorators.FindById
        var menu = decById('menu');
        menu.update([
            {link:'Test',label:'Link 1'},
            {link:'Test',label:'Link 2'},
            {link:'Test',label:'Link 3'}
        ]);
    }
</script>
```

**Extending with own decorators**

You create your own decorators by creating a namespace.
There are examples for creating own decorators in
```examples/app/login.js``` and ```examples/app/todo.js```

```
// After you include examples/app/todo.js to your html file
// you can initialize your application. Put this code inside your body tag
<template data-htmldec>
@Init(
    includeDec0=todoDec,
    includeDec1=loginDec
)
</template>
// Now let the application read the data-htmldec tags 
<script>
window.onload = function () {
    HTMLDecorators.EvaluateHTMLDecs();
    // Now the template tag will be read
    // And the todoDec namespace will be always applied
}
</script>
```

**Using the parser**

With the parser you can parse the html and apply decorators
An usage of the parser can found in ```examples/loginapp.html``` 
in the ```examples/app/pageLoader.js``` the ```loadPage``` function.
```
// first you create an instance of the parser
var parser = new HTMLDecorators.Parser();
var data = {
    // parse the input html
    html : parser.parse(test1html),
    // get a list of all found decorators
    decs : parser.DecoratorList
};
// after you got a list of decorators
// you set the parsed html to the body
document.body.innerHTML = data.html;
// to apply the decorators call this function
HTMLDecorators.ApplyDecorators(data.decs);
```