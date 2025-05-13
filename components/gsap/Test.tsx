"use client";
import React from "react";
import { gsap } from "gsap";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
const Test = () => {
  const handleRun = () => {
    let tl = gsap.timeline();
    tl.to(".red", {
      duration: 5,
      x: 200,
      rotateX: 200,
    })
      .add("blueSpin", "+=1")
      .to(
        ".blue",
        {
          duration: 5,
          rotate: 360,
          fill: "yello",
        },
        "blueSpin"
      )
      .addLabel("step2", 3)
      .seek("step2");
  };

  return (
    <div className="flex items-center justify-around min-h-[50vh] flex-col">
      <Button onClick={handleRun}>Run</Button>
      <div
        id="red"
        className="box red bg-gradient-to-t bg-red-500 w-[100px] h-[100px] "
      ></div>
      <div className="box blue bg-gradient-to-t bg-blue-500 w-[100px] h-[100px] "></div>
      <div className="box green bg-gradient-to-t bg-green-500 w-[100px] h-[100px] "></div>
    </div>
  );
};

export default Test;
