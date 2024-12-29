import React from "react";

const Images = () => {
  return (
    <div
      className="w-screen h-screen overflow-hidden
      absolute z-[10] top-0 left-0 flex justify-center items-center
      gap-[20em] whitespace-nowrap place-items-center"
    >
      <div className="w-full  h-fit">
        <div className="w-[40em] h-[25em] c_img opacity-0">
          <img
            src="/photo-1.avif"
            alt="imgs"
            className="object-cover w-full  select-none overflow-hidden"
            data-webgl-media
          />
        </div>
      </div>
      <div className="w-full  h-fit">
        <div className="w-[40em] h-[25em] c_img">
          <img
            src="https://images.unsplash.com/photo-1732888329753-0ff89467e6c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D"
            alt="imgs"
            className="object-cover w-full select-none overflow-hidden object-center opacity-0"
            data-webgl-media
          />
        </div>
      </div>
      <div className="w-full">
        <div className="w-[40em] h-[25em] c_img ">
          <img
            src="https://images.unsplash.com/photo-1721332154161-847851ea188b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
            alt="imgs"
            className="object-cover w-full h-fit select-none overflow-hidden object-center"
            data-webgl-media
          />
        </div>
      </div>
      <div className="w-full">
        <div className="w-[40em] h-[25em] c_img">
          <img
            src="https://images.unsplash.com/photo-1732287931034-c4cc1b06de6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8"
            alt="imgs"
            className="object-cover w-full select-none overflow-hidden"
            data-webgl-media
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
