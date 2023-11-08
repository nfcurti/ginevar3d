import React, { Suspense, useEffect, useState  } from 'react'
import { TimelineMax, Power4 } from "gsap";
import { motion} from "framer-motion"

import PortfolioViewer from "/components/portfolioViewer"
import IntroViewer from "/components/introViewer"
import FeaturesViewer from "/components/featuresViewer"
import LogoViewer from "/components/logoViewer"
import ContentViewer from "/components/contentViewer"
import FooterViewer from "/components/footerViewer"
import NavMenu from "/components/navMenu"
import { Overlay } from "/components/overlays"

export default function App() {
  const [allowScroll, setAllowScroll] = useState(false)
  
  useEffect(()=>{
    const $logo = document.querySelector('.transition__logo');
    const $frameBlack = document.querySelector('.page-transition__black');
    const $frameRed = document.querySelector('.page-transition__red');
    const $button = document.querySelector('.buttontr');
  
    let tltransition = new TimelineMax({paused:true})
      .fromTo($frameRed , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},)
      .fromTo($frameBlack , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},.2)
      .fromTo($logo , 1.6, {xPercent: -100, autoAlpha:0 },{xPercent: 0, autoAlpha:1, ease: Power4.easeInOut},.7)
      .set($frameRed, {scaleX:0})
      .to($frameBlack , 2.2, {scaleX: 0, transformOrigin:'right', ease: Power4.easeInOut})
      .to($logo , .2, {autoAlpha:0 },'-=1.2')

      $button.addEventListener('click', () => {
        tltransition.play(0);
        setTimeout(()=>{
        }, 2000)
      });


  })

  return (
    <main className={allowScroll? "overflow-hidden":"overflow-auto	"}>

      <motion.div>
        <IntroViewer/>
      </motion.div>

      <motion.div>
        <ContentViewer/>
      </motion.div>

      <motion.div>
        <FeaturesViewer/>
      </motion.div>

      <motion.div>
        <PortfolioViewer />
      </motion.div>

      <motion.div>
        <FooterViewer/>
      </motion.div>

      <NavMenu/>
      <Overlay/>
      <LogoViewer/>
    </main>
  )
}
