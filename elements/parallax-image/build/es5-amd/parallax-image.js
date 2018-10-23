define([
  "exports",
  "./node_modules/@polymer/polymer/polymer-element.js",
  "./node_modules/@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js"
], function(_exports, _polymerElement, _HAXWiring) {
  "use strict";
  Object.defineProperty(_exports, "__esModule", { value: !0 });
  _exports.ParallaxImage = void 0;
  function _templateObject_83487370d70211e8a07c4b799b265af4() {
    var data = babelHelpers.taggedTemplateLiteral([
      "\n<style>:host {\n  display: block;\n}\n\n:host([hidden]) {\n  display: none;\n}\n</style>\n<slot></slot>"
    ]);
    _templateObject_83487370d70211e8a07c4b799b265af4 = function() {
      return data;
    };
    return data;
  }
  var ParallaxImage = (function(_PolymerElement) {
    babelHelpers.inherits(ParallaxImage, _PolymerElement);
    function ParallaxImage() {
      babelHelpers.classCallCheck(this, ParallaxImage);
      return babelHelpers.possibleConstructorReturn(
        this,
        (ParallaxImage.__proto__ || Object.getPrototypeOf(ParallaxImage)).apply(
          this,
          arguments
        )
      );
    }
    babelHelpers.createClass(
      ParallaxImage,
      [
        {
          key: "connectedCallback",
          value: function connectedCallback() {
            babelHelpers
              .get(
                ParallaxImage.prototype.__proto__ ||
                  Object.getPrototypeOf(ParallaxImage.prototype),
                "connectedCallback",
                this
              )
              .call(this);
            this.HAXWiring = new _HAXWiring.HAXWiring();
            this.HAXWiring.setHaxProperties(
              ParallaxImage.haxProperties,
              ParallaxImage.tag,
              this
            );
          }
        }
      ],
      [
        {
          key: "template",
          get: function get() {
            return (0, _polymerElement.html)(
              _templateObject_83487370d70211e8a07c4b799b265af4()
            );
          }
        },
        {
          key: "haxProperties",
          get: function get() {
            return {
              canScale: !0,
              canPosition: !0,
              canEditSource: !1,
              gizmo: {
                title: "Parallax image",
                description: "Automated conversion of parallax-image/",
                icon: "icons:android",
                color: "green",
                groups: ["Image"],
                handles: [{ type: "todo:read-the-docs-for-usage" }],
                meta: {
                  author: "btopro",
                  owner: "The Pennsylvania State University"
                }
              },
              settings: { quick: [], configure: [], advanced: [] }
            };
          }
        },
        {
          key: "properties",
          get: function get() {
            return {};
          }
        },
        {
          key: "tag",
          get: function get() {
            return "parallax-image";
          }
        }
      ]
    );
    return ParallaxImage;
  })(_polymerElement.PolymerElement);
  _exports.ParallaxImage = ParallaxImage;
  window.customElements.define(ParallaxImage.tag, ParallaxImage);
});
