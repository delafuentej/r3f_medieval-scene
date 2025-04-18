import { useGLTF } from "@react-three/drei";

const Archer = (props) => {
  const { nodes, materials } = useGLTF("/models/maki_archer.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.8}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Maki_Face_Head_0.geometry}
            material={materials.Head}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Maki_Body_Body_0.geometry}
            material={materials.Body}
            rotation={[-Math.PI / 2, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Eyes_Eyes_0.geometry}
            material={materials.Eyes}
            position={[-3.086, 148.574, 7.312]}
            rotation={[-2.856, -1.569, -1.285]}
            scale={1.366}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Jacket_Jecket_0.geometry}
            material={materials.Jecket}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Boots_Boots_0.geometry}
            material={materials.Boots}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Pants_Pants_0.geometry}
            material={materials.Pants}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Gloves_Gloves_0.geometry}
            material={materials.Gloves}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Hood__Hood_0.geometry}
            material={materials.Hood}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wrestle_Belt_Wrestle_0.geometry}
            material={materials.Wrestle}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Quiver_Quiver_0.geometry}
            material={materials.Quiver}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Wrestle_Leather_Wrestle_0.geometry}
            material={materials.Wrestle}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plate_Wrestle_0.geometry}
            material={materials.Wrestle}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Arrow_Stack_Bow_Arrow_0.geometry}
            material={materials.Bow_Arrow}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Flaming_Arrow_Bow_Arrow_0.geometry}
            material={materials.Bow_Arrow}
            position={[10.931, 86.708, 35.891]}
            rotation={[-2.647, -0.148, -0.066]}
            scale={110.748}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Spirit_Bow_Bow_Arrow_0.geometry}
            material={materials.Bow_Arrow}
            position={[17.988, 87.12, 34.214]}
            rotation={[-2.661, 0.56, -0.421]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
};

export default Archer;

useGLTF.preload("/models/maki_archer.glb");
