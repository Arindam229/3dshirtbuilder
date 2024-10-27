import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React,{useRef} from 'react'
import * as THREE from 'three'

function Backdrop() {
    const shadows = useRef()

    const lightRef1 = useRef()
  const lightRef2 = useRef()

  return (
    <AccumulativeShadows
        position={[0,0,-0.14]}
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.25}
        scale={10}
        rotation={[Math.PI /2, 0, 0]}
    >
        
        <RandomizedLight
        ref={lightRef1}
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5,5,-10]}
        />
        <RandomizedLight
        ref={lightRef2}
        amount={4}
        radius={9}
        intensity={0.25}
        ambient={0.55}
        position={[-5,5,-9]}
        />
    </AccumulativeShadows>
  )
}

export default Backdrop
