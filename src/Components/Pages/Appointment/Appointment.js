import React, { useState } from "react";
import AppointmentHero from "./AppointmentHero";
import AvailableAppointments from "./AvailableAppointments";

const Appointment = () => {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <AppointmentHero selected={selected} setSelected={setSelected} />
      <AvailableAppointments selected={selected} />
    </div>
  );
};

export default Appointment;
