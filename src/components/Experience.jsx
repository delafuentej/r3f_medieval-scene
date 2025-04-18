import { useGLTF, Text, Text3D, Billboard } from "@react-three/drei";
import { Character } from "./Character";
import Floor from "./Floor";
import King from "./King";
import Castle from "./Castle";
import Princess from "./Princess";
import Archer from "./Archer";
import Knight from "./Knight";

import * as THREE from "three";

export const Experience = () => {
  const woodenSign = useGLTF("models/Wooden Sign.glb");

  const archerPositions = [
    [8, 8.75, 8],
    [8, 8.75, -8],
    [-8, 8.75, -8],
    [-8, 8.75, 8],
  ];

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
          <group position={[8, 4.7, 0]} rotation-y={Math.PI * 0.5}>
            <group position-y={1.75}>
              <Text fontSize={0.2}>
                The King
                <meshStandardMaterial color={"black"} side={THREE.DoubleSide} />
              </Text>
              <Text fontSize={0.2} position-y={0.5}>
                Tyrant
                <meshStandardMaterial color={"grey"} side={THREE.DoubleSide} />
              </Text>
            </group>
            <King />
          </group>
          {/* archers */}
          {archerPositions.map((pos, i) => (
            <group
              key={`archer-${i}`}
              position={pos}
              rotation-y={
                i === 1
                  ? Math.PI * 0.25
                  : i === 2
                  ? Math.PI
                  : i === 3
                  ? Math.PI * 1.5
                  : ""
              }
            >
              <group position-y={1.75}>
                <Text fontSize={0.2}>
                  {`Archer-${i + 1}`}
                  <meshStandardMaterial
                    color={"black"}
                    side={THREE.DoubleSide}
                  />
                </Text>
                <Text fontSize={0.2} position-y={0.5}>
                  Archer
                  <meshStandardMaterial
                    color={"grey"}
                    side={THREE.DoubleSide}
                  />
                </Text>
              </group>
              <Archer />
            </group>
          ))}
          {/* knights */}

          <group position={[9, 0, -2]} rotation-y={Math.PI * 0.5}>
            <group position-y={1.75}>
              <Text fontSize={0.2}>
                Knight-1
                <meshStandardMaterial color={"black"} side={THREE.DoubleSide} />
              </Text>
              <Text fontSize={0.2} position-y={0.5}>
                Knight
                <meshStandardMaterial color={"grey"} side={THREE.DoubleSide} />
              </Text>
            </group>
            <Knight />
          </group>

          <group position={[8, 4.7, -1]} rotation-y={Math.PI * 0.5}>
            <group position-y={1.75}>
              <Text fontSize={0.2}>
                The Princess
                <meshStandardMaterial color={"black"} side={THREE.DoubleSide} />
              </Text>
              <Text fontSize={0.2} position-y={0.5}>
                Eleodora
                <meshStandardMaterial color={"grey"} side={THREE.DoubleSide} />
              </Text>
            </group>
            <Princess />
          </group>
          <Castle scale={50} rotation-y={Math.PI * 0.5} />
        </group>
      </group>
      <group>
        <group position={[-4, 0, 14]}>
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

      <group position={[0, 0, 13]} rotation-y={Math.PI}>
        <group position-y={1.5}>
          <Text fontSize={0.2}>
            Servant
            <meshStandardMaterial color={"black"} side={THREE.DoubleSide} />
          </Text>
          <Text fontSize={0.2} position-y={0.5}>
            Sigismund
            <meshStandardMaterial color={"grey"} side={THREE.DoubleSide} />
          </Text>
        </group>
        <Character />
      </group>
    </>
  );
};
