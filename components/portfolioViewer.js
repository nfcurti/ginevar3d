import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, useGLTF, ContactShadows } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'

//const GOLDENRATIO = 1.61803398875
const GOLDENRATIO = 1

useGLTF.preload('/iphone.glb')
useGLTF.preload('/imac.glb')

const images = [
  // Front
  { position: [-0.3, 0, 1.5], rotation: [0, 0, 0], url: `/bluesmart.png` },
  { position: [0.3, 0, 1.5], rotation: [0, 0, 0], url: `/icao.png` },
  // Back
  { position: [-1, 0, -0.6], rotation: [0, 0, 0], url: '/highlights.png' },
  { position: [1, 0, -0.6], rotation: [0, 0, 0], url: '/deliverly.png' },
  { position: [0, 0, -0.6], rotation: [0, 0, 0], url: '/tree.png' },
  // Left
 //  { position: [-1.75, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url:'/sd.png'  },
 //  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/korca.png' },
 //  { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/isovox.png' },
  // Right
 //  { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: `/Capture.png` },
  // { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: `/hdpunks.png` },
  // { position: [2, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: `/alpaca.png` }
]

const images_desktop = [
  // Left
   { position: [-3, 0, 0.25], rotation: [0, Math.PI / 2.5, 0], url:'/sdd.png'  },
   { position: [-3.2, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: '/bkd.png' },
   { position: [-3.4, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: '/isovoxd.png' },
  // Right
   { position: [3, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: `/rpd.png` },
   { position: [3.2, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: `/zwickiesd.png` },
   { position: [3.4, 0, 2.75], rotation: [0, -Math.PI / 2.5, 0], url: `/alpacad.png` }
]


function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByProperty( 'uuid' , params?.id )
   
    if (clicked.current) {
      clicked.current.parent.parent.updateWorldMatrix(true, true)
      clicked.current.parent.parent.localToWorld(p.set(144, GOLDENRATIO *250, 160))
      clicked.current.parent.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    //easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.uuid))}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <>
      <Frame key={props.url} {...props} /> 
      </>
      /* prettier-ignore */
      )}
    </group>
  )
}

function Desktops({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByProperty( 'uuid' , params?.id )
   
    if (clicked.current) {
      clicked.current.parent.parent.updateWorldMatrix(true, true)
      clicked.current.parent.parent.localToWorld(p.set(144, GOLDENRATIO *250, 160))
      clicked.current.parent.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    //easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.uuid))}
      onPointerMissed={() => setLocation('/')}>
      {images_desktop.map((props) => <>
      <Macbook key={props.url} {...props} /> 
      </>
      /* prettier-ignore */
      )}
    </group>
  )
}

function Phone({ ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/iphone.glb');
  
  var textureLoaded = new THREE.TextureLoader().load("../"+props.url)
  
  useEffect(() => {
  })
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.position.y = Math.sin( t ) * 1;
  })
  return (
    <group {...props} dispose={null}>
      <group ref={ref}>
        <group position={[0, 0, 1.5]} rotation={[1, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes["Extrude_2_Cutouts"].children[0].geometry} material={materials["Metallic"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Extrude_2_Cutouts"].children[1].geometry} material={materials["schwarz glass"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Extrude_2_Cutouts"].children[2].geometry} >
            <meshStandardMaterial map={textureLoaded} />  
          </mesh> 
        </group>
      </group>
    </group>
  )
}

function Macbook({ ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/imac.glb');
  console.log(props.url)
  var textureLoaded = new THREE.TextureLoader().load("../"+props.url)

  
  useEffect(() => {
  })
  
  useFrame((state) => {
  })

  return (
    <group {...props} dispose={null}>
      <group ref={ref}>
        <group scale={0.45} position={[0, 0, 1.5]} rotation={[1.61, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes["Cube"].geometry} material={materials["Material.003"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane001"].geometry} material={materials["Material.001"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane002"].geometry} material={materials["Material.002"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane003"].geometry} material={materials["Material.003"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane004"].geometry} material={materials["Material.004"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane005"].geometry} >
            <meshStandardMaterial map={textureLoaded} />  
          </mesh> 
          <mesh castShadow receiveShadow geometry={nodes["Plane_1"].geometry} material={materials["Material.002"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane_2"].geometry} material={materials["Material.002_Mac_front.png"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane_3"].geometry} material={materials["Material.000"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane_4"].geometry} material={materials["Material.000_Bildschirmfoto_2011-1"]}/>
          <mesh castShadow receiveShadow geometry={nodes["Plane_5"].geometry} material={materials["Material.000_Mac_front.png"]}/>
        </group>
      </group>
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), ...props }) {
  const image = useRef()
  const frame = useRef()
  const [, params] = useRoute('/item/:id')
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)
  const name2 = getUuid(url+"1")
  var isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
   // easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
   // easing.dampC(frame.current.material.color, hovered ? 'yellow' : 'white', 0.1, dt)
  })
  return (
    <group {...props}>
      
      <Phone url={url} name={name2}   scale={0.005} position={[-0.7, -0.05, 0]} rotation={[0.57, 0, 0]} />
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
        {url}
      </Text>
      
    </group>
  )
}



export default function PortfolioViewer () {
    

    return (
        <Canvas style={{height:"100vh", marginTop:"-0em"}}  dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
            <color attach="background" args={['#08080c']} />
            <fog attach="fog" args={['#08080c', 0, 15]} />
            <group position={[0, -0.5, 0]}>
              <ambientLight intensity={0.8}/>
                <Frames images={images} />
                <Desktops images={images_desktop} />
                <mesh rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        mixStrength={80}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#050505"
                        metalness={0.5}
                    />
                </mesh>
            </group>
            <Environment preset="city"  blur={1} />

        </Canvas>
    )
}
