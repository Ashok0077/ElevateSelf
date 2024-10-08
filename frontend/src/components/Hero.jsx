import { React, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import HeroImage from "../assets/HeroImage.svg";

const Hero = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleTagClick = (tag) => {
    navigate(`?search=${tag}`);
  };

  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-[#183b56] md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
          Want to develop? Let ElevateSelf assist you.
        </h1>
        <p className="text-[#5a7188] mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
          Read other people's success stories, follow their guidance, learn from them, implement in life, and witness the magic.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search article"
            />
          </div>
          <button
            onClick={() => navigate(prompt ? `?search=${prompt}` : "/")}
            className="w-full bg-[#1565d8] text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2"
          >
            Search
          </button>
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
          <span className="text-[#5a7184] font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            {["interviews", "UPSC", "Placement", "Fitness"].map((tag) => (
              <li
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="cursor-pointer rounded-lg bg-[#7999cd] bg-opacity-10 px-3 py-1.5 text-[#1569db] font-semibold hover:bg-[#7999cd] hover:bg-opacity-20"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
        <img
          className="w-full"
          src={HeroImage}
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;
