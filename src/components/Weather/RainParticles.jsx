import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RainParticles = ({ cloudPositions = [], countPerCloud = 30 }) => {
  const pointsRef = useRef();

  const rainGeometry = useMemo(() => {
    const positions = [];
    for (let cloud of cloudPositions) {
      for (let i = 0; i < countPerCloud; i++) {
        positions.push(
          cloud.x + THREE.MathUtils.randFloatSpread(5) * 5,
          cloud.y - Math.random() * 5,
          cloud.z + THREE.MathUtils.randFloatSpread(5) * 5
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }, [cloudPositions, countPerCloud]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] -= 0.3;
      if (positions[i + 1] < 0) positions[i + 1] = Math.random() * 5 + 25;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={rainGeometry}>
      <pointsMaterial
        color="skyblue"
        size={0.1}
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
};

export default RainParticles;
