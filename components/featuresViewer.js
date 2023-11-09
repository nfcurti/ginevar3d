import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
const clock = new THREE.Clock()
import { motion, useInView  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"; 
import gsap from 'gsap'; 
  gsap.registerPlugin(MotionPathPlugin);


export default function FeaturesViewer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(()=>{
    gsap.from("#path", {
      drawSVG: "0%",
      duration: 3
    });
    gsap.to("#target", {
      duration: 4,
      motionPath: {
        path: "#mainPath",
        align: "#mainPath",
        alignOrigin: [0.5, 0.5],
        autoRotate: true
      },
      scale: 1.5,
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.75,
      ease: "power3.inOut"
    });

  })

  return (
    <div style={{paddingTop:"5em"}} className='bg-[#08080D] max-h-[100vh] overscroll-scroll scrollContainer'>
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
            <motion.div>
            <svg className='mt-[30em] ml-[4em]' xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
              <path id="mainPath" d="M293.28,226.82a69,69,0,0,0-69-69,76.71,76.71,0,0,0-76.71,76.71,85.23,85.23,0,0,0,85.23,85.24A94.7,94.7,0,0,0,327.47,225,105.22,105.22,0,0,0,222.25,119.8,116.92,116.92,0,0,0,105.33,236.71,129.91,129.91,0,0,0,235.24,366.62,144.34,144.34,0,0,0,379.58,222.28,160.37,160.37,0,0,0,219.2,61.9,178.2,178.2,0,0,0,41,240.1c0,109.35,88.65,198,198,198,121.5,0,220-98.5,220-220" />
              
              <image id="target" href="\gllogolight.svg" height="24" width="24" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" overflow="visible">
              <path id="path" fill="none" stroke="#b606ff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="10" d="M0,0 L 0,150 L 200,0" />
            </svg>
            </motion.div>
        </div>
        <div className='h-[100vh] bg-red-500 '></div>
        <style>
          {`
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
