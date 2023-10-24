import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas, useLoader, useFrame, } from '@react-three/fiber'
import { a } from '@react-spring/three'
import { Text, Line, useTexture  } from '@react-three/drei'
import { gsap } from "gsap";

import { TextureLoader } from 'three/src/loaders/TextureLoader'

const menuItems = ['Work', 'About', 'Jobs', 'Contact'];
const clock = new THREE.Clock()




function VideoText(props) {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/drei.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <Text font="/sf/SFCSB.ttf" fontSize={0.8} letterSpacing={0.05}  {...props}>
      Ginevar Labs_
      <meshBasicMaterial toneMapped={false} opacity={1} >
        <videoTexture attach="map" args={[video]} encoding={THREE.sRGBEncoding} />
      </meshBasicMaterial>
    </Text>
  )
}

function Intro() {
    const [vec] = useState(() => new THREE.Vector3())
    
    let scrollY = window.scrollY
    return useFrame((state) => {
      
      if(clock.getElapsedTime()<=1.86){state.camera.position.set(-10,5,50-(clock.getElapsedTime()*17),0.05)}
      //state.camera.position.set(-10,5,18.2)
      state.camera.lookAt(0, 0, 0)
    })
}

function Triangles() {
    const trianglesMesh = React.useRef()

    let upperTriangle = new THREE.BufferGeometry()
    let lowerTriangle = new THREE.BufferGeometry()

    const floorTexture = new THREE.TextureLoader().load('/PavingStones092.png')
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
    floorTexture.repeat.set( 10, 10 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('/PavingStones092.png')} );

    const material = new THREE.MeshBasicMaterial( { color: 0x191A1F} );

    


    useFrame(() => {
      console.log(floorMaterial)
      var multiplier = clock.getElapsedTime()*2.25
        
      const upperTrianglePoints = [
          new THREE.Vector3(-26, 50, -2.35), 
          new THREE.Vector3(-26, 25-clock.getElapsedTime()*10>=1.5? 25-clock.getElapsedTime()*10:1.5, -2.35), 
          new THREE.Vector3(28, 1.5, -2.35), 
      ]

      const lowerTrianglePoints = [
          new THREE.Vector3(28, -14.3, -2.35), 
          new THREE.Vector3(28, -25+clock.getElapsedTime()*10<=-0.77? -25+clock.getElapsedTime()*10:-0.77, -2.35), 
          new THREE.Vector3(-26, -0.77, -2.35), 
      ]
          upperTriangle.setFromPoints(upperTrianglePoints)
          lowerTriangle.setFromPoints(lowerTrianglePoints)
          
          trianglesMesh.current.material.needsUpdate = true
    }, [])

  

  upperTriangle.computeVertexNormals()

  lowerTriangle.computeVertexNormals()

  return (
    <>
      <mesh ref={trianglesMesh} geometry={upperTriangle} material={floorMaterial} />
      <mesh ref={trianglesMesh} geometry={lowerTriangle} material={material} />
    </>
   )
}

function Borders(){
    const [see, setSee] = useState(0)
    const [width, setWidth] = useState(0)
    const [visible, setVisible] = useState(false)
    const bordersMesh = React.useRef()

    const toppoints = []
    toppoints.push(new THREE.Vector3(-10, 0))
    toppoints.push(new THREE.Vector3(10, 0))
    
    const bottompoints = []
    bottompoints.push(new THREE.Vector3(-10, 2))
    bottompoints.push(new THREE.Vector3(10, 2))

    const topborderGeometry = new THREE.BufferGeometry().setFromPoints(toppoints)
    const bottomborderGeometry = new THREE.BufferGeometry().setFromPoints(bottompoints)

    const material = new THREE.LineBasicMaterial({
      color: 0xFFFFFF,
      transparent:true,
    } );

    useFrame((state) => {
      const topPoints = [
        new THREE.Vector3(-9, -0.03), 
        new THREE.Vector3(-2+clock.getElapsedTime()/4, -0.03), 
      ]

      const bottomPoints = [
          new THREE.Vector3(5-clock.getElapsedTime()/2, 2.03), 
          new THREE.Vector3(10, 2.03), 
      ]


      
      if(clock.getElapsedTime()>=1.86){
        topborderGeometry.setFromPoints(topPoints);
        bottomborderGeometry.setFromPoints(bottomPoints);
        setSee(-1.86+clock.getElapsedTime());
        setVisible(true)
        if(-1.86+clock.getElapsedTime()*2<=5){setWidth(-1.86+clock.getElapsedTime()*2)}
      }

    }, [])


    
      return (<>
        <line visible={visible} ref={bordersMesh}  geometry={topborderGeometry} material={material}/>
        <Line opacity={see}     points={bottompoints} color="black" lineWidth={width} dashed={false} />
        <Line opacity={see}     points={toppoints} color="black" lineWidth={width} dashed={false} /> 
        <line visible={visible} ref={bordersMesh}  geometry={bottomborderGeometry} material={material}/>
        </>
      )
    
    

    
}


function Shape({ shape, rotation, position, color, opacity, index }) {
  if (!position) return null
  return (
      <a.mesh rotation={rotation} position={position.to((x, y, z) => [x, y, z + index * 50])}>
        <a.meshPhongMaterial color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
        <shapeGeometry args={[shape]} />
      </a.mesh>
    )
}


export default function App() {
  return (
    <main className='bg-black'>
      <Canvas style={{height:"100vh", backgroundColor:"white"}} concurrent="true" gl={{ alpha: false }} pixelratio={[1, 1.5]} camera={{ fov: 15 }}>
          <color attach="background" args={['black']} />
          <Suspense fallback={null}>
            <group position={[0, -1, 0]}>
              <VideoText position={[0, 0.5, -2.1]} />
            </group>
            <Intro/>
          </Suspense>
          <group position={[0, -1, 0]}>
              <Borders/>
              <Triangles />
          </group>
      </Canvas>
    </main>
  )
}
