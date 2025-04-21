import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ position: [0, 6, 18], fov: 42 }}>
        <group>
          <Experience />
        </group>
        <OrbitControls
          minDistance={4}
          maxDistance={72}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={0}
        />
        <Environment preset="sunset" />
      </Canvas>
    </>
  );
}

export default App;
