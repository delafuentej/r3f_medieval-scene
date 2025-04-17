import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
//Castle by jeremy [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/0TfSw65gU2G)

const Castle = (props) => {
  const { nodes, materials } = useGLTF("models/Castle.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_Cube032_1.geometry}
        material={materials["78909C"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_Cube032_1_1.geometry}
        material={materials["455A64"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Castle_Cube032_1_2.geometry}
        material={materials["795548"]}
      />
    </group>
  );
};

export default Castle;

useGLTF.preload("/models/Castle.glb");
