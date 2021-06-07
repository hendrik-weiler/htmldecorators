<?php

//// CONFIG
$version = '0.1';
$buildTime = date('Y-m-d H:i:s',time());
///

$license = file_get_contents('license.md');
$buildDir = 'build';
$libFolder = 'lib';
$stdDecoratorFolder = $libFolder . '/stdDecorators';
if(file_exists($buildDir)) {
    foreach(glob($buildDir . '/*') as $file) {
        unlink($file);
    }
    rmdir($buildDir);
}
mkdir($buildDir);

$licenseComment = '/*'
    . PHP_EOL . $license
    . PHP_EOL . PHP_EOL . 'Version: ' . $version
    . PHP_EOL . PHP_EOL . 'Build: ' . $buildTime
    . PHP_EOL . '*/';

$htmlDecorators = file_get_contents($libFolder. '/htmldecorators.js');

print "Build 'htmldecorators.js'" . PHP_EOL;

file_put_contents($buildDir . '/htmldecorators.js', $licenseComment . PHP_EOL . $htmlDecorators);

$htmlDecoratorsCSS = file_get_contents($libFolder. '/htmldecorators.css');

file_put_contents($buildDir . '/htmldecorators.css', $licenseComment . PHP_EOL . $htmlDecoratorsCSS);

//// STD Decorators
///
$content = '';
$content .= $licenseComment . PHP_EOL;
foreach(glob($stdDecoratorFolder . '/*.js') as $file) {
    $fileContent = file_get_contents($file);
    $content .= $fileContent;
}

file_put_contents($buildDir . '/htmldecorators-std.js', $content);

print "Build 'htmldecorators-std.js'" . PHP_EOL;
print "Build finished" . PHP_EOL;