import React from 'react'
import ParallaxText from "/components/parallaxText"
import { motion, useScroll, useTransform  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";



export default function ContentViewer(){
  const { scrollYProgress } = useScroll();

  const height = useTransform(scrollYProgress, [0.2214,0.5424], ["50vh", "100vh"])


  return (
  <motion.div id='contentWrapper' style={{height}} className='relative h-[50vh] bg-[#08080D] overflow-hidden'>
    <Lottie style={{fill:"#FFF133", width:"50%"}}  animationData={coolAnimation} />
    <ParallaxText id="parallax" />
  </motion.div>
  )
}