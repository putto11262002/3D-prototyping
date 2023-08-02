import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

export const Cube = ()  => {
  const meshRef = React.useRef<THREE.Mesh>(null!)

  useFrame((state, delta, xrFrame) => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.01;
    
  })
  return (
    <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color={0x44aa88} />
        </mesh>
  )
}

function RotatingCube() {
  const scene = new THREE.Scene();

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;


 

  return (
    <div>
      <Canvas  scene={scene}  camera={camera} >
        <directionalLight  position={[-1, 2, 4]} color={0xFFFFFF} intensity={3} />

        <Cube/>
        
      </Canvas>
    </div>
  );
}

export default RotatingCube;
