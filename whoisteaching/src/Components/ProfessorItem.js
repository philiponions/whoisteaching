import React, { useEffect } from 'react'

const ProfessorItem = (props) => {
    const styles = {
        item: {
            width: "200px",
            marginTop: "10px"
        }
    }
  return (
    <div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={styles.item}>
                <div>
                Name: {props.item.firstName} {props.item.lastName} 
                </div>
            </div>
            <div style={styles.item}>
                <div>
                    Rating: {props.item.avgRating || "?"}
                </div>
            </div>
            <div style={styles.item}>
                <div>
                    Difficulty: {props.item.avgDifficulty || "?"} 
                </div>
            </div>
            <div>
                <div>
                    {props.item.wouldTakeAgainPercent || "?"}% would take again.
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfessorItem