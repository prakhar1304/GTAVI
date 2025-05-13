import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    //create a timeline
    const t1 = gsap.timeline();

    //what to  do  in  that  time line  till (so  used to)
    t1.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      
      ease: "Power4.easeInOut",
      transformOrigin: "50%  50%",
    }).to(".vi-mask-group", {
      scale: 20,
      delay: -1.8, //cause   this  will  run  after   first  one  and  to make  this run  just  after  slight roation
      transformOrigin: "50% 50%",
      ease: "expo.easeInOut",
      duration: 2,
      opacity: 0,
      //and befor  animation  complete we want  to  remove  this svg  frame  to  show  main screen
      onUpdate: function () {
        //progress  is  of  timeline and  is  between  0 to 1
        if (this.progress() >= 0.9) {
          // this will  remove the  svg  class  completely

          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });



  //select main and track  mouse so  use  eventlsitern
    // aslso  in this  gsap  we  need  to  add  when ever  show conetendt  change  this  use gsap  should  runn
  useGSAP(() => {

      if(!showContent) return;
      
      gsap.to(".main" , {
        scale:1,
        rotate:0,
        duration: 2,
        delay: "-1",
        ease : "Expo.easeInOut",
      })

      gsap.to(".sky" , {
        scale:1.2,
        rotate:0,
        duration: 2,
        delay: "-.8",
        ease : "Expo.easeInOut",
      })

      gsap.to(".bg" , {
        scale:1.1,
        rotate:0,
        duration: 2,
        delay: "-.8",
        ease : "Expo.easeInOut",
      })

      gsap.to(".char" , {
        scale:0.9,
        x: "-50%",
        rotate:0,
        bottom : "-50%",
        duration: 2,
        delay: "-.8",
        ease : "Expo.easeInOut",
      })

      const main = document.querySelector(".main");
      main?.addEventListener("mousemove", function(e) {
        // console.log(e);
        //e.clinetX  show  the  

       //e.clinetx --> clent  cursor positionon  screen (pixel posion on x )  rg - 200  || left  most  o  right most  masx 
       //window.innerWidth --> total  pixel  on  screenx direction eg --1000
       // (e.clinetx / window.innerWidth) --> range between 0  to 1 
       //minus 0.5 --> makes  range  -0.5  to  0.5  (so  we can  diff left and  right side)
       //multiply  whole  by  40 --> makes range from  -20  to +20
        const xMove = (e.clientX / window.innerWidth -0.5) * 40  ;
       
        // console.log(e.clientx , "x" );
       //.imagediv  ka andar  .text div  kos
        gsap.to(".main .text" ,{
            x : `${xMove *  0.4}%`
        })
        gsap.to(".sky" ,{
            x : xMove
        })
        gsap.to(".bg" ,{
            // x : `${xMove *1.7}`
            x: xMove * 1.7
        })


      });
  },[showContent]);


  return (
    <>
      {/* svg part             */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[10] w-full h-screen overflow-hidden bg-black ">
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

      {/* now  after  naimtaion  end  i  have  to  show the  screen */}

      {/* show  this content   when  showContent is  true */}
      {showContent && (
        // so  bhai ki  hegith  full  bg  black  height bi  de deta ha bhai ko
        //h-screen gives   height  equal   to  screeen but h-full  wok  different  resaerch
        <div className="main  w-full rotate-[-10deg] scale-[1.7] bg-black ">
          <div className="landing  overflow-hidden relative w-full h-screen ">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7 ">
                <div className="linediv     flex flex-col gap-[5px]">
                  <div className="line h-2 w-14  bg-white"></div>
                  <div className="line h-2 w-7  bg-white"></div>
                  <div className="line h-2 w-4  bg-white"></div>
                </div>
                {/* //leading- non  to  remove  extra  line  hegith */}
                <h3 className=" text-4xl leading-none mt-[-1px] text-white">
                  ROCKSTAR
                </h3>
              </div>
            </div>

            {/* // used  relative  for the  parent  so  that absolute  child can be  set  relative  to  parent */}
            <div className="imagediv relative overflow-hidden w-full h-screen   bg-black">
              <img
                className="sky absolute scale-[1.8]  rotate-[-40deg]  left-0 top-0 w-full h-screen object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="bg absolute  scale-[1.6]  rotate-[-5deg] left-0 top-0 w-full h-screen object-cover"
                src="./bg.png"
                alt=""
              />

              <div className=" text absolute flex flex-col  gap-3 left-1/2 -translate-x-1/2 text-white  top-20">
                <h1 className="text-[9rem] leading-none  -mx-40">grand</h1>
                <h1 className="text-[9rem]  leading-none mx-10">theft</h1>
                <h1 className="text-[9rem] leading-none -mx-30">auto</h1>
              </div>

              {/* scale  ko  minus  ma  dalo  to  rotaet  kar  deta ha  180 degree */}
              <img
                className="char absolute -bottom-[180%] left-1/2  -translate-x-1/2 scale-[2.5]  rotate-[-25deg]"
                src="./girlbg.png"
                alt=""
              />
            </div>

            <div className="bottombar text-white absolute bottom-0 left-0 w-full px-10 py-10  bg-gradient-to-t from-black to-transparent">
              <div className="scroll flex gap-4 items-center">
                <i className="ri-arrow-down-line"></i>
                <h3 className='font-["Helvetica_Now_Display"] text-1xl'>
                  Scroll Down
                </h3>

                <img
                  className=" absolute h-[65px]  top-1/2 left-1/2 -translate-1/2 -translate-y-1/2"
                  src="./ps5.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center  bg-black  overflow-hidden">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-0">
                <h1 className="text-7xl">Still Running,</h1>
                <h1 className="text-7xl">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}

export default App;
