import React from "react";
import fluoride from "../../../../assets/images/fluoride.png";
import cavity from "../../../../assets/images/cavity.png";
import teeth from "../../../../assets/images/whitening.png";
import Button from "../../../Utility/Button";

import tretmentImg from "../../../../assets/images/treatment.png";

const OurService = () => {
  const services = [
    {
      _id: 1,
      img: fluoride,
      name: "Fluoride Treatment",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 2,
      img: cavity,
      name: "Cavity Filling",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
    {
      _id: 3,
      img: teeth,
      name: "Teeth Whitening",
      details:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
    },
  ];
  return (
    <section className="my-[130px] max-w-7xl mx-auto">
      <div className="text-center">
        <h4 className="text-primary text-xl font-bold">Our Service</h4>
        <h2 className="text-4xl">Services We Provide</h2>
      </div>
      <div className="my-[70px] grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="card shadow-xl">
            <figure className="px-10 pt-10">
              <img src={service.img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title text-xl">{service.name}</h2>
              <p>{service.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hero my-[150px]">
        <div className="hero-content flex-col lg:justify-center lg:items-center lg:flex-row">
          <img src={tretmentImg} className="rounded-lg shadow-2xl lg:w-1/3" />
          <div className="w-[500px] ml-[100px]">
            <h1 className="text-5xl font-bold">
              Exceptional Dental Care, on Your Terms
            </h1>
            <p className="py-6">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </p>
            <Button>GET STARTED</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurService;
