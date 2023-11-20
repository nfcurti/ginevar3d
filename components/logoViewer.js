import React, { Suspense, useEffect, useState  } from 'react'
import { gsap } from "gsap/dist/gsap";
import { motion} from "framer-motion"


function Logo(){
  return <img alt="altlogo" className="absolute top-5 start-10 w-[5em]" src="\gllogolight.svg"/>
}


export default function LogoViewer(){
    useEffect(()=>{
  
      
      function startAnimation(){
        var fadingObject = document.getElementById('fadingObject');
        gsap.fromTo(fadingObject, { opacity: 0}, {opacity: 1, duration: 1, delay:3});
      } 
  
      startAnimation()
    }, [])
    
    return <motion.div id='fadingObject' className=' '>
      <Logo/>
    </motion.div>
  }