define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@polymer/polymer/lib/utils/flattened-nodes-observer.js","./node_modules/@polymer/iron-ajax/iron-ajax.js","./node_modules/@lrnwebcomponents/h-a-x/h-a-x.js","./node_modules/@lrnwebcomponents/simple-toast/simple-toast.js","./lib/cms-token.js","./lib/cms-block.js","./lib/cms-views.js","./lib/cms-entity.js"],function(_exports,_polymerLegacy,_flattenedNodesObserver,_ironAjax,_hAX,_simpleToast,_cmsToken,_cmsBlock,_cmsViews,_cmsEntity){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.CmsHax=void 0;function _templateObject_987b02e01d9211e9ba1d2b872d1cb621(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n      :host {\n        display: block;\n        font-size: 16px;\n        box-sizing: content-box;\n      }\n    </style>\n    <iron-ajax\n      id=\"pageupdateajax\"\n      url=\"[[endPoint]]\"\n      method=\"[[method]]\"\n      body=\"[[updatePageData]]\"\n      content-type=\"application/json\"\n      handle-as=\"json\"\n      on-response=\"_handleUpdateResponse\"\n    ></iron-ajax>\n    <h-a-x app-store$=\"[[appStoreConnection]]\"></h-a-x>\n  "]);_templateObject_987b02e01d9211e9ba1d2b872d1cb621=function _templateObject_987b02e01d9211e9ba1d2b872d1cb621(){return data};return data}var CmsHax=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_987b02e01d9211e9ba1d2b872d1cb621()),is:"cms-hax",observers:["_noticeTagChanges(allowedTags, hideExportButton, hidePanelOps, hidePreferencesButton, align, bodyOffsetLeft)"],properties:{openDefault:{type:Boolean,value:!1},hideExportButton:{type:Boolean,value:!0},hidePanelOps:{type:Boolean,value:!1},hidePreferencesButton:{type:Boolean,value:!1},align:{type:String,value:"right"},allowedTags:{type:Array},endPoint:{type:String},method:{type:String,value:"PUT"},updatePageData:{type:String},appStoreConnection:{type:Object},bodyOffsetLeft:{type:Number,value:-164},editMode:{type:Boolean,reflectToAttribute:!0},syncBody:{type:Boolean,value:!1},bodyValue:{type:String,value:""},hideMessage:{type:Boolean,value:!1},redirectLocation:{type:String},redirectOnSave:{type:Boolean,computed:"_computeRedirectOnSave(redirectLocation)"},activeHaxBody:{type:Object,observer:"_activeHaxBodyUpdated"},__imported:{type:Boolean,value:!1}},_activeHaxBodyUpdated:function _activeHaxBodyUpdated(newValue,oldValue){if(null!=newValue&&!this.__imported){this.__imported=!0;var children=this.queryEffectiveChildren("template");if(babelHelpers.typeof(children)!==("undefined"===typeof void 0?"undefined":babelHelpers.typeof(void 0))){newValue.importContent(children.innerHTML)}}},_computeRedirectOnSave:function _computeRedirectOnSave(redirectLocation){if(babelHelpers.typeof(redirectLocation)!==("undefined"===typeof void 0?"undefined":babelHelpers.typeof(void 0))){return!0}return!1},_attachDom:function _attachDom(dom){this.appendChild(dom)},_noticeTagChanges:function _noticeTagChanges(allowedTags,hideExportButton,hidePanelOps,hidePreferencesButton,align,bodyOffsetLeft){if(window.HaxStore.ready){if(allowedTags){window.HaxStore.instance.validTagList=allowedTags}window.HaxStore.instance.haxPanel.hideExportButton=hideExportButton;window.HaxStore.instance.haxPanel.hidePanelOps=hidePanelOps;window.HaxStore.instance.haxPanel.hidePreferencesButton=hidePreferencesButton;window.HaxStore.instance.haxPanel.align=align;window.HaxStore.instance.activeHaxBody.contextOffsetLeft=bodyOffsetLeft}},_storeReady:function _storeReady(e){this._noticeTagChanges(this.allowedTags,this.hideExportButton,this.hidePanelOps,this.hidePreferencesButton,this.align,this.bodyOffsetLeft)},created:function created(){window.addEventListener("hax-store-property-updated",this._haxStorePropertyUpdated.bind(this));window.addEventListener("hax-store-ready",this._storeReady.bind(this))},detached:function detached(){window.removeEventListener("hax-store-ready",this._storeReady.bind(this));window.removeEventListener("hax-save",this._saveFired.bind(this))},attached:function attached(){var _this=this;window.SimpleToast.requestAvailability();this.__lock=!1;window.addEventListener("hax-save",this._saveFired.bind(this));if(this.openDefault){window.HaxStore.write("editMode",!0,this)}if(this.syncBody){(0,_flattenedNodesObserver.FlattenedNodesObserver)(window.HaxStore.instance.activeHaxBody,function(info){if(!_this.__lock){_this.__lock=!0;_this.fire("hax-body-content-changed",window.HaxStore.instance.activeHaxBody.haxToContent());setTimeout(function(){_this.__lock=!1},100)}})}},_haxStorePropertyUpdated:function _haxStorePropertyUpdated(e){if(e.detail&&babelHelpers.typeof(e.detail.value)!==("undefined"===typeof void 0?"undefined":babelHelpers.typeof(void 0))&&e.detail.property){if("object"===babelHelpers.typeof(e.detail.value)){this.set(e.detail.property,null)}this.set(e.detail.property,e.detail.value);this.notifyPath(e.detail.property)}},_saveFired:function _saveFired(e){this.updatePageData=window.HaxStore.instance.activeHaxBody.haxToContent();this.$.pageupdateajax.generateRequest()},_handleUpdateResponse:function _handleUpdateResponse(e){var _this2=this;if(!this.hideMessage){var evt=new CustomEvent("simple-toast-show",{bubbles:!0,cancelable:!0,detail:{text:"Saved!",duration:3e3}});this.dispatchEvent(evt);if(this.redirectOnSave){setTimeout(function(){window.HaxStore.instance.haxPanel.toggle();window.location=_this2.redirectLocation},1e3)}}}});_exports.CmsHax=CmsHax});