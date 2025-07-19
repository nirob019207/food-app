"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/components/lottieAnimations/loading-animation.json";

export default function PageLoading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        if (prev === "Loading..") return "Loading...";
        if (prev === "Loading.") return "Loading..";
        return "Loading.";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <p className="text-xl font-medium mt-4 text-primary min-w-[100px] text-center">
        {loadingText}
      </p>
    </div>
  );
}
