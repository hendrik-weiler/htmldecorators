/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.1

Build: 2021-06-08 16:56:36
*/
/**
 * The htmldecorators namespace
 *
 * Contains the Parser and various helper functions
 *
 * @type object
 */
var HTMLDecorators = (function(document,window) {

    /**
     * Returns the namespace for the stsandard decorators
     *
     * @var StdDecorators
     * @type object
     */
    var StdDecorators = {};

    /**
     * Returns a map for decorators
     *
     * @type object
     */
    var IdMap = {};

    /**
     * Returns a map of generated ids
     *
     * @type object
     */
    var GeneratedIdMap = {};

    /**
     * Extends a class
     *
     * @param theClass The base class
     * @param classToInherit The class to inherit
     * @constructor
     */
    function ExtendsClass(theClass, classToInherit) {
        theClass.prototype = Object.create(classToInherit.prototype);
        theClass.prototype.constructor = theClass;
    }

    /**
     * Sets a handler
     *
     * Note: The function must have a name
     *
     * @param func The function
     * @constructor
     */
    function Handler(func) {
        var fString = func.toString(),
            i = 0,
            funcName = '',
            ch,
            afterFunction = false;
        for (i; i < fString.length; ++i) {
            ch = fString[i];
            if(afterFunction) {
                if(ch == '(') {
                    break;
                } else {
                    funcName += ch;
                }
            } else if(ch == ' ') {
                afterFunction = true;
            }
        }
        window[funcName] = func;
    }

    /**
     * Finds the loaded script tag
     *
     * @return {HTMLScriptElement}
     * @constructor
     */
    function FindMainJSScriptTag() {
        var scripts = document.getElementsByTagName('script'),
            i = 0,
            script,
            src;
        for(i; i < scripts.length; ++i) {
            script = scripts[i];
            src = script.getAttribute('src');
            if(new RegExp('htmldecorators\.js$').test(src)) {
                break;
            }
        }
        return script;
    }

    /**
     * Executes code based on main script tag attributes
     *
     * @constructor
     */
    function ExecuteScriptParams() {
        var scriptTag = FindMainJSScriptTag(),
            params = {
                evaluateDecsTags : false
            };
        if(scriptTag.getAttribute('data-evalhtmldec')!=null) {
            params.evaluateDecsTags = true;
        }

        if(params.evaluateDecsTags) {
            window.addEventListener('load', function () {
                EvaluateHTMLDecs();
            });
        }
    }

    /**
     * Evaluates all tags with data-htmldec attribute contents
     *
     * Callback signature:
     * void cb(html:string,decs:array<DecoratorDef>)
     *
     * @param cb The callback function
     * @constructor
     */
    function EvaluateHTMLDecs(cb) {
        // if there no applier function
        if(!cb) cb = function (e,data) {
            // apply std decorators
            ApplyDecorators(data.decs);
        };
        var htmldecsNodes = document.querySelectorAll('[data-htmldec]'),
            len = htmldecsNodes.length,
            i = 0,
            htmldecsNode;
        for (i; i < len; ++i) {
            htmldecsNode = htmldecsNodes[i];
            EvaluateTag(htmldecsNode,cb);
        }
    }

    /**
     * Evaluates a tags content
     *
     * Callback signature:
     * void cb(html:string,decs:array<DecoratorDef>)
     *
     * @param tag The node
     * @param cb The callback function
     * @constructor
     */
    function EvaluateTag(tag, cb) {
        // if there no applier function
        if(!cb) cb = function (e,data) {
            // apply std decorators
            ApplyDecorators(data.decs);
        };
        if(tag.parentNode) {
            var content = tag.innerHTML,
                parser = new Parser(),
                parsedHTML = parser.parse(content),
                result = {
                    html : parsedHTML,
                    decs : parser.DecoratorList
                };

            tag.innerHTML = result.html;
            tag.removeAttribute('data-htmldec');
            cb(window,result);

        } else {
            console.log('The tag is invalid.');
        }
    }

    /**
     * Finds a decorator by id
     *
     * @param id The id of the decorator
     * @return {null|Decorator}
     */
    function FindById(id) {
        if(IdMap[id]) {
            return IdMap[id];
        }
        return null;
    }

    /**
     * Applies the decorators to the nodes
     *
     * The decoratorNS is when not defined HTMLDecorators.StdDecorators
     *
     * @param decoratorList A list of decorator definitions
     * @param decoratorNS (optional) The decorator namespace
     * @param decoratorNSName (optional but required with decoratorNS) The decorator namespace name
     * @constructor
     * @return void
     */
    function ApplyDecorators(decoratorList, decoratorNS, decoratorNSName) {
        if(typeof decoratorNS == 'undefined') {
            decoratorNS = StdDecorators;
        }
        var i = 0,
            len = decoratorList.length,
            decoratorDef,
            decorator,
            decoratorFound = false,
            splitName,
            decoratorName;
        for (i; i < len; ++i) {
            decoratorDef = decoratorList[i];
            decoratorName = decoratorDef.name;
            decoratorFound = false;
            splitName = decoratorDef.name.split('.');
            // only namespaced decorators can be used when a ns was set
            if(splitName.length == 1 && decoratorNSName) continue;
            if(splitName.length > 1) {
                decoratorName = splitName.pop();
            }

            if(typeof window[decoratorNSName] != 'undefined'
                && typeof window[decoratorNSName][decoratorName] != 'undefined') {
                decorator = new window[decoratorNSName][decoratorName]();
                decoratorFound = true;
            }
            if(typeof decoratorNS[decoratorName] != 'undefined' && !decoratorNSName) {
                decorator = new decoratorNS[decoratorName]();
                decoratorFound = true;
            }
            if(decoratorFound) {
                decorator.define(decoratorDef);
                decorator.render();

                if(decorator.config.id) {
                    IdMap[decorator.config.id] = decorator;
                }
            } else {
                console.log('Decorator "' + decoratorName + '" not found.');
            }
        }
    }

    /**
     * The parser to parse the html data
     *
     * @constructor
     */
    function Parser() {

        /**
         * Returns a list of decorators
         *
         * @type Array<Decorator>
         */
        this.DecoratorList = [];
    }

    /**
     * Generates a random id for the elements
     *
     * @return {string}
     */
    Parser.prototype.generateId = function () {
        var id = 'htmldec' + Date.now() + Math.floor(Math.random()*99999999);
        // ensures the id is always unique
        while (true) {
            if(typeof GeneratedIdMap[id] != 'undefined') {
                id = 'htmldec' + Date.now() + Math.floor(Math.random()*99999999);
            } else {
                break;
            }
        }
        // set the id as index
        GeneratedIdMap[id] = 1;
        return id;
    }
    /**
     * Parse the html and returns the html
     *
     * Variables example:
     * In HTML ${variableName}
     *
     * How to skip a decorator definition:
     * You add two @@
     * Example:
     * When you write <p>@@Bold</p> the output will be <p>@Bold</p>
     *
     * @param value The html string
     * @param variables A key,value object
     * @return {string}
     */
    Parser.prototype.parse = function (value, variables) {
        if(!variables) variables = {};
        // reset list
        this.DecoratorList = [];
        // init vars
        var i = 0,
            j,
            ch,
            ch2,
            len = value.length,
            afterParseValue = '',
            currentDecorator,
            currentDecoratorName = '',
            currentDecoratorParameterKey = '',
            currentDecoratorParameterValue = '',
            currentDecoratorId,
            afterCloseTag = true,
            inDectoratorbeforeName = false,
            inDecoratorInNameCounter = 0,
            inParameterDefinition = false,
            inParameterKey = false,
            inParameterValue = false,
            inParameterValueQuotes = false,
            inParameterValueCounter = 0,
            afterDecoratorNodeConnection = false,
            afterDecoratorNodeOpenTag = false,
            atFollowingClosingTag = false,
            atFollowingOpeningTag = false,
            inVariableDefinition = false,
            inVariableName = '';
        for(i; i < len; ++i) {
            ch = value[i];
            if(inVariableDefinition) {
                if(ch == '}') {
                    if(typeof variables[inVariableName] != 'undefined') {
                        afterParseValue += variables[inVariableName];
                    } else {
                        afterParseValue += '${' + inVariableName + ':not found' + '}';
                    }
                    inVariableDefinition = false;
                } else {
                    inVariableName += ch;
                }
            } else if(!inVariableDefinition && ch == '$' && i+1 < len && value[i+1] == '{') {
                if(value[i-1] != '$') {
                    inVariableDefinition = true;
                    inVariableName = '';
                    i+=1;
                }
            } else if(!afterCloseTag && !afterDecoratorNodeConnection) {
                if(ch == '@') {
                    afterCloseTag = true;
                    i-=1;
                    continue;
                }
                afterParseValue += ch;
                if(i+1 < len && ch == '<' && value[i+1] == '/') {
                    afterCloseTag = true;
                }
            } else if(afterDecoratorNodeConnection && afterDecoratorNodeOpenTag) {
                if(ch == ' ' || ch == '>') {
                    afterParseValue += ' data-dec-id="' + currentDecoratorId + '" ';
                    currentDecorator.setId(currentDecoratorId);
                    this.DecoratorList.push(currentDecorator);
                    afterDecoratorNodeConnection = false;
                    afterDecoratorNodeOpenTag = false;
                }
                afterParseValue += ch;
            } else if(afterDecoratorNodeConnection && !afterDecoratorNodeOpenTag) {
                if (ch == '@' || i == len-1) {
                    afterDecoratorNodeConnection = false;
                    inDectoratorbeforeName = true;

                    // set name, id and add it to the list
                    currentDecorator.setName(currentDecoratorName);
                    currentDecorator.setId(currentDecoratorId);
                    this.DecoratorList.push(currentDecorator);

                    // create a new decorator
                    currentDecorator = new DecoratorDef();
                    // reset name
                    currentDecoratorName = '';

                    inParameterKey = false;
                    inParameterValue = false;
                    continue;
                }
                afterParseValue += ch;
                if (ch == '<') {
                    afterDecoratorNodeOpenTag = true;
                    afterCloseTag = false;
                }
            } else if(afterCloseTag && inParameterDefinition && inParameterValue) {
                if(inParameterValueQuotes && ch == '"' && value[i-1] != '\\') {
                    inParameterValueQuotes = false;
                    ch = '';
                }
                if(i+1 < len && value[i+1] == ')' && !inParameterValueQuotes) {
                    currentDecorator.setParameter(
                        currentDecoratorParameterKey,
                        currentDecoratorParameterValue + ch
                    );

                    inParameterValue = false;
                    inParameterKey = false;

                    currentDecoratorParameterValue = '';
                    currentDecoratorParameterKey = '';
                    continue;
                } else if(ch == ',' && !inParameterValueQuotes) {
                    currentDecorator.setParameter(
                        currentDecoratorParameterKey,
                        currentDecoratorParameterValue
                    );

                    inParameterValue = false;
                    inParameterKey = true;
                    currentDecoratorParameterValue = '';
                    currentDecoratorParameterKey = '';
                    continue;
                } else if(inParameterValueCounter == 0 && ch == '"') {
                    inParameterValueQuotes = true;
                    continue;
                }
                currentDecoratorParameterValue += ch;
                inParameterValueCounter += 1;
            } else if(afterCloseTag && inParameterDefinition && inParameterKey) {
                if(ch == '=') {
                    inParameterValue = true;
                    inParameterKey = false;
                    inParameterValueCounter = 0;
                    continue;
                }
                currentDecoratorParameterKey += ch;
            } else if(afterCloseTag && inParameterDefinition && !inParameterKey) {
                if(ch == ')') {
                    afterDecoratorNodeConnection = true;
                    inParameterDefinition = false;
                } else {
                    inParameterKey = true;
                    currentDecoratorParameterKey = ch;
                }
            } else if(afterCloseTag && inDectoratorbeforeName) {
                // if theres two @@ skip this decorator
                if(inDecoratorInNameCounter == 0 && ch == '@') {
                    afterParseValue += ch;
                    inDectoratorbeforeName = false;
                } else if(ch == '@' || i == len-1) {
                    // set name, id and add it to the list
                    currentDecorator.setName(currentDecoratorName);
                    currentDecorator.setId(currentDecoratorId);
                    this.DecoratorList.push(currentDecorator);

                    // create a new decorator
                    currentDecorator = new DecoratorDef();
                    // reset name
                    currentDecoratorName = '';

                    inParameterKey = false;
                    inParameterValue = false;
                } else if(ch == '<') {
                    afterParseValue += ch;
                    currentDecorator.setName(currentDecoratorName);

                    afterDecoratorNodeConnection = true;
                    inParameterDefinition = false;
                    inDectoratorbeforeName = false;

                    afterDecoratorNodeOpenTag = true;
                    afterCloseTag = false;

                } else if(ch == '(') {
                    inParameterDefinition = true;
                    currentDecorator.setName(currentDecoratorName);
                    inDectoratorbeforeName = false;

                    inParameterKey = false;
                    inParameterValue = false;
                } else {
                    if(ch!="\n" && ch != "\r") {
                        currentDecoratorName += ch;
                        ++inDecoratorInNameCounter;
                    }
                }
            } else if(afterCloseTag && !inDectoratorbeforeName && ch == '@') {
                atFollowingClosingTag = false;
                atFollowingOpeningTag = false;
                for(j=i; j < value.length; ++j) {
                    ch2 = value[j];
                    if(ch2 == '>' && atFollowingOpeningTag) {
                        break;
                    }
                    if(ch2 == '<' && !atFollowingOpeningTag) {
                        if(value[j+1] == '/') {
                            atFollowingClosingTag = true;
                        } else {
                            atFollowingOpeningTag = true;
                        }
                        break;
                    }
                }
                if(atFollowingClosingTag) {
                    afterParseValue += ch;
                    continue;
                }
                currentDecorator = new DecoratorDef();
                currentDecoratorId = this.generateId();
                currentDecoratorName = '';
                inDectoratorbeforeName = true;
                inParameterKey = false;
                inParameterValue = false;
                inDecoratorInNameCounter = 0;
            } else {
                afterParseValue += ch;
            }
        }
        return afterParseValue;
    }

    /**
     * The decorator definition instance
     *
     * Options:
     * string name The name of the decorator
     * object params A key,value map for the parameter
     * string id The id for the element after the decorator
     *
     * @param config The config object
     * @constructor
     */
    function DecoratorDef(config) {

        /**
         * Returns the config
         *
         * @type object
         */
        var config = Object.assign({
            name : 'Undefined',
            params : {},
            id : ''
        }, config);

        /**
         * Returns the name
         *
         * @var name
         * @type string
         */
        this.name = config.name;

        /**
         * Returns the parameter object
         *
         * @var params
         * @type object
         */
        this.params = config.params;

        /**
         * Returns the id
         *
         * @var id
         * @type string
         */
        this.id = config.id;
    }
    /**
     * Sets the id
     *
     * @param id An unique id
     * @return void
     */
    DecoratorDef.prototype.setId = function (id) {
        this.id = id;
    }
    /**
     * Sets the name
     *
     * @param name The name
     * @return void
     */
    DecoratorDef.prototype.setName = function (name) {
        this.name = name.trim();
    }
    /**
     * Sets a parameter
     *
     * @param key The label
     * @param value The value
     * @return void
     */
    DecoratorDef.prototype.setParameter = function (key, value) {
        key = key.replace(/\n|\r| /g,'').trim();
        value = value.replace(/\n|\r/g,'').trim();
        value = JSON.parse('"' + value + '"');
        this.params[key] = value;
    }

    /**
     * The decorator class
     *
     * @constructor
     */
    function Decorator(config) {
        if(!config) config = {};

        /**
         * Returns the config object
         *
         * @var config
         * @type object
         */
        this.config = Object.assign({}, config);

        /**
         * Returns the element
         *
         * @type {null/HTMLElement}
         */
        this.element = null;

        /**
         * Returns the name of the decorator
         *
         * @type {string}
         */
        this.name = '';

        /**
         * Returns the unique element id
         *
         * @type {string}
         */
        this.id = '';
    }

    /**
     * Finds a decorator by id
     *
     * @param id The id of the decorator
     * @return {null|Decorator}
     */
    Decorator.prototype.findById = function (id) {
        return FindById(id);
    }
    /**
     * Creates a decorator to the base decorator element and returns it
     *
     * @param className The class name
     * @param classObj The class obj
     * @param config The config object
     * @return HTMLDecorators.Decorator
     */
    Decorator.prototype.createDecorator = function (className, classObj, config) {
        if(!config) config = {};
        var instance = new classObj();
        instance.define(Object.assign({
            params : {},
            id : this.id,
            name : className
        },config));
        return instance;
    }
    /**
     * Calls a function with a parameter
     *
     * Signature of cb:
     * void cb(mixed result)
     *
     * @param expression The variable expression
     * @param obj The object
     * @param cb The callback function
     * @return string
     */
    Decorator.prototype.callFunction = function (expression, obj, cb) {
        if(!obj) obj = {};
        if(!cb) cb = new Function;
        var args = 'decorator, obj',
            body = 'return ' + expression + '(decorator, obj)',
            result;
        setTimeout(function () {
            result = new Function(args, body)(this,obj);
            cb(result);
        },0);
    }
    /**
     * Gets called when the define was called
     *
     * @return void
     */
    Decorator.prototype.initialized = function () {}
    /**
     * Defines the decorator
     *
     * @param definition The DecoratorDef instance
     * @return void
     */
    Decorator.prototype.define = function (definition) {
        this.config = Object.assign(this.config, definition.params);
        this.id = definition.id;
        this.element = document.querySelector('[data-dec-id="' + definition.id + '"]');
        if(this.element) {
            if(!this.element.decorators) this.element.decorators = {};
            this.element.decorators[definition.name] = this;
        }
        this.name = definition.name;
        this.initialized();
    }
    /**
     * Logs a message
     *
     * @param value A value to log
     */
    Decorator.prototype.log = function (value) {
        console.log(this.name + ': ', value);
    }
    /**
     * Checks a parameter for existence
     *
     * @param name The parameter name
     * @return {boolean}
     */
    Decorator.prototype.paramExist = function(name) {
        return typeof this.config[name] != 'undefined';
    }
    /**
     * Renders the decorator
     *
     * @return void
     */
    Decorator.prototype.render = function () {};

    // execute if attributes were set
    ExecuteScriptParams();

    return {
        Parser : Parser,
        Decorator : Decorator,
        StdDecorators : StdDecorators,
        ExtendsClass : ExtendsClass,
        ApplyDecorators : ApplyDecorators,
        FindById : FindById,
        IdMap : IdMap,
        EvaluateHTMLDecs : EvaluateHTMLDecs,
        EvaluateTag : EvaluateTag,
        Handler : Handler
    };

})(document, window);