import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Shirt from './Shirt'
import Backdrop from './Backdrop'
import CameraRig from './CameraRig'
import { Environment, Center, OrbitControls } from '@react-three/drei'

function Canvasmodel() {
  return (
    <Canvas
    shadows
    camera={{position:[0,0,0.01],fov:25}}
    gl={{preserveDrawingBuffer:true}}
    className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset='city' />
      <CameraRig>
      <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Backdrop />
        <Center>
        <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default Canvasmodel
