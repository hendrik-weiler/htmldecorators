{
"id" : "components",
"title" : "Components",
"description" : "How to build and use components"
}
# Components

You load a component through the ```@Component``` decorator. It accepts similiar
parameter as the ```@LoadHTML``` decorator like selector,path and data.
A component reads a file(path) or a tag(selector).

**Structure of a component**
1. &lt;template&gt; or &lt;script type="template"&gt; tag (required)
2. &lt;script&gt; tag with component class (required)
3. &lt;style&gt; tag (optional)

The ```@Component``` decorator will replace the main element with the template tags first element.

#### Notes

1. Inside of the &lt;template&gt; or &lt;script type="template"&gt; tag there should be one children as base. 
   This children cant have decorators.
   
2. If theres variable used in the &lt;template&gt; or &lt;script type="template"&gt; 
   tag and theres no ```data``` parameter set in the ```@Component``` tag an error will appear on rendering.
   
3. All handlers from decorators will try to call the function inside the component class.
   The ```decHandler``` function will not work.

#### Create a component inside the html directly
```
<!-- 
    Note the use of the __uid__ variable.
    In the templating tag you have to access the variable
    through ${__uid__}. In <script> and <style> tags 
    the string __uid__ will be replaced.
    Each created component will have a unique id.
    This can be used for identification purposes.
-->
<template id="componenttest">
    <template>
        <div class="componenttest">
            @ForEach(data=${__array__},id=foreach)
            <table>
                <tr>
                    <td>
                        @@Click(handler=click)
                        <a href="#">$${src}</a>
                    </td>
                </tr>
            </table>
        </div>
    </template>
    <script>
        class ComponentTest extends decComponent {
            
            // you can initialize your own data
            // this will be called once before rendering
            async initializeData() {
                // fetch data
                // var res = await fetch('data.json'),
                //     data = await res.json();
                // this.setData(data);
            }
            
            updated() {
                // this will be called after the rendering is done
                // you can use this to set events
                // you can search for decorator instances
                // with this.findById(id) 
                // the id of decorators will be set to the component in "this.IdMap"
                // if you want to find a decorator outside of components use the function decById(id)
            }
        }

        decRegisterComponent('__uid__',ComponentTest);
    </script>
    <style>
        .componenttest {
            background: yellow;
        }
    </style>
</template>
...
<!-- In html you call it like that -->
@Component(selector=#componenttest)
<div></div>
<!-- 
You give the component data with the data parameter
@@Component(selector=#componenttest,data=$${data})
-->
```

#### Create a component in an external file

You create a file called ```componenttest.html``` and put in the following:
```
<!-- 
    Note the use of the __uid__ variable.
    In the templating tag you have to access the variable
    through ${__uid__}. In <script> and <style> tags 
    the string __uid__ will be replaced.
    Each created component will have a unique id.
    This can be used for identification purposes.
-->
<template>
    <div class="componenttest">
        @ForEach(data=${__array__})
        <table>
            <tr>
                <td>
                    @@Click(handler=click)
                    <a href="#">$${src}</a>
                </td>
            </tr>
        </table>
        <div>
         ${__slot__}
        </div>
        <!-- 
            The __slot__ will be replaced by the p-tag given in the decorator node.
            Decorators or variables starting with @@ or $$ in __slot__ wont be parsed.
            -->
    </div>
</template>
<script>
    class ComponentTest extends decComponent {
        updated() {
            // this will be called after the rendering is done
            // you can use this to set events
        }
    }

    decRegisterComponent('__uid__',ComponentTest);
</script>
<style>
    .componenttest {
        background: yellow;
    }
</style>
...
<!-- In html you call it like that -->
@Component(path=componenttest.html)
<div>
   <p>Some paragraph to pass into the component</p>
</div>
```

#### Events

In components you have the ability to create and send events.
They are several methods available:
1. [on](class.HTMLDecorators.Component.on.html)
2. [emit](class.HTMLDecorators.Component.emit.html)
3. [broadcast](class.HTMLDecorators.Component.broadcast.html)

Note: The events will be reset after rendering. So you should register the events on the ```updated```
method.

You create an event with the ```on``` method. 

```
this.on('someEvent', function (file,sender) {
  console.log('fileSelectSelected',file,sender);
  // do stuff
});
```

If you have nested components you can trigger events with ```emit```.
The event will be bubbling upwards to the initial component. 

```
...
var file = e.currentTarget.files[0];
this.fileNameElm.innerText = file.name;

this.emit('fileSelectSelected',file);
...
```

If you want events from other components or global events to react you use
the ```broadcast``` method. You use it like the ```emit``` method.

```
...
var someData = {
   state : 1
};
this.broadcast('someEvent',someData);
...
```