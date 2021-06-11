<?php

require_once 'doccreator/DecJSDoc.php';

$config = json_decode(file_get_contents('build.json'),true);

$decDoc = new DecJSDoc(array(
    'sourceDir' => 'lib',
    'buildDir' => 'docs',
    'version' => $config['version']
));
$decDoc->build();

print 'Docs generated.' . PHP_EOL;