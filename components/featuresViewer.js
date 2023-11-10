import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
const clock = new THREE.Clock()
import { motion, useInView, useScroll, useTransform , useMotionValueEvent   } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"; 
import gsap from 'gsap'; 
  gsap.registerPlugin(MotionPathPlugin);


export default function FeaturesViewer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.44,0.66], [1, 5])
  const y = useTransform(scrollYProgress, [0.40,0.54], [0, 150])
  const x = useTransform(scrollYProgress, [0.40,0.54], [500, 50])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest)
  })

  

  useEffect(()=>{
    
    gsap.from("#path", {
      drawSVG: "0%",
      duration: 3
    });
    
    gsap.to("#target", {
      duration: 4,
      motionPath: {
        path: [{x:0, y:0}, {x:500, y:0}]
      },
      ease: "power3.inOut"
    });

  })

  return (
    <div style={{paddingTop:"5em"}} className='bg-[#08080D] '>
        <div ref={ref} className='flex w-full h-[100vh] text-white'>
            <motion.div  className='chamuyo ml-[4em] mt-[5em] absolute'  style={{ fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px", transform: isInView ? "none" : "translateX(-200px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }} >
                    <motion.div className="line">
                    <span>USING CUTTING EDGE </span>
                    </motion.div>
                    <motion.div className="line">
                    <span>TECHNOLOGIES TO DEVELOP </span>
                    </motion.div>
                    <motion.div className="line">
                    <span>IMMERSIVE EXPERIENCES</span>
                    </motion.div>
                    <motion.div className="line mb2">
                    <span>ON EVERY PLATFORM</span>
                    </motion.div>
            </motion.div>
            <motion.div className="absolute right-0" style={{ transform: isInView ? "none" : "translateX(400px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s", marginLeft:"auto" }}>
                <Lottie  style={{fill:"#FFF133", width:"100%", transform: "rotate(180deg)"}}  animationData={coolAnimation} />
            </motion.div>
            <motion.div className='absolute' >
              <motion.p className='mt-[21em] absolute ml-[3.3em] text-[30px] w-[10em] text-[#FFF133]'>OUR RECIPE</motion.p>
              <svg className='mt-[40em] absolute' xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 500 500">
                <path className=''  id="mainPath" d="M0,25 L 500,25" />
                <motion.image id="target" href="\gllogolight.svg" height="50" width="24" style={{x, scale, y}}/>
              </svg>
            </motion.div>
            <motion.div className='absolute mt-[45em] right-[40em]' >
                <p className='text-[5em]'>INTERACTIVITY</p>
                <p className='text-[5em]'>RELIABILITY</p>
                <p className='text-[5em]'>STORYTELLING</p>
            </motion.div>
            
        </div>
        <div className='h-[100vh] bg-[#08080D] relative  pt-[15em]'>
          <div class="wrappers float-left">
            <img src="https://logosandtypes.com/wp-content/uploads/2020/11/Shopify.png" alt=""/>
            <img src="https://docs.soliditylang.org/en/latest/_images/solidity_logo.svg" alt=""/>
            <img src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" alt=""/>
            <img src="https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png" alt=""/>
            <img src="https://source.unsplash.com/random/600x600?roses" alt=""/>
            <img src="https://source.unsplash.com/random/600x600?sky" alt=""/>
            <img src="https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png" alt=""/>
            <img src="https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" alt=""/>
            <img src="https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png" alt=""/>
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968326.png" alt=""/>
          </div>
          <div className='float-right w-[40%] mt-[10em]'>
            <div className='text-[10em] text-center'>
              Shopify
            </div>
            <div className='text-center text-[1.25em]'>
              Used to partly or fully develop ecommerce site either as-is or using a NodeJS backend attached.
            </div>
          </div>
        </div>
        <div className='h-[10vh] bg-[#08080D] relative  pt-[15em]'>
            <motion.div className='absolute' >
              <motion.p className='mt-[21em] absolute ml-[3.3em] text-[30px] w-[10em] text-[#FFF133]'>OUR RECIPE</motion.p>
              <svg className='mt-[40em] absolute' xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 500 500">
                <path className=''  id="mainPath" d="M0,25 L 500,25" />
                <motion.image id="target" href="\gllogolight.svg" height="50" width="24" style={{x, scale, y}}/>
              </svg>
            </motion.div>
          
        </div>
            
        <style>
          {`
          

.wrappers {
  position: relative;
  flex-grow: 1;
  margin-left:10em;
  max-width: 1200px;
  max-height: 1200px;
  
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 2vmin;
  justify-items: center;
  align-items: center;
}


.wrappers img{
  background:white;
  position: relative;
  z-index: 1;
  grid-column: span 2;
  max-width: 100%;
  margin-bottom: -52%;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  transform: scale(1);
  transition: all .25s;
  
  &:nth-child(7n + 1) {
    grid-column: 2 / span 2;
  }
  
  &:hover {
    z-index: 2;
    transform: scale(2);
  }
}

            #mainPath {
              fill: none;
              stroke: #FFF133;
              stroke-miterlimit: 10;
            }
            
            #target {
              fill: #8cc63f;
            }
            
            svg {
              max-height: 100vh;
              max-width: 100vw;
            }

          .scrollContainer {
            -ms-overflow-style: none; /* for Internet Explorer, Edge */
            scrollbar-width: none; /* for Firefox */
            overflow-y: scroll; 
          }

          .scrollContainer::-webkit-scrollbar {
            display: none; /* for Chrome, Safari, and Opera */
          }
          `}
        </style>
    </div>
  )
}
