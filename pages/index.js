import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
import { Canvas , useFrame, } from '@react-three/fiber'
import { a } from '@react-spring/three'
import { Text, Line, CameraControls, Svg  } from '@react-three/drei'
import PortfolioViewer from "/components/portfolioViewer"
import IntroViewer from "/components/introViewer"
import { Underlay, Overlay } from "/components/overlays"



export default function App() {
  const [allowScroll, setAllowScroll] = useState(false)



  return (
    <main className={allowScroll? "overflow-hidden":"overflow-auto	"}>
        <div>
          <IntroViewer/>
          <PortfolioViewer/>
        </div>
    </main>
  )
}
