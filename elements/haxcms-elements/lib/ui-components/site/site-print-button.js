/**
 * Copyright 2019 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit";
import { store } from "@lrnwebcomponents/haxcms-elements/lib/core/haxcms-site-store.js";
import { HAXCMSThemeParts } from "../../core/utils/HAXCMSThemeParts.js";
import { HAXCMSI18NMixin } from "../../core/utils/HAXCMSI18NMixin.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button-lite.js";
import "@lrnwebcomponents/simple-tooltip/simple-tooltip.js";
/**
 * `site-print-button`
 * `Dynamic print button to request and generate what to print`
 *

 */
class SitePrintButton extends HAXCMSI18NMixin(HAXCMSThemeParts(LitElement)) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: inline-flex;
          text-rendering: optimizelegibility;
          position: relative;
          color: var(--site-print-button-color, inherit);
        }
        simple-icon-button {
          color: var(--site-print-button-color, inherit);
        }
        simple-tooltip {
          --simple-tooltip-background: var(
            --haxcms-tooltip-background-color,
            #000000
          );
          --simple-tooltip-opacity: 1;
          --simple-tooltip-text-color: var(--haxcms-tooltip-color, #ffffff);
          --simple-tooltip-delay-in: 0;
          --simple-tooltip-border-radius: 0;
        }
      `,
    ];
  }
  /**
   * Store the tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "site-print-button";
  }
  constructor() {
    super();
    this.t = {
      printPage: "Print page",
      printSite: "Print site",
      printOutline: "Print outline",
    };
    this.icon = "icons:print";
    this.position = "bottom";
    this.type = "page";
  }
  // render function
  render() {
    return html`
      <simple-icon-button-lite
        .id="btn${this.type}"
        icon="${this.icon}"
        @click="${this.print}"
        .aria-label="${this.makeLabel(this.type, this.t)}"
        ?disabled="${this.disabled}"
        .part="${this.editMode ? `edit-mode-active` : ``}"
      ></simple-icon-button-lite>
      <simple-tooltip
        .for="btn${this.type}"
        position="${this.position}"
        offset="14"
      >
        ${this.makeLabel(this.type, this.t)}
      </simple-tooltip>
    `;
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "editMode") {
        if (this[propName]) {
          this.setAttribute("part", "edit-mode-active");
        } else {
          this.removeAttribute("part");
        }
      }
    });
  }
  /**
   * Props
   */
  static get properties() {
    return {
      ...super.properties,
      /**
       * icon
       */
      icon: {
        type: String,
      },
      disabled: {
        type: Boolean,
        reflect: true,
      },
      /**
       * label for the button
       */
      label: {
        type: String,
      },
      /**
       * label for the button
       */
      position: {
        type: String,
      },
      /**
       * How much do you want to print right now
       */
      type: {
        type: String,
      },
    };
  }
  /**
   * ensure we have a label set per type if its empty
   */
  makeLabel(type, t) {
    switch (type) {
      case "page":
        return html`${t.printPage}`;
        break;
      case "site":
        return html`${t.printSite}`;
        break;
      default:
        return html`${t.printOutline}`;
        break;
    }
  }
  /**
   * Print the type in question
   */
  async print(e) {
    window.open(
      window.location.href + "?format=print-" + this.type,
      "",
      "left=0,top=0,width=800,height=800,toolbar=0,scrollbars=0,status=0,noopener=1,noreferrer=1"
    );
  }
}
window.customElements.define(SitePrintButton.tag, SitePrintButton);
export { SitePrintButton };
