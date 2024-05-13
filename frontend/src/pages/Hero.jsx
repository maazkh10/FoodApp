import React from "react";
import heroImg from "../assets/hero-img.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-screen overflow-scroll flex items-center justify-center  ">
      <section className="p-4 md:px-0 mx-8 md:py-12 h-full  md:h-fit  md:min-h-[400px] text-left max-w-screen-xl  xl:mx-auto grid  grid-cols-12 after:absolute after:bg-gradient-to-t after:from-emerald-800 after:to-emerald-500 after:size-full after:-z-10 after:left-0 after:top-0 ">
        <div className="col-span-12 md:col-span-6 order-2 md:order-1">
          <h1 className="text-xl md:text-5xl font-bold md:w-96 text-white">
            The Easiest Way To Make Your Favorite Meal
          </h1>
          <p className="py-4 md:py-8 text-sm md:text-base text-zinc-200 max-w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ab
            dolores, earum asperiores vitae vero totam magni ratione amet fugit.
          </p>
          <Link
            to={"/recipes"}
            className="px-3 py-2 bg-emerald-400 rounded-lg text-white text-base md:text-lg  animate-pulse"
          >
            Explore Recipes
          </Link>
        </div>
        <div className="col-span-12 md:col-span-6 order-1 md:order-2">
          <img src={heroImg} alt="" className="" srcset="" />
        </div>
      </section>
    </div>
  );
};

export default Hero;
