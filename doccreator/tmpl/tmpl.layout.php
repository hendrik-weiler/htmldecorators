<!DOCTYPE html>
<html>
<head>
    <title>Documentation</title>
    <meta charset="utf-8">
    <style>
        :root {
            --font-color-light: #cecece;
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

        .container .content-inner {
            margin: auto;
            width: 100%;
            max-width: 1280px;
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

        .container .decorator-preview {
            border-left: 3px solid var(--font-color-light);
            padding-left: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>htmldecorators Documentation v<?php print $this->version ?></h1>
        </div>
        <div class="content">
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