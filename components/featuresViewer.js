import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
import { Canvas , useFrame, } from '@react-three/fiber'
import { Text, Line, Loader , Stars, Sparkles  } from '@react-three/drei'
import gsap from 'gsap'
const clock = new THREE.Clock()
import { motion, animate, scroll, useMotionValueEvent, useScroll, useTransform, useInView  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";


export default function FeaturesViewer() {
    
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div style={{paddingTop:"5em"}} className='h-[75vh] bg-[#08080D] relative'>
        <div ref={ref} className='flex absolute w-full'>
            <motion.div  className='chamuyo ml-[4em] mt-[5em]'  style={{ fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px", transform: isInView ? "none" : "translateX(-200px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }} >
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
            <motion.div style={{ transform: isInView ? "none" : "translateX(400px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s", marginLeft:"auto" }}>
                <Lottie  style={{fill:"#FFF133", width:"100%", transform: "rotate(180deg)"}}  animationData={coolAnimation} />
            </motion.div>
        </div>
    </div>
  )
}
