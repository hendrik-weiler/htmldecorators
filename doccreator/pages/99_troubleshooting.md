{
"id" : "troubleshooting",
"title" : "Troubleshooting",
"description" : "Common problems"
}
#### The decorators are displayed as text

Its possible that you placed your decorators
at a place where text is not expected.
For example at the table tag between td and tr.

#### Table: The decorator was applied not inside but on the table

This happens when the text of the tag could not be read correctly (by an evalutation of a tag).
Use instead of a normal tag a &lt;script type="template"&gt; tag to be evaluated.

```
<!-- 
This reads the text incorrectly.
It will result in <table data-dec-id="..."> instead
of <tbody data-dec-id="..">.
 -->
<div data-dechtml>
    <table>
        @ForEach(data=${__array__})
        <tbody>
            <tr>
                <td>$${__entry__}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>No entries.</td>
            </tr>
        </tfoo>
    </table>
</div>
```
Instead use a &lt;script type="template"&gt; tag

```
<!-- 
This reads the correctly.
The decorator will be applied to tbody.
 -->
<script type="template" id="mytablerender">
    <table>
        @ForEach(data=${__array__})
        <tbody>
            <tr>
                <td>$${__entry__}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>No entries.</td>
            </tr>
        </tfoo>
    </table>
</script>
<div data-dechtml>
    <!-- Since its a script tag the tag must be loaded -->
    @LoadHTML(selector=#mytablerender)
    <div></div>
</div>
```

#### ForEach does not work

Inside of the decorated tag you need to write
for decorators with @@ and variables with $$.
Its possible that it dont work if theres just one @ or $.

#### No decoration applier found

If this message was shown in the log its possible
you have to add @Init somewhere to enable internal decoration rendering.