import React, { Suspense, useEffect, useState  } from 'react'
import PortfolioViewer from "/components/portfolioViewer"
import IntroViewer from "/components/introViewer"
import { gsap } from "gsap/dist/gsap";
import { TweenMax, Power2, TimelineMax, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Transition(props) {
  useEffect(()=>{
    const $img2 = document.querySelector('.image2');
    const $logo = document.querySelector('.transition__logo');
    const $frameBlack = document.querySelector('.page-transition__black');
    const $frameRed = document.querySelector('.page-transition__red');
    const $button = document.querySelector('.buttontr');
  
    let tltransition = new TimelineMax({paused:true})
      .fromTo($frameRed , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},)
      .fromTo($frameBlack , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},.2)
      .fromTo($logo , 1.6, {xPercent: -100, autoAlpha:0 },{xPercent: 0, autoAlpha:1, ease: Power4.easeInOut},.7)
      .set($frameRed, {scaleX:0})
      .set($img2, {autoAlpha:0})
      .to($frameBlack , 2.2, {scaleX: 0, transformOrigin:'right', ease: Power4.easeInOut})
      .to($logo , .2, {autoAlpha:0 },'-=1.2')

      $button.addEventListener('click', () => {
        tltransition.play(0);
      });

  })

  return (
    <div>
      <div class="page-transition">
          <div class="page-transition__red"></div>
          <div class="page-transition__black"></div>
          <img class="transition__logo" src='gllogolight.svg'/>
      </div>
      <button class='buttontr' id="button">TRANSITION</button>     
      <style>{`
        .page-transition__black {
          position: absolute;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          background: #000;
        }
        img {
          position: absolute;
          left: 0;
          top: 0;
        }
        .page-transition__red {
          position: absolute;
          left: 0;
          top: 0;
          height: 100vh;
          width: 100vw;
          background: red;
        }
        .transition__logo {
          text-transform: uppercase;
          font-family: sans-serif;
          font-size: 60px;
          position: absolute;
          z-index: 1;
          color: #fff;
          font-weight: bold;
          top: 50vh;
          left: 50vw;
          transform: translate(-50%,-50%);
        }
        
        button {
          bottom: 15vh;
          left: 5vw;
          text-transform: uppercase;
          font-family: sans-serif;
          font-size: 16px;
          position: absolute;
          z-index: 1;
          color: #fff;
          background: transparent;
          padding: 20px;
          border: 2px solid #fff;
        }
      `}

      </style>
    </div>
  )
}
