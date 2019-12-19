import { LitElement, html, css } from "lit-element/lit-element.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@lrnwebcomponents/h-a-x/h-a-x.js";
/**
 * `cms-hax`
 * @customElement cms-hax
 * @demo ../../demo/index.html
 */
class CmsHax extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
          font-size: 16px;
          box-sizing: content-box;
        }
      `
    ];
  }
  render() {
    return html`
      <iron-ajax
        id="pageupdateajax"
        url="${this.endPoint}"
        method="${this.method}"
        body="${this.updatePageData}"
        content-type="application/json"
        handle-as="json"
        @response="${this._handleUpdateResponse}"
      ></iron-ajax>
      <h-a-x app-store="${this.__appStore}"></h-a-x>
    `;
  }

  static get tag() {
    return "cms-hax";
  }

  decodeHTMLEntities(text) {
    var entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x27", "'"],
      ["#x2F", "/"],
      ["#39", "'"],
      ["#47", "/"],
      ["lt", "<"],
      ["gt", ">"],
      ["nbsp", " "],
      ["quot", '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
      text = text.replace(
        new RegExp("&" + entities[i][0] + ";", "g"),
        entities[i][1]
      );

    return text;
  }
  static get properties() {
    return {
      /**
       * Default the panel to open
       */
      openDefault: {
        type: Boolean,
        reflect: true,
        attribute: "open-default"
      },
      /**
       * Hide the export button, showing it is good for developers
       * or those doing QA testing of new elements.
       */
      hideExportButton: {
        type: Boolean,
        attribute: "hide-export-button"
      },
      /**
       * Hide the panel operations (save and cancel),
       */
      hidePanelOps: {
        type: Boolean,
        attribute: "hide-panel-ops"
      },
      /**
       * Hide preferences button
       */
      hidePreferencesButton: {
        type: Boolean,
        attribute: "hide-preferences-button"
      },
      /**
       * Direction to align the hax edit panel
       */
      align: {
        type: String
      },
      /**
       * allowed Tags, usually as dictated by the input filtering
       * layer of the backend system that HAX is riding on.
       * While not fullproof, this at least will enforce front-end
       * filtering to match what actually is going to be allowed
       * to be saved in the first place.
       */
      allowedTags: {
        type: Array
      },
      /**
       * Location to save content to.
       */
      endPoint: {
        type: String,
        attribute: "end-point"
      },
      /**
       * Method to save content.
       */
      method: {
        type: String
      },
      /**
       * Page data, body of text as a string.
       */
      updatePageData: {
        type: String,
        attribute: "udpate-page-data"
      },
      /**
       * Connection object for talking to an app store.
       */
      appStoreConnection: {
        type: String,
        attribute: "app-store-connection"
      },
      __appStore: {
        type: String
      },
      /**
       * State of the panel
       */
      editMode: {
        type: Boolean,
        reflect: true,
        attribute: "edit-mode"
      },
      /**
       * syncBody
       */
      syncBody: {
        type: Boolean,
        attribute: "sync-body"
      },
      /**
       * Only available if syncBody is true; this allows data binding to the value being worked on in hax-body tag
       */
      bodyValue: {
        type: String,
        attribute: "body-value"
      },
      /**
       * Flag to hide the toast.
       */
      hideMessage: {
        type: Boolean,
        attribute: "hide-message"
      },
      /**
       * Optional URL to redirect to once we save.
       */
      redirectLocation: {
        type: String,
        attribute: "redirect-location"
      },
      /**
       * Option to redirect once we save successfully
       */
      redirectOnSave: {
        type: Boolean,
        attribute: "redirect-on-save"
      },
      /**
       * Reference to activeBody.
       */
      activeHaxBody: {
        type: Object
      },
      __imported: {
        type: Boolean
      }
    };
  }

  /**
   * Ensure we've imported our content on initial setup
   */
  _activeHaxBodyUpdated(newValue, oldValue) {
    // ensure we import our content once we get an initial registration of active body
    if (newValue != null && !this.__imported) {
      this.__imported = true;
      // see what's inside of this, in a template tag
      let children = this.querySelector("template");
      // convert this template content into the real thing
      // this helps with correctly preserving everything on the way down
      if (children != null) {
        newValue.importContent(children.innerHTML);
      }
    }
  }

  /**
   * Calculate if we have anywhere to redirect to.
   */
  _computeRedirectOnSave(redirectLocation) {
    if (typeof redirectLocation !== typeof undefined) {
      return true;
    }
    return false;
  }
  /**
   * LitElement without shadowRoot
   */
  createRenderRoot() {
    return this;
  }
  /**
   * Set certain data bound values to the store once it's ready
   */
  _noticeTagChanges(
    openDefault,
    allowedTags,
    hideExportButton,
    hidePanelOps,
    hidePreferencesButton,
    align
  ) {
    if (window.HaxStore.ready) {
      // double check because this can cause issues
      if (allowedTags) {
        window.HaxStore.instance.validTagList = allowedTags;
      }
      window.HaxStore.instance.haxPanel.hideExportButton = hideExportButton;
      window.HaxStore.instance.haxPanel.hidePanelOps = hidePanelOps;
      window.HaxStore.instance.haxPanel.hidePreferencesButton = hidePreferencesButton;
      window.HaxStore.instance.haxPanel.align = align;
      if (openDefault) {
        window.HaxStore.write("editMode", openDefault, this);
      }
    }
  }
  /**
   * LitElement ready
   */
  firstUpdated() {
    this.__applyMO();
  }
  /**
   * Set certain data bound values to the store once it's ready
   */
  _storeReady(e) {
    // delay as there can be some timing issues with attributes in CMSs
    setTimeout(() => {
      // trigger the update of different parts of the global state
      this._noticeTagChanges(
        this.openDefault,
        this.allowedTags,
        this.hideExportButton,
        this.hidePanelOps,
        this.hidePreferencesButton,
        this.align
      );
      this.__applyMO();
    }, 250);
  }
  /**
   * Created life cycle
   */
  constructor() {
    super();
    this.__lock = false;
    this.openDefault = false;
    this.hideExportButton = true;
    this.hidePanelOps = false;
    this.hidePreferencesButton = false;
    this.align = "right";
    this.method = "PUT";
    this.syncBody = false;
    this.bodyValue = "";
    this.hideMessage = false;
    this.__imported = false;
    window.SimpleToast.requestAvailability();
    import("@lrnwebcomponents/cms-hax/lib/cms-token.js");
    import("@lrnwebcomponents/cms-hax/lib/cms-block.js");
    import("@lrnwebcomponents/cms-hax/lib/cms-views.js");
    import("@lrnwebcomponents/cms-hax/lib/cms-entity.js");
    import("@lrnwebcomponents/simple-toast/simple-toast.js");
  }
  _makeAppStore(val) {
    this.__appStore = this.decodeHTMLEntities(val);
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName == "redirectLocation") {
        this.redirectOnSave = this._computeRedirectOnSave(this[propName]);
      }
      if (propName == "activeHaxBody") {
        this._activeHaxBodyUpdated(this[propName]);
      }
      if (propName == "appStoreConnection") {
        this._makeAppStore(this[propName]);
      }
      if (
        [
          "openDefault",
          "allowedTags",
          "hideExportButton",
          "hidePanelOps",
          "hidePreferencesButton",
          "align"
        ].includes(propName)
      ) {
        this._noticeTagChanges(
          this.openDefault,
          this.allowedTags,
          this.hideExportButton,
          this.hidePanelOps,
          this.hidePreferencesButton,
          this.align
        );
      }
    });
  }
  /**
   * detached life cycle
   */
  disconnectedCallback() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    window.removeEventListener(
      "hax-store-property-updated",
      this._haxStorePropertyUpdated.bind(this)
    );
    window.removeEventListener("hax-store-ready", this._storeReady.bind(this));
    window.removeEventListener("hax-save", this._saveFired.bind(this));
    super.disconnectedCallback();
  }
  /**
   * Attached to the DOM; now we can fire event to the store that
   * we exist and are the thing being edited.
   */
  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      window.addEventListener(
        "hax-store-property-updated",
        this._haxStorePropertyUpdated.bind(this)
      );
      window.addEventListener("hax-store-ready", this._storeReady.bind(this));
      window.addEventListener("hax-save", this._saveFired.bind(this));
    }, 0);
    this.__applyMO();
  }
  __applyMO() {
    // notice ANY change to body and bubble up, only when we are attached though
    if (
      !this._observer &&
      this.syncBody &&
      window.HaxStore &&
      window.HaxStore.instance &&
      window.HaxStore.instance.activeHaxBody
    ) {
      this._observer = new MutationObserver(mutations => {
        if (!this.__lock) {
          this.__lock = true;
          this.dispatchEvent(
            new CustomEvent("hax-body-content-changed", {
              bubbles: true,
              cancelable: true,
              composed: true,
              detail: window.HaxStore.instance.activeHaxBody.haxToContent()
            })
          );
          setTimeout(() => {
            this.__lock = false;
          }, 100);
        }
      });
      this._observer.observe(window.HaxStore.instance.activeHaxBody, {
        childList: true,
        subtree: true
      });
    }
  }
  /**
   * Store updated, sync.
   */
  _haxStorePropertyUpdated(e) {
    if (
      e.detail &&
      typeof e.detail.value !== typeof undefined &&
      e.detail.property
    ) {
      if (typeof e.detail.value === "object") {
        this[e.detail.property] = { ...e.detail.value };
      } else {
        this[e.detail.property] = e.detail.value;
      }
    }
  }

  /**
   * _saveFired
   */
  _saveFired(e) {
    // generate sanitized content
    this.updatePageData = window.HaxStore.instance.activeHaxBody.haxToContent();
    // send the request
    this.querySelector("#pageupdateajax").generateRequest();
  }

  /**
   * _handleUpdateResponse
   */
  _handleUpdateResponse(e) {
    if (!this.hideMessage) {
      const evt = new CustomEvent("simple-toast-show", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          text: "Saved!",
          duration: 3000
        }
      });
      this.dispatchEvent(evt);
      // support auto redirecting on save if that's been requested
      // in the integration point
      if (this.redirectOnSave) {
        setTimeout(() => {
          // trigger redirect
          window.location = this.redirectLocation;
        }, 500);
      }
    }
  }
}
window.customElements.define(CmsHax.tag, CmsHax);
export { CmsHax };
