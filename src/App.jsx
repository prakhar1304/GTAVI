import React, { useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from  "gsap"

function App() {

 let [showContent , setShowContent] = useState(false);
  useGSAP(() => {
   //create a timeline
   const t1 =  gsap.timeline();


   //what to  do  in  that  time line  till (so  used to)
   t1.to(".vi-mask-group" , {
      rotate:10,
      duration:2,
      ease: "Power4.easeInOut",
      transformOrigin : "50%  50%"
   })
    .to(".vi-mask-group" , {

      scale:10,
      delay: -1.8, //cause   this  will  run  after   first  one  and  to make  this run  just  after  slight roation
      transformOrigin:"50% 50%",
      ease: "expo.easeInOut",
      duration:2,
      opacity:0,
      //and befor  animation  complete we want  to  remove  this svg  frame  to  show  main screen
      onUpdate : function() {
        //progress  is  of  timeline and  is  between  0 to 1 
        if(this.progress() >=  0.9){
         // this will  remove the  svg  class  completely
          
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();

        }

     
      }
    })


  })
  return (
    <>             
   <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
    </>
  )
}

export default App