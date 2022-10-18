import React, { useEffect } from 'react'

const ProfessorItem = (props) => {
    
  return (
    <div>
        Name: {props.item.firstName} {props.item.lastName} Rating: {props.item.avgRating || "?"} Difficulty: {props.item.avgDifficulty || "?"} {props.item.wouldTakeAgainPercent || "?"} would take again.
    </div>
  )
}

export default ProfessorItem