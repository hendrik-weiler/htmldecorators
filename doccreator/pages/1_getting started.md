{
"id" : "getting_started",
"title" : "Getting started",
"description" : "First steps"
}
# Getting started

To test out the functionality you can add the following markup in your &lt;body&gt; tag.
```
<div data-htmldec>
@Underline
<p>Underlined text</p>
</div>
```

This tag will be automaticly evaluated because of the ```data-htmldec``` attribute.
Its possible to inject data into the tag with the ```data-inject``` attribute.

```
<script>
window.definedData = {
    greeting : 'Hello World!'
}
</script>
<div data-htmldec data-inject="window.definedData">
<h1>${greeting}</h1>
</div>
```