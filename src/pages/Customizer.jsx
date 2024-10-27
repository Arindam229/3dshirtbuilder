import React,{ useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'
import {motion,AnimatePresence} from 'framer-motion'
import {download} from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import { fadeAnimation,slideAnimation } from '../config/motion'
import { ColorPicker,CustomButton,FilePicker,Tab } from '../components'

function Customizer() {
    const snap = useSnapshot(state)
  const [file, setFile] = React.useState('')
  const [prompt, setPrompt] = React.useState('')
  const [generatingImg, setGeneratingImg] = React.useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt:true,
    stylishShirt:false
  })
  
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />
      case 'filepicker':
        return <FilePicker 
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
      default:
        return null
    }
  }
  const handleClick2 = () => {
    if(activeEditorTab) {
      setActiveEditorTab('')
    }
  }


  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break;
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }
    setActiveFilterTab((prev) => ({
      ...prev,
      [tabName]: !prev[tabName]
    }))}
  const readFile = (type) => {
    reader(file).then((result) => {
      
      const DecalType = DecalTypes[type];
      state[DecalType.stateProperty] = result;
      if(!activeFilterTab[DecalType.filterTab]) {
        handleActiveFilterTab(DecalType.filterTab)
      }
      
        
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
       < motion.div
       key="custom"
       className='absolute top-0 left-0 z-10'
       {...slideAnimation('left')}
       >
           <div className='flex items-center min-h-screen'>
               <div className='editortabs-container tabs'>
                {EditorTabs.map((tab)=>(
                  <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={()=>{setActiveEditorTab(tab.name)}}
                  isFilterTab={false}
                  isActiveTab=""
                  />
                ))}  
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-md bg-[rgba(255,255,255,0.3)] shadow-sm px-4 py-2 text-sm text-gray-500 text-center w-full cursor-pointer"
                  onClick={handleClick2}
                >
                  Hide Tab
                </motion.div>
               </div>
               {generateTabContent()}
               
           </div>
       </motion.div>
      < motion.div className='absolute z-10 top-5 right-5 min-h-screen' {...fadeAnimation}>
                <CustomButton
                type="filled"
                title="Go Back"
                customStyles="w-fit px-4 py-2.5 font-bold text-sm text-black bg-white rounded-md"
                handleClick={() => state.intro = true}
                />
      </motion.div>

      <motion.div
      className='filtertabs-container'
      {...fadeAnimation}
      >
        {FilterTabs.map((tab)=>(
          <Tab
          key={tab.name}
          tab={tab}
          isFilterTab={true}
          isActiveTab={activeFilterTab === tab.name}
          handleClick={()=>{  handleActiveFilterTab(tab.name)}}
          />
        ))}  
      </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
