import React,{useState} from "react";
import {data} from "../../../data";
const ArrayState = () => {
  const [people, setPeople]=useState(data);
  const handleRemovePeople= (id) =>{
    const newPeople=people.filter((el =>el.id!==id));
    setPeople(newPeople);
  }
  return (
    people.map((el)=>{
      const {id, name}=el;
      return (
        <div key={id} className="item shadow">
          <h5>{name}</h5>
          <button
            type="button"
            className="button delete-button"
            onClick={() => handleRemovePeople(id)}  
          >X
          </button>
        </div>
      );
    }
    )
  );
};

export default ArrayState;
