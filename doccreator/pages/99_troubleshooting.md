{
"id" : "troubleshooting",
"title" : "Troubleshooting",
"description" : "Common problems"
}
#### The decorators are displayed as text

Its possible that you placed your decorators
at a place where text is not expected.
For example at the table tag between td and tr.

#### ForEach does not work

Inside of the decorated tag you need to write
for decorators with @@ and variables with $$.
Its possible that it dont work if theres just one @ or $.

#### No decoration applier found

If this message was shown in the log its possible
you have to add @Init somewhere to enable internal decoration rendering.