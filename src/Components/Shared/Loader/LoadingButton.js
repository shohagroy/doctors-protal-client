import React from "react";

const LoadingButton = ({ loading, text, color, font, disable }) => {
  return (
    <div>
      <button
        disabled={disable}
        className={`${color} ${font} btn btn-sm ${loading && "loading"}`}
      >
        {loading ? "Loading.." : text}
      </button>
    </div>
  );
};

export default LoadingButton;
