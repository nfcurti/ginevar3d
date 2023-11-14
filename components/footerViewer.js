import React, { Suspense, useEffect, useState  } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform  } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimationFull from "/public/coolAnimationFull.json";
import LogoViewer from "/components/logoViewer"


export default function FooterViewer(){
  const { scrollYProgress } = useScroll();

  const height = useTransform(scrollYProgress, [0,1], ["75vh", "0vh"])
  const opacity = useTransform(scrollYProgress, [0.9,1], [1, 0])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  })

  useEffect(()=>{
  })

  return (
  <div className='h-[40vh] overflow-hidden hidescrollbar'>
    <motion.div id="section1" style={{height}} className="gsap-section">
      <motion.div style={{opacity}}>
        <Lottie className="w-[100vh]  mx-auto"   animationData={coolAnimationFull} />
      </motion.div>
    </motion.div>

    <div id="section2" className="gsap-section relative">
        <motion.div className=''>
          <img className="p-8 absolute w-[3em]" src="\gllogolight.svg"/>
          <p className="p-8 w-[17em] top-[0] left-[25%] absolute text-center text-">CRAFTING DIGITAL EXPERIENCES THROUGH STORYTELLING.</p>
          <ul className="p-8 absolute w-[3em]">
              <li><a href="#"><i class="fa-brands fa-instagram instagram"></i></a></li>
              <li><a href="#"><i class="fa-brands fa-whatsapp whatsapp"></i></a></li>
              <li><a href="#"><i class="fa-brands fa-twitter twitter"></i></a></li>
          </ul>
        </motion.div>
    </div>
    <style>
      {`
      
    ul {
      position: relative;
      display: flex;
    }
    ul li {
        position: relative;
        list-style: none;
        margin: 0 20px;
        cursor: pointer;
    }
    ul li a {
        text-decoration: none;
    }
    ul li a .fa-brands {
        font-size: 6em;
        color: #222;
    }
    ul li a::before {
        font-family: "FontAwesome";
        position: absolute;
        top: 0;
        left: 0;
        font-size: 6em;
        height: 0;
        overflow: hidden;
        transition: 0.5s ease-in-out;
    }

    ul li:nth-child(1) a::before {
        content: "\f16d";
        background-image: linear-gradient(45deg, 
          #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,
          #bc1888 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border-bottom: 4px solid #dc2743;
    }
    ul li:nth-child(2) a::before {
        content: "\f232";
        color: #25D366;
        border-bottom: 4px solid #25D366;
    }
    ul li:nth-child(3) a::before {
        content: "\f099";
        color: #1DA1F2;
        border-bottom: 4px solid #1DA1F2;
    }
    ul li:hover a::before {
        height: 100%;
    }
        .hidescrollbar {
          -ms-overflow-style: none;  
          scrollbar-width: none;  
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