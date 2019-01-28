define(["exports","./node_modules/@polymer/polymer/polymer-legacy.js","./node_modules/@lrnwebcomponents/simple-colors/simple-colors.js","./node_modules/@polymer/paper-button/paper-button.js","./node_modules/@polymer/iron-image/iron-image.js","./node_modules/@lrnwebcomponents/a11y-behaviors/a11y-behaviors.js","./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"],function(_exports,_polymerLegacy,_simpleColors,_paperButton,_ironImage,_a11yBehaviors,_HAXWiring){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.HeroBanner=void 0;function _templateObject_e5124880234f11e9ad0d932aa02ed5de(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"simple-colors\">\n      :host {\n        display: block;\n        width: 100%;\n        min-height: 600px;\n        height: 100%;\n        max-height: 600px;\n        overflow: hidden;\n        position: relative;\n        --hero-banner-font-family: \"Roboto\";\n        --hero-banner-title-weight: 500;\n        --hero-banner-text: var(--simple-colors-default-theme-grey-12);\n        --hero-banner-rgba: rgba(255, 255, 255, 0.65);\n        --hero-banner-image-bg: var(--simple-colors-default-theme-grey-3);\n        --hero-banner-button-weight: bold;\n        --hero-banner-button-color: var(--simple-colors-default-theme-accent-6);\n        --hero-banner-button-hover-color: var(\n          --simple-colors-default-theme-accent-5\n        );\n      }\n      :host([dark]) {\n        --hero-banner-rgba: rgba(0, 0, 0, 0.65);\n      }\n      .image {\n        position: absolute;\n        left: 0;\n        right: 0;\n        width: 100%;\n        height: 100%;\n        background-color: var(--hero-banner-image-bg);\n      }\n      .itemwrapper {\n        position: absolute;\n        bottom: 10%;\n        left: 10%;\n        width: 50%;\n      }\n      .title {\n        background-color: var(--hero-banner-rgba);\n        padding: 10px 16px;\n        font-size: 32px;\n        color: var(--hero-banner-text);\n        margin: 4px 0;\n        font-family: var(--hero-banner-font-family);\n        font-weight: var(--hero-banner-title-weight);\n      }\n      .details {\n        background-color: var(--hero-banner-rgba);\n        padding: 10px 16px;\n        font-size: 16px;\n        color: var(--hero-banner-text);\n        margin: 4px 0;\n        font-family: var(--hero-banner-font-family);\n      }\n      .linkbutton {\n        padding: 0;\n        margin: 8px 0;\n        text-decoration: none;\n        font-family: var(--hero-banner-font-family);\n      }\n      .linkbutton paper-button {\n        text-transform: none;\n        font-weight: var(--hero-banner-button-weight);\n        color: var(--hero-banner-text);\n        background-color: var(--hero-banner-button-color);\n        font-size: 16px;\n        margin: 0;\n      }\n      .linkbutton:focus paper-button,\n      .linkbutton:hover paper-button {\n        background-color: var(---hero-banner-button-hover-color);\n      }\n      @media screen and (max-width: 720px) {\n        .title {\n          font-size: 20px;\n        }\n        .details {\n          font-size: 12px;\n        }\n        .itemwrapper {\n          left: 5%;\n          width: 50%;\n        }\n      }\n      @media screen and (max-width: 500px) {\n        .title {\n          font-size: 16px;\n        }\n        .details {\n          display: none;\n        }\n        .itemwrapper {\n          left: 0;\n          width: 300px;\n        }\n      }\n    </style>\n    <iron-image\n      class=\"image\"\n      src$=\"[[image]]\"\n      fade=\"\"\n      preload=\"\"\n      sizing=\"cover\"\n    ></iron-image>\n    <div class=\"itemwrapper\">\n      <div class=\"title\">[[title]]</div>\n      <div class=\"details\">[[details]]</div>\n      <a class=\"linkbutton\" href$=\"[[buttonLink]]\"\n        ><paper-button raised=\"\">[[buttonText]]</paper-button></a\n      >\n    </div>\n  "],["\n    <style include=\"simple-colors\">\n      :host {\n        display: block;\n        width: 100%;\n        min-height: 600px;\n        height: 100%;\n        max-height: 600px;\n        overflow: hidden;\n        position: relative;\n        --hero-banner-font-family: \"Roboto\";\n        --hero-banner-title-weight: 500;\n        --hero-banner-text: var(--simple-colors-default-theme-grey-12);\n        --hero-banner-rgba: rgba(255, 255, 255, 0.65);\n        --hero-banner-image-bg: var(--simple-colors-default-theme-grey-3);\n        --hero-banner-button-weight: bold;\n        --hero-banner-button-color: var(--simple-colors-default-theme-accent-6);\n        --hero-banner-button-hover-color: var(\n          --simple-colors-default-theme-accent-5\n        );\n      }\n      :host([dark]) {\n        --hero-banner-rgba: rgba(0, 0, 0, 0.65);\n      }\n      .image {\n        position: absolute;\n        left: 0;\n        right: 0;\n        width: 100%;\n        height: 100%;\n        background-color: var(--hero-banner-image-bg);\n      }\n      .itemwrapper {\n        position: absolute;\n        bottom: 10%;\n        left: 10%;\n        width: 50%;\n      }\n      .title {\n        background-color: var(--hero-banner-rgba);\n        padding: 10px 16px;\n        font-size: 32px;\n        color: var(--hero-banner-text);\n        margin: 4px 0;\n        font-family: var(--hero-banner-font-family);\n        font-weight: var(--hero-banner-title-weight);\n      }\n      .details {\n        background-color: var(--hero-banner-rgba);\n        padding: 10px 16px;\n        font-size: 16px;\n        color: var(--hero-banner-text);\n        margin: 4px 0;\n        font-family: var(--hero-banner-font-family);\n      }\n      .linkbutton {\n        padding: 0;\n        margin: 8px 0;\n        text-decoration: none;\n        font-family: var(--hero-banner-font-family);\n      }\n      .linkbutton paper-button {\n        text-transform: none;\n        font-weight: var(--hero-banner-button-weight);\n        color: var(--hero-banner-text);\n        background-color: var(--hero-banner-button-color);\n        font-size: 16px;\n        margin: 0;\n      }\n      .linkbutton:focus paper-button,\n      .linkbutton:hover paper-button {\n        background-color: var(---hero-banner-button-hover-color);\n      }\n      @media screen and (max-width: 720px) {\n        .title {\n          font-size: 20px;\n        }\n        .details {\n          font-size: 12px;\n        }\n        .itemwrapper {\n          left: 5%;\n          width: 50%;\n        }\n      }\n      @media screen and (max-width: 500px) {\n        .title {\n          font-size: 16px;\n        }\n        .details {\n          display: none;\n        }\n        .itemwrapper {\n          left: 0;\n          width: 300px;\n        }\n      }\n    </style>\n    <iron-image\n      class=\"image\"\n      src\\$=\"[[image]]\"\n      fade=\"\"\n      preload=\"\"\n      sizing=\"cover\"\n    ></iron-image>\n    <div class=\"itemwrapper\">\n      <div class=\"title\">[[title]]</div>\n      <div class=\"details\">[[details]]</div>\n      <a class=\"linkbutton\" href\\$=\"[[buttonLink]]\"\n        ><paper-button raised=\"\">[[buttonText]]</paper-button></a\n      >\n    </div>\n  "]);_templateObject_e5124880234f11e9ad0d932aa02ed5de=function _templateObject_e5124880234f11e9ad0d932aa02ed5de(){return data};return data}var HeroBanner=(0,_polymerLegacy.Polymer)({_template:(0,_polymerLegacy.html)(_templateObject_e5124880234f11e9ad0d932aa02ed5de()),is:"hero-banner",behaviors:[HAXBehaviors.PropertiesBehaviors,A11yBehaviors.A11y,_simpleColors.SimpleColors],properties:{title:{type:String,value:"Title"},image:{type:String},details:{type:String,value:"Details"},buttonText:{type:String,value:"Find out more"},buttonLink:{type:String}},attached:function attached(){var props={canScale:!1,canPosition:!1,canEditSource:!1,gizmo:{title:"Hero image",description:"Typically fancy banner image calling your attention to something.",icon:"image:panorama",color:"red",groups:["Image","Media"],handles:[{type:"image",source:"image",title:"title",description:"details",link:"buttonLink"}],meta:{author:"LRNWebComponents"}},settings:{quick:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"},{property:"image",title:"Image",description:"URL of the image",inputMethod:"textfield",icon:"image:panorama"},{property:"details",title:"Details",description:"Additional text detail / teaser data",inputMethod:"textfield",icon:"editor:text-fields"},{property:"buttonText",title:"Button",description:"Label of the button",inputMethod:"textfield",icon:"icons:radio-button-unchecked"},{property:"accent-color",title:"Accent color",description:"Select the accent color use",inputMethod:"colorpicker",icon:"editor:format-color-fill"},{property:"dark",title:"Dark",description:"Use dark theme",inputMethod:"toggle",icon:"invert-colors"},{property:"buttonLink",title:"Button - Link",description:"Label of the button",inputMethod:"textfield",validationType:"url",icon:"icons:link"}],configure:[{property:"title",title:"Title",description:"The title of the element",inputMethod:"textfield",icon:"editor:title"},{property:"image",title:"Image",description:"URL of the image",inputMethod:"textfield",icon:"image:panorama"},{property:"details",title:"Details",description:"Additional text detail / teaser data",inputMethod:"textfield",icon:"editor:text-fields"},{property:"buttonText",title:"Button",description:"Label of the button",inputMethod:"textfield",icon:"icons:radio-button-unchecked"},{property:"accent-color",title:"Accent color",description:"Select the accent color use",inputMethod:"colorpicker",icon:"editor:format-color-fill"},{property:"dark",title:"Dark",description:"Use dark theme",inputMethod:"toggle",icon:"invert-colors"},{property:"buttonLink",title:"Button - Link",description:"Label of the button",inputMethod:"textfield",validationType:"url",icon:"icons:link"}],advanced:[]}};this.setHaxProperties(props)}});_exports.HeroBanner=HeroBanner});