import React, { useEffect, useState } from "react";
import style from "./App.module.css";

function CharacterInfo({ id }) {
  const [characters, setCharacters] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
        const data = await response.json();
        setCharacters(data);
        setError(""); // Clear any previous errors
      } catch (e) {
        console.log(e);
        setError("Failed to fetch character data.");
      }
    }

    if (id > 0) {
      fetchData();
    } else {
      setError("Character ID must be greater than 0.");
      setCharacters(null);
    }
  }, [id]);

  console.log(characters);

  if (!characters && !error) {
    return <div>Loading...</div>;
  }

  const { image, name, gender, ki, maxki, race, description } = characters || {};

  const final_description = truncateText(description, 50);
  function truncateText(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }

  return (
    <div className={style.container}>
      {error ? (
        <div className={style.error}>{error}</div>
      ) : (
        <div className={style.characterInfo}>
          <div className={style.image}>
            <img src={image} alt={name} />
          </div>
          <div className={style.info}>
            <h1>{name}</h1>
            <p>Gender: {gender}</p>
            <p>Ki: {ki}</p>
            <p>Max Ki: {maxki}</p>
            <p>Race: {race}</p>
            <p>Description: {final_description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterInfo;
