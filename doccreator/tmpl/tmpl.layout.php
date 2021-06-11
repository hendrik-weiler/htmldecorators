<!DOCTYPE html>
<html>
<head>
    <title>Documentation</title>
    <meta charset="utf-8">
    <style>
        :root {
            --font-color-light: #cecece;
            --font-color-lighter: #666;
            --font-color: #333;
            --border-color: #efefef;
        }
        body {
            margin: 0;
            color: var(--font-color);
            font-family: Arial;
        }

        * {
            box-sizing: border-box;
        }

        .container {
            display: flex;
            flex-flow: column;
            width: 100%;
            height: 100vh;
        }

        .container .header {
            padding: 10px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .container .header .col2 {
            justify-content: flex-end;
        }

        .container .header .col2 input {
            border:1px solid var(--border-color);
            padding: 15px;
            font-size: 16px;
            width: 100%;
            min-width: 500px;
        }

        .container .content {
            flex-grow: 1;
            overflow: auto;
        }

        .container .footer {
            padding: 10px;
            text-align: center;
            color: var(--font-color-light);
            font-size: 12px;
        }

        .container .search-results,
        .container .content-inner {
            margin: auto;
            width: 100%;
            max-width: 1280px;
        }

        body .container .search-results {
            display: none;
        }

        body.search .container .search-results {
            display: block;
        }

        body.search .container .content-inner {
            display: none;
        }

        .container table {
            border-spacing: 0;
            width: 100%;
            border: 1px solid var(--border-color);
        }

        .container table tr td {
            padding: 10px;
            border-bottom: 1px solid var(--border-color);
        }

        .container table tr td a {
            color: var(--font-color);
        }

        .container table tr td .entry-attr {
            color: var(--font-color-light);
        }

        .container table tr.tr-head {
            background: var(--border-color);
        }

        .container .class-attr {
            color: var(--font-color-light);
            font-size: 18px;
        }

        .container .class-name {
            font-size: 26px;
        }

        .container a.class-extends {
            font-size: 18px;
            color: var(--font-color);
            text-decoration: underline;
        }

        .container .example,
        .container .decorator-preview {
            border-left: 3px solid var(--font-color-light);
            padding-left: 10px;
        }

        .container .page pre,
        .container .example pre {
            border:1px solid var(--font-color-light);
            background: var(--border-color);
            padding: 5px;
        }

        .container .searchResult {
            text-decoration: none;
        }

        .container .searchResult h4 {
            text-decoration: underline;
            font-size: 16px;
            color: var(--font-color);
        }

        .container .searchResult p {
            color: var(--font-color-lighter);
        }

        .container .no-results {
            padding: 50px;
            text-align: center;
            font-size: 20px;
        }

        .container .breadcrumb-nav {
            padding: 5px 0;
            border-bottom: 1px solid var(--border-color);
            margin: 50px 0;
            font-size: 20px;
        }

        .container .breadcrumb-nav a {
            color: var(--font-color);
        }
    </style>
    <script>
        /**
         * Returns a list of search objects
         *
         * @var searchData
         * @type array
         */
        var searchData = [];

        /**
         * Sets the searchData variable with given data
         *
         * @param data The base64 encoded, json string
         */
        function fillSearchData(data) {
            searchData = JSON.parse(atob(data));
        }

        window.onload = function () {

            var search = document.getElementById('search');
            search.onkeyup = function (e) {
                if(this.value == '') {
                    document.body.classList.remove('search');
                    return;
                }
                if(this.value.length < 3) return;
                document.body.classList.add('search');

                var i = 0,
                    len = searchData.length,
                    dataEntry,
                    searchTerm = this.value,
                    tmplNode = document.body.querySelector('#searchEntry'),
                    sR = document.body.querySelector('.search-results'),
                    tmplHTML,
                    desc,
                    resultCounter = 0;
                sR.innerHTML = '';
                console.log('---- new search='+searchTerm)
                for(i; i < len; ++i) {
                    dataEntry = searchData[i];
                    if(new RegExp(searchTerm,'i').test(dataEntry.name)
                        || new RegExp(searchTerm,'i').test(dataEntry.desc)) {
                        tmplHTML = tmplNode.innerHTML.slice(0);
                        tmplHTML = tmplHTML.replace('$link', dataEntry.file);
                        tmplHTML = tmplHTML.replace('$name', dataEntry.name);
                        desc = dataEntry.desc;
                        desc = desc.replace(/\n/g,'<br>');
                        tmplHTML = tmplHTML.replace('$description', desc);
                        sR.innerHTML += tmplHTML;
                        ++resultCounter;
                    }
                }
                if(resultCounter==0) {
                    sR.innerHTML += '<p class="no-results">The search did not yield any results.</p>'
                }
            }

        }
    </script>
    <script src="search.data.js"></script>
</head>
<body>
    <template id="searchEntry">
        <a href="$link" class="searchResult">
            <h4>$name</h4>
            <p>$description</p>
        </a>
    </template>
    <div class="container">
        <div class="header">
            <div class="col1">
                <h1>htmldecorators Documentation v<?php print $this->version ?></h1>
            </div>
            <div class="col2">
                <input id="search" type="search" placeholder="Search for classes,properties,methods and pages...">
            </div>
        </div>
        <div class="content">
            <div class="search-results"></div>
            <div class="content-inner">
                <?php print $content ?>
            </div>
        </div>
        <div class="footer">
           <?php print date('Y',time()) ?> © Hendrik Weiler | <?php print date('Y/d/m H:i:s',time()) ?>
        </div>
    </div>
</body>
</html>