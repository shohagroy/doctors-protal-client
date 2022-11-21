import React from "react";
import bgImg from "../../../assets/images/bg.png";
import heroImg from "../../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AppointmentHero = ({ selected, setSelected }) => {
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
          <div className="mr-20 bg-white rounded-md border">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={(data) => {
                if (data) {
                  setSelected(data);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentHero;
