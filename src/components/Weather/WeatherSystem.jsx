import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

const phases = [
  {
    name: "morning",
    skyInclination: 0.3,
    lightColor: "#fffacd",
    ambientIntensity: 0.4,
  },
  {
    name: "day",
    skyInclination: 0.2,
    lightColor: "#ffffff",
    ambientIntensity: 0.7,
  },
  {
    name: "sunset",
    skyInclination: 0.5,
    lightColor: "#ffcc99",
    ambientIntensity: 0.5,
  },
  {
    name: "night",
    skyInclination: 0.8,
    lightColor: "#222244",
    ambientIntensity: 0.2,
  },
];

const weatherOptions = ["sunny", "cloudy", "rainy", "storm"];

const WeatherSystem = ({ timeRef, lightRef, onWeatherChange }) => {
  const skyRef = useRef();
  const [time, setTime] = useState(0); // Rango: 0-1
  const [weather, setWeather] = useState("sunny");
  const dayDuration = 60; // 60 segundos = día completo

  // Cambia el clima aleatoriamente cada 20-30 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const next =
        weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setWeather(next);
      onWeatherChange?.(next); // notifica al padre
    }, 25000);
    return () => clearInterval(interval);
  }, [onWeatherChange]);

  useFrame((_, delta) => {
    const newTime = (time + delta / dayDuration) % 1;
    setTime(newTime);

    const phaseIndex = Math.floor(newTime * phases.length);
    const nextPhaseIndex = (phaseIndex + 1) % phases.length;
    const t = (newTime * phases.length) % 1;

    const current = phases[phaseIndex];
    const next = phases[nextPhaseIndex];

    const inclination = THREE.MathUtils.lerp(
      current.skyInclination,
      next.skyInclination,
      t
    );
    const ambient = THREE.MathUtils.lerp(
      current.ambientIntensity,
      next.ambientIntensity,
      t
    );

    if (skyRef.current) skyRef.current.inclination = inclination;
    if (lightRef.current) {
      lightRef.current.intensity = ambient;
      lightRef.current.color.set(current.lightColor);
    }

    if (timeRef) timeRef.current = newTime;
  });

  return (
    <>
      <Sky
        ref={skyRef}
        distance={450000}
        sunPosition={[100, 20, 100]}
        azimuth={0.25}
      />
    </>
  );
};

export default WeatherSystem;
