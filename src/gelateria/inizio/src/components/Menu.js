import React, { useEffect, useState } from "react";
import Gelato from "./Gelato";
import axios from "axios";
import data from "../fakeData";

const url = "https://react-corso-api.netlify.app/.netlify/functions/gelateria";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [prodotti, setProdotti] = useState(data);
  const [selected, setSelected] = useState(0);
  const [filterProducts, setFilterProducts] = useState(prodotti);
  const [categorie, setCategorie] = useState([]);
  //? console.log(prodotti);
  //const categorie = Array.from(new Set(prodotti.map((el) => el.categoria)));
  //? console.log("categorie:", categorie);
  //categorie.unshift("all");
  const filtraProdotti = (categoria, index) => {
    setSelected(index);
    if (categoria === "all") {
      setFilterProducts(prodotti);
    } else {
      setFilterProducts(
        prodotti.filter((el) => (el.categoria === categoria ? el : ""))
      );
    }
  };
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(url);
        console.log("response:", response);
        console.log("url:", url);
        setProdotti(response.data.data.default);
        setFilterProducts(response.data.data.default)
        const nuoveCategorie =Array.from(
          new Set(response.data.data.default.map((el) => el.categoria))
        )
        nuoveCategorie.unshift("all")
        setCategorie(nuoveCategorie)
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        console.log("error:", error);
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);
  return (
    <div className="container">
      <h4 style={{ textAlign: "center", textTransform: "uppercase" }}>
        Le nostre scelte
      </h4>
      {!isLoading && !isError ? (
        <>
          <div className="lista-categorie">
            {categorie.map((categoria, index) => {
              return (
                <button
                  key={index}
                  onClick={() => filtraProdotti(categoria, index)}
                  className={`btn btn-selector ${
                    index === selected && "active"
                  }`}
                >
                  {categoria}
                </button>
              );
            })}
          </div>
          <div className="vetrina">
            {filterProducts.map((el) => {
              return <Gelato key={el.id} {...el} />;
            })}
          </div>
        </>
      ) : !isLoading && isError ? (
        <h4
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Error...
        </h4>
      ) : (
        <h4
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Loading...
        </h4>
      )}
    </div>
  );
};

export default Menu;
