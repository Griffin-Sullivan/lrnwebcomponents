import { html, PolymerElement } from "@polymer/polymer/polymer-element.js";
import { dom } from "@polymer/polymer/lib/legacy/polymer.dom.js";
import "@polymer/iron-ajax/iron-ajax.js";
import "@polymer/app-route/app-location.js";
import "../elmsln-base-deps.js";
import "@polymer/app-route/app-route.js";
import "@lrnwebcomponents/simple-icon/simple-icon.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
import "@polymer/paper-badge/paper-badge.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/iron-list/iron-list.js";
import "@polymer/paper-toast/paper-toast.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@lrnwebcomponents/lrnsys-render-html/lrnsys-render-html.js";
import "@lrnwebcomponents/lrnsys-layout/lib/lrnsys-dialog.js";
import "@lrnwebcomponents/lrnsys-button/lrnsys-button.js";
import "@lrnwebcomponents/elmsln-loading/elmsln-loading.js";
import "@lrnwebcomponents/materializecss-styles/materializecss-styles.js";
import "./lrnapp-studio-project-button.js";
import "./lrnapp-studio-assignment-button.js";
import "../lrnapp-studio-submission/lrnapp-studio-submission-button.js";
class LrnappStudioKanban extends PolymerElement {
  static get template() {
    return html`
      <style include="materializecss-styles">
        [hidden] {
          display: none !important;
        }
        :host {
          display: block;
        }
        div.card {
          box-shadow: 0 5px 5px rgba(0, 0, 0, 0.7);
        }
        #loading {
          width: 100%;
          z-index: 1000;
          opacity: 0.8;
          text-align: center;
          align-content: center;
          justify-content: center;
          height: 100vh;
          position: absolute;
          background-color: white;
        }
        .projects-container {
          -webkit-box-pack: start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          min-height: 23em;
        }
        @media screen and (max-width: 800px) {
          .projects-container {
            width: auto;
          }
        }
        #activetoggle {
          padding-left: 16px;
        }
        .card-content {
          scrollbar-face-color: #aa5555;
          scrollbar-shadow-color: #ffc107;
          scrollbar-highlight-color: #ffc107;
          scrollbar-3dlight-color: #ffc107;
          scrollbar-darkshadow-color: #ffc107;
          scrollbar-track-color: #ffc107;
          scrollbar-arrow-color: #ffc107;
        }
        .card-content::-webkit-scrollbar-track {
          background-color: #833900;
        }
        /* the new scrollbar will have a flat appearance with the set background color */
        .card-content::-webkit-scrollbar-thumb {
          background-color: #ffc107;
        }
        /* this will style the thumb, ignoring the track */
        .card-content::-webkit-scrollbar-button {
          background-color: #833900;
        }
        /* optionally, you can style the top and the bottom buttons (left and right for horizontal bars) */
        .card-content::-webkit-scrollbar-corner {
          background-color: #833900;
        }
        /* if both the vertical and the horizontal bars appear, then perhaps the right bottom corner*/
        .card-content::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        /* this targets the default scrollbar (compulsory) */
        button {
          padding: 0;
          margin: 0;
          min-width: 12px;
        }
        .project-card {
          width: 320px;
          margin: 0;
          height: 100%;
          min-height: 10em;
        }
        .project-card h3.header {
          font-size: 16px;
          word-break: break-all;
          padding: 8px;
          overflow: hidden;
          margin: 0;
        }
        div.card {
          box-shadow: 0 5px 5px rgba(0, 0, 0, 0.7);
        }
        .project-container {
          padding: 16px;
        }
        .project-card .card-content {
          height: 320px;
          overflow-y: auto;
          padding: 0;
        }
        .assignment-container {
          height: 100%;
        }
        .project-container:hover .project-operations {
          display: block;
        }
        .project-operations {
          position: absolute;
          top: 8px;
          right: -20px;
          display: none;
          transform: scale(0.6);
        }
        .project-operations .operation {
          --lrnsys-button-height: 48px;
          display: inline-flex;
        }
        .project-operations .operation[hidden] {
          display: none;
        }
        .assignment-row {
          height: 40px;
          border: 1px solid #000000;
          background-color: #ffffff;
        }
        .assignment-row .assignment-row-button.active {
          background-color: var(--paper-amber-50);
          font-weight: bold;
        }
        .assignment-row-title {
          font-size: 16px;
          text-align: left;
          line-height: 16px;
          margin-top: 8px;
          overflow: hidden;
        }
        .assignment-row:hover .assignment-operations {
          display: block;
          overflow: visible;
        }
        .assignment-row-button {
          width: 100%;
          justify-content: flex-start;
          text-transform: none;
        }
        .assignment-row-button::part(lrnsys-button-inner-div) {
          padding: 0;
        }
        .assignment-row-button[icon="assignment"]::part(lrnsys-button-icon) {
          --simple-icon-color: black;
        }
        .assignment-row-button[icon="assignment-late"]::part(lrnsys-button-icon) {
          --simple-icon-color: orangered;
        }
        .assignment-row-button[icon="done"]::part(lrnsys-button-icon) {
          --simple-icon-color: green;
        }
        .status-indicator {
          border-right: 1px solid grey;
          padding: 0.5em;
          margin: 0 0.5em 0 0;
          display: inline-flex;
          line-height: 40px;
          height: 40px;
          justify-content: center;
          align-items: center;
        }
        .button-contents {
          display: flex;
          align-content: center;
        }
        .assignment-operations {
          position: absolute;
          padding: 0;
          display: none;
          top: -14px;
          right: -18px;
          padding: 0;
          transform: scale(0.6);
        }
        .assignment-operations.show {
          display: block;
          overflow: visible;
        }
        .assignment-operations .operation {
          display: inline-flex;
          width: 40px;
          height: 40px;
          margin: 10px 10px 0 0;
        }
        .assignment-operations .operation[hidden] {
          display: none;
        }
        lrnapp-studio-project-button {
          margin: 0em auto;
          max-width: 10em;
        }
        lrnsys-button {
          --lrnsys-button-height: 40px;
        }
      </style>
      <iron-ajax
        auto=""
        id="projectbackend"
        url="[[sourcePath]]"
        handle-as="json"
        last-response="{{projectResponse}}"
        on-response="_handleProjectResponse"
      >
      </iron-ajax>
      <iron-ajax
        id="backend"
        url="[[sourcePath]]"
        params=""
        handle-as="json"
        last-response="{{backendResponse}}"
        on-response="_handleUpdateResponse"
      >
      </iron-ajax>

      <app-location
        route="{{route}}"
        query-params="{{queryParams}}"
      ></app-location>
      <app-route
        route="{{route}}"
        pattern="[[endPoint]]/:page"
        data="{{data}}"
        tail="{{tail}}"
        query-params="{{queryParams}}"
      >
      </app-route>
      <div id="loading">
        <h3>Loading..</h3>
        <elmsln-loading color="grey-text" size="large"></elmsln-loading>
      </div>
      <lrnapp-studio-project-button
        hidden$="[[!projectResponse.data.canCreateProjects]]"
        classes="amber darken-4 white-text"
        end-point="[[endPoint]]"
        csrf-token="[[csrfToken]]"
        icon="add"
      ></lrnapp-studio-project-button>
      <div class="projects-window">
        <iron-list
          items="[[_toArray(projectResponse.data.projects)]]"
          as="project"
          class="projects-container"
          grid=""
          mutable-data
        >
          <template class="projects-container-items">
            <div class="project-container">
              <div
                id$="project-[[project.id]]"
                class="project-card grey lighten-3 card"
              >
                <h3 class="header">[[project.attributes.title]]</h3>
                <div class="project-operations">
                  <lrnsys-button
                    icon-class="no-margin"
                    id$="project-[[project.id]]-edit"
                    title="Edit project"
                    class="operation"
                    hover-class="amber lighten-2"
                    hidden="[[!project.meta.canUpdate]]"
                    icon="create"
                    on-click="_makeProjectEditLink"
                  >
                  </lrnsys-button>
                  <lrnapp-studio-assignment-button
                    project-id="[[project.id]]"
                    icon-class="no-margin"
                    id$="project-[[project.id]]-add"
                    title="Add assignment"
                    class="operation"
                    hover-class="amber lighten-2"
                    hidden="[[!project.meta.canUpdate]]"
                    icon="add"
                    end-point="[[endPoint]]"
                    csrf-token="[[csrfToken]]"
                  >
                  </lrnapp-studio-assignment-button>
                  <lrnsys-button
                    id$="project-[[project.id]]-delete"
                    title="Delete project!"
                    class="operation"
                    hover-class="red darken-2 white-text"
                    header="Delete project!"
                    hidden="[[!project.meta.canDelete]]"
                    icon="delete-forever"
                    on-click="_deleteProjectDialog"
                    icon-class="no-margin"
                  >
                  </lrnsys-button>
                </div>
                <div class="card-content">
                  <iron-list
                    items="[[_toArray(project.relationships.assignments)]]"
                    as="assignment"
                    mutable-data
                    class="assignment-container"
                  >
                    <template>
                      <div class="assignment-row" id="assignment">
                        <lrnsys-button
                          id$="assignment-[[project.id]]-[[assignment.id]]"
                          class="assignment-row-button"
                          hover-class="amber lighten-5"
                          on-click="assignmentClick"
                          icon="[[assignment.meta.relatedSubmissions.complete.icon]]"
                        >
                          <span class="assignment-row-title"
                            >[[assignment.attributes.title]]</span
                          >
                        </lrnsys-button>
                        <span class="assignment-operations">
                          <lrnsys-button
                            id$="assignment-[[project.id]]-[[assignment.id]]-add-critique"
                            icon="editor:insert-comment"
                            title="Add critique"
                            class="operation"
                            hover-class="green lighten-2"
                            hidden="[[!assignment.meta.canCritique]]"
                            href$="[[assignment.meta.critiqueLink]]"
                            icon-class="no-margin"
                          ></lrnsys-button>
                          <lrnsys-button
                            id$="assignment-[[project.id]]-[[assignment.id]]-edit"
                            icon="editor:mode-edit"
                            title="Edit"
                            class="operation"
                            hover-class="amber lighten-2"
                            hidden="[[!assignment.meta.canUpdate]]"
                            on-click="_makeAssignmentEditLink"
                            icon-class="no-margin green-text text-darken-4"
                          ></lrnsys-button>
                          <lrnsys-button
                            id$="assignment-[[project.id]]-[[assignment.id]]-delete"
                            icon="delete-forever"
                            title="Delete"
                            class="operation"
                            hover-class="red darken-2 white-text"
                            hidden="[[!assignment.meta.canDelete]]"
                            on-click="_deleteAssignmentDialog"
                            icon-class="no-margin red-text text-darken-4"
                          ></lrnsys-button>
                        </span>
                      </div>
                    </template>
                  </iron-list>
                </div>
              </div>
            </div>
          </template>
        </iron-list>
      </div>
      <paper-toast text="Updated" id="toast"></paper-toast>
      <paper-dialog id="delete" modal="">
        <h3>[[_deleteTitle]]</h3>
        <p>[[_deleteText]]</p>
        <div class="buttons">
          <button dialog-dismiss="">Decline</button>
          <button
            id="deleteaccept"
            on-click="_handleDelete"
            dialog-confirm=""
            autofocus=""
          >
            Accept
          </button>
        </div>
      </paper-dialog>
      <paper-dialog id="activeitemcontainer" with-backdrop>
        <div id="activecontent">
          <app-header reveals>
            <app-toolbar
              class$="[[activeAssignmentNode.meta.relatedSubmissions.complete.color]]"
            >
              <div>
                <simple-icon
                  icon="[[activeAssignmentNode.meta.relatedSubmissions.complete.icon]]"
                  disabled$="[[!activeAssignmentNode.meta.relatedSubmissions.canCreate]]"
                ></simple-icon>
                [[activeAssignmentNode.meta.relatedSubmissions.complete.submission.title]]
              </div>
              <div
                spacer=""
                class="comment-box"
                hidden$="[[!activeAssignmentNode.meta.relatedSubmissions.complete.submission.id]]"
              >
                <div
                  id$="assignment-[[activeAssignmentNode.relationships.project.data.id]]-[[activeAssignmentNode.id]]-comments"
                  style="margin:0;padding:.25em;text-transform:none;"
                >
                  <simple-icon icon="communication:forum"></simple-icon>
                  [[activeAssignmentNode.meta.relatedSubmissions.complete.submission.meta.comments.count]]
                  Comments
                </div>
                <paper-badge
                  hidden$="[[displayNewBadge(activeAssignmentNode.meta.relatedSubmissions.complete.submission.meta.new)]]"
                  for$="assignment-[[activeAssignmentNode.relationships.project.data.id]]-[[activeAssignmentNode.id]]-comments"
                  label$="[[activeAssignmentNode.meta.relatedSubmissions.complete.submission.meta.comments.new]]"
                ></paper-badge>
              </div>

              <lrnapp-studio-submission-button
                spacer
                auto
                assignment-id="[[activeAssignmentNode.id]]"
                submission="{{submission}}"
                end-point="[[buildSubmissionPath(basePath)]]"
                csrf-token="[[csrfToken]]"
                submission-id="[[activeAssignmentNode.meta.relatedSubmissions.complete.submission.id]]"
              ></lrnapp-studio-submission-button>
              <paper-toggle-button
                id="activetoggle"
                on-click="statusToggle"
              ></paper-toggle-button>
              <span id="activetoggletext"></span>
            </app-toolbar>
            <div class="status-rationale">
              [[activeAssignmentNode.meta.relatedSubmissions.complete.rationale.text]]
            </div>
          </app-header>
          <lrnsys-render-html
            style="padding:2em;"
            html="[[activeAssignmentNode.attributes.body]]"
          ></lrnsys-render-html>
        </div>
      </paper-dialog>
    `;
  }

  static get tag() {
    return "lrnapp-studio-kanban";
  }

  static get properties() {
    return {
      elmslnCourse: {
        type: String,
      },
      elmslnSection: {
        type: String,
      },
      basePath: {
        type: String,
        notify: true,
      },
      csrfToken: {
        type: String,
        notify: true,
      },
      endPoint: {
        type: String,
        notify: true,
      },
      activeAssignment: {
        type: String,
        value: null,
        notify: true,
      },
      activeAssignmentNode: {
        type: Object,
      },
      projectToDelete: {
        type: String,
        value: null,
        notify: true,
      },
      assignmentToDelete: {
        type: String,
        value: null,
        notify: true,
      },
      sourcePath: {
        type: String,
        notify: true,
      },
      /**
       * Submission for two-way data binding on return from the button being pushed
       */
      submission: {
        type: Object,
        notify: true,
      },
      /**
       * Response from the server.
       */
      projectResponse: {
        type: Object,
        notify: true,
      },
      /**
       * Response from the server for non-project requests.
       */
      backendResponse: {
        type: Object,
        notify: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.dispatchEvent(new Event("resize"));
    this.addEventListener(
      "project-created",
      this._handleProjectCreated.bind(this)
    );
    this.addEventListener(
      "assignment-created",
      this._handleAssignmentCreated.bind(this)
    );
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  }
  disconnectedCallback() {
    this.removeEventListener(
      "project-created",
      this._handleProjectCreated.bind(this)
    );
    this.removeEventListener(
      "assignment-created",
      this._handleAssignmentCreated.bind(this)
    );
    super.disconnectedCallback();
  }

  static get observers() {
    return [
      "_routeChanged(route, endPoint)",
      "_deleteToast(queryParams.deletetoast)",
    ];
  }

  // If the current route is outside the scope of our app
  // then allow the website to break out of the single page
  // application routing
  _routeChanged(route, endPoint) {
    if (typeof route.path === "string") {
      if (typeof endPoint === "string") {
        if (route.path.startsWith(endPoint) || route.path == "/") {
          return;
        }
      }
      window.location.reload();
    }
  }

  /**
   * Support having a toast message because of delete or error elsewhere.
   */
  _deleteToast(deletetoast, old) {
    if (typeof deletetoast !== typeof undefined) {
      if (deletetoast == "error") {
        this.$.toast.show("That submission on longer exists!");
      } else {
        this.$.toast.show("Submission deleted successfully!");
      }
      this.set("queryParams.deletetoast", undefined);
      this.notifyPath("queryParams.deletetoast");
    }
  }

  /**
   * @todo  remove this once we have a modal for it
   */
  _makeProjectEditLink(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    var parts = local.id.split("-");
    window.location.href =
      this.basePath +
      "../node/" +
      parts[1] +
      "/edit?destination=apps/lrnapp-studio-kanban";
  }

  /**
   * @todo  remove this once we have a modal for it
   */
  _makeAssignmentEditLink(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    var parts = local.id.split("-");
    window.location.href =
      this.basePath +
      "../node/" +
      parts[2] +
      "/edit?destination=apps/lrnapp-studio-kanban";
  }

  /**
   * Handle the push to delete a project, pop up the modal.
   */
  _deleteProjectDialog(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    var parts = local.id.split("-");
    // set values so we know what to drop
    this.projectToDelete = parts[1];
    this._deleteTitle = "Delete project";
    this._deleteText =
      "Are you sure you want to delete this project and all related assignments!?";
    this._deleteType = "project";
    this.$.delete.open();
  }

  /**
   * Handle the call to delete the assignment specified.
   */
  _handleDelete() {
    if (this._deleteType == "project") {
      this.$.backend.method = "DELETE";
      this.$.backend.body = this.projectToDelete;
      this.$.backend.url =
        this.endPoint +
        "/api/projects/" +
        this.projectToDelete +
        "?token=" +
        this.csrfToken;
      this.$.backend.generateRequest();
    } else if (this._deleteType == "assignment") {
      this.$.backend.method = "DELETE";
      this.$.backend.body = this.assignmentToDelete;
      this.$.backend.url =
        this.endPoint +
        "/api/assignments/" +
        this.assignmentToDelete +
        "?token=" +
        this.csrfToken;
      this.$.backend.generateRequest();
    }
  }
  /**
   * Handle the push to delete an assignment, pop up the modal.
   */
  _deleteAssignmentDialog(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    var parts = local.id.split("-");
    this.assignmentToDelete = parts[2];
    // set values so we know what to drop
    this._deleteTitle = "Delete assignment";
    this._deleteText = "Are you sure you want to delete this assignment?";
    this._deleteType = "assignment";
    this.$.delete.open();
  }

  /**
   * if we should show new badge based on new comment count.
   */
  displayNewBadge(count) {
    if (typeof count === typeof undefined || count == 0) {
      return true;
    }
    return false;
  }

  /**
   * Handle toggling the status for the submission.
   */
  statusToggle(e) {
    // find our xhr for callbacks
    var xhr = this.$.backend;
    // break the id out into project and assignment
    var parts = this.activeAssignment.split("-");
    // focus in on the submissions / assignment meta
    var submission = this.projectResponse.data.projects["project-" + parts[1]]
      .relationships.assignments["assignment-" + parts[2]].meta
      .relatedSubmissions.complete;
    // ensure this isn't disabled though it shouldn't be possible
    if (!this.shadowRoot.querySelector("#activetoggle").disabled) {
      // hide the loading screen
      this.$.loading.hidden = false;
      // queue of the request parameters
      xhr.params = {
        submissionid: submission.submission.id,
        status: this.shadowRoot.querySelector("#activetoggle").checked,
      };
      // send the request
      xhr.generateRequest();
    }
  }

  /**
   * Handle toggle for mouse class and manage classList array for button.
   */
  assignmentClick(e) {
    var normalizedEvent = dom(e);
    var local = normalizedEvent.localTarget;
    if (local.tagName === "SPAN") {
      local = local.parentNode;
    }
    if (this.activeAssignment != null && this.activeAssignment != local.id) {
      this.shadowRoot
        .querySelector("#" + this.activeAssignment)
        .nextElementSibling.classList.remove("show");
      this.shadowRoot
        .querySelector("#" + this.activeAssignment)
        .classList.remove("active");
    }
    this.activeAssignment = local.id;
    var parts = this.activeAssignment.split("-");
    this.activeAssignmentNode = this.projectResponse.data.projects[
      "project-" + parts[1]
    ].relationships.assignments["assignment-" + parts[2]];
    this._setToggle(false);
    local.nextElementSibling.classList.add("show");
    local.classList.add("active");
    this.$.activeitemcontainer.toggle();
  }

  /**
   * Handle response for the whole projects object.
   */
  _handleProjectResponse(event) {
    this.$.loading.hidden = true;
    this._setToggle(true);
    window.dispatchEvent(new Event("resize"));
    if (this.activeAssignment) {
      setTimeout(() => {
        var parts = this.activeAssignment.split("-");
        this.set("activeAssignmentNode", {});
        this.activeAssignmentNode = this.projectResponse.data.projects[
          "project-" + parts[1]
        ].relationships.assignments["assignment-" + parts[2]];
        window.dispatchEvent(new Event("resize"));
      }, 100);
    }
  }

  /**
   * buildSubmissionPath for generating a new submission or linking to existing.
   */
  buildSubmissionPath(path) {
    return path + "lrnapp-studio-submission";
  }
  ready() {
    super.ready();
    window.dispatchEvent(new Event("resize"));
  }

  /**
   * Handle a response from updating an item
   */
  _handleUpdateResponse(event) {
    if (this.backendResponse.status == 200) {
      this.$.toast.text = "Updated successfully";
      this.$.toast.toggle();
      window.dispatchEvent(new Event("resize"));
      // this will force a repaint of the UI pieces on reload
      this.set("projectResponse", {});
      this.$.projectbackend.generateRequest();
      setTimeout(() => {
        var parts = this.activeAssignment.split("-");
        window.dispatchEvent(new Event("resize"));
        this.set("activeAssignmentNode", {});
        this.activeAssignmentNode = this.projectResponse.data.projects[
          "project-" + parts[1]
        ].relationships.assignments["assignment-" + parts[2]];
      }, 500);
    } else {
      // this would imply an error
      this.$.loading.hidden = true;
    }
  }

  /**
   * set the toggle state when assignment gets focus
   */
  _setToggle(update) {
    if (this.activeAssignment != null) {
      var parts = this.activeAssignment.split("-");
      // focus in on the submissions / assignment meta
      var submission = this.projectResponse.data.projects["project-" + parts[1]]
        .relationships.assignments["assignment-" + parts[2]].meta
        .relatedSubmissions.complete;
      // not finished but also not started
      if (submission.status == 0 && submission.submission.length == 0) {
        if (!update) {
          this.shadowRoot.querySelector("#activetoggle").disabled = true;
          this.shadowRoot.querySelector("#activetoggle").checked = false;
        }
        this.shadowRoot.querySelector("#activetoggle").title =
          "Submission not started";
        this.shadowRoot.querySelector("#activetoggletext").textContent =
          "Submission not started";
      } else if (submission.status == 0) {
        if (!update) {
          this.shadowRoot.querySelector("#activetoggle").disabled = false;
          this.shadowRoot.querySelector("#activetoggle").checked = false;
        }
        this.shadowRoot.querySelector("#activetoggle").title =
          "Submission started";
        this.shadowRoot.querySelector("#activetoggletext").textContent =
          "Submission in progress";
      } else {
        if (!update) {
          this.shadowRoot.querySelector("#activetoggle").disabled = false;
          this.shadowRoot.querySelector("#activetoggle").checked = true;
        }
        this.shadowRoot.querySelector("#activetoggle").title =
          "Submission ready";
        this.shadowRoot.querySelector("#activetoggletext").textContent =
          "Submission ready";
      }
    }
  }

  /**
   * Event came from the project button to indicate it was successful.
   */
  _handleProjectCreated(e) {
    this.$.toast.text = "Project added";
    this.$.toast.toggle();
    this.$.projectbackend.generateRequest();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }

  /**
   * Event came from the assignment button to indicate it was successful.
   */
  _handleAssignmentCreated(e) {
    this.$.toast.text = "Assignment added";
    this.$.toast.toggle();
    this.$.projectbackend.generateRequest();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
  }

  /*
   * Simple way to convert from object to array.
   */
  _toArray(obj) {
    if (obj == null) {
      return [];
    }
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }
}
window.customElements.define(LrnappStudioKanban.tag, LrnappStudioKanban);
export { LrnappStudioKanban };
