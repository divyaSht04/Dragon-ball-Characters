import { useState } from "react";
import CharacterInfo from "./CharacterInfo";
import style from "./App.module.css";

function App() {
  const [characterId, setCharacterId] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    const id = parseInt(inputValue);
      setCharacterId(id);
  };

  return (
    <div className={style.container}>
      <div className={style.inputField}>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Character ID"
          min="1"
        />
        <button onClick={handleButtonClick}>Click for the character info</button>
      </div>
      {characterId > 0 && characterId <= 40 && (
        <CharacterInfo id={characterId} />
      )}
      {characterId > 40 && <h1>There are up to 40 dragon ball characters</h1>}
      {characterId < 0 && <h1>Enter a valid character id</h1>}
    </div>
  );
}

export default App;
