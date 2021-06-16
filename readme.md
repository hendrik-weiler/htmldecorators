# htmldecorators

This library parses html with decorators descriptions and executes the code behind them.

Includes:
* Templating
* Components

### Table of contents

1. [Files](#files)
2. [Examples](#examples)
3. [Troubleshooting](https://hendrik-weiler.github.io/htmldecorators/docs/page.99_troubleshooting.html)
4. [Documentation](https://hendrik-weiler.github.io/htmldecorators/docs)

### Files

The files to include
- htmldecorators.js - The parser and core functionality
- htmldecorators-std.js - A list of standard decorators
- htmldecorators.css - The core css

### Examples

There are several examples in the ```examples``` folder.
You can use the ```examples/starter.html``` for testing.

**Include to your html file**
```
<script data-evalhtmldec src="../build/htmldecorators.js"></script>
<script src="../build/htmldecorators-std.js"></script>
<link rel="stylesheet" href="../build/htmldecorators.css">
```
Notice that "data-evalhtmldec" was added as attribute to the script tag for ```htmldecorators.js```. With this
all elements with the "data-htmldec" attribute will be parsed.
If you remove this attribute you have to apply the decorators yourself:
```
<script>
window.onload = function () {
    HTMLDecorators.EvaluateTag(document.querySelector('#node'));
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
<div data-htmldec>
    @ForEach(id=menu)
    <ul>
        <li>
            @@Bold @@Underline @@Italic
            <a href="$${link}">$${label} $${__index__}</a>
        </li>
    </ul>
</div>
<div id="arrayTest" data-htmldec-render>
    <span>${__array__}</span>
    @ForEach(data=${__array__})
    <ul>
        <li>$${__entry__} = $${__index__}</li>
    </ul>
</div>
<script>
    window.onload = function () {
        // decById is an alias to HTMLDecorators.FindById
        var menu = decById('menu');
        menu.update([
            {link:'Test',label:'Link 1'},
            {link:'Test',label:'Link 2'},
            {link:'Test',label:'Link 3'}
        ]);
        
        HTMLDecorators.EvaluateTag(document.querySelector('#arrayTest'),[
           'Item 1', 'Item 2', 'Item 3'
        ]);
    }
</script>
<!-- If you want more loop more layers you can use the @LoadHTML decorator -->
@ForEach(id=test)
<div>
    @@Underline
    <span>$${label}</span>
    @@LoadHTML(
        data="$${__entry__}",
        selector=body #stack1
    )
    <div></div>
</div>
<!-- use script type=template for html loading -->
<script type="template" id="stack1">
    @Bold @Italic @TestDec.Test(index="test \"${__index__}\"")
    <span>Test ${__index__}</span>
</script>
```

**Variables**

If you use the ```HTMLDecorators.Parser``` to parse html content you can
give an object as the second parameter. You can use ```${key}``` in the html content
to replace it with the object value. Its also possible
to use an expression like ```${__index__ + 1}```.

**Extending with own decorators**

You create your own decorators by creating a namespace.
There are examples for creating own decorators in
```examples/app/login.js```, ```examples/app/todo.js``` or ```examples/invoice.html```

The decorators will be automaticly applied. If the name got
no namespace the standard namespace will be used found in ```HTMLDecorators.StdDecorators```
If a namespace was found for example ```todoDec.Test``` the
Test decorator will be search in ```window.todoDec```

Example:
```
<!-- in js -->
<script>
var TestDec = {};
class Test extends HTMLDecorators.Decorator {
  render() {
    console.log("Test");
  }
}
TestDec.Test = Test;
</script>
<!-- usage -->
<script type="template" data-htmldec>
    @TestDec.Test
    <div></div>
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

Its also possible to add data at the parsing step.
```
var variables = {
    name : 'value',
    othername : 'value2'
};
var parser = new HTMLDecorators.Parser();
var data = {
    // parse the input html
    html : parser.parse(test1html,variables),
    // get a list of all found decorators
    decs : parser.DecoratorList
};
// all instances of ${name} or ${othername} will replaced
// with the value
```