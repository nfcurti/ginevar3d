import * as THREE from 'three'
import React, { Suspense, useEffect, useState  } from 'react'
import { Canvas , useFrame, } from '@react-three/fiber'
import { a } from '@react-spring/three'
import { Text, Line,   } from '@react-three/drei'
import PortfolioViewer from "/components/portfolioViewer"

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
      var algo = window.scrollY + 50-(clock.getElapsedTime()*17)
      console.log(window.scrollY)
      
      
      if(clock.getElapsedTime()<=1.86){state.camera.position.set(-10,5,50-(clock.getElapsedTime()*17),0.05)}
      if(clock.getElapsedTime()>=1.86 && window.scrollY<=455){
      state.camera.position.set(-10,5,18.38+window.scrollY/10)
      state.camera.updateProjectionMatrix();
    }

      state.camera.lookAt(0, 0, 0)
    })
}

function Triangles() {
    const trianglesMesh = React.useRef()

    let upperTriangle = new THREE.BufferGeometry()
    let lowerTriangle = new THREE.BufferGeometry()

    const material = new THREE.MeshBasicMaterial( { color: 0x191A1F} );

    useFrame(() => {
      var multiplier = clock.getElapsedTime()*2.25
        
      const upperTrianglePoints = [
          new THREE.Vector3(-26, 50, -2.35), 
          new THREE.Vector3(-26, 25-clock.getElapsedTime()*7>=1.5? 25-clock.getElapsedTime()*7:1.5, -2.35), 
          new THREE.Vector3(28, 1.5, -2.35), 
      ]

      const lowerTrianglePoints = [
          new THREE.Vector3(28, -14.3, -2.35), 
          new THREE.Vector3(28, -25+clock.getElapsedTime()*7<=-0.77? -25+clock.getElapsedTime()*7:-0.77, -2.35), 
          new THREE.Vector3(-2600, -0.77, -2.35), 
      ]
          upperTriangle.setFromPoints(upperTrianglePoints)
          lowerTriangle.setFromPoints(lowerTrianglePoints)
          
          trianglesMesh.current.material.needsUpdate = true
    }, [])

  

  upperTriangle.computeVertexNormals()

  lowerTriangle.computeVertexNormals()

  return (
    <>
      <mesh ref={trianglesMesh} geometry={upperTriangle} material={material} />
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
      opacity:0.2
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
        if(-3+clock.getElapsedTime()*2<=5){
          setWidth(-3+clock.getElapsedTime()*2)
        }
      }

      if(window.scrollY>=1){
        setVisible(false)
      }

    }, [])


    
      return (<>
        <line visible={visible} ref={bordersMesh}  geometry={topborderGeometry} material={material}/>
        {window.scrollY<=1? <Line opacity={see}     points={bottompoints} color="black" lineWidth={width} dashed={false} />:""}
        {window.scrollY<=1? <Line opacity={see}     points={toppoints} color="black" lineWidth={width} dashed={false} /> :""}
        <line visible={visible} ref={bordersMesh}  geometry={bottomborderGeometry} material={material}/>
        </>
      )
    
    

    
}




export default function App() {
  const colorGray = new THREE.Color( 0x191A1F );
  

  return (
    <main className=''>
      <div>
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
      </div>
      <div className='' >
        <PortfolioViewer/>
      </div>
    </main>
  )
}
