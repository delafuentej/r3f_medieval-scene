import { Sky } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect, useMemo } from "react";
import * as THREE from "three";

const phases = [
  {
    name: "morning",
    inclination: 0.3,
    lightColor: "#fffacd",
    ambientIntensity: 0.4,
  },
  {
    name: "evening",
    inclination: 0.2,
    lightColor: "#ffffff",
    ambientIntensity: 0.7,
  },
  {
    name: "sunset",
    inclination: 0.5,
    lightColor: "#ffcc99",
    ambientIntensity: 0.5,
  },
  {
    name: "night",
    inclination: 0.8,
    lightColor: "#222244",
    ambientIntensity: 0.2,
  },
];

const weatherOptions = ["sunny", "cloudy", "rainy", "storm"];

const WeatherSystem = ({ timeRef, lightRef, onWeatherChange }) => {
  const [time, setTime] = useState(0); // Rango 0 - 1
  const [weather, setWeather] = useState("sunny");
  const dayDuration = 60; // duración de día en segundos

  useEffect(() => {
    const interval = setInterval(() => {
      const next =
        weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      setWeather(next);
      onWeatherChange?.(next);
    }, 25000);
    return () => clearInterval(interval);
  }, [onWeatherChange]);

  // Calcular interpolación de fase
  const currentPhase = useMemo(() => {
    const phaseIndex = Math.floor(time * phases.length);
    const nextIndex = (phaseIndex + 1) % phases.length;
    const t = (time * phases.length) % 1;

    const from = phases[phaseIndex];
    const to = phases[nextIndex];

    return {
      inclination: THREE.MathUtils.lerp(from.inclination, to.inclination, t),
      ambientIntensity: THREE.MathUtils.lerp(
        from.ambientIntensity,
        to.ambientIntensity,
        t
      ),
      lightColor: new THREE.Color(from.lightColor).lerp(
        new THREE.Color(to.lightColor),
        t
      ),
    };
  }, [time]);

  // Actualizar posición del sol
  const sunPosition = useMemo(() => {
    const angle = time * Math.PI * 2;
    const height = Math.sin(angle) * 50;
    return [Math.cos(angle) * 100, height, Math.sin(angle) * 100];
  }, [time]);

  // Aplicar color y luz según el clima
  useEffect(() => {
    const { ambientColor, lightColor, intensity } = {
      sunny: {
        ambientColor: "#ffffff",
        lightColor: "#ffeb3b",
        intensity: 1.0,
      },
      cloudy: {
        ambientColor: "#cfd8dc",
        lightColor: "#90a4ae",
        intensity: 0.8,
      },
      rainy: {
        ambientColor: "#90a4ae",
        lightColor: "#607d8b",
        intensity: 0.6,
      },
      storm: {
        ambientColor: "#37474f",
        lightColor: "#263238",
        intensity: 0.3,
      },
    }[weather];

    if (lightRef.current) {
      lightRef.current.color.set(ambientColor);
      lightRef.current.intensity = currentPhase.ambientIntensity;
    }
  }, [weather, currentPhase]);

  useFrame((_, delta) => {
    const newTime = (time + delta / dayDuration) % 1;
    setTime(newTime);
    if (timeRef) timeRef.current = newTime;
  });

  return (
    <Sky
      distance={450000}
      sunPosition={sunPosition}
      inclination={currentPhase.inclination}
      azimuth={0.25}
      mieCoefficient={0.005}
      turbidity={8}
      rayleigh={3}
    />
  );
};

export default WeatherSystem;
