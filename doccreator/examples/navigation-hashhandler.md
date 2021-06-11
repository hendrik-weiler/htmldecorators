#### Navigation with the hashHandler

With the ```hashHandler``` parameter you can give the name of a function
and it will be called when the ```hashchange``` event was triggered.
````
@Navigation(
  id=nav,
  hashHandler=navHashChange
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
...
<script>
    function navHashChange(decorator) {
      var hash = location.hash.replace('#','');
      hash = hash.split('/');
      hash = hash.pop(); // hash will be "home" or "table"
      HTMLDecorators.FindById('nav').setActive(hash);
    }
</script>
````