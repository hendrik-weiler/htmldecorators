{
"id" : "installation",
"title" : "Installation",
"description" : "Explains the installation"
}
# Installation

Place the following lines in your &lt;head&gt; area.
```
<script data-evalhtmldec src="../build/htmldecorators.js"></script>
<script src="../build/htmldecorators-std.js"></script>
<link rel="stylesheet" href="../build/htmldecorators.css">
```

If you want to add the standard components you have add the following
to your document.

```
<!-- This will add the decorators which renders the component (needs to be loaded before) -->
<script src="../build/htmldecorators-std-components.js"></script>
<!-- This will load all components at once (in body-tag) -->
<template data-htmldec>
    @Init
    @LoadHTMLStack(
    id=appStack,
    combined0=../build/htmldecorators-std-components.html
    )
</template>
```

[Next Chapter](${page=getting_started})