!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports,require("@polymer/polymer/polymer-legacy.js"),require("@polymer/polymer/lib/utils/flattened-nodes-observer.js"),require("@polymer/polymer/lib/legacy/polymer.dom.js"),require("@polymer/polymer/lib/utils/async.js"),require("@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"),require("@lrnwebcomponents/schema-behaviors/schema-behaviors.js"),require("@polymer/polymer/polymer-element.js")):"function"==typeof define&&define.amd?define(["exports","@polymer/polymer/polymer-legacy.js","@polymer/polymer/lib/utils/flattened-nodes-observer.js","@polymer/polymer/lib/legacy/polymer.dom.js","@polymer/polymer/lib/utils/async.js","@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js","@lrnwebcomponents/schema-behaviors/schema-behaviors.js","@polymer/polymer/polymer-element.js"],n):n((e=e||self).CodeEditor={},e.polymerLegacy_js,e.flattenedNodesObserver_js,e.polymer_dom_js,e.async,null,null,e.polymerElement_js)}(this,function(e,n,t,o,a,i,r,l){"use strict";function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,n){return(u=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function h(e,n){return!n||"object"!=typeof n&&"function"!=typeof n?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):n}function p(e,n,t){return(p="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,n,t){var o=function(e,n){for(;!Object.prototype.hasOwnProperty.call(e,n)&&null!==(e=c(e)););return e}(e,n);if(o){var a=Object.getOwnPropertyDescriptor(o,n);return a.get?a.get.call(t):a.value}})(e,n,t||e)}function m(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function g(){var e=m(['\n      <style>\n        :host {\n          display: block;\n        }\n        iframe {\n          border: none;\n          width: 100%;\n          height: 100%;\n          padding: 0;\n        }\n      </style>\n      <iframe id="iframe"></iframe>\n    ']);return g=function(){return e},e}var y=function(e){function n(){var e;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),(e=h(this,c(n).call(this))).iframe=null,e}var t,o,a;return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&u(e,n)}(n,l.PolymerElement),t=n,a=[{key:"template",get:function(){return l.html(g())}},{key:"properties",get:function(){return{value:{type:String,value:"",observer:"monacoValueChanged"},eventTypes:{type:Object,value:{ready:"ready",valueChanged:"valueChanged",languageChanged:"languageChanged",themeChanged:"themeChanged"}},language:{type:String,value:"javascript",observer:"monacoLanguageChanged"},theme:{type:String,value:"vs-dark",observer:"monacoThemeChanged"},libPath:{type:String,value:"node_modules/monaco-editor/min/vs"}}}}],(o=[{key:"connectedCallback",value:function(){var e=this;p(c(n.prototype),"connectedCallback",this).call(this),window.addEventListener("message",function(n){e.handleMessage(n)}),setTimeout(function(){e.__init||e.initIFrame()},500)}},{key:"disconnectedCallback",value:function(){var e=this;p(c(n.prototype),"disconnectedCallback",this).call(this),window.removeEventListener("message",function(n){e.handleMessage(n)}),this.__init=!1}},{key:"initIFrame",value:function(){var e=this;if(this.iframe=this.shadowRoot.querySelector("#iframe"),this.document&&!this.__init){this.__init=!0;var n=document.createElement("div");n.id="container",this.document.body.appendChild(n);var t="\nvar eventTypes = {\n  ready: 'ready',\n  valueChanged: 'valueChanged',\n  languageChanged: 'languageChanged',\n  themeChanged: 'themeChanged',\n};\n\nclass MonacoEditor {\n  constructor() {\n    this.language = 'javascript';\n    this.value = '';\n    this.editor = null;\n    this.setupEventListener('message', this.handleMessage.bind(this));\n    this.setupEditor();\n  }\n\n  setupEditor() {\n    require.config({ paths: { vs: '".concat(this.libPath,"' } });\n    require(['vs/editor/editor.main'], () => {\n      this.editor = monaco.editor.create(document.getElementById('container'), {\n        value: this.value,\n        language: this.language,\n        scrollBeyondLastLine: false,\n        minimap: {\n          enabled: false\n        }\n      });\n\n      const model = this.editor.getModel();\n      model.onDidChangeContent(() => {\n        const value = model.getValue();\n        this.onValueChanged(value);\n      });\n\n      this.ready();\n    });\n  }\n\n  ready() {\n    setTimeout(() => {\n      this.postMessage(eventTypes.ready, null);\n      this.setupEventListener(\n        eventTypes.valueChanged,\n        this.onValueChanged.bind(this)\n      );\n    }, 100);\n  }\n\n  _handleMessage(data) {\n    switch (data.event) {\n      case eventTypes.valueChanged:\n        this.onInputValueChanged(data.payload);\n        break;\n      case eventTypes.languageChanged:\n        this.onLanguageChanged(data.payload);\n        break;\n      case eventTypes.themeChanged:\n        this.onThemeChanged(data.payload);\n        break;\n      default:\n        break;\n    }\n  }\n\n  handleMessage(message) {\n    try {\n      const data = JSON.parse(message.data);\n      this._handleMessage(data);\n    } catch (error) {\n      console.warn(error);\n      return;\n    }\n  }\n\n  postMessage(event, payload) {\n    window.parent.postMessage(\n      JSON.stringify({ event, payload }),\n      window.parent.location.href\n    );\n  }\n\n  setupEventListener(type, callback) {\n    window.addEventListener(type, data => {\n      callback(data);\n    });\n  }\n\n  onInputValueChanged(newValue) {\n    if (newValue !== this.value) {\n      this.value = newValue;\n      this.editor.getModel().setValue(newValue);\n      this.postMessage(eventTypes.valueChanged, newValue);\n    }\n  } \n\n  onValueChanged(newValue) {\n    if (newValue !== this.value) {\n      this.value = newValue;\n      this.postMessage(eventTypes.valueChanged, newValue);\n    }\n  }\n\n  onLanguageChanged(newLang) {\n    monaco.editor.setModelLanguage(this.editor.getModel(), newLang);\n  }\n\n  onThemeChanged(newValue) {\n    monaco.editor.setTheme(newValue);\n  }\n}\n\nnew MonacoEditor();\n");this.insertScriptElement({src:"".concat(this.libPath,"/loader.js"),onload:function(){e.insertScriptElement({text:t}),e.insertStyle()}})}}},{key:"handleMessage",value:function(e){try{var n=e.data;"string"==typeof e.data&&(n=JSON.parse(e.data)),this._handleMessage(n)}catch(e){return void console.warn("[monaco-element] Error while parsing message:",e)}}},{key:"_handleMessage",value:function(e){e.event===this.eventTypes.valueChanged?this.dispatchEvent(new CustomEvent("value-changed",{detail:e.payload})):e.event===this.eventTypes.ready&&this.onIFrameReady()}},{key:"onIFrameReady",value:function(){this.monacoValueChanged(this.value),this.monacoLanguageChanged(this.language),this.monacoThemeChanged(this.theme)}},{key:"monacoValueChanged",value:function(e){this.postMessage(this.eventTypes.valueChanged,e)}},{key:"monacoLanguageChanged",value:function(e){this.postMessage(this.eventTypes.languageChanged,e)}},{key:"monacoThemeChanged",value:function(e){this.postMessage(this.eventTypes.themeChanged,e)}},{key:"postMessage",value:function(e,n){this.iframe&&null!=this.iframe.contentWindow&&this.iframe.contentWindow.postMessage(JSON.stringify({event:e,payload:n}),window.location.href)}},{key:"insertScriptElement",value:function(e){var n=e.src,t=e.text,o=e.onload,a=this.document.createElement("script");n&&(a.src=n),t&&(a.text=t),o&&(a.onload=o),this.document.head.appendChild(a)}},{key:"insertStyle",value:function(){var e="\n    body {\n      height: 100vh;\n      overflow: hidden;\n      margin: 0;\n    }    \n    #container {\n      width: 100%;\n      height: 100%;\n    }\n    .debug-red {\n      background : red;\n    }\n    .debug-green {\n      background : green;\n    }\n    html,body {\n      margin : 0px;\n    }",n=this.document.head,t=this.document.createElement("style");t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(this.document.createTextNode(e)),n.appendChild(t)}},{key:"document",get:function(){if(this.iframe.contentWindow)return this.iframe.contentWindow.document}}])&&d(t.prototype,o),a&&d(t,a),n}();function f(){var e=m(['\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <form action="[[endPoint]]" method="POST" target="_blank">\n      <input type="hidden" name="data" value$="[[dataString]]" />\n      <input\n        type="image"\n        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/cp-arrow-right.svg"\n        width="40"\n        height="40"\n        value="Create New Pen with Prefilled Data"\n        class="codepen-mover-button"\n      />\n    </form>\n  '],['\n    <style>\n      :host {\n        display: block;\n      }\n    </style>\n    <form action="[[endPoint]]" method="POST" target="_blank">\n      <input type="hidden" name="data" value\\$="[[dataString]]" />\n      <input\n        type="image"\n        src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-1/cp-arrow-right.svg"\n        width="40"\n        height="40"\n        value="Create New Pen with Prefilled Data"\n        class="codepen-mover-button"\n      />\n    </form>\n  ']);return f=function(){return e},e}function v(){var e=m(['\n    <custom-style>\n      <style>\n        :host {\n          display: block;\n          padding: 16px;\n        }\n        .code-pen-container {\n          width: 100%;\n          display: block;\n          background-color: var(--code-pen-button-color, #222222);\n          height: 40px;\n        }\n        [hidden] {\n          display: none !important;\n        }\n        code-pen-button {\n          float: right;\n          height: 40px;\n        }\n        h3 {\n          color: var(--code-pen-title-color, #222222);\n        }\n      </style>\n    </custom-style>\n    <h3 hidden$="[[!title]]">[[title]]</h3>\n    <monaco-element\n      id="codeeditor"\n      lib-path="[[__libPath]]"\n      value="[[editorValue]]"\n      language="[[language]]"\n      theme="[[theme]]"\n      on-value-changed="_editorDataChanged"\n      font-size$="[[fontSize]]"\n      readonly$="[[readOnly]]"\n    >\n    </monaco-element>\n    <div class="code-pen-container" hidden$="[[!showCodePen]]">\n      <code-pen-button data="[[codePenData]]"></code-pen-button>\n    </div>\n  '],['\n    <custom-style>\n      <style>\n        :host {\n          display: block;\n          padding: 16px;\n        }\n        .code-pen-container {\n          width: 100%;\n          display: block;\n          background-color: var(--code-pen-button-color, #222222);\n          height: 40px;\n        }\n        [hidden] {\n          display: none !important;\n        }\n        code-pen-button {\n          float: right;\n          height: 40px;\n        }\n        h3 {\n          color: var(--code-pen-title-color, #222222);\n        }\n      </style>\n    </custom-style>\n    <h3 hidden$="[[!title]]">[[title]]</h3>\n    <monaco-element\n      id="codeeditor"\n      lib-path="[[__libPath]]"\n      value="[[editorValue]]"\n      language="[[language]]"\n      theme="[[theme]]"\n      on-value-changed="_editorDataChanged"\n      font-size\\$="[[fontSize]]"\n      readonly\\$="[[readOnly]]"\n    >\n    </monaco-element>\n    <div class="code-pen-container" hidden$="[[!showCodePen]]">\n      <code-pen-button data="[[codePenData]]"></code-pen-button>\n    </div>\n  ']);return v=function(){return e},e}window.customElements.define("monaco-element",y),n.Polymer({_template:n.html(f()),is:"code-pen-button",properties:{endPoint:{type:String,value:"https://codepen.io/pen/define"},dataString:{type:String,computed:"_getDataString(data)"},data:{type:Object,value:{}}},_getDataString:function(e){return JSON.stringify(e).replace(/"/g,"&quot;").replace(/'/g,"&apos;")}});var b=n.Polymer({_template:n.html(v()),is:"code-editor",behaviors:[HAXBehaviors.PropertiesBehaviors,SchemaBehaviors.Schema],properties:{title:{type:String},showCodePen:{type:Boolean,value:!1,reflectToAttribute:!0},readOnly:{type:Boolean,value:!1,reflectToAttribute:!0},codePenData:{type:Object,computed:"_computeCodePenData(title, value)"},editorValue:{type:String,value:""},value:{type:String,notify:!0},theme:{type:String,value:"vs-dark"},mode:{type:String,observer:"_modeChanged"},language:{type:String,value:"javascript"},fontSize:{type:String,value:"16px"},minLines:{type:Number,value:10},maxLines:{type:Number,value:25}},_computeCodePenData:function(e,n){return{title:e,html:n}},_modeChanged:function(e){this.language=this.mode},_editorDataChanged:function(e){this.value=e.detail},updateEditorValue:function(){var e="",n=this.queryEffectiveChildren("template");if(n)e=n.innerHTML;else if(console.warn("code-editor works best with a template tag provided in light dom"),(n=o.dom(this).getEffectiveChildNodes()).length>0)for(var t=0,a=n.length;t<a;t++)"undefined"!==s(n[t].tagName)?e+=n[t].outerHTML:e+=n[t].textContent;this.editorValue=e.trim()},created:function(){this.__libPath=("undefined"!=typeof document?document.currentScript&&document.currentScript.src||document.baseURI:new("undefined"!=typeof URL?URL:require("url").URL)("file:"+__filename).href)+"/../../../monaco-editor/min/vs"},ready:function(){var e=this;this._observer=new t.FlattenedNodesObserver(this,function(n){n.addedNodes.length>0&&n.addedNodes.map(function(n){e.updateEditorValue()}),n.removedNodes.length>0&&n.removedNodes.map(function(n){e.updateEditorValue()})})},attached:function(){var e=this;a.microTask.run(function(){e.$.codeeditor.value=e.editorValue,setTimeout(function(){e.$.codeeditor.initIFrame()},1e3)});this.setHaxProperties({canScale:!0,canPosition:!0,canEditSource:!1,gizmo:{title:"Code editor",description:"Edit code in the browser with minor HTML validation",icon:"icons:code",color:"blue",groups:["Code","Development"],handles:[{type:"code",code:"editorValue"}],meta:{author:"LRNWebComponents"}},settings:{quick:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"},{property:"showCodePen",title:"Code pen button",description:"Play with this on code pen",inputMethod:"boolean",icon:"icons:code"}],configure:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"},{property:"showCodePen",title:"Code pen button",description:"Play with this on code pen",inputMethod:"boolean",icon:"icons:code"},{property:"editorValue",title:"Code",description:"The code to present to the user",inputMethod:"code-editor",icon:"editor:title"}],advanced:[]}})}});e.CodeEditor=b,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=code-editor.umd.js.map
