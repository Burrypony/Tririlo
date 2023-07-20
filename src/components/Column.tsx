import React from "react";
import Card from "./Card";

interface CardInfo {
  id: number;
  name: string;
  description: string;
}

interface ColumnProps {
  columnData: {
    id: number;
    name: string;
    cards: CardInfo[];
  }[];
  setActiveColumn:any;
  setActiveCard:any;
}

export default function Column(props:ColumnProps) {
  const columnData = props.columnData;

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
