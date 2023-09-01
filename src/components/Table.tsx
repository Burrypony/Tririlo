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
      cards: [
        {
          id: 3,
          name: "Third Card",
          description: "Hi this is our Third card",
        },
      ],
    },
  ]);
  return (
    <div>
      <h3>Table</h3>
      <Column columnData={data}/>
    </div>
  );
}
