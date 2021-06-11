#### Navigation and Content

You set the ```@Navigation``` decorator a place above the ```@Content``` decorator.
The navigation will find all "a" tags and give them an onclick event. On click the links will
try to find the ```@Content``` decorator through the links "data-id" attribute and sets the element visibility.
````
@Navigation(
  id=nav
)
<aside>
  <div>
    <a data-id="home" href="#app/home">Home</a>
    <a data-id="table" href="#app/table">Table</a>
    <a data-external target="_blank" href="https://example.org">Extern</a>
  </div>
</aside>
<main>
  @Content(nav=nav,id=home)
  <div>Page home</div>
  @Content(nav=nav,id=table)
  <div>Page table</div>
</main>
````