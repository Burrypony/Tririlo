import React, { useEffect, useState } from "react";
import Card from "./Card";
import Column from "./Column";

export default function Table() {
  const [data, setData] = useState([]);
  useEffect(() =>{
    fetch('/home')
    .then(res => res.json())
    .then(data => setData(data.data))
  })
  const [activeColumn, setActiveColumn] = useState()
  const [activeCard, setActiveCard] = useState()
  return (
    <div>
      <h3>Table</h3>
      <Column columnData={data} setActiveColumn={setActiveColumn} setActiveCard={setActiveCard}/>
    </div>
  );
}
