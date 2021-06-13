#### LoadHTMLStack loading pages and using them with LoadHTML

With the ```@LoadHTMLStack``` decorator you can load multiple pages at once.
Afterwards you can parse the loaded pages with ```@LoadHTML```.
````
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LoadHTMLStack</title>
    <script data-evalhtmldec src="../lib/htmldecorators.js"></script>
    <script src="../lib/stdDecorators/core.js"></script>
    <link rel="stylesheet" href="../lib/htmldecorators.css">
    <style>
        body .body {
            display:none;
        }
        body.body .body {
            display:inherit;
        }
        body.body .loading {
            display:none;
        }
    </style>
    <script>

        decHandler(async function pageLoaderState(dec,state) {
            console.log(state)
            if(state == 'finished') {
                document.body.classList.add('body');
                decEvalTag(document.querySelector('body .body'));
            }
            if(state == 'loading') {
                // in loading state
            }
        });
    </script>
</head>
<body>
<template data-htmldec>
    @Init
    @LoadHTMLStack(
    id=appStack,
    stateHandler=pageLoaderState,
    id0=home,path0=pages/content/home.html,
    id1=table,path1=pages/content/table.html
    )
</template>
<div class="loading">Loading...</div>
<div class="body" data-htmldec-render>
    <h1>Page home</h1>
    @LoadHTML(fromStack=appStack,withId=home)
    <div></div>
    <h1>Page table</h1>
    @LoadHTML(fromStack=appStack,withId=table)
    <div></div>
</div>
</body>
</html>
````