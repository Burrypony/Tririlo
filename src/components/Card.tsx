import React from "react";

interface Card {
  id: number;
  name: string;
  description: string;
}
interface cardProps {
    columnInfo:{
    id: number;
    name: string;
    cards: Card[];
    }
}



export default function Card(props:{columnInfo: cardProps, setActiveColumn:any, setActiveCard:any}) {
    const columnInfo = props.columnInfo.columnInfo
    const setActiveColumn = props.setActiveColumn
    const setActiveCard = props.setActiveCard

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>,columnID:number , card: Card): void {
        setActiveColumn(columnID)
        setActiveCard(card)
    }
    
    function dragEndHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const target = e.target as HTMLButtonElement
        target.style.boxShadow = 'none'
    }
    
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        const target = e.target as HTMLButtonElement
        console.log(target.className)
        if(target.className =='card'){
            target.style.boxShadow = '0 2px 3px gray'
        }
    }
    
    function dropHandler(e: React.DragEvent<HTMLDivElement>,columnID:number , card: Card): void {
    }
    
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>){
        e.preventDefault()
        const target = e.target as HTMLButtonElement
        target.style.boxShadow = 'none'
    }


  return (
    <div className="cardSection">
      {columnInfo.cards.map((card) => (
        <div 
            onDragStart={(e) => dragStartHandler(e,columnInfo.id,card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e,columnInfo.id,card)}
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

