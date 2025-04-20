import { useEffect, useState } from "react";
import RainParticles from "./RainParticles";

const RainController = ({ weather, cloudPositions }) => {
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    if (
      (weather === "rainy" || weather === "storm") &&
      cloudPositions.length > 0
    ) {
      setShowRain(true);
    } else {
      setShowRain(false);
    }
  }, [weather, cloudPositions]);

  return <>{showRain && <RainParticles cloudPositions={cloudPositions} />}</>;
};

export default RainController;
