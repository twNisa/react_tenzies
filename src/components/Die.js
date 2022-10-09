import React from "react"

export default function Die({value, isHeld, onClick}){  
  let face = [];
  for(let i =0; i<value; i++){
    face.push(<span className="dot"></span>)
  }
  return (
    <div className={isHeld ? `cell selected` : `cell`} onClick={onClick}>
      {face}
    </div>
  )
}