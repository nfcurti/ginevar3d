import React,{ useEffect, useRef, useState } from 'react'
import gsap from 'gsap'


export function Overlay() {
  const [hovered, setHovered] = useState(false)

  

  useEffect(()=>{
    
    function startAnimation(){
      var craftingObject = document.getElementById('crafting');
      var bubbleObject = document.getElementById('bubble');
      var addsObject = document.getElementById('adds');
      gsap.fromTo(craftingObject, { opacity: 0, scale:0 }, { scale:1, opacity: 1, duration: 1, delay:3, rotation: 360*5, transformOrigin: "50% 50%" });
      gsap.fromTo(bubbleObject, { opacity: 0, scale:0 }, { scale:1, opacity: 1, duration: 1, delay:3, rotation: 360*5, transformOrigin: "50% 50%"  });
      gsap.fromTo(addsObject, { opacity: 0}, {opacity: 1, duration: 1, delay:3});
    }

    startAnimation()
  }, [])
  return (
    <><div id='adds' onPointerEnter={() => {setHovered(true)}} onPointerLeave={() => setHovered(false)}>
        <div  style={{ position: 'absolute', top: 40, right: 160, fontSize: '15px', textAlign: 'right' }}>
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
      <div id='crafting' style={{ position: 'absolute', bottom: 70, left: 120, fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px" }}>
        CRAFTING DIGITAL EXPERIENCES
        <br />
        THROUGH STORYTELLING.
        <br />
        <br />
        <div style={{ position: 'relative', marginTop: 10, display: 'inline-block' }}>
          <a style={{ fontSize: '15px', fontWeight: 600, letterSpacing: 2 }} href="https://github.com/pmndrs/drei#caustics">
            CONTACT
          </a>
          <div style={{ marginTop: 6, height: 2.5, width: '100%', background: '#3e3e3d' }} />
        </div>
        <br />
      </div>
      <div id='bubble'  style={{ position: 'absolute', bottom: 70, right: 120, fontSize: '20px', fontFamily:"SFCSB", letterSpacing:"2px" }}>
        <img src="/bubblecomic2.svg" alt="bubbols" />
      </div>
    </>
  )
}
