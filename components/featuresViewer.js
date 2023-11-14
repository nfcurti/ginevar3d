import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
const clock = new THREE.Clock()
import { motion, useInView, useScroll, useTransform , useMotionValueEvent, useMotionValue, useVelocity, useSpring, useAnimationFrame } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"; 
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"; 
import gsap from 'gsap'; 
import { wrap } from "@motionone/utils";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);


export default function FeaturesViewer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0.44,0.66], [1, 5])
  const y = useTransform(scrollYProgress, [0.40,0.54], [0, 150])
  const x = useTransform(scrollYProgress, [0.40,0.54], [500, 50])

  const baseX = useMotionValue(0);
  var baseVelocity = 5;
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  const xSlider = useTransform(baseX, (v) => `${wrap(0, -100, v)}%`);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
  })

  

  

  useEffect(()=>{
    
    gsap.fromTo('.module p', {clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)'}, {clipPath: 'polygon(0% 0%, 26% 0, 26% 49%, 26% 100%, 0% 100%)', duration: 0.8, repeat: -1, repeatDelay: 1, ease: "sine", yoyo: true})
    
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
            <motion.div className='absolute mt-[45em] right-[23em]' >
                <p className='text-[5em]'>INTERACTIVITY</p>
                <p className='text-[5em]'>RELIABILITY</p>
                <p className='text-[5em]'>STORYTELLING</p>
            </motion.div>
            
        </div>
        <div className='h-[100vh] bg-[#08080D] relative'>
          <div className='relative'>
            <motion.div className='absolute mt-[15em]' >
                <motion.p className='mt-[22em] absolute ml-[3.3em] text-[30px] w-[10em] text-[#FFF133]'>SNIPPETS & WORKS</motion.p>
                <svg className='mt-[42em] absolute' xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 500 500">
                  <path className=''  id="mainPath" d="M0,25 L 500,25" />
                  <motion.image id="target" href="\gllogolight.svg" height="50" width="24" />
                </svg>
            </motion.div>
          </div>
          <div className='relative'>
            <div className="wrappers float-left">
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
              <div className='text-[10em] text-start'>
                Shopify
              </div>
              <div className="text-start text-[1.25em] font-['Inter'] w-[75%]" >
                Used to partly or fully develop ecommerce site either as-is or using a NodeJS backend attached.
              </div>
            </div>
          </div>
        </div>
        
        <div className=' hidden relative h-[50em] overflow-hidden'>
            <div id="scroll-container">
              <motion.div id="containerX" style={{x:xSlider}}>
                <div className="module">
                  <img src="https://source.unsplash.com/67jsEzwy7og" alt="image 1"/>
                  <p>Alpacas</p>
                </div>
                <div className="module">
                  <img  src="https://source.unsplash.com/Qy1uaUa4sQA" alt="image 2" />
                  <p>Zwickies</p>
                </div>
                <div className="module">
                  <img src="https://source.unsplash.com/WDBUAblF48U" alt="image 3" />
                  <p>Isovox</p>
                </div>
                <div className="module">
                  <img  src="https://source.unsplash.com/jumNGn7kBl0" alt="image 4" />
                  <p>Taxslice</p>
                </div>
                <div className="module">
                  <img src="https://source.unsplash.com/ocku3zjNM7k" alt="image 5" />
                  <p>CuteCat Gang</p>
                </div>
                <div className="module">
                  <img src="https://source.unsplash.com/Nlax2tu89bU" alt="image 6" />
                  <p>FroggoFrens</p>
                </div>
                <div className="module">
                  <img src="https://source.unsplash.com/x6qwirOyK10" alt="image 6" />
                  <p>Rare Paradise</p>
                </div>
              </motion.div>
              <div className="name"><a href="https://iamtrapti.com/" target="_blank">Ginevar Labs</a>
              </div>
            </div>
          </div>
            
        <style>
          {`
           .module img {
              width: 100%;
              object-fit: cover;
              position:relative
            }
            #containerX {
              background-color:grey;
              display:flex;
              flex-wrap:wrap;
              flex-direction:column;
              height:100vh;
              transform-origin: center;
              top: 0 ;
              max-width: 4800px;
              max-height: 500px !important;
              margin-top:2em
              
            }
            #scroll-container {
              height: 100vh;
              transform: rotate(-5deg);
            }
            .name {
              position: absolute;
              bottom: 50px;
              right: 50px;
              width: 200px;
              height: 200px;
              border-radius: 50%;
             
            }
            .name a {
              color: white;
              display: block;
              text-align:center; 
              font-size: 30px;
            }
            
            .module{
              width: 700px;
              height:100%;
              display: flex;
              border-top:3px solid #FFF133;
              border-bottom:3px solid #FFF133
            }
            
            .module  p {
              position: fixed;
              font-size: 30px;
              color: black;
              transform: translate(100px, 270px);
              background-color: #FFF133;
              width: 180px;
              height: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
              clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
            
            }

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
              
              
            }

            .wrappers img::nth-child(7n + 1) {
              grid-column: 2 / span 2;
            }
            
            .wrappers img:hover {
              z-index: 2;
              transform: scale(2);
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
