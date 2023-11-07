import React, { Suspense, useEffect, useState  } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimationFull from "/public/coolAnimationFull.json";

export default function FooterViewer(){
  const { scrollYProgress } = useScroll();

  const height = useTransform(scrollYProgress, [0.3296,0.5424], ["50vh", "100vh"])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  })


  return <motion.div  className='relative h-[50vh] bg-[#FFF133]'>
      <Lottie className="w-3/5 block mx-auto"   animationData={coolAnimationFull} />
  </motion.div>
}