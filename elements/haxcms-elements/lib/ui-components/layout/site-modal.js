/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import "@lrnwebcomponents/simple-modal/lib/simple-modal-template.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button-lite.js";
import "@lrnwebcomponents/simple-tooltip/simple-tooltip.js";
/**
 * `site-modal`
 * `A basic site dialog`
 *
 * @demo demo/index.html
 */
class SiteModal extends LitElement {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        simple-icon-button-lite {
          color: var(--site-modal-icon-color);
        }
      `,
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "site-modal";
  }
  constructor() {
    super();
    this.title = "Dialog";
    this.icon = "icons:menu";
    this.buttonLabel = "Open dialog";
    this.position = "bottom";
  }
  // render function
  render() {
    return html`
      <simple-icon-button-lite
        ?disabled="${this.editMode}"
        id="btn"
        @click="${this.fireEvent}"
        .icon="${this.icon}"
        .title="${this.buttonLabel}"
      ></simple-icon-button-lite>
      <simple-tooltip for="btn" .position="${this.position}" offset="14">
        ${this.buttonLabel}
      </simple-tooltip>
      <simple-modal-template id="smt" .title="${this.title}">
        <div id="content" slot="content"></div>
      </simple-modal-template>
    `;
  }
  /**
   * Fire an event for things to react to above us; useful for lazy loading
   */
  fireEvent(e) {
    this.dispatchEvent(
      new CustomEvent("site-modal-click", {
        detail: { value: true },
      })
    );
  }
  static get properties() {
    return {
      disabled: {
        type: Boolean,
        reflect: true,
      },
      dark: {
        type: Boolean,
      },
      accentColor: {
        type: String,
        attribute: "accent-color",
      },
      title: {
        type: String,
      },
      icon: {
        type: String,
      },
      buttonLabel: {
        type: String,
        attribute: "button-label",
      },
      position: {
        type: String,
      },
    };
  }
  firstUpdated(changedProperties) {
    this.shadowRoot
      .querySelector("#smt")
      .associateEvents(this.shadowRoot.querySelector("#btn"));
    setTimeout(() => {
      if (this.children && this.shadowRoot.querySelector("#content")) {
        for (var i in this.children) {
          if (typeof this.children[i] === "object") {
            this.shadowRoot
              .querySelector("#content")
              .appendChild(this.children[i]);
          }
        }
      }
    }, 0);
  }
}
window.customElements.define(SiteModal.tag, SiteModal);
export { SiteModal };
