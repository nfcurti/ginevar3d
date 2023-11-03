
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";


function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false
    });
  
    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(0, -11.2, v)}%`);
  
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
    return (
      <div className="parallax">
        <motion.div className="scroller" style={{x}}>
          <span>{children} </span>
          <span className="hidden">{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
          <span>{children} </span>
        </motion.div>
      </div>
    );
  }

export default function App() {
  return (
    <section className="absolute bottom-0">
        <ParallaxText baseVelocity={-5}>WELCOME TO</ParallaxText>
        <ParallaxText baseVelocity={5}>GINEVAR LABS</ParallaxText>
        <style>
            {`

    section {
        background-color:#FFF133;
        color:#08080D;
        position: relative;
    }


    .parallax {
    overflow: hidden;
    letter-spacing: -2px;
    line-height: 0.8;
    margin: 0;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
    }

    .parallax .scroller {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 64px;
    display: flex;
    white-space: nowrap;
    display: flex;
    flex-wrap: nowrap;
    }

    .parallax span {
    margin-right: 30px;
    }
    `            
            }
        </style>
    </section>
  );
}
