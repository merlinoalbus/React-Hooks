/* eslint-disable jsx-a11y/no-redundant-roles */
import { useState, useEffect } from "react";
import data from "./data";
import Articolo from "./Articolo";

//Funzione che se presente 'Theme' nel localStorage
// returna il suo valore o di default return 'light-mode'
const getCurrentTheme = () => {
  if (localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  } else {
    return "light";
  }
};

function App() {
  const [theme, setTheme] = useState(getCurrentTheme());
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const cambiaTema = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <section className="section-center">
      <div className="container">
        <button className="btn" role="button" onClick={() => cambiaTema()}>
          {" "}
          Cambia Tema{" "}
        </button>
        <section className="article-section">
          {" "}
          {data.map((el) => (
            <Articolo key={el.id} {...el} />
          ))}{" "}
        </section>{" "}
      </div>{" "}
    </section>
  );
}

export default App;
