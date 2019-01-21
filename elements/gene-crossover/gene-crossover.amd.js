define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@polymer/app-route/app-route.js","./node_modules/@polymer/app-route/app-location.js","./node_modules/@polymer/iron-pages/iron-pages.js","./node_modules/@lrnwebcomponents/paper-stepper/paper-stepper.js","./lib/gene-crossover-1.js","./lib/gene-crossover-2.js","./lib/gene-crossover-3.js","./lib/gene-crossover-4.js","./lib/gene-crossover-5.js"],function(_exports,_polymerLegacy,_appRoute,_appLocation,_ironPages,_paperStepper,_geneCrossover,_geneCrossover2,_geneCrossover3,_geneCrossover4,_geneCrossover5){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.GeneCrossover=void 0;function _templateObject_924eec201d9111e9afc2b71a46815dc9(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style is=\"custom-style\" include=\"animation-shared-styles\">\n      :host {\n        display: block;\n      }\n      h1,\n      h2,\n      h3,\n      h4,\n      h5,\n      h6 {\n        font-family: \"Open Sans\", sans-serif;\n        text-transform: uppercase;\n        letter-spacing: 2px;\n        color: #6d6e71;\n        text-align: center;\n        font-size: 19.2px;\n      }\n\n      p {\n        font-family: \"Open Sans\", sans-serif;\n      }\n    </style>\n\n    <!-- Pages -->\n    <iron-pages selected=\"[[activePage]]\">\n      <gene-crossover-1\n        selected=\"[[_isActive(activePage, 0)]]\"\n      ></gene-crossover-1>\n      <gene-crossover-2\n        selected=\"[[_isActive(activePage, 1)]]\"\n      ></gene-crossover-2>\n      <gene-crossover-3\n        selected=\"[[_isActive(activePage, 2)]]\"\n      ></gene-crossover-3>\n      <gene-crossover-4\n        selected=\"[[_isActive(activePage, 3)]]\"\n      ></gene-crossover-4>\n      <!--\n        <gene-crossover-5 selected=\"[[_isActive(activePage, 4)]]\"></gene-crossover-5>\n      -->\n    </iron-pages>\n\n    <!-- Counter -->\n    <template is=\"dom-if\" if=\"[[count]]\">\n      <paper-stepper selected=\"{{activePage}}\" progress-bar=\"\">\n        <template is=\"dom-repeat\" items=\"[[_countToArray(count)]]\">\n          <paper-step></paper-step>\n        </template>\n      </paper-stepper>\n    </template>\n  "]);_templateObject_924eec201d9111e9afc2b71a46815dc9=function _templateObject_924eec201d9111e9afc2b71a46815dc9(){return data};return data}var GeneCrossover=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_924eec201d9111e9afc2b71a46815dc9()),is:"gene-crossover",properties:{activePage:{type:String,value:0},count:{type:Number,value:0}},_isActive:function _isActive(activePage,index){return activePage===index},_countToArray:function _countToArray(count){var array=[];if(count){for(var i=0;i<count;i++){array.push(i)}}return array},ready:function ready(){var root=this,ironPages=root.shadowRoot.querySelector("iron-pages");if(ironPages.children){if(ironPages.children.length){root.count=ironPages.children.length}}}});_exports.GeneCrossover=GeneCrossover});