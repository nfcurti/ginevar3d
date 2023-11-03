
import React,{ useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, scroll, animate, useScroll  } from "framer-motion"


export function Overlay() {
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll();


  useEffect(()=>{
    console.log(scrollYProgress) 

    
    scroll( animate("#moreText", {transform: ["scale(1)", "rotate(-10deg) scale(2)"] }))
    
    function startAnimation(){
      var craftingObject = document.getElementById('crafting');
      var addsObject = document.getElementById('adds');
      var moreObject = document.getElementById('moreText');
      var herotext = document.getElementById('moreText');
      gsap.fromTo(craftingObject, { opacity: 0, scale:0 }, { scale:1, opacity: 1, duration: 1, delay:3, rotation: 360*5, transformOrigin: "50% 50%" });
      gsap.fromTo(addsObject, { opacity: 0}, {opacity: 1, duration: 1, delay:3});
      gsap.fromTo(moreObject, { opacity: 0}, {opacity: 1, duration: 1, delay:3});
      gsap.fromTo(herotext, { opacity: 0}, {opacity: 1, duration: 1, delay:3});
     
    } 

    startAnimation()
  }, [])
  return (
    <>
  

      <div id='adds'  style={{fontFamily:""}}>
        <div  style={{ position: 'absolute', top: 40, right: 160, fontSize: '15px', textAlign: 'right', fontFamily:'SFCS' }}>
          MADE IN 
          <br />
          ITALY
        </div>
        <div  style={{ position: 'absolute', top: 40, right: 40, fontSize: '15px', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
          —
          <br />
          31/10/2023
        </div>
      </div>

      <svg style={{ position: 'absolute', right: 40, top: '50%' }} width="54" height="23" viewBox="0 0 54 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.5" x2="54" y2="1.5" stroke="black" strokeWidth="3" />
        <line y1="11.5" x2="54" y2="11.5" stroke="black" strokeWidth="3" />
        <line y1="21.5" x2="54" y2="21.5" stroke="black" strokeWidth="3" />
      </svg>

      <div id='crafting' style={{ position: 'absolute', top: 70, left: 120, fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px" }}>
              <svg width="800" height="160" className='mt-[-1em]'>.
                <text x="400" y="100" 	>CRAFTING DIGITAL EXPERIENCES</text>
                <text x="400" y="270" >THROUGH STORYTELLING.</text>
              </svg>
      </div>
      
      <div id='herotext' className='herot' style={{ position: 'absolute', bottom: 50, left: 120, fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px", }}>
              <div className="wrapper_contact ">
                <a id='contactButton ' className="cta " href="#">
                  <span>CONTACT</span>
                  <span>
                    <svg width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                      <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path class="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path class="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path class="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                      </g>
                    </svg>
                  </span> 
                </a>
            </div>
      </div>
      
      <motion.div 
      id='moreText' 
      className='chamuyo' 
      style={{ position: 'absolute', bottom: -175, right: 350, fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px" }}
      >
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:2} }} viewport={{ once: true }} class="line">
          <span>WE ARE A TEAM OF DEVELOPERS  </span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:2} }} viewport={{ once: true }} class="line">
          <span>AND CREATIVE ENGINEERS </span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:2} }} viewport={{ once: true }} class="line">
          <span> WITH OVER 25 YEARS </span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:4} }} viewport={{ once: true }} class="line mb2">
          <span>OF CUMULATIVE EXPERIENCE.</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:4} }} viewport={{ once: true }} class="line">
          <span>IN 2023 WE FOUNDED GINEVAR </span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:4} }} viewport={{ once: true }} class="line">
          <span>TO BRING OUR COMMON VISION TO LIFE </span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition:{duration:4} }} viewport={{ once: true }} class="line">
          <span className='sp'>WE ARE READY, ARE YOU?</span>
        </motion.div>
      </motion.div>
      <style>
        {` 
          .line{
            font-size:2em
          }
          .wrapper_contact {
            display: flex;
            justify-content: center;
            position: absolute;
            bottom:0em;
            right: 10;
            scale:1
          }
          text {
              font-size: 8rem;
              scale:0.2;
              stroke: #FFF133;
              stroke-width: 1.5px;
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              fill: #FFF133;
              animation: color_text 0.01s ease-out  infinite;
              
            }
          @keyframes dash {
            from {
              stroke-dashoffset: 1000;
              fill-opacity:0
            }
            to {
              stroke-dashoffset: 0;
              fill-opacity:1
            } 
          }

          @keyframes color_text {
            0% {
                color: #FFF133;
            }
            50% {
              color: white;
            }
            100% {
              color: #FFF133;
            }
        }
          
          `}
      </style>
    </>
  )
}
