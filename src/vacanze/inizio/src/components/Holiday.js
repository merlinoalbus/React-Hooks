import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleHoliday from "./SingleHoliday";
const url = "https://react-corso-api.netlify.app/.netlify/functions/holiday";
const Holiday = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(1);
  const getData = async () => {
    try {
      const response = await axios.get(url);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getNextVacanza = () => {
    setSelectedItem((prevValue) => {
      // @ts-ignore
      if (prevValue + 1 === data.data.length) return 0;
      return prevValue + 1;
    });
  };
  const getPrevVacanza = () => {
    setSelectedItem((prevValue) => {
      // @ts-ignore
      if (prevValue - 1 < 0) return data.data.length - 1;
      return prevValue - 1;
    });
  };
  useEffect(() => {
    getData();
  }, []);
  // @ts-ignore
  if (data.success) {
    return (
      <>
        {
          // @ts-ignore
          data.data.length > 0 ? (
            // @ts-ignore
            <SingleHoliday
              // @ts-ignore
              {...data.data[selectedItem]}
              next={getNextVacanza}
              prev={getPrevVacanza}
            />
          ) : (
            <h4>Nessuna Vacanza Trovata</h4>
          )
        }
      </>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default Holiday;
