define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@lrnwebcomponents/cms-hax/cms-hax.js"],function(_exports,_polymerLegacy,_cmsHax){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.HaxBookmarklet=void 0;function _templateObject_e53c5d401d9211e9b87985f9dcd81284(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n        font-size: 16px;\n      }\n    </style>\n    <cms-hax\n      open-default\n      app-store-connection=\"[[appStoreConnection]]\"\n      body-offset-left\n    >\n      <slot></slot>\n    </cms-hax>\n  "]);_templateObject_e53c5d401d9211e9b87985f9dcd81284=function _templateObject_e53c5d401d9211e9b87985f9dcd81284(){return data};return data}var HaxBookmarklet=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_e53c5d401d9211e9b87985f9dcd81284()),is:"hax-bookmarklet",properties:{appStoreConnection:{type:Object,value:{url:"appstore.json"}}}});_exports.HaxBookmarklet=HaxBookmarklet});