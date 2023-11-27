import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect } from "react";
import { useTransform, useScroll, useTime, motion, animate } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";
import Image from 'next/image'

const color = "#FFF133";

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const Star = ({ p }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;
    ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial wireframe color={color} />
    </mesh>
  );
};

function Scene({ numStars = 100 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform( scrollYProgress, [0, 1], [0.001, degreesToRadians(180)]);
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords( distance.get(), yAngle.get(), time.get() * 0.0005 );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => gl.setPixelRatio(0.3));

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star p={progress(0, numStars, i)} />);
  }

  return (
    <>
      <Icosahedron />
      {stars}
    </>
  );
}

export default function AboutViewer() {
  return (
    <div className="containerZ min-h-[100vh] xl:flex">
      <Canvas className="aboutCanvas h-[100vh] lg:basis-1/2" gl={{ antialias: false }}>
        <Scene />
      </Canvas>
      <motion.div className="aboutContentful p-12 xl:p-[0] xl:w-[50%] lg:basis-1/2">
        <h1>A CODE BOUTIQUE</h1>
        <svg width="400" style={{height:"2em", marginTop:"-1em"}} xmlns="http://www.w3.org/2000/svg">
          <path  d="M0,25 L 500,25" stroke="#FFF133"/>
        </svg>
        <motion.div className="lg:flex mt-8">
          <motion.p initial={{opacity:0}} animate={{ opacity:1 }} transition={{ delay: 1 }} className="basis-1/2 pr-12 ">Ginevar is a creative studio focused on developing compelling stories through code.
            <br/> This means building customer first interactive experiences from scratch to production using cutting edge technologies, and a touch of 3D
          </motion.p>
          <motion.p initial={{opacity:0}} animate={{ opacity:1 }} transition={{ delay: 1.25 }}  className="basis-1/2 pr-12 ">- Landing page crafting
            <br/> - Mobile apps composing
            <br/> - Delightful e-commerce stores
            <br/> - ai/vr experiences
            <br/> - Lightning fast prototyping
            <br/> - and a lot more...
          </motion.p>
        </motion.div>
        <motion.div className="lg:flex mt-8 pt-8">
          <motion.p initial={{opacity:0}} animate={{ opacity:1 }} transition={{ delay: 1.5 }}  className="basis-1/2 pr-12 text-center lg:text-start">
            <br/>  Creative website development
            <br/>  Web3 dApps and Contracts
            <br/>  Ecommerce development (Shopify)
            <br/>  Multiplatform mobile apps
            <br/>  AI/VR Sites
            <br/>  Metaverse Development
            <br/>  Shopify based apps
          </motion.p>
          <motion.div initial={{opacity:0}} animate={{ opacity:1 }} transition={{ delay: 1.75 }}   className="basis-1/2 relative m-auto w-[18em] mt-[4em]">
            <Image  className=" ml-[5em] ysImage yellowShadow" width={300} height={400} src="/clw1.webp"/>
            <Image  className="  ysImage yellowShadow" width={300} height={400} src="/clw2.webp"/>
            <Image  className=" ml-[-5em] ysImage yellowShadow" width={300} height={400} src="/clw3.webp"/>
          </motion.div>
        </motion.div>
        <motion.div>

        </motion.div>
      </motion.div>
      <style>
        {`
        .ysImage{
          border-radius:50%
        }
        .yellowShadow{
          box-shadow: 0px 0px 15px #FFF133;
        }

        .yellowShadow:hover{
          z-index:50
        }
        .aboutContentful{
          position: absolute;
          top: 15em;
          right:0
        }

        .aboutContentful h1{
          font-size:2em;
          color:#FFF133
        }

        .aboutContentful p{
          font-size:1.4em;
        }

        .containerZ {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        .aboutCanvas {
            image-rendering: -moz-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: pixelated;
            image-rendering: optimize-contrast;
          }
        `}
      </style>
    </div>
  );
}
