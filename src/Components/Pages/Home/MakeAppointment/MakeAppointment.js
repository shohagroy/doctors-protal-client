import React from "react";
import Button from "../../../Utility/Button";

import doctor from "../../../../assets/images/doctor-small.png";
import appointmentBg from "../../../../assets/images/appointment.png";

const MakeAppointment = () => {
  return (
    <section
      className="hero mt-[250px]"
      style={{
        background: `url(${appointmentBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="hero-content flex-col lg:justify-center text-white lg:items-center lg:flex-row">
          <img src={doctor} className=" -mt-[150px] -mb-[15px] w-1/2" />
          <div className=" ml-[100px]">
            <h4 className="text-xl font-bold text-primary">Appointment</h4>
            <h2 className="text-4xl py-3 font-semibold">
              Make an appointment Today
            </h2>
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

export default MakeAppointment;
