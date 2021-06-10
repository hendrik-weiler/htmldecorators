<?php

require_once 'doccreator/DecJSDoc.php';

$config = json_decode(file_get_contents('build.json'),true);

$decDoc = new DecJSDoc('lib','docs',$config['version']);
$decDoc->build();