import React, { useEffect, useState } from "react";

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

interface cardProps {
  columnInfo: {
    id: number;
    name: string;
    cards: Card[];
  };
  setColumns: (data: {
    id: number;
    name: string;
    cards: Card[];
  }[]) => void;
  setActiveColumn: (data: activeColumn) => void;
  activeColumn: activeColumn;
  columns: {
    id: number;
    name: string;
    cards: Card[];
  }[];
  activeItem:Card
  setActiveItem:(data:Card) => void
}

export default function Card({
  columnInfo,
  setColumns,
  setActiveColumn,
  activeColumn,
  columns,
  activeItem,
  setActiveItem
}: cardProps) {
  const columnData = columnInfo;
  
  console.log("activeItem:" + JSON.stringify(activeItem));

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    columnID: activeColumn,
    card: Card
  ): void {
    setActiveItem(card);
    setActiveColumn(columnID);
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = "none";
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.className == "card") {
      target.style.boxShadow = "0 2px 3px gray";
    }
  }

  function dropHandler(
    e: React.DragEvent<HTMLDivElement>,
    columnTriggered: activeColumn,
    card: Card
  ): void {
    e.preventDefault()
    const currentIndex = activeColumn.cards.indexOf(activeItem);
    activeColumn.cards.splice(currentIndex, 1);
    const dropIndex = columnTriggered.cards.indexOf(card);
    if(activeColumn.id === columnTriggered.id && currentIndex === dropIndex){
      columnTriggered.cards.splice(dropIndex + 1,0, activeItem);
    }else{
    columnTriggered.cards.splice(dropIndex,0, activeItem);
    }
    
    const newColumns = columns.map(column => {
      if(column.id === columnTriggered.id){
        return columnTriggered
      }
      if(column.id === activeColumn.id){
        return activeColumn
      } 
      return column
    })
    setColumns(newColumns)
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = "none";
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = "none";
  }

  
  return (
    <div className="cardSection">
      {columnData.cards.map((card) => (
        <div
          onDragStart={(e) => dragStartHandler(e, columnData, card)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, columnData, card)}
          draggable={true}
          className="card"
          key={card.id}
        >
          <h4>{card.name}</h4>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
}
