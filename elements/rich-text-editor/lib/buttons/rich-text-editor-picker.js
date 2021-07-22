/**
 * Copyright 2019 Penn State University
 * @license Apache-2.0, see License.md for full text.
 */
import { LitElement, html, css } from "lit-element/lit-element.js";
import { RichTextEditorButtonBehaviors } from "./rich-text-editor-button.js";
import "@lrnwebcomponents/simple-picker/simple-picker.js";

/**
 * RichTextEditorPickerBehaviors
 *
 * @customElement
 * @class
 * @lit-html
 * @lit-element
 * @extends RichTextEditorButtonBehaviors
 */
const RichTextEditorPickerBehaviors = function (SuperClass) {
  return class extends RichTextEditorButtonBehaviors(SuperClass) {
    /**
     * Store tag name to make it easier to obtain directly.
     */
    static get tag() {
      return "rich-text-editor-picker";
    }

    static get styles() {
      return [
        ...super.styles,
        css`
          :host {
            --simple-picker-background-color: var(--simple-toolbar-button-bg);
            --simple-picker-color-active: var(
              --simple-toolbar-button-hover-color
            );
            --simple-picker-background-color-active: var(
              --simple-toolbar-button-hover-bg
            );
            --simple-picker-color-disabled: var(
              --simple-toolbar-button-disabled-color
            );
            --simple-picker-background-color-disabled: var(
              --simple-toolbar-button-disabled-bg
            );
            --simple-picker-border-radius: 0px;
            --simple-picker-border-width: 0px;
            --simple-picker-option-size: calc(
              24px - 2 * var(--simple-picker-sample-padding, 2px)
            );
            --simple-picker-icon-size: 16px;
            --simple-picker-options-border-width: 1px;
          }
          #button {
            margin-top: 0;
            margin-bottom: 0;
          }
        `,
      ];
    }

    render() {
      return html`
        <simple-picker
          id="button"
          ?allow-null="${this.allowNull}"
          class="rtebutton ${this.toggled ? "toggled" : ""}"
          ?disabled="${this.disabled}"
          controls="${super.controls}"
          .options="${this.options}"
          @mouseover="${this._pickerFocus}"
          @keydown="${this._pickerFocus}"
          @value-changed="${this._pickerChange}"
          tabindex="0"
          ?title-as-html="${this.titleAsHtml}"
        >
          ${super.labelTemplate}
        </simple-picker>
        ${super.tooltopTemplate}
      `;
    }

    static get properties() {
      return {
        ...super.properties,
        /**
         * Allow a null option to be selected?
         */
        allowNull: {
          type: Boolean,
        },
        /**
         * command used for document.execCommand.
         */
        command: {
          type: String,
        },
        /**
         * Optional icon for null value
         */
        icon: {
          type: String,
        },

        /**
         * Renders html as title. (Good for titles with HTML in them.)
         */
        titleAsHtml: {
          type: Boolean,
        },

        /**
         * value of elected options
         */
        value: {
          type: Object,
        },
      };
    }

    constructor() {
      super();
      this.allowNull = false;
      this.command = "insertHTML";
      this.label = "Insert link";
      this.titleAsHtml = false;
      this.value = null;
    }

    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this._setOptions();
    }

    /**
     * overrides RichTextEditorButtonBehaviors
     * toggle button behaviors
     *
     * @param {object} text selected range
     * @returns {boolean} whether button is toggled
     *
     */
    get isToggled() {
      return false;
    }

    /**
     * handles picker focus
     * @param {event} e the button tap event
     */
    _pickerFocus(e) {
      e.preventDefault();
    }

    /**
     * handles range changes by getting
     */
    _rangeChanged() {
      let val = this._getSelection();
      if (this.shadowRoot) {
        if (this.tagsArray.includes(val)) {
          this.shadowRoot.querySelector("#button").value = val;
        } else if (!this.range || this.range.collapsed) {
          this.shadowRoot.querySelector("#button").value = null;
        }
      }
      super._rangeChanged();
    }

    /**
     * override to handle custom options
     */
    _setOptions() {
      return (this.options = this._setPickerOptions());
    }

    /**
     * gets a list of icons and load them in a format
     * that simple-picker can take;
     * if no icons are provided, loads a list from iron-meta
     *
     * @param {array} a list of custom icons for picker
     * @returns {array}
     */
    _setPickerOptions(options = this.options || []) {
      let items = [],
        cols =
          Math.sqrt(options.length) < 11
            ? Math.ceil(Math.sqrt(options.length))
            : 10;
      options.forEach((option, i) => {
        let row = Math.floor(i / cols),
          col = i - row * cols;
        if (!items[row]) items[row] = [];
        items[row][col] = option;
      });
      return items;
    }

    /**
     * Picker change
     */
    _pickerChange(e) {
      let val = this._getSelectionType() || "",
        parent = this.__highlight.parentNode;
      this.commandVal = e.detail.value || "";

      /* only update when there is an actual change */
      if (this.range && val !== this.commandVal) {
        this.sendCommand();
      }
    }
  };
};
/**
 * `rich-text-editor-picker`
 * a picker for rich text editor (custom buttons can RichTextEditorPickerBehaviors)
 *
 * @extends RichTextEditorPickerBehaviors
 * @extends LitElement
 * @customElement
 * @lit-html
 * @lit-element
 * @element rich-text-editor-picker
 * @demo ./demo/buttons.html
 */
class RichTextEditorPicker extends RichTextEditorPickerBehaviors(LitElement) {}
window.customElements.define(RichTextEditorPicker.tag, RichTextEditorPicker);
export { RichTextEditorPicker, RichTextEditorPickerBehaviors };
