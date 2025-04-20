import { useEffect, useRef } from "react";
import { AudioListener, AudioLoader, Audio as ThreeAudio } from "three";
import { useThree } from "@react-three/fiber";

import thunderSound from "/sounds/thunder.mp3";

const Lightning = ({ weather }) => {
  const lightRef = useRef();
  const thunderRef = useRef();
  const { camera } = useThree();
  const listenerRef = useRef(new AudioListener());

  useEffect(() => {
    camera.add(listenerRef.current);
    return () => {
      camera.remove(listenerRef.current);
    };
  }, [camera]);

  // Cargar sonido una vez
  useEffect(() => {
    const sound = new ThreeAudio(listenerRef.current);
    const loader = new AudioLoader();

    loader.load(thunderSound, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(false); // NO repetir
      sound.setVolume(0.7);
      thunderRef.current = sound;
    });
  }, []);

  useEffect(() => {
    let interval;
    if (weather === "storm") {
      interval = setInterval(() => {
        if (lightRef.current) {
          const isFlash = Math.random() > 0.95;
          lightRef.current.intensity = isFlash ? 10 : 0;

          // Si hay un flash, sonar el trueno
          if (isFlash && thunderRef.current && !thunderRef.current.isPlaying) {
            thunderRef.current.play();
          }
        }
      }, 100);
    } else {
      if (lightRef.current) {
        lightRef.current.intensity = 0;
      }
    }

    return () => clearInterval(interval);
  }, [weather]);

  return (
    <pointLight
      ref={lightRef}
      position={[0, 50, 0]}
      intensity={0}
      distance={200}
      decay={2}
      color="white"
    />
  );
};

export default Lightning;
