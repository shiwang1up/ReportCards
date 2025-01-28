import React from "react";
import Lottie from "lottie-react";

const animationData = require("../assets/loader.json");

const LoadingAnimation = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="flex items-center flex-col justify-center ">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-full"
          options={{
            renderer: "svg",
            rendererSettings: {
            },
          }}
          error={(error) => console.error("Lottie animation error:", error)}
        />
        <span className="ml-2 text-white">Please wait...</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;
