import React from 'react'
import store from '../store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'


function CustomButton({type, title, customStyles,handleClick}) {
    const snap = useSnapshot(store)

    const generateStyle = (type) => {
        if(type === 'filled') {
            return {
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
            }
        }else if(type==='outline') {
            return {
                borderWidth: '1px',
                borderColor: snap.color,
                color: getContrastingColor(snap.color),
                backgroundColor: snap.color,
            }
        }
        return {}
    }
  

  return (
    <button
    className={`w-fit px-4 py-2.5 font-bold rounded-md ${customStyles}`} 
    style={generateStyle(type)}
    onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
