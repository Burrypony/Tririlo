import React from "react";
import Card from "./Card";

interface Card {
  id: number;
  name: string;
  description: string;
}

interface ColumnProps {
  columnData: {
    id: number;
    name: string;
    cards: Card[];
  }[];
}

export default function Column(props:{props: ColumnProps, setActiveColumn:any, setActiveCard:any}) {
  const columnData = props.props.columnData;

  return (
    <div className="columnSection">
      {columnData.map((el) => (
        <div className="column" key={el.id}>
          <h3 className="columnName">{el.name}</h3>
          <Card columnInfo={el} setActiveColumn={props.setActiveColumn} setActiveCard={props.setActiveCard}/>
        </div>
      ))}
    </div>
  );
}
