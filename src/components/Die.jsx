import React from 'react'
import '../assets/Die.css'

export default function (props) {

    const styles = {
        backgroundColor : props.isHeld ? "#59e391" : "black"
    }
    

  return (
    <div className='die--card' style={styles} onClick={props.hold}>{props.value}</div>
  )
}
