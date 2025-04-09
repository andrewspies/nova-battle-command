/**
 * TitleScreen
 * @description Title screen of the game
 * @extends HTMLElement
 * @returns {HTMLElement} - returns the Modal component
 * @example
 * ```HTML
 * <app-viewport></app-viewport>
 * ```
 */
export class TitleScreen extends HTMLElement {
  _shadow: ShadowRoot;
  _component: HTMLElement;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    this._component = document.createElement("div");
  }

  /**
   * defineElement
   * @description (Private) Defines the element structure, style and heirarchy
   * @returns {void} - attaches elements to shadow DOM
   */
  private defineElement() {
    this._component.setAttribute("class", "title-screen");

    const style: HTMLLinkElement = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("href", new URL("./viewport.style.css", import.meta.url).toString());

    const title: HTMLHeadingElement = document.createElement("h1");
    title.setAttribute("class", "title");
    title.textContent = "NOVA BATTLE COMMAND";

    const menu: HTMLSlotElement = document.createElement("slot");
    menu.setAttribute("name", "menu");
    menu.setAttribute("class", "menu");

    this._component.appendChild(title);
    this._component.appendChild(menu);

    this._shadow.appendChild(this._component);
    this._shadow.appendChild(style);
  }

  /**
   * connectedCallback
   * @description Logic to run when component is added to DOM
   * @returns {void} - executes any function or logic when component is added to the DOM
   */
  connectedCallback() {
    this.defineElement();
  }

  /**
   * disconnectedCallback
   * @description Logic to run when component is removed from DOM
   * @returns {void} - executes any function or logic when component is removed from the DOM
   */
  disconnectedCallback() {}

  // attributeChangedCallback(name, oldValue, newValue) {
  // logic to run when component attributes change
  // e.g. update component style based on attribute value
  // }
}

customElements.define("app-title-screen", TitleScreen);
