import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [isNameEntered, setIsNameEntered] = useState(false);

  useEffect(() => {
    if (isNameEntered) {
      // Import Minecraft scripts only after name is entered
      import("./scripts/main.js")
        .then(() => {
          console.log("Minecraft game loaded successfully");
          // Store player name in localStorage for scripts to access
          localStorage.setItem("playerName", playerName);
          
          // Add event listener to show player name in the bottom left
          const nameDisplay = document.getElementById("player-name");
          if (nameDisplay) {
            nameDisplay.textContent = playerName;
          }
        })
        .catch(error => {
          console.error("Error loading Minecraft game:", error);
        });
    }
  }, [isNameEntered, playerName]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setIsNameEntered(true);
    }
  };

  const handleKeyDown = (e) => {
    // Prevent any key starting the game if name form is shown
    if (!isNameEntered) {
      e.stopPropagation();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <div id="app"></div>
      <div id="info">
        <div id="info-player-position"></div>
      </div>
      <div id="toolbar-container">
        <div id="toolbar">
          <img className="toolbar-icon" id="toolbar-1" src="/textures/grass.png" alt="grass"></img>
          <img className="toolbar-icon" id="toolbar-2" src="/textures/dirt.png" alt="dirt"></img>
          <img className="toolbar-icon" id="toolbar-3" src="/textures/stone.png" alt="stone"></img>
          <img className="toolbar-icon" id="toolbar-4" src="/textures/coal_ore.png" alt="coal"></img>
          <img className="toolbar-icon" id="toolbar-5" src="/textures/iron_ore.png" alt="iron"></img>
          <img className="toolbar-icon" id="toolbar-6" src="/textures/tree_top.png" alt="tree"></img>
          <img className="toolbar-icon" id="toolbar-7" src="/textures/leaves.png" alt="leaves"></img>
          <img className="toolbar-icon" id="toolbar-8" src="/textures/sand.png" alt="sand"></img>
          <img className="toolbar-icon selected" id="toolbar-0" src="/textures/pickaxe.png" alt="pickaxe"></img>
        </div>
      </div>
      <div id="overlay" style={{ display: isNameEntered ? "none" : "flex" }}>
        <div id="instructions">
          <h1>MINECRAFTjs</h1>
          {!isNameEntered ? (
            <form onSubmit={handleNameSubmit} className="name-form">
              <div className="input-container">
                <label htmlFor="player-name-input">Enter Your Name:</label>
                <input
                  id="player-name-input"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  autoFocus
                  maxLength="20"
                  placeholder="Steve"
                />
              </div>
              <button type="submit" className="start-button">START GAME</button>
              <div className="controls-info">
                WASD - Move<br />
                SHIFT - Sprint<br />
                SPACE - Jump<br />
                R - Reset Camera<br />
                U - Toggle UI<br />
                0 - Pickaxe<br />
                1-8 - Select Block<br />
                F1 - Save Game<br />
                F2 - Load Game<br />
                F10 - Debug Camera<br />
              </div>
            </form>
          ) : (
            <>
              WASD - Move<br />
              SHIFT - Sprint<br />
              SPACE - Jump<br />
              R - Reset Camera<br />
              U - Toggle UI<br />
              0 - Pickaxe<br />
              1-8 - Select Block<br />
              F1 - Save Game<br />
              F2 - Load Game<br />
              F10 - Debug Camera<br /><br />
              <h2>PRESS ANY KEY TO START</h2>
            </>
          )}
        </div>
      </div>
      <div id="player-name" className="player-name-display"></div>
      <div id="status"></div>
    </div>
  );
}

export default App;