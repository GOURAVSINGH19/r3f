import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

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
        duration: .3,
        ease: "cubic-bezier(0.26,0,0.48,1)",
        onComplete: () => {
          incrementNumber(direction);
          setIsScrolling(false);
        },
      });
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolling, currentNumber]); // Dependency on isScrolling and currentNumber

  return (
    <div className="w-screen h-screen absolute z-[10] pointer-events-auto overflow-hidden">
      <div className="nav w-full h-fit fixed top-0">
        <div className="mx-auto max-w-screen-3xl px-[4.5rem] py-[1rem] flex justify-between items-center">
          <div className="logo text-[1.2rem] font-serif">logo</div>
          <div className="toggler text-[1.2rem] font-serif">svg</div>
          <div className="abt w-fit">
            <a href="/" className="flex items-center gap-5">
              <h1 className="text-[1.2rem] font-serif">ABT</h1>
            </a>
            <a href="/" className="flex items-center gap-5">
              <h1 className="text-[1.2rem] font-serif">WRK</h1>
            </a>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="w-[20em] h-[20em] top-[10em] left-[2em] absolute flex flex-col justify-center items-center overflow-hidden">
          <ul
            ref={numberRef}
            className="h-fit text-[10em] text-[#ab78d7] flex flex-col overflow-hidden"
          >
            <li className="np">{currentNumber}</li>
          </ul>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center absolute bottom-10 left-0 right-0">
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
                <FaLinkedin className="w-5 h-5 text-gray-500 hover:text-purple-800 duration-500 ease-linear " />
              </span>
            </a>
            <a href="https://github.com/GOURAVSINGH19" target="blank">
              <span>
                <FaGithub className="w-5 h-5 text-gray-500 hover:text-purple-800 duration-500 ease-linear " />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
