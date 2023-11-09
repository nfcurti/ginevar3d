import React, { Suspense, useEffect, useState  } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimationFull from "/public/coolAnimationFull.json";


export default function FooterViewer(){
  const { scrollYProgress } = useScroll();

  const height = useTransform(scrollYProgress, [0,1], ["75vh", "0vh"])
  const opacity = useTransform(scrollYProgress, [0.9,1], [1, 0])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  })

  useEffect(()=>{
  })

  return (
  <div className='h-[50vh] overflow-hidden hidescrollbar'>
    <motion.div id="section1" style={{height}} className="gsap-section">
      <motion.div style={{opacity}}>
        <Lottie className="w-[100vh]  mx-auto"   animationData={coolAnimationFull} />
      </motion.div>
    </motion.div>

    <div id="section2" className="gsap-section ">
        <p>Footer</p>
    </div>
    <style>
      {`
        .hidescrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        .hidescrollbar::-webkit-scrollbar {
          display: none;
        }

         #section1 {
          background: black;
          color: white;
          text-align:center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 3rem
        }

        #section2 {
          background: black;
          height: 50vh;
          width: 100vw;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 4rem;
        }
        `}
    </style>
  </div>
  )
}