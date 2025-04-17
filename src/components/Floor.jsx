import { useTexture } from "@react-three/drei";
import { DoubleSide } from "three";

const Floor = () => {
  const props = useTexture({
    map: "textures/coast_sand_rocks_02_diff_1k.webp",
    normalMap: "textures/coast_sand_rocks_02_nor_gl_1k.webp",
    roughnessMap: "textures/coast_sand_rocks_02_arm_1k.webp",
    aoMap: "textures/coast_sand_rocks_02_arm_1k.webp",
    displacementMap: "textures/coast_sand_rocks_02_disp_1k.webp", // Descomentar para el mapa de desplazamiento
  });

  return (
    <mesh
      position={[0, 0, 0]}
      scale={4}
      rotation={[Math.PI * 0.5, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        {...props}
        side={DoubleSide}
        displacementScale={0} // Ajustar según el mapa de desplazamiento
        roughness={0.8} // Ajustar rugosidad
        normalMap={props.normalMap}
        aoMap={props.aoMap}
        displacementMap={props.displacementMap}
      />
    </mesh>
  );
};
export default Floor;
