import React from 'react'
import '../assets/Die.css'

export default function (props) {

    const styles = {
        backgroundColor : props.isHeld ? "#59e391" : "black"
    }
    
    const dot = <p className='dots--dots'>.</p>
    
    return (
      <>
      <div className='die--card' style={styles} onClick={props.hold}>{props.value}</div>
      </>
  )
}
