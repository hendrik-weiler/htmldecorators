<?php

//// CONFIG
$config = json_decode(file_get_contents('build.json'),true);
$version = $config['version'];
$buildTime = date('Y-m-d H:i:s',time());
///

$license = file_get_contents('license.md');
$buildDir = 'build';
$libFolder = 'lib';
$stdDecoratorFolder = $libFolder . '/stdDecorators';
$stdComponentsFolder = $libFolder . '/stdComponents';
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

print "Build 'htmldecorators.css'" . PHP_EOL;

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

//// STD Components
///
$content = '';
$content .= $licenseComment . PHP_EOL;
foreach(glob($stdComponentsFolder . '/*.html') as $file) {
    $fileContent = file_get_contents($file);
    $content .= '--------------component=' . basename($file,'.html') . PHP_EOL;
    $content .= $fileContent . PHP_EOL;
}

file_put_contents($buildDir . '/htmldecorators-std-components.html', $content);

print "Build 'htmldecorators-std-components.html'" . PHP_EOL;

$content = '';
$content .= $licenseComment . PHP_EOL;
foreach(glob($stdComponentsFolder . '/*.js') as $file) {
    $fileContent = file_get_contents($file);
    $content .= $fileContent;
}

file_put_contents($buildDir . '/htmldecorators-std-components.js', $content);

print "Build 'htmldecorators-std-components.js'" . PHP_EOL;

print "Build finished" . PHP_EOL;