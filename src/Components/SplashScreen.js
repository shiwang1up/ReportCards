import React from "react";
import Lottie from "lottie-react";
import splashScreenAnimation from "../assets/ani.json";

const SplashScreen = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#ebf5fb]">
      <div className="aspect-square bg-white rounded-full flex justify-center items-center border-2 border-[#d5d8dc] md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="p-8 md:p-10 lg:p-15 xl:p-15">
          <Lottie
            animationData={splashScreenAnimation}
            loop={true}
            className="w-full h-full"
            options={{
              renderer: "svg",
              rendererSettings: {
                // preserveAspectRatio: "xMinYMin meet",
              },
            }}
            error={(error) => console.error("Lottie animation error:", error)}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
