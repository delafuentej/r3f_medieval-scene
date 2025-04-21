import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Cloud } from "@react-three/drei/core/Cloud";
import { useRef, useEffect } from "react";

// Config fuera del componente
const WEATHER_SETTINGS = {
  sunny: { opacity: 0, volume: 0, color: "white" },
  cloudy: { opacity: 0.6, volume: 8, color: "#cfd8dc" },
  rainy: { opacity: 0.8, volume: 10, color: "#b0bec5" },
  storm: { opacity: 1, volume: 12, color: "#78909c" },
};

const PHASE = {
  ENTER: "enter",
  ACTIVE: "active",
  EXIT: "exit",
  INACTIVE: "inactive",
};

const Clouds = ({ weather = "sunny", onCloudsReady }) => {
  const cloudCount = 40;
  const groupRef = useRef();
  const cloudsRef = useRef([]);

  const settings = WEATHER_SETTINGS[weather];

  // Inicialización única
  useEffect(() => {
    if (cloudsRef.current.length === 0) {
      cloudsRef.current = Array.from({ length: cloudCount }, (_, i) => {
        const targetPosition = new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(20),
          28 + Math.random() * 5,
          THREE.MathUtils.randFloatSpread(20)
        );
        const initialPosition = targetPosition
          .clone()
          .add(
            new THREE.Vector3(
              (Math.random() > 0.5 ? 1 : -1) * 30,
              0,
              (Math.random() > 0.5 ? 1 : -1) * 30
            )
          );
        return {
          id: i,
          seed: i + 1,
          position: initialPosition.clone(),
          targetPosition,
          exitPosition: initialPosition.clone(),
          speed: 0.01 + Math.random() * 0.02,
          direction: new THREE.Vector3(
            Math.random() * 0.5,
            0,
            Math.random() * 0.5
          ).normalize(),
          phase: PHASE.INACTIVE,
          opacity: 0,
        };
      });
    }
  }, []);

  // Cambio de clima sin reinicio de nubes
  useEffect(() => {
    const visibleCount = settings.volume;
    const visibleClouds = cloudsRef.current.slice(0, visibleCount);
    const hiddenClouds = cloudsRef.current.slice(visibleCount);

    visibleClouds.forEach((cloud) => {
      if (cloud.phase === PHASE.INACTIVE || cloud.phase === PHASE.EXIT) {
        cloud.phase = PHASE.ENTER;
      }
    });

    hiddenClouds.forEach((cloud) => {
      if (cloud.phase === PHASE.ACTIVE || cloud.phase === PHASE.ENTER) {
        cloud.phase = PHASE.EXIT;
      }
    });

    if (onCloudsReady) {
      onCloudsReady(visibleClouds.map((c) => c.position.clone()));
    }
  }, [weather, onCloudsReady]);

  // Animación por frame
  useFrame(() => {
    cloudsRef.current.forEach((cloud) => {
      if (!groupRef.current) return;

      const obj = groupRef.current.children[cloud.id];
      if (!obj) return;

      switch (cloud.phase) {
        case PHASE.ENTER:
          cloud.position.lerp(cloud.targetPosition, 0.02);
          cloud.opacity = Math.min(cloud.opacity + 0.02, settings.opacity);
          if (cloud.position.distanceTo(cloud.targetPosition) < 0.1) {
            cloud.phase = PHASE.ACTIVE;
            cloud.position.copy(cloud.targetPosition);
          }
          break;

        case PHASE.ACTIVE:
          cloud.position.x += cloud.direction.x * cloud.speed;
          cloud.position.z += cloud.direction.z * cloud.speed;
          if (cloud.position.x > 10) cloud.position.x = -10;
          if (cloud.position.x < -10) cloud.position.x = 10;
          if (cloud.position.z > 10) cloud.position.z = -10;
          if (cloud.position.z < -10) cloud.position.z = 10;
          break;

        case PHASE.EXIT:
          cloud.position.lerp(cloud.exitPosition, 0.02);
          cloud.opacity = Math.max(cloud.opacity - 0.02, 0);
          if (cloud.position.distanceTo(cloud.exitPosition) < 1) {
            cloud.phase = PHASE.INACTIVE;
          }
          break;

        case PHASE.INACTIVE:
        default:
          cloud.opacity = 0;
          break;
      }

      obj.visible = cloud.opacity > 0.01;
      obj.position.copy(cloud.position);
    });
  });

  return (
    <group ref={groupRef}>
      {cloudsRef.current.map((cloud) => (
        <group key={cloud.id} position={cloud.position}>
          <Cloud
            seed={cloud.seed}
            scale={1.5}
            segments={40}
            volume={settings.volume}
            color={settings.color}
            fade={80}
            opacity={cloud.opacity}
          />
        </group>
      ))}
    </group>
  );
};

export default Clouds;

// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { Cloud } from "@react-three/drei/core/Cloud";
// import { useRef, useMemo, useEffect, useState } from "react";

// // Climas posibles: "sunny", "cloudy", "rainy", "storm"
// const Clouds = ({ weather = "sunny", onCloudsReady }) => {
//   const settings = {
//     sunny: { opacity: 0, volume: 0, color: "white" },
//     cloudy: { opacity: 0.6, volume: 8, color: "#cfd8dc" },
//     rainy: { opacity: 0.8, volume: 10, color: "#b0bec5" },
//     storm: { opacity: 1, volume: 12, color: "#78909c" },
//   };

//   const cloudCount = 40;
//   const groupRef = useRef();

//   const [activeClouds, setActiveClouds] = useState(0);
//   const targetClouds = settings[weather].volume;

//   const PHASE = {
//     ENTER: "enter",
//     ACTIVE: "active",
//     EXIT: "exit",
//     INACTIVE: "inactive",
//   };

//   const clouds = useMemo(() => {
//     return Array.from({ length: cloudCount }, (_, i) => {
//       const targetPosition = new THREE.Vector3(
//         THREE.MathUtils.randFloatSpread(20),
//         28 + Math.random() * 5,
//         THREE.MathUtils.randFloatSpread(20)
//       );

//       const initialPosition = targetPosition
//         .clone()
//         .add(
//           new THREE.Vector3(
//             (Math.random() > 0.5 ? 1 : -1) * 30,
//             0,
//             (Math.random() > 0.5 ? 1 : -1) * 30
//           )
//         );

//       return {
//         id: i,
//         seed: i + 1,
//         position: initialPosition.clone(),
//         targetPosition,
//         exitPosition: initialPosition.clone(),
//         speed: 0.01 + Math.random() * 0.02,
//         direction: new THREE.Vector3(
//           Math.random() * 0.5,
//           0,
//           Math.random() * 0.5
//         ).normalize(),
//         phase: PHASE.ENTER, // "enter" | "active" | "exit"
//       };
//     });
//   }, []);

//   // Efecto para transicionar la cantidad de nubes según el clima
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveClouds((prev) => {
//         if (prev === targetClouds) {
//           clearInterval(interval);
//           if (targetClouds > 0) {
//             onCloudsReady?.(
//               clouds.slice(0, targetClouds).map((c) => c.position.clone())
//             );
//           }
//           return prev;
//         }

//         // Fase de salida
//         if (prev > targetClouds) {
//           for (let i = targetClouds; i < prev; i++) {
//             clouds[i].phase = PHASE.EXIT;
//           }
//         } else {
//           // Fase de entrada
//           clouds[prev].phase = PHASE.ENTER;
//         }
//         return prev < targetClouds ? prev + 1 : prev - 1;
//       });
//     }, 800);

//     return () => clearInterval(interval);
//   }, [targetClouds, clouds, onCloudsReady]);

//   useFrame(() => {
//     groupRef.current?.children.forEach((child, i) => {
//       const cloud = clouds[i];
//       if (!cloud) return;

//       if (cloud.phase === PHASE.ENTER) {
//         cloud.position.lerp(cloud.targetPosition, 0.005);
//         cloud.opacity = THREE.MathUtils.clamp(
//           cloud.opacity + 0.005,
//           0,
//           settings[weather].opacity
//         );
//         child.position.copy(cloud.position);

//         if (cloud.position.distanceTo(cloud.targetPosition) < 0.1) {
//           cloud.phase = PHASE.ACTIVE;
//           cloud.position.copy(cloud.targetPosition);
//         }
//       } else if (cloud.phase === PHASE.ACTIVE) {
//         cloud.position.x += cloud.direction.x * cloud.speed;
//         cloud.position.z += cloud.direction.z * cloud.speed;

//         if (cloud.position.x > 10) cloud.position.x = -10;
//         if (cloud.position.x < -10) cloud.position.x = 10;
//         if (cloud.position.z > 10) cloud.position.z = -10;
//         if (cloud.position.z < -10) cloud.position.z = 10;

//         child.position.copy(cloud.position);
//       } else if (cloud.phase === PHASE.EXIT) {
//         cloud.position.lerp(cloud.exitPosition, 0.005);
//         cloud.opacity = THREE.MathUtils.clamp(
//           cloud.opacity - 0.01,
//           0,
//           settings[weather].opacity
//         );
//         if (child.position.distanceTo(cloud.exitPosition) < 1) {
//           cloud.status = PHASE.INACTIVE; // La nube se vuelve inactiva después de salir
//         }
//         child.position.copy(cloud.position);
//       }
//     });
//   });

//   const { opacity, volume, color } = settings[weather];

//   return (
//     <group ref={groupRef}>
//       {clouds.slice(0, activeClouds).map((cloud) => (
//         <group key={cloud.id} position={cloud.position} visible={opacity > 0}>
//           <Cloud
//             seed={cloud.seed}
//             scale={1.5}
//             segments={40}
//             // bounds={[6, 2, 2]}
//             volume={volume}
//             color={color}
//             fade={80}
//             opacity={opacity}
//           />
//         </group>
//       ))}
//     </group>
//   );
// };

// export default Clouds;
