import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef  } from 'react'
const clock = new THREE.Clock()
import { stagger, animate, motion, useInView, useScroll, useTransform , useMotionValueEvent, useMotionValue, useVelocity, useSpring, useAnimationFrame } from "framer-motion"
import Lottie from "lottie-react";
import coolAnimation from "/public/coolAnimation.json";
import {MotionPathPlugin} from "gsap/dist/MotionPathPlugin"; 
import {ScrollTrigger} from "gsap/dist/ScrollTrigger"; 
import gsap from 'gsap'; 
import { wrap } from "@motionone/utils";
import stack from "./stack.json"

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function FeaturesViewer() {
  const refTotal = useRef(null);
  const refContent = useRef(null);
  const refStack = useRef(null);
  const refWorks = useRef(null);

  const isInView = useInView(refTotal);
  const isContentInView = useInView(refContent)
  const isStackInView = useInView(refStack)
  const isWorksInView = useInView(refStack, {once:true})

  const { scrollYProgress } = useScroll();

  const [stackitem, setStackitem] = useState(0);

  const scale = useTransform(scrollYProgress, [0.5,0.66], [1, 5])
  const y = useTransform(scrollYProgress, [0.50,0.54], [0, 150])
  const x = useTransform(scrollYProgress, [0.50,0.54], [500, 50])

  const baseX = useMotionValue(0);
  var baseVelocity = 5;
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });


  const delay = ms => new Promise(res => setTimeout(res, ms));



  async function changeStack(index){
    
    const sequence = [
      ["#stackInfo", { opacity: 0 }, { duration: 0.2 }],
      ["#stackInfo", { opacity: 1 }, { delay: stagger(0.1) }]
    ]

    animate(sequence)
    await delay(200);
    setStackitem(index)
  }

  


  return (
    <div style={{paddingTop:"5em"}} className='bg-[#08080D] overflow-hidden'>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous"/>

        <div ref={refTotal} className='flex w-full h-[65em] text-white'>
            <motion.div  className='chamuyo max-[1050px]:w-[100%] max-[1050px]:p-[10px] min-[1050px]:ml-[4%] text-center mt-[5em] absolute'  style={{ fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px", transform: isInView ? "none" : "translateX(-200px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s" }} >
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
            <motion.div className="absolute right-0 overflow-hidden" style={{ transform: isInView ? "none" : "translateX(400px)", opacity: isInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s", marginLeft:"auto" }}>
                <Lottie  style={{fill:"#FFF133", width:"100%", transform: "rotate(180deg)"}}  animationData={coolAnimation} />
            </motion.div>
            <motion.div ref={refContent}  className='absolute' style={{transform: isContentInView ? "none" : "translateX(-200px)", opacity: isContentInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}} >
              <motion.p className='mt-[21em] absolute md:ml-[3.3em] text-[30px] text-center w-[100vw] md:text-start md:w-[10em] text-[#FFF133]'>OUR RECIPE</motion.p>
              <svg className='mt-[42em] absolute h-[400px] md:h-[800px]' xmlns="http://www.w3.org/2000/svg" width="1000" viewBox="0 0 500 500">
                <path className=''  id="mainPath" d="M0,25 L 500,25" />
                <motion.image className="hidden md:block " id="target" href="\gllogolight.svg" height="50" width="24" style={{x, scale, y}}/>
              </svg>
            </motion.div>
            <motion.div ref={refContent} className='absolute mt-[47.5em] w-[100%] md:w-[auto] max-[750px]:left-0 max-[750px]:right-0 md:right-[5em] lg:right-[10em] xl:right-[15em]' style={{transform: isContentInView ? "none" : "translateX(400px)", opacity: isContentInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
                <p className='text-[3em] text-center md:text-start md:text-[4em]'>INTERACTIVITY</p>
                <p className='text-[3em] text-center md:text-start  md:text-[4em]'>RELIABILITY</p>
                <p className='text-[3em] text-center md:text-start  md:text-[4em]'>STORYTELLING</p>
            </motion.div>
            
        </div>
        <div className='h-[60em] bg-[#08080D] relative'>
          <div className='relative'>
            <motion.div ref={refWorks}  className='absolute mt-[5em] md:mt-[14em]' style={{transform: isWorksInView ? "none" : "translateX(400px)", opacity: isWorksInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
                <motion.p className='mt-[21em] absolute md:ml-[3.3em] text-[30px] text-center w-[100vw] md:text-start md:w-[10em] text-[#FFF133]'>SNIPPETS & WORKS</motion.p>
                <svg className='mt-[42em] absolute h-[400px] md:h-[800px]' xmlns="http://www.w3.org/2000/svg" width="1000"  viewBox="0 0 500 500">
                  <path className=''  id="mainPath" d="M0,25 L 500,25" />
                  <motion.image className="hidden md:block" style={{x:500}} id="target" href="\gllogolight.svg" height="50" width="24" />
                </svg>
            </motion.div>
          </div>
          <div ref={refStack} className='relative min-[1750px]:flex'>
            <motion.div className="wrappers" style={{transform: isStackInView ? "none" : "translateX(-1000px)", opacity: isStackInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
              <img onMouseEnter={() => changeStack(0)} src="https://logosandtypes.com/wp-content/uploads/2020/11/Shopify.png" alt=""/>
              <img onMouseEnter={() => changeStack(1)} src="https://docs.soliditylang.org/en/latest/_images/solidity_logo.svg" alt=""/>
              <img onMouseEnter={() => changeStack(2)} src="https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png" alt=""/>
              <img onMouseEnter={() => changeStack(3)} src="https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png" alt=""/>
              <img onMouseEnter={() => changeStack(4)} src="https://source.unsplash.com/random/600x600?roses" alt=""/>
              <img onMouseEnter={() => changeStack(5)} src="https://source.unsplash.com/random/600x600?sky" alt=""/>
              <img onMouseEnter={() => changeStack(6)} src="https://gsap.com/community/uploads/monthly_2020_03/tweenmax.png.cf27916e926fbb328ff214f66b4c8429.png" alt=""/>
              <img onMouseEnter={() => changeStack(7)} src="https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png" alt=""/>
              <img onMouseEnter={() => changeStack(8)} src="https://pluralsight2.imgix.net/paths/images/nodejs-45adbe594d.png" alt=""/>
              <img onMouseEnter={() => changeStack(9)} src="https://cdn-icons-png.flaticon.com/512/5968/5968326.png" alt=""/>
            </motion.div>
            <motion.div id='stackInfo' className='mt-[auto] max-[1750px]:w-[100%]   min-[1750px]:w-[40%] min-[1750px]:ml-[1em] ' style={{transform: isStackInView ? "none" : "translateX(1000px)", opacity: isStackInView ? 1 : 0, transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"}}>
              <div className='text-[5em] text-center min-[1750px]:text-start '>
                {stack.stack[stackitem].title}
              </div>
              <div className="text-center min-[1750px]:text-start text-[1.25em] font-['Inter'] min-[1750px]:w-[75%]" >
                {stack.stack[stackitem].desc}
              </div>
            </motion.div>
          </div>
        </div>
        
            
        <style>
          {`
          .wrappers img{
            filter: grayscale(100%);
          }
          .wrappers img:hover{
            filter: none;
          }
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
              max-width: 1200px;
              max-height: 1200px;
              padding:3em;
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
