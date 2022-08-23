import React, { useState } from "react";
import Card from "./Card";
import Column from "./Column";

export default function Table() {
  const [data, setData] = useState([
    {
      id: 1,
      name: "first column",
      cards: [
        {
          id: 1,
          name: "first Card",
          description: "Hi this is our fist card",
        },
        {
            id: 2,
            name: "Second Card",
            description: "Hi this is our second card",
          },
      ],
    },
    {
      id: 2,
      name: "second column",
      cards: [],
    },
  ]);
  const [activeColumn, setActiveColumn] = useState()
  const [activeCard, setActiveCard] = useState()
  return (
    <div>
      <h3>Table</h3>
      <Column columnData={data} setActiveColumn={setActiveColumn} setActiveCard={setActiveCard}/>
    </div>
  );
}
