import React from "react";
import { ColorRing } from "react-loader-spinner";

function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-gray-900 z-50">
      <div className="text-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        <p className="text-white text-lg font-semibold mt-4 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
