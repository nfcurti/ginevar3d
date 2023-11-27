import * as THREE from 'three'
import React,{ useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, CameraControls, Text, Environment, useGLTF, Svg   } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { motion, animate} from "framer-motion"

//const GOLDENRATIO = 1.61803398875
const GOLDENRATIO = 1
const clock = new THREE.Clock()

useGLTF.preload('/iphone.glb')
useGLTF.preload('/imac.glb')

const images = [
  // Front
  { position: [-0.3, 0, 1.5], rotation: [0, 0, 0], url: `/bluesmart.webp` },
  { position: [0.3, 0, 1.5], rotation: [0, 0, 0], url: `/icao.webp` },
  // Back
  { position: [-1, 0, -0.35], rotation: [0, 0, 0], url: '/highlights.webp' },
  { position: [1, 0, -0.35], rotation: [0, 0, 0], url: '/deliverly.webp' },
  { position: [0, 0, -0.35], rotation: [0, 0, 0], url: '/tree.webp' },
]

const images_desktop = [
  // Left
   { _id:1, factorpos: [11,-4.5,-1.5], position: [-3, 0, 0], rotation: [0, Math.PI / 2.5, 0], url:'/sdd.webp'  },
   { _id:2, factorpos: [7,-3,-2], position: [-3, 0, 1.8], rotation: [0, Math.PI / 2.5, 0], url: '/bkd.webp' },
   { _id:3, factorpos: [3,-2,-1], position: [-3, 0, 3.4], rotation: [0, Math.PI / 2.5, 0], url: '/isovoxd.webp' },
  // Right
   { _id:4, factorpos: [-11,-4.5,-1.5], position: [3, 0, 0], rotation: [0, -Math.PI / 2.5, 0], url: `/rpd.webp` },
   { _id:5, factorpos: [-7,-3,-2], position: [3, 0, 1.8], rotation: [0, -Math.PI / 2.5, 0], url: `/zwickiesd.webp` },
   { _id:6, factorpos: [-3,-2,-1], position: [3, 0, 3.4], rotation: [0, -Math.PI / 2.5, 0], url: `/alpacad.webp` }
]

const textsData = [
   { _id:1,position: [-3, 1.5, 2], rotation: [0, 1.2, 0], url:'/WEBSITES (1).svg'  },
   { _id:2,position: [-0.2, 1.5, 2], rotation: [0, 0, 0], url: '/APPS.svg' },
   { _id:3,position: [2.3, 1.4, 2], rotation: [0, -1.2, 0], url: '/WEB3.svg' },
]

function scaleUp(){
  animate("#detailsContainer", { scale: [0, 1] }, { type: "spring" })
}


function scaleDown(){
  animate("#detailsContainer", { scale: [1, 0] }, { type: "spring" })
}


//Mobile
function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

  

  useEffect(() => {
    clicked.current = ref.current.getObjectByProperty( 'uuid' , params?.id )
    if (clicked.current) {
      scaleUp()
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
      {images.map((props) => 
      <Frame key={props.url} {...props} /> 
      
      /* prettier-ignore */
      )}
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
  const name2 = url.split('/').join('').split('.png').join('')
  var isActive = params?.id === name
  useCursor(hovered)
  useFrame((state, dt) => {
   // easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
   // easing.dampC(frame.current.material.color, hovered ? 'yellow' : 'white', 0.1, dt)
  })
  return (
    <group {...props}>
      <Phone url={url} name={name2}   scale={0.005} position={[-0.7, -0.05, 0]} rotation={[0.57, 0, 0]} />
      
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

//PC
function Macbook({ ...props }) {
  const ref = useRef()
  const { nodes, materials } = useGLTF('/imac.glb');
  var textureLoaded = new THREE.TextureLoader().load("../"+props.url)

  return (
    <group {...props} dispose={null} scale={0.4} >
        <group ref={ref} >
          <group position={[0, 0, 1.5]} rotation={[1.5, 0, 0]}>
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


function Desktops({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [activeId, setActiveId] = useState([])
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByProperty( 'uuid' , params?.id )
    if (clicked.current) {
      scaleUp()
      clicked.current.parent.updateWorldMatrix(true, true)
      //clicked.current.parent.localToWorld(p.set(3,0,1.8))
      
      clicked.current.parent.localToWorld(p.set(activeId.factorpos[0], activeId.factorpos[1], activeId.factorpos[2]))
      clicked.current.parent.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    easing.damp3(state.camera.position, p, 0.4, dt)
    easing.dampQ(state.camera.quaternion, q, 0.4, dt)
  })
  return (
    
    <group
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.uuid);
      }}
      onPointerMissed={() => setLocation('/')}>
      {images_desktop.map((props) =>
      <Macbook key={props.url}  onClick={()=>setActiveId(props)} {...props} /> 
      )}
    </group>
  )
}

//Textos
function Texts (...props ){
  const ref = React.useRef()
  
  useFrame(()=>{
    ref.current.position.y = 1.5+Math.cos( clock.getElapsedTime() ) * 0.1;
  })
  return <>
    <Svg ref={ref} fillMaterial={{ wireframe: false }} position={props[0].position} rotation={props[0].rotation} scale={0.005} src={props[0].url} strokeMaterial={{ wireframe: false }}/>
  </>
}

function TextsFrame(...props){
  return (
    <group>
      {textsData.map((props, index) => 
                <Texts key={index} {...props} /> 
                )}
    </group>
  )
}

function CameraController(...props){
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.enableZoom = false;
      controls.minDistance = 3;
      controls.maxDistance = 2000;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};

function DetailsViewer(){


  return <>
    <motion.div id='detailsContainer' className="w-[60vw] h-[60vh] bg-[#FFF133] absolute top-[20vh] left-[20vw]  ">
      <motion.div className='w-[7em] block mr-0'>
        <a className="cta w-[7em] ml-8 buttontr flex mt-[0.5em]" onClick={()=>scaleDown()} href='javascript:void(0)'>
            <span >CLOSE</span>
            <span>
                <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                    <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                    <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                  </g>
                </svg>
            </span> 
        </a>
      </motion.div>
    </motion.div>
  </>
}

export default function PortfolioViewer () {
    

    return (<>
        <Canvas style={{height:"100vh", marginTop:"-0em"}}  dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
            <color attach="background" args={['#08080c']} />
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
                <TextsFrame/>
            </group>
            <Environment preset="city"  blur={1} />
        </Canvas>
        <DetailsViewer/>
        </>
    )
}
