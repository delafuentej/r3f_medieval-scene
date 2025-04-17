import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import LoadingScreen from "./components/LoadingScreen";
function App() {
  return (
    <>
      <LoadingScreen />
      <Canvas camera={{ position: [0, 6, 18], fov: 62 }}>
        <group>
          <Experience />
        </group>
        <OrbitControls />
        <Environment preset="sunset" />
        <Sky />
      </Canvas>
    </>
  );
}

export default App;
