import React from "react";
import loader from "../../../assets/icons/loading_xxi.gif";

const LoadingLoader = () => {
  return (
    <div className="relative">
      <div
        className={`w-full h-full  bg-white/70 top-0 z-50 flex justify-center items-center"
        }`}
      >
        <img className="w-full" src={loader} alt="loading" />
      </div>
    </div>
  );
};

export default LoadingLoader;
