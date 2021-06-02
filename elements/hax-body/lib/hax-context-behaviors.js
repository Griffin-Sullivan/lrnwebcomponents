import { LitElement, html, css } from "lit-element/lit-element.js";
import { SimpleTourFinder } from "@lrnwebcomponents/simple-popover/lib/SimpleTourFinder";
/**
 *
 * @customElement
 * @extends LitElement
 * @lit-html
 * @lit-element
 * @demo demo/index.html
 */
export const HaxContextBehaviors = function (SuperClass) {
  return class extends SimpleTourFinder(SuperClass) {
    /**
     * LitElement constructable styles enhancement
     */
    static get styles() {
      return [
        css`
          :host {
            display: block;
            pointer-events: none;
            --hax-ui-spacing-sm: 1px;
          }
          :host [hidden] {
            display: none;
          }
          :host > * {
            margin: 0 auto;
          }
          .selected-buttons {
            transition: 0.1s all ease-in-out;
            width: 0;
          }
          :host([has-selected-text]) .selected-buttons {
            width: 100%;
          }
          :host(.hax-context-pin-top) #toolbar {
            position: fixed;
            top: 0px;
          }
          :host(:hover),
          :host(:focus-within) {
            z-index: var(--hax-ui-focus-z-index) !important;
          }
          .group {
            padding: 0;
            background-color: var(--hax-ui-background-color);
          }
          hax-toolbar {
            flex: 0 1 auto;
            border: none !important;
          }
          hax-toolbar[collapse-disabled]::part(morebutton) {
            display: none !important;
          }
          hax-toolbar *[hidden] {
            display: none !important;
          }
          hax-toolbar[collapse-disabled]::part(morebutton) {
            display: none !important;
          }
        `,
      ];
    }

    constructor() {
      super();
      this.viewSource = false;
    }
    render() {
      return html`<slot></slot> `;
    }
    static get tag() {
      return "hax-context-behaviors";
    }
    static get properties() {
      return {
        ...super.properties,
        viewSource: {
          type: Boolean,
          reflect: true,
          attribute: "view-source",
        },
      };
    }
  };
};
