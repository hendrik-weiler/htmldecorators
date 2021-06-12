<?php

require_once 'lib/parsedown/Parsedown.php';

/**
 * Creates a documentation for htmldecorator
 *
 * @author Hendrik Weiler
 */
class DecJSDoc
{
    /**
     * Returns a list of comments
     *
     * @var array
     */
    public $comments = array();

    /**
     * Returns a list of signature after the comment blocks
     *
     * @var array
     */
    public $functionDef = array();

    /**
     * Returns a list of parsed comment blocks
     *
     * @var array
     */
    public $commentsDef = array();

    /**
     * Returns a map of classes
     *
     * @var array
     */
    public $classMap = array();

    /**
     * Returns a map of decorators
     *
     * @var array
     */
    public $decoratorMap = array();

    /**
     * Returns a map of functions
     *
     * @var array
     */
    public $functionMap = array();

    /**
     * Returns a map of pages
     *
     * @var array
     */
    public $pagesMap = array();

    /**
     * Returns a map of examples
     *
     * @var array
     */
    public $examplesMap = array();

    /**
     * Returns the build directory path
     *
     * @var string
     */
    private $buildDir = 'docs';

    /**
     * Returns the source directory path
     *
     * @var string
     */
    private $sourceDir = 'lib';

    /**
     * Returns the applications version
     *
     * @var int
     */
    private $version = 0;

    /**
     * Returns the directory path to the template folder
     *
     * @var string
     */
    private $tmplDir = 'doccreator/tmpl';

    /**
     * Returns the directory path to the examples folder
     *
     * @var string
     */
    private $examplesDir = 'doccreator/examples';

    /**
     * Returns the directory path to the pages folder
     *
     * @var string
     */
    private $pagesDir = 'doccreator/pages';

    /**
     * Returns the parsedown instance
     *
     * @var Parsedown
     */
    private $parsedown;

    /**
     * Gets the first line of the description and returns it
     *
     * @param string $description The description string
     * @return string
     */
    private function getFirstLineOfDescription($description) {
        $lines = explode("\n", $description);
        return array_shift($lines);
    }

    /**
     * Checks if a class is in the classMap
     *
     * @param string $name The name of the class
     * @return bool
     */
    private function classExists($name) {
        $result = false;
        foreach ($this->classMap as $className => $entry) {
            if($className == $name) {
                $result = true;
                break;
            }
        }
        return $result;
    }

    /**
     * Prints examples if available
     *
     * @param $obj The class,method,property obj
     * @return string
     */
    private function printExamples($obj) {
        $returnHTML = '';
        if(count($obj['examples']) > 0) {
            foreach ($obj['examples'] as $example) {
                $returnHTML .= '<div class="example">';
                if(isset($this->examplesMap[$example])) {
                    $returnHTML .= $this->examplesMap[$example];
                } else {
                    $returnHTML .= 'Example "' . $example . '" not found.';
                }
                $returnHTML .= '</div>';
            }
        }
        return $returnHTML;
    }

    /**
     * Gets the html output of a decorator
     *
     * @param array $class class object
     * @param bool $withParamTable If the param table should be return aswell
     * @return string
     */
    private function printDecorator($class, $withParamTable=false) {
        $decoratorHTML = '<pre class="decorator-preview">@';
        if($class['decNamespace'] != 'std') {
            $decoratorHTML .= $class['decNamespace'] . '.';
        }
        $decoratorHTML .= $class['decorator'];
        $params = array();
        if(count($class['decParams']) > 0) {
            $decoratorHTML .= "(\n";
            foreach($class['decParams'] as $param) {
                $params[] = "\t" . $param['name'] . '="' . $param['type'] . '"';
            }
            $decoratorHTML .= implode(",\n",$params);
            $decoratorHTML .= "\n)\n";
        }
        $decoratorHTML .= '</pre>';

        if($withParamTable) {
            if(count($class['decParams']) > 0) {
                $decoratorHTML .= '<table>';
                foreach($class['decParams'] as $param) {
                    $decoratorHTML .= '<tr>
                        <td>' . $param['type'] . '</td>
                        <td>' . $param['name'] . '</td>
                        <td>' . $param['description'] . '</td>
                    </tr>';
                }
                $decoratorHTML .= '</table>';
            }
        }
        return $decoratorHTML;
    }

    /**
     * DecJSDoc constructor.
     *
     * Config options:
     * string $sourceDir The source dir to search in
     * string $buildDir The build dir to save the files to
     * int $version The applications version
     *
     * @param array $config The configuration object
     */
    public function __construct($config=array())
    {
        $this->buildDir = isset($config['buildDir']) ? $config['buildDir'] : $this->buildDir;
        $this->sourceDir = isset($config['sourceDir']) ? $config['sourceDir'] : $this->sourceDir;
        $this->version = isset($config['version']) ? $config['version'] : $this->version;
        $this->pagesDir = isset($config['pagesDir']) ? $config['pagesDir'] : $this->pagesDir;
        $this->examplesDir = isset($config['examplesDir']) ? $config['examplesDir'] : $this->examplesDir;

        $this->parsedown = new Parsedown();
    }

    /**
     * Creates html output from a template
     *
     * @param string $templateName The name of the template file
     * @param array $data The data for the inside of the template
     * @param string $breadcrumbnav The breadcrumb navigation html
     * @return string
     */
    public function createFromTemplate($templateName, $data, $breadcrumbnav='') {

        ob_start();
        include($this->tmplDir . '/' . $templateName);
        $content = ob_get_contents();
        ob_end_clean();

        ob_start();
        include($this->tmplDir . '/tmpl.layout.php');
        $resultContent = ob_get_contents();
        ob_end_clean();
        return $resultContent;
    }

    public function printBreadcrumbNav($class, $type, $method='') {
        $resultHTML = '<div class="breadcrumb-nav">';
        $points = array();
        $points[] = '<a href="index.html">Main</a>';
        $typeName = $type;
        switch($type) {
            case 'class':
            case 'method':
                $typeName = 'class';
        }
        if($method != '') {
            $points[] = '<a href="' . $typeName . '.' . $class['name'] . '.html">' . $class['name'] . '</a>';
            $points[] = $method['name'];
        } else {
            $points[] = $class['name'];
        }
        $resultHTML .= implode(' \ ', $points);
        $resultHTML .= '</div>';
        return $resultHTML;
    }

    /**
     * Builds the documentation
     */
    public function build() {
        // parse all files
        foreach(glob($this->sourceDir . '/*.js') as $file) {
            $fContent = file_get_contents($file);
            $this->parse($fContent);
        }
        foreach(glob($this->sourceDir . '/**/*.js') as $file) {
            $fContent = file_get_contents($file);
            $this->parse($fContent);
        }
        $this->buildExamplesMap();
        $this->buildClassMap();
        $this->buildDecoratorMap();
        $this->buildPagesMap();
        // reset build dir
        if(file_exists($this->buildDir)) {
            foreach (glob($this->buildDir.'/*') as $file) {
                unlink($file);
            }
        } else {
            mkdir($this->buildDir);
        }

        $searchList = array();

        $indexHTML = $this->createFromTemplate('tmpl.index.php', array(
            'classes' => $this->classMap,
            'decorators' => $this->decoratorMap,
            'functions' => $this->functionMap,
            'pages' => $this->pagesMap
        ));
        file_put_contents($this->buildDir . '/index.html', $indexHTML);
        foreach ($this->classMap as $class) {
            $classFileName = 'class.' . $class['name'] . '.html';
            $searchList[] = array('name' => $class['name'], 'desc' => $class['description'],'file'=>$classFileName,'type'=>'class');
            $classHTML = $this->createFromTemplate('tmpl.class.php', $class, $this->printBreadcrumbNav($class,'class'));
            file_put_contents($this->buildDir . '/' . $classFileName, $classHTML);
            foreach ($class['properties'] as $property) {
                $searchList[] = array('name' => $property['name'], 'desc' => $property['description'],'file'=>$classFileName,'type'=>'property');
            }
            foreach ($class['methods'] as $method) {
                $methodFileName = 'class.' . $class['name'] . '.' . $method['name'] . '.html';
                $searchList[] = array('name' => $method['name'], 'desc' => $method['description'],'file'=>$methodFileName,'type'=>'method');
                $methodHTML = $this->createFromTemplate('tmpl.method.php', $method, $this->printBreadcrumbNav($class,'method', $method));
                file_put_contents($this->buildDir . '/' . $methodFileName, $methodHTML);
            }
        }
        foreach ($this->functionMap as $function) {
            $functionFileName = 'function.'. $function['name'] . '.html';
            $searchList[] = array('name' => $class['name'], 'desc' => $class['description'],'file'=>$functionFileName,'type'=>'function');
            $functionHTML = $this->createFromTemplate('tmpl.function.php', $function, $this->printBreadcrumbNav($function,'function'));
            file_put_contents($this->buildDir . '/' . $functionFileName, $functionHTML);
        }
        foreach ($this->pagesMap as $name => $pagesData) {
            $data = array(
                'name' => $pagesData['meta']['title'],
                'label' => $pagesData['meta']['title'],
                'description' => $pagesData['meta']['description'],
                'text' => $pagesData['content']
            );
            $pagesHTML = $this->createFromTemplate('tmpl.page.php',$data,$this->printBreadcrumbNav($data,'page'));
            $pagesHTML = $this->parsePageContent($pagesHTML);
            $pageFileName = 'page.'. $name . '.html';
            $searchList[] = array('name' => $data['label'], 'desc' => $data['description'],'file'=>$pageFileName,'type'=>'page');
            file_put_contents($this->buildDir . '/' . $pageFileName, $pagesHTML);
        }
        file_put_contents($this->buildDir . '/search.data.js', "fillSearchData('" . base64_encode(json_encode($searchList)) . "')");
    }

    /**
     * Parses the page content and search for
     *
     * ${action=value}
     *
     * Possible actions:
     * - page=idOfPage
     * - example=filenameOfExample without extension
     *
     * Note: Text of <code> tags will be ignored
     *
     * @param $content The page content
     * @return string
     */
    public function parsePageContent($content) {
        $i = 0;
        $len = strlen($content);
        $inVariable = false;
        $inVariableValue = false;
        $variableKey = '';
        $variableValue = '';
        $afterParseContent = '';
        $inCodeBlock = false;
        for($i; $i < $len; ++$i) {
            $ch = $content[$i];
            if($inCodeBlock) {
                $afterParseContent .= $ch;
                if(substr($afterParseContent, -6) == '</code') {
                    $inCodeBlock = false;
                }
            } else if($inVariable && !$inCodeBlock) {
                if($inVariableValue) {
                    if($ch == '}') {
                        $inVariableValue = false;
                        $inVariable = false;
                        // replace the var
                        switch($variableKey) {
                            case 'page':
                                $found = false;
                                foreach ($this->pagesMap as $name => $pagesData) {
                                    if(isset($pagesData['meta']['id'])
                                        && $pagesData['meta']['id'] == $variableValue) {
                                        $afterParseContent .= 'page.' . $name . '.html';
                                        $found = true;
                                        break;
                                    }
                                }
                                if(!$found) {
                                    $afterParseContent .= '${Page "' . $variableValue . '" not found}';
                                }
                                break;
                            case 'example':
                                $afterParseContent .= $this->printExamples(array(
                                    'examples' => array($variableValue)
                                ));
                                break;
                            default:
                                var_dump($variableKey);
                                $afterParseContent .= '${"' . $variableKey . '" not found}';
                                break;
                        }
                    } else {
                        $variableValue .= $ch;
                    }
                } else if($ch == '=') {
                    $inVariableValue = true;
                } else {
                    $variableKey .= $ch;
                }
            } else if($ch == '$' && $i+1 < $len && $content[$i+1] == '{' && !$inVariable && !$inCodeBlock) {
                $inVariable = true;
                $inVariableValue = false;
                $variableKey = '';
                $variableValue = '';
                $i+=1;
            } else {
                $afterParseContent .= $ch;
                if(substr($afterParseContent, -5) == '<code') {
                    $inCodeBlock = true;
                }
            }
        }
        return $afterParseContent;
    }

    /**
     * Builds the decorator map
     */
    public function buildDecoratorMap() {
        foreach ($this->classMap as $class) {
            if(strlen($class['decorator']) > 0) {
                if(!isset($this->decoratorMap[$class['decNamespace']])) {
                    $this->decoratorMap[$class['decNamespace']] = array();
                }
                $this->decoratorMap[$class['decNamespace']][] = array(
                    'decorator' => $class['decorator'],
                    'decNamespace' => $class['decNamespace'],
                    'decParams' => $class['decParams'],
                    'class' => $class
                );
            }
        }
    }

    /**
     * Builds the class map
     */
    public function buildClassMap() {
        foreach ($this->commentsDef as $def) {
            if(strlen($def['class']) > 0) {
                $this->classMap[$def['class']] = array(
                    'name' => $def['class'],
                    'properties' => array(),
                    'methods' => array(),
                    'access' => 'public',
                    'description' => $def['description'],
                    'extends' => $def['extends'],
                    'decorator' => $def['decorator'],
                    'decNamespace' => $def['decNamespace'],
                    'decParams' => $def['decParams'],
                    'examples' => $def['examples']
                );
                if(strlen($def['access']) > 0) {
                    $this->classMap[$def['class']]['access'] = $def['access'];
                }
            }
            if(strlen($def['function']) > 0) {
                $this->functionMap[$def['function']] = array(
                    'name' => $def['function'],
                    'params' => $def['params'],
                    'return' => $def['return'],
                    'description' => $def['description'],
                    'description_fl' => $this->getFirstLineOfDescription($def['description']),
                    'examples' => $def['examples']
                );
            }
            if(strlen($def['memberOf']) > 0 && isset($this->classMap[$def['memberOf']])) {
                if(strlen($def['var']) > 0) {
                    $this->classMap[$def['memberOf']]['properties'][$def['var']] = array(
                        'name' => $def['var'],
                        'type' => $def['type'],
                        'access' => $def['access'],
                        'description' => $def['description'],
                        'class' => $def['class'],
                        'examples' => $def['examples']
                    );
                }
                if(strlen($def['method']) > 0) {
                    $this->classMap[$def['memberOf']]['methods'][$def['method']] = array(
                        'name' => $def['method'],
                        'type' => 'function',
                        'access' => $def['access'],
                        'description' => $def['description'],
                        'description_fl' => $this->getFirstLineOfDescription($def['description']),
                        'params' => $def['params'],
                        'return' => $def['return'],
                        'examples' => $def['examples']
                    );
                }
            }
        }
    }

    /**
     * Parses a comment block
     *
     * @param string $comment The comment block
     */
    public function parseComment($comment) {
        $def = array(
            'method' => '',
            'description' => '',
            'class' => '',
            'memberOf' => '',
            'access' => 'public',
            'params' => array(),
            'return' => '',
            'var' => '',
            'type' => '',
            'extends' => '',
            'decorator' => '',
            'decNamespace' => '',
            'decParams' => array(),
            'function' => '',
            'examples' => array()
        );
        foreach(explode("\n", $comment) as $line) {
            $line = trim($line);
            if(preg_match('#^@#',$line)) {
                $split = explode(' ',$line);
                $tagName = array_shift($split);
                $tagName = str_replace('@','',$tagName);
                if($tagName == 'method') {
                    $methodName = implode(' ', $split);
                    $def['method'] = $methodName;
                } else if($tagName == 'type') {
                    $type = implode(' ', $split);
                    $def['type'] = $type;
                } else if($tagName == 'var') {
                    $varName = implode(' ', $split);
                    $def['var'] = $varName;
                } else if($tagName == 'private') {
                    $def['access'] = 'private';
                } else if($tagName == 'class') {
                    $className = implode(' ', $split);
                    $def['class'] = $className;
                } else if($tagName == 'memberOf') {
                    $memberName = implode(' ', $split);
                    $def['memberOf'] = $memberName;
                } else if($tagName == 'function') {
                    $functionName = implode(' ', $split);
                    $def['function'] = $functionName;
                }else if($tagName == 'example') {
                    $exampleName = implode(' ', $split);
                    $def['examples'][] = $exampleName;
                } else if($tagName == 'return') {
                    $def['return'] = implode(' ',$split);
                } else if($tagName == 'decorator') {
                    $def['decorator'] = implode(' ',$split);
                } else if($tagName == 'decNamespace') {
                    $def['decNamespace'] = implode(' ',$split);
                } else if($tagName == 'decParam') {
                    $decParamType = array_shift($split);
                    $decParamName = array_shift($split);
                    $decParamDescription = implode(' ',$split);
                    $def['decParams'][] = array(
                        'type' => $decParamType,
                        'name' => $decParamName,
                        'description' => $decParamDescription
                    );
                }  else if($tagName == 'extends') {
                    $def['extends'] = implode(' ',$split);
                } else if($tagName == 'param') {
                    $tagParam = array_shift($split);
                    $tagDescription = implode(' ',$split);
                    $def['params'][$tagParam] = array(
                        'name' => $tagParam,
                        'description' => $tagDescription
                    );
                }
            } else {
                $def['description'] .= $line . "\n";
            }
        }
        $def['description'] = trim($def['description']);
        $this->commentsDef[] = $def;
    }

    /**
     * Parses content from a file and gets all comment blocks
     *
     * @param string $fileContent The file content
     */
    public function parse($fileContent) {
        $ch = '';
        $len = strlen($fileContent);
        $afterComment = false;
        $afterCommentEnd = false;
        $comment = '';
        $starAfterBreak = false;
        $funcDef = '';
        for($i=0; $i < $len; ++$i) {
            $ch = $fileContent[$i];
            if($afterCommentEnd) {
                if($ch == "\n") {
                    $afterCommentEnd = false;
                    $afterComment = false;
                    $this->functionDef[] = trim($funcDef);
                } else {
                    $funcDef .= $ch;
                }
            } else if($afterComment && !$afterCommentEnd) {
                if($ch == '*' && $i+1 < $len && $fileContent[$i+1]=='/') {
                    $this->comments[] = $comment;
                    $afterCommentEnd = true;
                    while ($fileContent[$i]!="\n") {
                        ++$i;
                    }
                } else {
                    if($starAfterBreak && $ch == '*') {
                        $starAfterBreak = false;
                        continue;
                    } else if($ch == "\n") {
                        $starAfterBreak = true;
                    }
                    $comment .= $ch;
                }
            } else if($ch == '/'
                && $i+1 < $len && $fileContent[$i+1]=='*'
                && $i+2 < $len && $fileContent[$i+2]=='*') {
                $afterComment = true;
                $comment = '';
                $funcDef = '';
                $i+=2;
            }
        }

        foreach ($this->comments as $index => $comment) {
            $this->parseComment($comment, $index);
        }
    }

    /**
     * Builds the pages map
     */
    private function buildPagesMap()
    {
        foreach(glob($this->pagesDir . '/*.md') as $file) {
            $fContent = file_get_contents($file);
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $fileName = ucfirst(basename($file,".".$ext));

            $split = explode(PHP_EOL, $fContent);
            $open = false;
            $json = '';
            $shiftCounter = 0;
            foreach($split as $line) {
                ++$shiftCounter;
                if(preg_match('#^}#',$line)) {
                    $open = false;
                    $json .= $line;
                    break;
                }
                if(preg_match('#^{#',$line)) {
                    $open = true;
                }
                if($open) {
                    $json .= $line;
                }
            }
            for($i = 0; $i < $shiftCounter; ++$i) {
                array_shift($split);
            }

            $json = json_decode($json,true);

            $text = implode(PHP_EOL, $split);

            $text = $this->parsedown->text($text);

            $fileName = preg_replace('#( )#','_',$fileName);

            $this->pagesMap[$fileName] = array(
                'meta' => $json,
                'content' => $text
            );
        }
    }

    /**
     * Builds the map for the examples
     */
    private function buildExamplesMap()
    {
        foreach(glob($this->examplesDir . '/*.md') as $file) {
            $fContent = file_get_contents($file);
            $ext = pathinfo($file, PATHINFO_EXTENSION);
            $fileName = basename($file,".".$ext);
            $parsedContent = $this->parsedown->text($fContent);
            $this->examplesMap[$fileName] = $parsedContent;
        }
    }
}