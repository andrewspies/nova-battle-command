import { TitleScreen } from "./components/title-screen/title-screen.comp";
import { Viewport } from "./components/viewport/viewport.comp";
import { Menu } from "./components/menu/menu.comp";

// Styles
import "./style.css";

let hasSavedGame = false;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <app-viewport>
    <app-title-screen slot="screen">
      <app-menu slot="menu">
        <button id="startGameBtn" slot="item">Start Game</button>
        ${hasSavedGame ? `<button id="loadGameBtn" slot="item">Load Game</button>` : ""}
        <button slot="item">Options</button>
        <button slot="item">Credits</button>
        <button slot="item">Exit</button>
      </app-menu>
    </app-title-screen>
  </app-viewport>
`;

const menu = document.querySelector<HTMLDivElement>("app-menu");

const loadGameButton = document.createElement("button");
loadGameButton.setAttribute("slot", "item");
loadGameButton.setAttribute("id", "loadGameBtn");
loadGameButton.innerHTML = "Load Game";

const toggleGameLoadButton = () => {
  const children = menu?.children;
  hasSavedGame = !hasSavedGame;
  if (hasSavedGame) {
    menu?.insertBefore(loadGameButton, children![1]);
  }
  if (!hasSavedGame) {
    loadGameButton?.remove();
  }
};

const startGameBtn = document.querySelector<HTMLButtonElement>("#startGameBtn");
startGameBtn?.addEventListener("click", () => {
  console.log("Start Game button clicked", hasSavedGame);
  toggleGameLoadButton(); // need to rerender the app-menu on click
});

export { TitleScreen, Viewport, Menu };
