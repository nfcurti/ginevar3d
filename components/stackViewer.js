import React, { useRef, useState, useLayoutEffect, useCallback } from "react"
import ResizeObserver from "resize-observer-polyfill"
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring
} from "framer-motion"

export default function SmoothScroll(){
  const scrollRef = useRef(null)
  const ghostRef = useRef(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

  useLayoutEffect(() => {
    scrollRef && setScrollRange(scrollRef.current.scrollWidth)
  }, [scrollRef])

  const onResize = useCallback(entries => {
    for (let entry of entries) {
      setViewportW(entry.contentRect.width)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(entries => onResize(entries))
    resizeObserver.observe(ghostRef.current)
    return () => resizeObserver.disconnect()
  }, [onResize])

  const { scrollYProgress } = useViewportScroll()
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW]
  )
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  return (
    <>
      <div className="scroll-container">
        <motion.section
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container"
        >
          <div className="thumbnails">
            <div className="thumbnail" />
            <div className="thumbnail" />
            <div className="thumbnail" />
            <div className="thumbnail" />
            <div className="thumbnail" />
            <div className="thumbnail" />
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
      <style>
        {`
        $black: #141414;
        $yellowGreen: yellowgreen;
        $yellow: yellow;
        $royalblue: royalblue;
        $magenta: magenta;
        
        *,
        *:before,
        *:after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background-color: $black;
          overscroll-behavior: none;
          -ms-overflow-style: none;
          font-size: 16px;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .scroll-container {
          position: fixed;
          left: 0;
          right: 0;
          will-change: transform;
        
          .ghost {
            width: 100vw;
          }
        }
        
        .thumbnails-container {
          position: relative;
          height: 100vh;
          width: max-content;
          display: flex;
          align-items: center;
          padding: 0px 160px;
          background-color: $black;
          border: 40px solid $yellowGreen;
        
          .thumbnails {
            position: relative;
            display: flex;
            border: 20px solid $yellow; 
        
        
            .thumbnail {
              height: 40vh;
              width: 700px;
              background-color: $royalblue;
              border: 15px solid magenta;
            }
          }
        }
        

        `}
      </style>
    </>
  )
}

