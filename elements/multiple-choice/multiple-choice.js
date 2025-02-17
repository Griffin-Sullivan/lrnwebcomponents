import { html, css } from "lit";
import { SchemaBehaviors } from "@lrnwebcomponents/schema-behaviors/schema-behaviors.js";
import { SimpleColors } from "@lrnwebcomponents/simple-colors/simple-colors.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-fields/lib/simple-fields-field.js";
import { SimpleToastStore } from "@lrnwebcomponents/simple-toast/simple-toast.js";
/**
 * `multiple-choice`
 * `Ask the user a question from a set of possible answers.`
 * @demo demo/index.html
 * @element multiple-choice
 */
class MultipleChoice extends SchemaBehaviors(SimpleColors) {
  /**
   * LitElement constructable styles enhancement
   */
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: block;
          min-width: 160px;
          padding: 16px 16px 54px 16px;
          color: var(--simple-colors-default-theme-grey-12);
          --simple-fields-field-color: var(
            --simple-colors-default-theme-grey-12
          );
          --simple-fields-field-ink-color: var(
            --simple-colors-default-theme-grey-12
          );
          --simple-fields-field-checked-color: var(
            --simple-colors-default-theme-accent-8
          );
          --simple-fields-field-checked-ink-color: var(
            --simple-colors-default-theme-accent-8
          );
          --simple-fields-field-checkmark-color: var(
            --simple-colors-default-theme-grey-1
          );
          --simple-fields-field-label-color: var(
            --simple-colors-default-theme-grey-12
          );
          --simple-fields-field-error-color: var(
            --simple-colors-default-theme-red-8
          );
        }

        :host button {
          background-color: var(--simple-colors-default-theme-grey-1);
          color: var(--simple-colors-default-theme-grey-12);
        }
        :host button:hover,
        :host button:focus,
        :host button:active {
          cursor: pointer;
          background-color: var(--simple-colors-default-theme-grey-2);
          color: var(--simple-colors-default-theme-grey-12);
        }
        h3 {
          margin: 8px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        ul li {
          padding: 0;
        }
        simple-fields-field {
          padding: 8px;
          margin: 2px;
        }
        simple-fields-field::part(option-inner) {
          position: absolute;
          right: 0px;
          bottom: 50%;
          top: 50%;
          padding: 0px;
          margin: 0px;
        }
        simple-icon {
          display: inline-flex;
        }
      `,
    ];
  }
  static get tag() {
    return "multiple-choice";
  }
  constructor() {
    super();
    this.randomize = false;
    this.hideButtons = false;
    this.disabled = false;
    this.singleOption = false;
    this.checkLabel = "Check answer";
    this.resetLabel = "Reset";
    this.question = "";
    this.answers = [];
    this.displayedAnswers = [];
    this.correctText = "Great job!";
    this.correctIcon = "icons:thumb-up";
    this.incorrectText = "Better luck next time!";
    this.incorrectIcon = "icons:thumb-down";
    this.quizName = "default";
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      let notifiedProps = ["answers", "displayedAnswers"];
      if (notifiedProps.includes(propName)) {
        // notify
        let eventName = `${propName
          .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
          .toLowerCase()}-changed`;
        this.dispatchEvent(
          new CustomEvent(eventName, {
            detail: {
              value: this[propName],
            },
          })
        );
      }
      if (propName == "answers" && this.answers && this.answers.length > 0) {
        this.displayedAnswers = [
          ...this._computeDisplayedAnswers(this.answers, this.randomize),
        ];
      }
    });
  }
  render() {
    return html`
      <confetti-container id="confetti">
        <meta property="oer:assessing" content="${this.relatedResource}" />
        <h3><span property="oer:name">${this.question}</span></h3>
        ${this.singleOption
          ? html`
              ${this.displayedAnswers.map(
                (answer, index) => html`
                  <simple-fields-field
                    ?disabled="${this.disabled}"
                    property="oer:answer"
                    type="radio"
                    name="${index}"
                    .value="${answer.userGuess}"
                    @value-changed="${this.checkedEvent}"
                    label="${answer.label ? answer.label : ""}"
                  ></simple-fields-field>
                `
              )}
            `
          : html`
              <ul>
                ${this.displayedAnswers.map(
                  (answer, index) => html`
                    <li>
                      <simple-fields-field
                        ?disabled="${this.disabled}"
                        property="oer:answer"
                        name="${index}"
                        type="checkbox"
                        label="${answer.label ? answer.label : ""}"
                        .value="${answer.userGuess}"
                        @value-changed="${this.checkedEvent}"
                      ></simple-fields-field>
                    </li>
                  `
                )}
              </ul>
            `}
        ${!this.hideButtons
          ? html`
              <div id="buttons">
                <button
                  id="check"
                  ?disabled="${this.disabled}"
                  @click="${this._verifyAnswers}"
                >
                  ${this.checkLabel}
                </button>
                <button
                  id="reset"
                  ?disabled="${this.disabled}"
                  @click="${this.resetAnswers}"
                >
                  ${this.resetLabel}
                </button>
              </div>
            `
          : ``}
      </confetti-container>
    `;
  }
  checkedEvent(e) {
    let attr = this.displayedAnswers;
    attr[e.target.name].userGuess = e.detail.value;
    this.displayedAnswers = [...attr];
  }
  static get properties() {
    return {
      ...super.properties,
      /**
       * Support disabling interaction with the entire board
       */
      disabled: {
        type: Boolean,
      },
      /**
       * Simple option, otherwise allow multiple via checkbox
       */
      singleOption: {
        type: Boolean,
        attribute: "single-option",
      },
      /**
       * Text of the label to check your answer
       */
      checkLabel: {
        type: String,
        attribute: "check-label",
      },
      /**
       * Text of the reset button
       */
      resetLabel: {
        type: String,
        attribute: "reset-label",
      },
      /**
       * Related Resource ID
       */
      relatedResource: {
        type: String,
        attribute: "related-resource",
      },
      /**
       * Question to ask
       */
      question: {
        type: String,
      },
      /**
       * Array of possible answers
       */
      answers: {
        type: Array,
      },
      /**
       * Displayed Answer set.
       */
      displayedAnswers: {
        type: Array,
      },
      /**
       * Correct answer text to display
       */
      correctText: {
        type: String,
        attribute: "correct-text",
      },
      /**
       * Incorrect answer text to display
       */
      incorrectText: {
        type: String,
        attribute: "incorrect-text",
      },
      /**
       * Correct answer text to display
       */
      correctIcon: {
        type: String,
        attribute: "correct-icon",
      },
      /**
       * Incorrect answer text to display
       */
      incorrectIcon: {
        type: String,
        attribute: "incorrect-icon",
      },
      /**
       * Name of the quiz - hardcoded for now from HTML
       */
      quizName: {
        type: String,
        attribute: "quiz-name",
      },
      /**
       * Randomize the display of the answers
       */
      randomize: {
        type: Boolean,
        reflect: true,
      },
      /**
       * flag to hide buttons
       */
      hideButtons: {
        type: Boolean,
        attribute: "hide-buttons",
      },
    };
  }

  /**
   * Reset user answers and shuffle the board again.
   */
  resetAnswers(e) {
    SimpleToastStore.hide();
    this.displayedAnswers = [];
    this.answers.forEach((el) => {
      el.userGuess = false;
    });
    const answers = JSON.parse(JSON.stringify(this.answers));
    this.answers = [...answers];
  }

  /**
   * Return if the current answers are correct
   */
  checkAnswers() {
    let gotRight = true;
    // see that they got them all right
    for (var i in this.displayedAnswers) {
      if (
        gotRight != false &&
        this.displayedAnswers[i].correct &&
        this.displayedAnswers[i].userGuess
      ) {
        gotRight = true;
      } else if (
        this.displayedAnswers[i].correct &&
        !this.displayedAnswers[i].userGuess
      ) {
        gotRight = false;
      } else if (
        !this.displayedAnswers[i].correct &&
        this.displayedAnswers[i].userGuess
      ) {
        gotRight = false;
      }
    }
    return gotRight;
  }
  /**
   * Verify the answers of the user based on their saying
   * that they want to see how they did.
   */
  _verifyAnswers(e) {
    SimpleToastStore.hide();
    let gotRight = this.checkAnswers();
    // see if they got this correct based on their answers
    if (gotRight) {
      this.__toastColor = "green";
      this.__toastIcon = this.correctIcon;
      this.__toastText = this.correctText;
      // make it fun... and performant!
      import("./lib/confetti-container.js").then((module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      });
    } else {
      this.__toastColor = "red";
      this.__toastIcon = this.incorrectIcon;
      this.__toastText = this.incorrectText;
    }
    let si = document.createElement("simple-icon");
    si.icon = this.__toastIcon;
    si.style.marginLeft = "16px";
    si.accentColor = this.__toastColor;
    si.dark = true;
    SimpleToastStore.showSimpleToast({
      detail: {
        duration: 3000,
        text: this.__toastText,
        slot: si,
        accentColor: this.__toastColor,
      },
    });
    // start of data passing, this is a prototype atm
    let eventData = {
      activityDisplay: "answered",
      objectName: this.quizName,
      resultSuccess: gotRight,
    };
    this.dispatchEvent(
      new CustomEvent("user-engagement", {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: eventData,
      })
    );
  }
  /**
   * LitElement hook to modify shadowRoot. Minor a11y improvement on Chrome
   */
  createRenderRoot() {
    return this.attachShadow({ mode: "open", delegatesFocus: true });
  }

  /**
   * Figure out the order of the answers which will be displayed
   */
  _computeDisplayedAnswers(answers, randomize) {
    // if we are editing via HAX, don't randomize the answers
    // as we are actively editing the content and this is amazingly jarring
    if (
      typeof answers !== typeof undefined &&
      answers != null &&
      answers.length > 0 &&
      randomize &&
      !this._haxstate
    ) {
      let random = answers;
      var currentIndex = random.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = random[currentIndex];
        random[currentIndex] = random[randomIndex];
        random[randomIndex] = temporaryValue;
      }
      // @todo apply a random sort to the answers array
      return random;
    } else {
      return answers;
    }
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
  /**
   * Implements haxHooks to tie into life-cycle if hax exists.
   */
  haxHooks() {
    return {
      editModeChanged: "haxeditModeChanged",
      activeElementChanged: "haxactiveElementChanged",
      preProcessNodeToContent: "haxpreProcessNodeToContent",
      preProcessInsertContent: "haxpreProcessInsertContent",
      inlineContextMenu: "haxinlineContextMenu",
    };
  }

  haxactiveElementChanged(element, value) {
    if (value) {
      this._haxstate = value;
    }
  }

  haxeditModeChanged(value) {
    this._haxstate = value;
  }
  /**
   * add buttons when it is in context
   */
  haxinlineContextMenu(ceMenu) {
    ceMenu.ceButtons = [
      {
        icon: "icons:add",
        callback: "haxClickInlineAdd",
        label: "Add answer",
      },
      {
        icon: "icons:remove",
        callback: "haxClickInlineRemove",
        label: "Remove answer",
      },
    ];
  }
  haxClickInlineAdd(e) {
    this.resetAnswers();
    let d = this.answers;
    d.push({ label: "New answer", correct: false });
    this.answers = [...d];
    return true;
  }
  haxClickInlineRemove(e) {
    if (this.answers.length > 0) {
      this.resetAnswers();
      let d = this.answers;
      d.pop();
      this.answers = [...d];
      return true;
    }
  }
  /**
   * HAX preprocess Node to Content hook
   */
  async haxpreProcessNodeToContent(node) {
    // ensure we dont accidently have the answer displayed!
    // this also rips the data into the lightDom for saving
    // so that we can unset the array data on the object at save time
    // this helps improve SEO / compatibility with CMS solutions
    if (node.answers) {
      // ensure this is null before generating new answers
      // otherwise page to page saves we could lose statefulness
      this.innerHTML = "";
      for (var i in node.answers) {
        let answer = document.createElement("input");
        answer.setAttribute("type", "checkbox");
        answer.value = node.answers[i].label;
        if (node.answers[i].correct) {
          answer.setAttribute("correct", "correct");
        }
        node.appendChild(answer);
      }
    }
    return node;
  }

  /**
   * HAX preprocess insert content hook
   */
  haxpreProcessInsertContent(detail) {
    // ensure we dont accidently have the answer displayed!
    if (detail.properties.answers) {
      detail.properties.answers = detail.properties.answers.map(function (val) {
        if (val.userGuess) {
          delete val.userGuess;
        }
        return val;
      });
    }
    return detail;
  }
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.setAttribute("typeof", "oer:Assessment");
    // check lightdom on setup for answers to be read in
    // this only happens on initial paint
    if (this.children.length > 0) {
      let inputs = Array.from(this.querySelectorAll("input"));
      let answers = [];
      for (var i in inputs) {
        let answer = {
          label: inputs[i].value,
          correct: inputs[i].getAttribute("correct") == null ? false : true,
        };
        answers.push(answer);
      }
      this.answers = answers;
      // wipe lightdom after reading it in for data. This makes it harder for someone
      // to just inspect the document and get at the underlying data
      this.innerHTML = "";
    }
  }
}
window.customElements.define(MultipleChoice.tag, MultipleChoice);
export { MultipleChoice };
