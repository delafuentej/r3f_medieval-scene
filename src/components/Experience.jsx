import { useGLTF, Text, Text3D, Billboard } from "@react-three/drei";
import { Character } from "./Character";
import Castle from "./Castle";
import Floor from "./Floor";
import King from "./King";

import * as THREE from "three";

export const Experience = () => {
  const woodenSign = useGLTF("models/Wooden Sign.glb");

  return (
    <>
      <group position={[0, 0, 0]} rotation-y={THREE.MathUtils.degToRad(15)}>
        <Floor />
        <Billboard position={[-20, 15, 0]}>
          <Text3D
            bevelEnabled
            bevelThickness={0.5}
            bevelSize={0.1}
            bevelSegments={10}
            font={"/fonts/MedievalSharp_Regular.json"}
            size={4}
          >
            Medieval Scene
            <meshStandardMaterial color={"#a1bb6f"} />
          </Text3D>
        </Billboard>
        <group position={[0, 0, 0]} rotation-y={-Math.PI / 2}>
          <group position={[4, 4.5, 0]} rotation-y={Math.PI * 0.5}>
            <group position-y={2}>
              <Text fontSize={0.2}>
                The King
                <meshStandardMaterial color={"black"} />
              </Text>
              <Text fontSize={0.2} position-y={0.5}>
                Tyrant
                <meshStandardMaterial color={"grey"} />
              </Text>
            </group>
            <King />
          </group>

          <Castle />
        </group>
      </group>
      <group>
        <group position={[-4, 0, 12]}>
          <primitive object={woodenSign.scene} />
          <Text
            fontSize={0.3}
            position={[0, 1.2, 0.01]}
            maxWidth={1}
            textAlign="center"
            font="fonts/MedievalSharp-Regular.ttf"
            characters="Hyrule Castle"
          >
            Hyrule Castle
            <meshStandardMaterial color={"#783a1a"} />
          </Text>
        </group>
      </group>

      <group position={[0, 0, 8]}>
        <group position-y={2}>
          <Text fontSize={0.2}>
            Sigismund
            <meshStandardMaterial color={"black"} />
          </Text>
          <Text fontSize={0.2} position-y={0.5}>
            King's Protector
            <meshStandardMaterial color={"grey"} />
          </Text>
        </group>
        <Character />
      </group>
    </>
  );
};
