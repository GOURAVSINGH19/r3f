import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import Cnva from "./Canvas";

const Home = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const numberRef = useRef();

  const incrementNumber = (direction) => {
    setCurrentNumber((prevNumber) => {
      if (direction === "down") {
        return prevNumber === 4 ? 1 : prevNumber + 1;
      } else {
        return prevNumber === 1 ? 4 : prevNumber - 1;
      }
    });
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);

      const direction = e.deltaY > 0 ? "down" : "up";

      gsap.to(".np", {
        duration: 0.3,
        ease: "cubic-bezier(0.26,0,0.48,1)",
        onComplete: () => {
          incrementNumber(direction);
          setIsScrolling(false);
        },
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling, currentNumber]);

  return (
    <div className="w-screen h-screen  absolute z-[10]  pointer-events-none select-none overflow-hidden">
      <div className="nav w-full h-fit fixed z-[6] top-0 pointer-events-auto">
        <div className="mx-auto max-w-screen-3xl px-[4.5rem] py-[1rem] flex justify-between items-center">
          <div className="logo text-[1.2rem] font-serif">logo</div>
          <div className="toggler text-[1.2rem] font-serif">svg</div>
          <div className="abt  w-20 flex items-end justify-between flex-col">
            <a href="/" className="flex items-center gap-3 justify-between">
              <span className="mr-2 pointer-events-none  select-none ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="none"
                  className="relative svg_ left-0 top-1/2 group-not-active:opacity-0 group-not-active:translate-x-[25%] will-change-transform transition-trop duration-500 mr-xs1 -translate-y-[12%]"
                >
                  <path
                    d="M8.69387 3.69631C8.87294 3.51724 8.87294 3.2269 8.69387 3.04783L5.77572 0.129688C5.59665 -0.0493837 5.30632 -0.0493837 5.12725 0.129688C4.94817 0.30876 4.94817 0.599093 5.12725 0.778165L7.72115 3.37207L5.12725 5.96598C4.94817 6.14505 4.94817 6.43538 5.12725 6.61445C5.30632 6.79353 5.59665 6.79353 5.77572 6.61445L8.69387 3.69631ZM0.3396 3.83061L8.36963 3.83061L8.36963 2.91353L0.3396 2.91353L0.3396 3.83061Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="text-[1.2rem] font-serif mr-2">ABT</span>
            </a>
            <a href="/" className="flex items-center justify-between gap-3 ">
              <span className="mr-2 pointer-events-none  select-none ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="7"
                  viewBox="0 0 9 7"
                  fill="none"
                  className="relative svg_ left-0 top-1/2 group-not-active:opacity-0 group-not-active:translate-x-[25%] will-change-transform transition-trop duration-500 mr-xs1 -translate-y-[12%]"
                >
                  <path
                    d="M8.69387 3.69631C8.87294 3.51724 8.87294 3.2269 8.69387 3.04783L5.77572 0.129688C5.59665 -0.0493837 5.30632 -0.0493837 5.12725 0.129688C4.94817 0.30876 4.94817 0.599093 5.12725 0.778165L7.72115 3.37207L5.12725 5.96598C4.94817 6.14505 4.94817 6.43538 5.12725 6.61445C5.30632 6.79353 5.59665 6.79353 5.77572 6.61445L8.69387 3.69631ZM0.3396 3.83061L8.36963 3.83061L8.36963 2.91353L0.3396 2.91353L0.3396 3.83061Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span className="text-[1.2rem] font-serif">WRK</span>
            </a>
          </div>
        </div>
      </div>
      {/* <div className="relative">
        <div className="w-[20em] h-[20em] top-[10em] left-[2em] absolute flex flex-col justify-center items-center overflow-hidden">
          <ul
            ref={numberRef}
            className="h-fit text-[10em] text-[#ab78d7] flex flex-col overflow-hidden"
          >
            <li className="np">{currentNumber}</li>
          </ul>
        </div>
      </div> */}
      <div className="max-w-screen-2xl pointer-events-auto z-[20] mx-auto flex justify-between items-center absolute bottom-10 left-0 right-0">
        <div className="">
          <h1 className="text-[2em]">contact</h1>
        </div>
        <div className="w-fit text-center">
          <h1 className="text-[1.5em] capitalize font-serif mb-2">social :</h1>
          <div className="flex items-center justify-center gap-2">
            <a
              href="https://www.linkedin.com/in/gourav-singh-814293258/"
              target="blank"
            >
              <span>
                <FaLinkedin className="w-5 h-5 text-black-500 hover:text-purple-800 duration-500 ease-linear " />
              </span>
            </a>
            <a href="https://github.com/GOURAVSINGH19" target="blank">
              <span>
                <FaGithub className="w-5 h-5 text-black-500 hover:text-purple-800 duration-500 ease-linear " />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
