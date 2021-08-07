/*
Copyright 2021 Hendrik Weiler

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Version: 0.1.7

Build: 2021-08-07 06:10:55
*/
/**
 * The htmldecorators namespace
 *
 * Contains the Parser and various helper functions
 *
 * @class HTMLDecorators
 * @type object
 * @constructor
 */
var HTMLDecorators = (function(document,window) {

    /**
     * Returns the namespace for the stsandard decorators
     *
     * @var StdDecorators
     * @memberOf HTMLDecorators
     * @type object
     * @public
     */
    var StdDecorators = {};

    /**
     * Returns a map for decorators
     *
     * @var IdMap
     * @memberOf HTMLDecorators
     * @type object
     * @public
     */
    var IdMap = {};

    /**
     * Returns a map of generated ids
     *
     * @var GeneratedIdMap
     * @memberOf HTMLDecorators
     * @type object
     * @private
     */
    var GeneratedIdMap = {};

    /**
     * Returns a map of registered components
     *
     * @var ComponentMap
     * @memberOf HTMLDecorators
     * @type object
     * @private
     */
    var ComponentMap = [];

    /**
     * The class for event handling
     *
     * @class HTMLDecorators.Event
     * @memberOf HTMLDecorators
     * @var Event
     * @type Event
     */
    function Event() {

        /**
         * Returns the event objects where all events are registered
         *
         * @type object
         * @public
         */
        this.events = {};
    }

    /**
     * Removes all eventlisteners of a specific event
     *
     * @memberOf HTMLDecorators.Event
     * @return void
     * @method off
     * @param eventName The name of the event
     */
    Event.prototype.off = function (eventName) {
        if(this.events[eventName]) {
            delete this.events[eventName];
        }
    }
    /**
     * Registers an event
     *
     * @memberOf HTMLDecorators.Event
     * @return void
     * @method on
     * @param eventName The name of the event
     * @param callback The event callback
     */
    Event.prototype.on = function (eventName, callback) {
        if(!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    /**
     * Triggers an event
     *
     * @memberOf HTMLDecorators.Event
     * @return void
     * @method trigger
     * @param eventName The name of the event
     * @param obj Pass data to the event
     * @param sender The event sender
     */
    Event.prototype.trigger = function (eventName, obj, sender) {
        if(this.events[eventName]) {
            var i = 0,
                len = this.events[eventName].length,
                evt;
            for(i ; i < len; ++i) {
                evt = this.events[eventName][i];
                evt(obj, sender);
            }
        }
    }

    // create a event instance
    var EventInst = new Event();

    /**
     * Extends a class
     *
     * @param theClass The base class
     * @param classToInherit The class to inherit
     * @memberOf HTMLDecorators
     * @public
     */
    function ExtendsClass(theClass, classToInherit) {
        theClass.prototype = Object.create(classToInherit.prototype);
        theClass.prototype.constructor = theClass;
    }

    /**
     * Triggers an event through all global and component events
     *
     * @param eventName The name of the event
     * @param obj Pass data to the event
     * @param sender The sender object
     * @memberOf HTMLDecorators
     * @public
     */
    function BroadcastEvent(eventName, obj, sender) {
        for(var key in ComponentMap) {
            ComponentMap[key].event.trigger(eventName, obj, sender);
        }
        HTMLDecorators.Event.trigger(eventName, obj, sender);
    }

    /**
     * Finds a component
     *
     * @param uid A unique identifier for the handler
     * @memberOf HTMLDecorators
     * @method RegisterComponent
     * @public
     */
    function FindComponentById(uid) {
        if(ComponentMap[uid]) {
            return ComponentMap[uid];
        }
        return null;
    }

    /**
     * Registers a component
     *
     * @param uid A unique identifier for the handler
     * @param componentClass The component class
     * @memberOf HTMLDecorators
     * @method RegisterComponent
     * @public
     */
    function RegisterComponent(uid, componentClass) {
        ComponentMap[uid] = new componentClass();
    }

    /**
     * Sets a handler
     *
     * Note: The function must have a name
     *
     * @param func The function
     * @param uid (optional) A unique identifier for the handler
     * @memberOf HTMLDecorators
     * @method Handler
     * @public
     */
    function Handler(func, uid) {
        if(!uid) uid = '';
        var fString = func.toString(),
            i = 0,
            funcName = '',
            ch,
            stringStack = '',
            afterFunction = false;
        for (i; i < fString.length; ++i) {
            ch = fString[i];
            if(afterFunction) {
                if(ch == '(') {
                    break;
                } else {
                    funcName += ch;
                }
            } else if(stringStack.substr(-8) == 'function') {
                afterFunction = true;
            } else {
                stringStack += ch;
            }
        }
        window[funcName + uid] = func;
    }

    /**
     * Finds the loaded script tag
     *
     * @return {HTMLScriptElement}
     * @private
     * @memberOf HTMLDecorators
     * @method FindMainJSScriptTag
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
     * @memberOf HTMLDecorators
     * @private
     * @method ExecuteScriptParams
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
     * @public
     * @memberOf HTMLDecorators
     * @method EvaluateHTMLDecs
     */
    async function EvaluateHTMLDecs(data, cb) {
        if(!data) data = {};
        // if there no applier function
        if(!cb) cb = async function (e,data) {
            // apply std decorators
            await ApplyDecorators(data.decs);
        };
        var htmldecsNodes = document.querySelectorAll('[data-htmldec]'),
            len = htmldecsNodes.length,
            i = 0,
            htmldecsNode;
        for (i; i < len; ++i) {
            htmldecsNode = htmldecsNodes[i];
            // if the inject attribute is set
            if(htmldecsNode.dataset.inject) {
                // override data with a custom value
                var injectedData = new Function('window,document','return '
                    + htmldecsNode.dataset.inject)(window,document);
                await EvaluateTag(htmldecsNode,injectedData,cb);
            } else {
                await EvaluateTag(htmldecsNode,data,cb);
            }
        }
        EventInst.trigger('decHTMLDecsEvaluated');
    }

    /**
     * Generates and registers an unique id
     *
     * @return {string}
     * @memberOf HTMLDecorators
     * @private
     * @method RegisterUniqueId
     */
    function RegisterUniqueId() {
        var parser = new Parser(),
            id = parser.generateId();
        return id;
    }

    /**
     * Evaluates a tags content
     *
     * Callback signature:
     * void cb(html:string,decs:array<DecoratorDef>)
     *
     * @param tag The node
     * @param cb The callback function
     * @memberOf HTMLDecorators
     * @public
     * @method EvaluateTag
     */
    async function EvaluateTag(tag, data, cb) {
        if(!data) data = {};
        // if there no applier function
        if(!cb) cb = async function (e,data) {
            // apply std decorators
            await ApplyDecorators(data.decs);
        };
        if(tag.parentNode) {
            data.__data__ = data;
            var content = tag.innerHTML,
                parser = new Parser(),
                parsedHTML = parser.parse(content,data),
                result = {
                    html : parsedHTML,
                    decs : parser.DecoratorList
                };

            tag.innerHTML = result.html;
            tag.removeAttribute('data-htmldec');
            tag.removeAttribute('data-htmldec-render');
            await cb(window,result);
            EventInst.trigger('decTagEvaluated',tag);

        } else {
            console.log('The tag is invalid.');
        }
    }

    /**
     * Finds a decorator by id
     *
     * @param id The id of the decorator
     * @return {null|Decorator}
     * @memberOf HTMLDecorators
     * @public
     * @method FindById
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
     *
     * @param decoratorList A list of decorator definitions
     * @public
     * @return void
     * @memberOf HTMLDecorators
     * @method ApplyDecorators
     */
    async function ApplyDecorators(decoratorList) {
        var i = 0,
            len = decoratorList.length,
            decoratorDef,
            decorator,
            decoratorFound = false,
            splitName,
            decoratorName,
            decoratorNS,
            decoratorNSName;
        for (i; i < len; ++i) {
            decoratorDef = decoratorList[i];
            decoratorName = decoratorDef.name;
            decoratorFound = false;
            splitName = decoratorDef.name.split('.');
            // set std namespace
            if(splitName.length == 1) {
                decoratorNS = StdDecorators;
                decoratorNSName = 'StdDecorators';
                decoratorName = splitName[0];
            }
            // set custom namespace
            if(splitName.length > 1) {
                decoratorNS = window[splitName[0]];
                decoratorNSName = splitName[0];
                decoratorName = splitName[splitName.length - 1];
            }
            if(typeof decoratorNS != 'undefined'
                && typeof decoratorNS[decoratorName] != 'undefined') {
                decorator = new decoratorNS[decoratorName]();
                decorator.define(decoratorDef);
                await decorator.render();

                if(decorator.config.id) {
                    var component = decorator.getComponent();
                    // if the decorator is in a component
                    if(component) {
                        // register on components idmap
                        component.IdMap[decorator.config.id] = decorator;
                    } else {
                        //  else register on global idmap
                        IdMap[decorator.config.id] = decorator;
                    }
                }
            } else {
                console.log('Namespace "' + decoratorNSName + '" is not defined.',decoratorDef);
            }
        }
    }

    /**
     * The parser to parse the html data
     *
     * @class HTMLDecorators.Parser
     * @memberOf HTMLDecorators
     * @var Parser
     * @type Parser
     */
    function Parser() {

        /**
         * Returns a list of decorators
         *
         * @type Array<Decorator>
         * @public
         */
        this.DecoratorList = [];
    }

    /**
     * Generates a random id for the elements
     *
     * @public
     * @memberOf HTMLDecorators.Parser
     * @return {string}
     * @method generateId
     */
    Parser.prototype.generateId = function () {
        var id;
        // ensures the id is always unique
        while (true) {
            id = 'htmldec' + Date.now() + Math.floor(Math.random()*99999999);
            if(typeof GeneratedIdMap[id] == 'undefined') {
                break;
            }
        }
        // set the id as index
        GeneratedIdMap[id] = 1;
        return id;
    }
    /**
     * Evaluates a variable expression
     *
     * @public
     * @param variables The variable object
     * @param variableContent The variable string to evaluate
     * @return string
     * @memberOf HTMLDecorators.Parser
     * @method evaluateVariable
     */
    Parser.prototype.evaluateVariable = function (variables, variableContent) {
        if(typeof variables != 'object') return variables;
        variableContent = variableContent.replace(/&gt;/g,'>');
        variableContent = variableContent.replace(/&lt;/g,'<');
        var keys = [],
            vars = [];
        for(var key in variables) {
            // if its not a array index
            if(!/^[0-9]+$/.test(key)) {
                keys.push(key);
                vars.push(variables[key]);
            }
        }
        if(typeof variables.length != 'undefined') {
            keys.push('__array__');
            vars.push(variables);
        }
        var result = new Function(keys.join(','),'try { return ' + variableContent + ' } catch(e) { return {error:true,message:e} }').apply(this, vars);
        if(result && result.error) {
            console.warn(result.message, 'Possible variables: ' + keys.join(', '));
            return undefined;
        }
        if(typeof result == 'undefined') {
            console.warn('Failed to evaluate: "' + variableContent + '". ', 'Possible variables: ' + keys.join(', '));
        }
        return result;
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
     * @public
     * @param value The html string
     * @param variables A key,value object
     * @return {string}
     * @memberOf HTMLDecorators.Parser
     * @method parse
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
            inVariableDefinitionNextIsBracket = false,
            inVariableName = '';
        for(i; i < len; ++i) {
            ch = value[i];
            if(inVariableDefinition) {
                if(ch == '}') {
                    var result = this.evaluateVariable(variables, inVariableName);
                    if(typeof result != 'undefined') {
                        if(inParameterValue) {
                            if(typeof result == 'object') {
                                currentDecorator.setParameter(
                                    currentDecoratorParameterKey,
                                    result
                                );
                            } else {
                                currentDecoratorParameterValue += result;
                            }
                        } else {
                            afterParseValue += result;
                        }

                    } else {
                        afterParseValue += '${' + inVariableName + ':not found' + '}';
                    }
                    if(i+1 < value.length && value[i+1]==')' && inParameterValue) {
                        inVariableDefinitionNextIsBracket = true;
                        i-=1;
                    }
                    inVariableDefinition = false;
                } else {
                    inVariableName += ch;
                }
            } else if(!inVariableDefinition && ch == '$' && i+1 < len && value[i+1] == '{') {
                var j = i - 1,
                    dollorCh,
                    moreThanOneDollar = false;
                for(j; j > 0; --j) {
                    dollorCh = value[j];
                    if(dollorCh != '$') {
                        if(moreThanOneDollar) {
                            break;
                        }
                        inVariableDefinition = true;
                        inVariableName = '';
                        i+=1;
                        break;
                    } else {
                        moreThanOneDollar = true;
                    }
                }
            } else if(!afterCloseTag && !afterDecoratorNodeConnection) {
                if(ch == '@') {
                    afterCloseTag = true;
                    inVariableDefinitionNextIsBracket = false;
                    i-=1;
                    continue;
                }
                afterParseValue += ch;
                if(i+1 < len && ch == '<' && value[i+1] == '/') {
                    afterCloseTag = true;
                    inVariableDefinitionNextIsBracket = false;
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
                    if(!currentDecorator.paramExist(currentDecoratorParameterKey)) {
                        var paramValue = currentDecoratorParameterValue + ch;
                        if(inVariableDefinitionNextIsBracket) {
                            paramValue = currentDecoratorParameterValue;
                            inVariableDefinitionNextIsBracket = false;
                        }

                        currentDecorator.setParameter(
                            currentDecoratorParameterKey,
                            paramValue
                        );
                    }

                    inParameterValue = false;
                    inParameterKey = false;

                    currentDecoratorParameterValue = '';
                    currentDecoratorParameterKey = '';
                    continue;
                } else if(ch == ',' && !inParameterValueQuotes) {
                    if(!currentDecorator.paramExist(currentDecoratorParameterKey)) {
                        currentDecorator.setParameter(
                            currentDecoratorParameterKey,
                            currentDecoratorParameterValue
                        );
                    }

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
                // if the char after the @ decorator is empty skip
                if(inDecoratorInNameCounter == 0 && ch == ' ') {
                    inDectoratorbeforeName = false;
                // if theres multiple @ skip this decorator
                } else if(inDecoratorInNameCounter == 0 && ch == '@') {
                    for(j=i+1; j < len; ++j) {
                        ch2 = value[j];
                        if(ch2=='@') {
                            afterParseValue += ch;
                            i+=1;
                        } else {
                            break;
                        }
                    }
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
     * @class HTMLDecorators.DecoratorDef
     * @memberOf HTMLDecorators
     * @var DecoratorDef
     * @type DecoratorDef
     * @private
     */
    function DecoratorDef(config) {

        /**
         * Returns the config
         *
         * @type object
         * @var config
         * @memberOf HTMLDecorators.DecoratorDef
         * @private
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
         * @public
         * @memberOf HTMLDecorators.DecoratorDef
         */
        this.name = config.name;

        /**
         * Returns the parameter object
         *
         * @var params
         * @type object
         * @public
         * @memberOf HTMLDecorators.DecoratorDef
         */
        this.params = config.params;

        /**
         * Returns the id
         *
         * @var id
         * @type string
         * @public
         * @memberOf HTMLDecorators.DecoratorDef
         */
        this.id = config.id;
    }
    /**
     * Sets the id
     *
     * @param id An unique id
     * @return void
     * @public
     * @memberOf HTMLDecorators.DecoratorDef
     */
    DecoratorDef.prototype.setId = function (id) {
        this.id = id;
    }
    /**
     * Sets the name
     *
     * @param name The name
     * @return void
     * @public
     * @memberOf HTMLDecorators.DecoratorDef
     * @method setName
     */
    DecoratorDef.prototype.setName = function (name) {
        this.name = name.trim();
    }
    /**
     * Checks if a param was already set
     *
     * @param key
     * @return {boolean}
     * @public
     * @memberOf HTMLDecorators.DecoratorDef
     * @method paramExist
     */
    DecoratorDef.prototype.paramExist = function (key) {
        key = key.replace(/\n|\r| /g,'').trim();
        return typeof this.params[key] != 'undefined';
    }
    /**
     * Sets a parameter
     *
     * @param key The label
     * @param value The value
     * @return void
     * @public
     * @memberOf HTMLDecorators.DecoratorDef
     * @method setParameter
     */
    DecoratorDef.prototype.setParameter = function (key, value) {
        key = key.replace(/\n|\r| /g,'').trim();
        if(typeof value != 'object') {
            value = value.replace(/\n|\r/g,'').trim();
            value = JSON.parse('"' + value + '"');
        }
        this.params[key] = value;
    }

    /**
     * The decorator class
     *
     * @class HTMLDecorators.Decorator
     * @memberOf HTMLDecorators
     * @var Decorator
     * @type Decorator
     */
    function Decorator(config) {
        if(!config) config = {};

        /**
         * Returns the config object
         *
         * @var config
         * @type object
         * @public
         * @memberOf HTMLDecorators.Decorator
         */
        this.config = Object.assign({}, config);

        /**
         * Returns the element
         *
         * @type {null/HTMLElement}
         * @public
         * @memberOf HTMLDecorators.Decorator
         */
        this.element = null;

        /**
         * Returns the name of the decorator
         *
         * @type {string}
         * @public
         * @memberOf HTMLDecorators.Decorator
         */
        this.name = '';

        /**
         * Returns the unique element id
         *
         * @type {string}
         * @public
         * @memberOf HTMLDecorators.Decorator
         */
        this.id = '';
    }

    /**
     * Finds a decorator by id
     *
     * Searches first in
     * 1. Component if found
     * 2. Global
     *
     * To force a search in global
     * you have to add "$global." to the
     * id e.g. "$global.nav"
     *
     * @param id The id of the decorator
     * @return {null|Decorator}
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method findById
     */
    Decorator.prototype.findById = function (id) {
        var component,
            globalCall = false;
        if(/^\$global\./.test(id)) {
            globalCall = true;
            id = id.replace(/\$global\./,'');
        }
        // search in component first if exist
        if((component = this.getComponent()) && !globalCall) {
            return component.findById(id);
        } else {
            return FindById(id);
        }
    }
    /**
     * Checks if the data parameter is empty or not
     *
     * @return {boolean}
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method dataIsEmpty
     */
    Decorator.prototype.dataIsEmpty = function () {
        var isEmpty = true;
        for(var key in this.config.data) {
            if(!/^__/.test(key)) {
                isEmpty = false;
                break;
            }
        }
        return isEmpty;
    }
    /**
     * Creates a decorator to the base decorator element and returns it
     *
     * @param className The class name
     * @param classObj The class obj
     * @param config The config object
     * @return HTMLDecorators.Decorator
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method createDecorator
     */
    Decorator.prototype.createDecorator = function (className, classObj, config) {
        if(!config) config = {};
        var instance = new classObj();
        instance.define({
            params : config,
            id : this.id,
            name : className
        },true);
        return instance;
    }
    /**
     * Calls a function with a parameter
     *
     * Signature of cb:
     * void cb(mixed result)
     *
     * To force a call in global
     * you have to add "$global." to the
     * id e.g. "$global.functionName"
     *
     * @param expression The variable expression
     * @param obj The object
     * @param cb The callback function
     * @return string
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method callFunction
     */
    Decorator.prototype.callFunction = function (expression, obj, cb) {
        if(!obj) obj = {};
        if(!cb) cb = new Function;
        var component,
            globalCall = false;
        if(/^\$global\./.test(expression)) {
            globalCall = true;
            expression = expression.replace(/\$global\./,'');
        }
        if((component = this.getComponent()) && !globalCall) {
            var args = 'component, decorator, obj',
                body = 'return component.' + expression + '(decorator, obj)',
                result;
            // calls the function after all decorators are rendered
            setTimeout(function () {
                result = new Function(args, body)(component,this,obj);
                cb(result);
            }.bind(this),0);
        } else {
            var args = 'decorator, obj',
                body = 'return ' + expression + '(decorator, obj)',
                result;
            // calls the function after all decorators are rendered
            setTimeout(function () {
                result = new Function(args, body)(this,obj);
                cb(result);
            }.bind(this),0);
        }
    }
    /**
     * Gets called when the define was called
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method initialized
     */
    Decorator.prototype.initialized = function () {}
    /**
     * Defines the decorator
     *
     * @param definition The DecoratorDef instance
     * @param noDecoratorRegistering The decorator should not register on the element
     * @return void
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method define
     */
    Decorator.prototype.define = function (definition, noDecoratorRegistering) {
        if(!noDecoratorRegistering) noDecoratorRegistering = false;
        this.config = Object.assign(this.config, definition.params);
        this.id = definition.id;
        this.element = document.querySelector('[data-dec-id="' + definition.id + '"]');
        // if a component replaced the initial node
        if(!this.element) {
            // get the correct node
            // this will only work if decorators was put into the main node of the component
            this.element = document.querySelector('[data-replaced-dec-id="' + definition.id + '"]');
            if(this.element) {
                // change the id to the actual id
                this.id = this.element.getAttribute('data-dec-id');
            }
        }
        if(this.element && !noDecoratorRegistering) {
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
     * @param value2 A second value to log
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method log
     */
    Decorator.prototype.log = function (value, value2) {
        if(!value2) value2 = '';
        console.log(this.name + ': ', value, value2);
    }
    /**
     * Finds the next stdInit element
     *
     * Search steps:
     * 1. Component
     * 2. Global
     *
     * @param value A value to log
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method getStdInit
     */
    Decorator.prototype.getStdInit = function () {
        var component;
        if(component = this.getComponent()) {
            var dec = component.findById('stdInit');
            if(dec) {
                return dec;
            } else {
                return HTMLDecorators.FindById('stdInit');
            }
        } else {
            return HTMLDecorators.FindById('stdInit');
        }
    }
    /**
     * Gets the component
     *
     * @return HTMLDecorators.Component
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method getComponent
     */
    Decorator.prototype.getComponent = function () {
        // can happen if a decorator was set at the end of tag.
        // The decorator will not have an assigend element
        // @Init for example
        if(this.element==null) return;
        var component = null,
            node = this.element,
            i = 0,
            componentId = node.getAttribute('data-component-id');
        // if its already the main node
        if(componentId!=null) return FindComponentById(componentId);
        // else search above
        for(i; i < 100; ++i) {
            if(node==null || !node.getAttribute) break;
            componentId = node.getAttribute('data-component-id');
            if(componentId!=null) {
                component = FindComponentById(componentId);
                break;
            } else {
                node = node.parentNode;
            }
        }
        return component;
    }
    /**
     * Checks a parameter for existence
     *
     * @param name The parameter name
     * @return {boolean}
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method paramExist
     */
    Decorator.prototype.paramExist = function(name) {
        return typeof this.config[name] != 'undefined';
    }
    /**
     * Renders the decorator
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Decorator
     * @method render
     */
    Decorator.prototype.render = function () {};

    /**
     * The component class
     *
     * @class HTMLDecorators.Component
     * @memberOf HTMLDecorators
     * @var Component
     * @type Component
     */
    function Component() {

        /**
         * Returns the id of the component
         *
         * @memberOf HTMLDecorators.Component
         * @var id
         * @type string
         */
        this.id = null;

        /**
         * Returns the templates first node
         *
         * @memberOf HTMLDecorators.Component
         * @var element
         * @type HTMLElement
         */
        this.element = null;

        /**
         * Returns the component elements decorator instance
         *
         * @memberOf HTMLDecorators.Component
         * @var decorator
         * @type HTMLDecorators.Decorator
         */
        this.decorator = null;

        /**
         * Returns a parser instance
         *
         * @memberOf HTMLDecorators.Component
         * @var parser
         * @type HTMLDecorators.Parser
         */
        this.parser = new Parser();

        /**
         * Returns a map for decorators
         *
         * @var IdMap
         * @memberOf HTMLDecorators.Component
         * @type object
         * @public
         */
        this.IdMap = {};

        /**
         * Returns the parent component or null
         *
         * @var parent
         * @memberOf HTMLDecorators.Component
         * @type HTMLDecorators.Component
         */
        this.parent = null;

        /**
         * Returns the event instance
         *
         * @var event
         * @memberOf HTMLDecorators.Component
         * @type HTMLDecorators.Event
         */
        this.event = null;
    }
    /**
     * Registers an event
     *
     * @memberOf HTMLDecorators.Component
     * @return void
     * @method on
     * @param eventName The name of the event
     * @param callback The event callback
     */
    Component.prototype.on = function (eventName,callback) {
        this.event.on(eventName,callback);
    }
    /**
     * Triggers an event from this component upwards
     *
     * @memberOf HTMLDecorators.Component
     * @return void
     * @method emit
     * @param eventName The name of the event
     * @param obj Pass data to the event
     * @param sender The sender object
     */
    Component.prototype.emit = function (eventName, obj, sender) {
        if(!sender) sender = this;
        this.event.trigger(eventName, obj, sender);
        if (this.parent) {
            this.parent.emit(eventName, obj,sender);
        }
    }
    /**
     * Triggers an event to all global and component events
     *
     * @memberOf HTMLDecorators.Component
     * @return void
     * @method broadcast
     * @param eventName The name of the event
     * @param obj Pass data to the event
     * @param sender The sender object
     */
    Component.prototype.broadcast = function (eventName, obj, sender) {
        if(!sender) sender = this;
        BroadcastEvent(eventName, obj, sender);
    }
    /**
     * Finds a decorator by id
     *
     * @param id The id of the decorator
     * @return {null|Decorator}
     * @public
     * @memberOf HTMLDecorators.Component
     * @method findById
     */
    Component.prototype.findById = function (id) {
        var decorator = this.IdMap[id];
        if(decorator) {
            return decorator;
        }
        return null;
    }
    /**
     * Sets the data for rendering
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Component
     * @param data The new data
     * @method setData
     */
    Component.prototype.setData = function(data) {
        if(this.decorator) {
            this.decorator.config.data = data;
        }
    }
    /**
     * Gets the data for rendering
     *
     * @return null/array/object
     * @public
     * @memberOf HTMLDecorators.Component
     * @method getData
     */
    Component.prototype.getData = function() {
        if(this.decorator) {
            return this.decorator.config.data;
        }
        return null;
    }
    /**
     * Gets called when the component is created
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Component
     * @method created
     */
    Component.prototype.created = function () {};
    /**
     * Gets called after the component was rendered
     *
     * After rendering the events will be lost.
     * So best use this method to readd event listeners
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Component
     * @method updated
     */
    Component.prototype.updated = function () {};
    /**
     * Gets called before the rendering
     *
     * This can be used to set data before the variables gets parsed
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Component
     * @method initializeData
     */
    Component.prototype.initializeData = function() {};
    /**
     * Renders the component
     *
     * @return void
     * @public
     * @memberOf HTMLDecorators.Component
     * @method render
     */
    Component.prototype.render = async function () {
        if(this.decorator) {

            // set the __uid__ if not present
            if(!this.decorator.config.data) this.decorator.config.data = {};
            this.decorator.config.data = Object.assign(
                this.decorator.config.data,{
                    __uid__:this.decorator.loadHTML.uid,
                    __slot__ : this.decorator.slotTemplate,
                    __data__ : this.decorator.config.data
                });
            var parsedHtml = this.parser.parse(this.decorator.template,this.decorator.config.data);

            this.element.innerHTML = parsedHtml;
            var node = null,
                i = 0,
                len = this.element.childNodes.length;
            for(i; i < len; ++i) {
                node = this.element.childNodes[i];
                if(node.nodeType != Node.TEXT_NODE) {
                    break;
                }
            }
            // insert before main element
            node.setAttribute('data-replaced-dec-id', node.getAttribute('data-dec-id'));
            node.setAttribute('data-component-id',this.decorator.loadHTML.uid);
            node.setAttribute('data-dec-id',this.decorator.loadHTML.uid);

            this.element.parentNode.insertBefore(node, this.element);
            this.element.parentNode.removeChild(this.element);
            this.element = node;

            // reconfig component decorator
            this.decorator.element = this.element;
            this.decorator.id = this.decorator.loadHTML.uid;

            if(!node) {
                this.log('Inside of the template tag must be children.');
                return;
            }

            // apply the decorators set from caller
            for(var key in this.decorator.appliedDecorators) {
                this.decorator.appliedDecorators[key].element = this.element;
                this.decorator.appliedDecorators[key].id = this.decorator.loadHTML.uid;
                if(typeof this.decorator.appliedDecorators[key].compWrapper == 'undefined') {
                    await this.decorator.appliedDecorators[key].render();
                }
            }

            // recreate the events
            this.event = new Event();

            // apply parsed decorators
            await ApplyDecorators(this.parser.DecoratorList);

            this.updated();
        } else {
            this.log('Component decorator not found.');
        }
    };

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
        Handler : Handler,
        RegisterUniqueId : RegisterUniqueId,
        Event : EventInst,
        Component : Component,
        RegisterComponent : RegisterComponent,
        ComponentMap : ComponentMap,
        FindComponentById : FindComponentById,
        BroadcastEvent : BroadcastEvent
    };

})(document, window);