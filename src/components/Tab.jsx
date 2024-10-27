import React,{useState} from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import { logoShirt, stylishShirt } from '../assets'

function Tab({tab,isFilterTab,activeTab, handleClick}) {
  const snap = useSnapshot(state)
  const activeStyles = isFilterTab
  ? {backgroundColor: snap.color, opacity: 0.5}
  : {backgroundColor: 'white', opacity: 1}
  return (
    <div
    key={tab.name}
    className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
    onClick={handleClick}
    style={activeTab === tab.name ? activeStyles : {}}
    >
      <img src={tab.icon} alt={tab.name} className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-full h-full'}`} />
    </div>
  )
}

export default Tab
