import React from "react";
import clock from "../../../../assets//icons/clock.svg";
import marker from "../../../../assets//icons/marker.svg";
import phone from "../../../../assets//icons/phone.svg";

const ContactCard = () => {
  const contactInfo = [
    {
      _id: 1,
      name: "Opening Hours",
      description: "Lorem Ipsum is simply dummy text of the pri",
      img: clock,
      color: "bg-primary",
    },
    {
      _id: 2,
      name: "Visit our location",
      description: "Lorem Ipsum is simply dummy text of the pri",
      img: marker,
      color: "bg-accent",
    },
    {
      _id: 3,
      name: "Contact us now",
      description: "Lorem Ipsum is simply dummy text of the pri",
      img: phone,
      color: "bg-primary",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-2">
      <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-4">
        {contactInfo.map((info) => (
          <div className={`card card-side text-white shadow-xl ${info.color}`}>
            <figure>
              <img className="p-4" src={info.img} alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title font-xl">{info.name}</h2>
              <p>{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
