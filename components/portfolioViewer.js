import * as THREE from 'three'
import React,{ useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, CameraControls, Text, Environment, useGLTF, Svg   } from '@react-three/drei'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { motion, animate} from "framer-motion"
import Image from 'next/image'
import { useRouter } from 'next/router'

//const GOLDENRATIO = 1.61803398875
const GOLDENRATIO = 1
const clock = new THREE.Clock()

useGLTF.preload('/iphone.glb')
useGLTF.preload('/imac.glb')

const filesTranslator=[
  {hash:"bluesmart", title:"Bluesmart App", desc:"bluesmart is your personal hub and at the core of the whole bluesmart smart luggage system. The new digital interface is conceived to reduce the friction while traveling and become the ultimate smart travel companion"},
  {hash:"icao", title:"Icao for Pilots", desc:"Behold the brainchild of our studio: ICAO4PILOTS – designed by ICAO examiners to elevate your English proficiency for aviation. Meticulously crafted by our studio with care and powered by cutting-edge tech like AI, machine learning, and augmented reality."},
  {hash:"highlights", title:"Highlights App", desc:"Stay in the loop with your favorite team's activities, catch the most thrilling game moments, and relive them with ease. It's your all-access pass to the best of the NBA!"},
  {hash:"deliverly", title:"Deliverly App", desc:"Introducing the Deliverly app, designed and developed with precision, for the U.S. market, it's the perfect shopping companion. From local food spots to household essentials, Deliverly’s got it all covered."},
  {hash:"tree", title:"Tree Wallet", desc:"TreeWallet offers enhanced security and supports multiple chains, including Ethereum Virtual Machine (EVM)-based chains, Tron, and Bitcoin networks. Send and receive any token with ease!"},
  {hash:"isovoxd", title:"Isovox", desc:"We've built a shopify store that caters to every B2B and B2C client for a truly tailored experience. We've integrated a custom Shopify app to ensure smooth transactions for Isovox's top-quality products."},
  {hash:"bkd", title:"Birra Korca", desc:"Introducing an e-commerce platform with a comprehensive catalog of their exquisite drinks and beverages, all available on their website. Now, you can explore, select, and make your purchase in just a few clicks."},
  {hash:"sdd", title:"Sezon Dekor", desc:"Our team redesigned and recreated the site, catering precisely to the owners' vision. From the structure to the design, every detail has been meticulously reworked."}, 
  {hash:"alpacad", title:"Alpacadabraz", desc:"Alpacadabraz, the captivating NFT project we crafted for our client on the Eth blockchain. Our team worked on the frontend and the smart contracts, ensuring a seamless experience for minting and NFT detection."},
  {hash:"zwickiesd", title:"Zwickies Adventure", desc:"Our development team has created a complete website, from smooth minting to precise NFT detection and a robust client-side whitelist - every line of code reflects our dedication to excellence."},
  {hash:"rpd", title:"Rare Paradise NFT", desc:"RareParadise, the enchanting NFT project we developed for Christmas 2022 on the Ethereum blockchain.  The RareParadise website features minting, NFT detection, and a client-side whitelist for a seamless experience."}
]

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
  animate("#detailsButton", { scale: [1, 0] }, { type: "spring" })
}

function scaleDown(){
  animate("#detailsContainer", { scale: [1, 0] }, { type: "spring" })
  animate("#detailsButton", { scale: [0, 1] }, { type: "spring" })
}

//Mobile
function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const ref = useRef()
  const clicked = useRef()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()

  function getInfo(_){
    return filesTranslator.find(item => {
      return item.hash == _
   })
  }

  useEffect(() => {
    clicked.current = ref.current.getObjectByProperty( 'uuid' , params?.id )

    
    if (clicked.current) {

      /* Change details img, title and maybe desc */
      const _ = clicked.current.parent.parent.parent.name.split(".")[0]
      var _item = getInfo(_)
      var imgUrl= _+"portfolio.png"
      
      /* Animate details button and container */
      document.getElementById("detailsContainer").style.backgroundImage = `url(/${imgUrl})`;
      document.getElementById("detailsTitle").innerHTML = _item.title;
      document.getElementById("detailsDesc").innerHTML = _item.desc;
      animate("#detailsButton", { opacity: [0, 1] }, { type: "linear" })
      
      /* Animate camera */
      clicked.current.parent.parent.updateWorldMatrix(true, true)
      clicked.current.parent.parent.localToWorld(p.set(144, GOLDENRATIO *250, 160))
      clicked.current.parent.parent.getWorldQuaternion(q)
    } else {
      /* Animate details button and container */
      animate("#detailsButton", { opacity: [1, 0] }, { type: "linear" })

      /* Animate camera to origin */
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
            <mesh name={props.url} castShadow receiveShadow geometry={nodes["Plane005"].geometry} >
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

      /* Change details img, title and maybe desc */
      const _ = clicked.current.parent.children[5].name.split(".")[0]
      var _item = filesTranslator.filter(function(item) { return item.hash === _.split("/")[1]; });
      var imgUrl= _+"dportfolio.png"
      
      /* Animate details button and container */
      document.getElementById("detailsContainer").style.backgroundImage = `url(${imgUrl})`;
      document.getElementById("detailsTitle").innerHTML = _item[0].title;
      document.getElementById("detailsDesc").innerHTML = _item[0].desc;
      animate("#detailsButton", { opacity: [0, 1] }, { type: "linear" })


      clicked.current.parent.updateWorldMatrix(true, true)
      //clicked.current.parent.localToWorld(p.set(3,0,1.8))
      
      clicked.current.parent.localToWorld(p.set(activeId.factorpos[0], activeId.factorpos[1], activeId.factorpos[2]))
      clicked.current.parent.parent.getWorldQuaternion(q)
    } else {
      /* Animate details button and container */
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
  var Background = "/icaoportfolio.png"

  function scaleUp(){
    animate("#detailsContainer", { scale: [0, 1] }, { type: "spring" })
    animate("#detailsButton", { scale: [1, 0] }, { type: "linear" })
  }

  function scaleDown(){
    animate("#detailsContainer", { scale: [1, 0] }, { type: "linear" })
    animate("#detailsButton", { scale: [0, 1] }, { type: "spring" })
  }


  return <>
    <motion.div id='detailsContainer' style={{border:"15px solid #FFF133",backgroundImage: `url(${Background})`, backgroundRepeat:"no-repeat", backgroundPosition:"50% 50%", backgroundSize:"70%"}} className="w-[60vw] h-[60vh] bg-[#08080D] absolute top-[20vh] left-[20vw] z-50 scale-0">
      <motion.div className='w-[7em] pl-[2em] block relative mr-0'>
        <a className="cta w-[5.5em] ml-8 buttontr flex mt-[0.5em]" onClick={()=>scaleDown()} href='javascript:void(0)'>
            <span >CLOSE</span>
        </a>
      </motion.div>
      <motion.div className='block pl-[2em] pr-[2em] absolute bottom-[4em] bg-[#FFF133] text-black'>
        <span id='detailsTitle' className='text-[2em] mr-12' >ICAO FOR PILOTS</span>
      </motion.div>
      <motion.div className='block pl-[2em] pr-[2em] absolute w-[50%] bottom-[4em] right-0 bg-[#FFF133] text-black'>
        <span id='detailsDesc' className='text-[1.2em] mr-12' >ICAO FOR PILOTS</span>
      </motion.div>
    </motion.div>
    
    <motion.div id='detailsButton' className={`absolute bottom-[10vh] left-[41.5%] right-[0] `}>
    <a className="cta w-[8em] ml-8 buttontr flex mt-[0.5em]" onClick={()=>scaleUp()} href='javascript:void(0)'>
            <span >SEE DETAILS</span>
        </a>
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
                <Desktops images={images_desktop}/>
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
