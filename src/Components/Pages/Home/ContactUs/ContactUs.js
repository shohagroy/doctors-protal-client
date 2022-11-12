import React from "react";
import background from "../../../../assets/images/appointment.png";
import Button from "../../../Utility/Button";

const ContactUs = () => {
  return (
    <section
      style={{
        background: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="mt-[150px] relative"
    >
      <div className="text-center py-[65px]">
        <h3 className="text-xl font-bold text-primary">Contact Us</h3>
        <h2 className="text-4xl font-semibold text-white">
          Stay connected with us
        </h2>
        <form className="mt-[40px] flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered m-3 w-full max-w-xl"
          />
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered m-3 w-full max-w-xl"
          />
          <textarea
            rows="5"
            type="text"
            placeholder="Type here"
            className=" textarea input-bordered m-3 w-full max-w-xl"
          />
          <Button>Submit</Button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
