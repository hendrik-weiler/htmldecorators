<?php

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
     *
     * @param string $sourceDir The source dir to search in
     * @param string $buildDir The build dir to save the files to
     * @param int $version The applications version
     */
    public function __construct($sourceDir='lib',$buildDir='docs', $version=0)
    {
        $this->buildDir = $buildDir;
        $this->sourceDir = $sourceDir;
        $this->version = $version;
    }

    /**
     * Creates html output from a template
     *
     * @param string $templateName The name of the template file
     * @param array $data The data for the inside of the template
     * @return string
     */
    public function createFromTemplate($templateName, $data) {

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
        $this->buildClassMap();
        $this->buildDecoratorMap();
        // reset build dir
        if(file_exists($this->buildDir)) {
            foreach (glob($this->buildDir.'/*') as $file) {
                unlink($file);
            }
        } else {
            mkdir($this->buildDir);
        }
        $indexHTML = $this->createFromTemplate('tmpl.index.php', array(
            'classes' => $this->classMap,
            'decorators' => $this->decoratorMap,
            'functions' => $this->functionMap
        ));
        file_put_contents($this->buildDir . '/index.html', $indexHTML);
        foreach ($this->classMap as $class) {
            $classHTML = $this->createFromTemplate('tmpl.class.php', $class);
            file_put_contents($this->buildDir . '/class.' . $class['name'] . '.html', $classHTML);
            foreach ($class['methods'] as $method) {
                $methodHTML = $this->createFromTemplate('tmpl.method.php', $method);
                file_put_contents($this->buildDir . '/class.' . $class['name'] . '.' . $method['name'] . '.html', $methodHTML);
            }
        }
        foreach ($this->functionMap as $function) {
            $functionHTML = $this->createFromTemplate('tmpl.function.php', $function);
            file_put_contents($this->buildDir . '/function.'. $function['name'] . '.html', $functionHTML);
        }
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
                    'decParams' => $def['decParams']
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
                    'description_fl' => $this->getFirstLineOfDescription($def['description'])
                );
            }
            if(strlen($def['memberOf']) > 0 && isset($this->classMap[$def['memberOf']])) {
                if(strlen($def['var']) > 0) {
                    $this->classMap[$def['memberOf']]['properties'][$def['var']] = array(
                        'name' => $def['var'],
                        'type' => $def['type'],
                        'access' => $def['access'],
                        'description' => $def['description'],
                        'class' => $def['class']
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
                        'return' => $def['return']
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
            'function' => ''
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
}