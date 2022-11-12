import React from "react";
import ContactUs from "./ContactUs/ContactUs";
import ContactCard from "./Hero/ContactCard";
import Hero from "./Hero/Hero";
import MakeAppointment from "./MakeAppointment/MakeAppointment";
import OurService from "./OurService/OurService";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <ContactCard />
      <OurService />
      <MakeAppointment />
      <Testimonial />
      <ContactUs />
    </div>
  );
};

export default Home;
