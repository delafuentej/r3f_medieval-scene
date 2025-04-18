import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Floor = () => {
  const props = useTexture({
    map: "textures/coast_sand_rocks_02_diff_1k.webp",
    normalMap: "textures/coast_sand_rocks_02_nor_gl_1k.webp",
    roughnessMap: "textures/coast_sand_rocks_02_arm_1k.webp",
    aoMap: "textures/coast_sand_rocks_02_arm_1k.webp",
    displacementMap: "textures/coast_sand_rocks_02_disp_1k.webp", // Descomentar para el mapa de desplazamiento
  });

  // Acceder a las texturas
  const { map, normalMap, roughnessMap, aoMap, displacementMap } = props;

  map.repeat.set(8, 8);
  normalMap.repeat.set(8, 8);
  roughnessMap.repeat.set(8, 8);
  displacementMap.repeat.set(8, 8);

  // Establecer el modo de envolvimiento (wrap) de las texturas
  map.wrapS =
    normalMap.wrapS =
    roughnessMap.wrapS =
    displacementMap.wrapS =
      THREE.RepeatWrapping;
  map.wrapT =
    normalMap.wrapT =
    roughnessMap.wrapT =
    displacementMap.wrapT =
      THREE.RepeatWrapping;
  // Establecer el espacio de color de la textura de color
  map.colorSpace = THREE.SRGBColorSpace;

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
        side={THREE.DoubleSide}
        displacementScale={0} // Ajustar según el mapa de desplazamiento
        roughness={0.8} // Ajustar rugosidad
        normalMap={props.normalMap}
        aoMap={props.aoMap}
        displacementMap={props.displacementMap}
        displacementBias={0}
        transparent
        receiveShadow
        castShadow
      />
    </mesh>
  );
};
export default Floor;
