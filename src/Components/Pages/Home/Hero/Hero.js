import React from "react";
import heroImg from "../../../../assets/images/chair.png";
import bgImg from "../../../../assets/images/bg.png";
import Button from "../../../Utility/Button";

const Hero = () => {
  return (
    <section
      className=" p-2 lg:h-[830px]"
      style={{
        background: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="hero h-full flex justify-center max-w-7xl mx-auto ">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <img src={heroImg} className=" md:w-1/2 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <Button> Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
