import React, { useEffect, useState } from "react";
import Card from "./Card";


interface Card {
  id: number;
  name: string;
  description: string;
}

interface activeColumn {
  id: number;
  name: string;
  cards: Card[];
}

interface ColumnProps {
  columnData: {
    id: number;
    name: string;
    cards: Card[];
  }[];
}

export default function Column(props: ColumnProps) {
  const columnData = props.columnData;
  const [columns, setColumns] = useState(columnData);
  const [activeColumn, setActiveColumn] = useState({
    id: -1,
    name: "",
    cards: [{ id: -1, name: "", description: "" }],
  });
  const [activeItem, setActiveItem] = useState({
    id: -1,
    name: "test",
    description: "test",
  });
  console.log("columns", columns);
  console.log("activeColumn " + JSON.stringify(activeColumn));

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.className == "card") {
      target.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dropCardHandler(
    e: React.DragEvent<HTMLDivElement>,
    columnTriggered: activeColumn
  ) {
    if (columnTriggered.cards.indexOf(activeItem) < 0) {
      columnTriggered.cards.push(activeItem);
    }
    const dublicates = [];
    const cardExist = columnTriggered.cards.forEach((el) => {
      if (el === activeItem) {
        dublicates.push(el);
      }
    });
    if (dublicates.length > 1) {
      const currentIndex = columnTriggered.cards.indexOf(activeItem);
      columnTriggered.cards.splice(currentIndex, 1);
    }
    if (activeColumn.id !== columnTriggered.id) {
      const currentIndex = activeColumn.cards.indexOf(activeItem);
      if(currentIndex >= 0){
      activeColumn.cards.splice(currentIndex, 1);
      }
      const newColumns = columns.map((column) => {
        if (column.id === columnTriggered.id) {
          return columnTriggered;
        }
        if (column.id === activeColumn.id) {
          return activeColumn;
        }
        return column;
      });
      setColumns(newColumns);
    }
  }


  return (
    <div className="columnSection">
      {columns.map((el) => (
        <div
          className="column"
          key={el.id}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, el)}
        >
          <h3 className="columnName">{el.name}</h3>
          <Card
            columnInfo={el}
            setColumns={(data) => setColumns(data)}
            setActiveColumn={(data) => setActiveColumn(data)}
            activeColumn={activeColumn}
            columns={columns}
            activeItem={activeItem}
            setActiveItem={(data) => setActiveItem(data)}
          />
        </div>
      ))}
    </div>
  );
}
