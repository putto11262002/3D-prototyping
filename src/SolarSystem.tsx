import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { Vector3 } from "three";
import * as THREE from "three";
import { Cube } from "./RotatingCube";
import { OrbitControls } from "@react-three/drei";
const radius = 1;
const widthSegment = 6;
const heightSegment = 6;

const CanvasWrapper = () => {


  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);
  return (
    <Canvas
    gl={{antialias: true, alpha: false}}
      style={{ width: "100vw", height: "100vh" }}
      camera={camera}
      scene={{background:  new THREE.Color( 0x38d154 ), backgroundIntensity: 3}}
    >
      <SolarSystem />
    </Canvas>
  );
};

const SolarSystem = () => {
  const sunRef = React.useRef<THREE.Mesh>(null!);
  const earthRef = React.useRef<THREE.Mesh>(null!);
  const solarSystemRef = React.useRef<THREE.Object3D>(null!);
  const earthOrbitRef = React.useRef<THREE.Object3D>(null!);
  const moonOrbitRef = React.useRef<THREE.Object3D>(null!);
  const moonRef = React.useRef<THREE.Mesh>(null!)


  useFrame((state, delta, frame) => {
    console.log(state);
    sunRef.current.rotation.y += 0.01;
    earthRef.current.rotation.y += 0.01;
    solarSystemRef.current.rotation.y += 0.01;
    earthOrbitRef.current.rotation.y += 0.01;
    moonOrbitRef.current.rotation.y += 0.01;
    moonRef.current.rotation.y += 0.01
  });

  return (
    <>
      {/* <directionalLight  position={[-1, 2, 4]} color={0xFFFFFF} intensity={3} /> */}

      <object3D ref={solarSystemRef}>
        <OrbitControls/>
        <mesh ref={sunRef} scale={[5, 5, 5]}>
          <sphereGeometry args={[radius, widthSegment, heightSegment]} />
          <meshPhongMaterial emissive={0xffff00} />
          
          
        </mesh>
        <object3D ref={earthOrbitRef} position={[10, 0, 0]}>
          <mesh ref={earthRef}>
            <meshPhongMaterial emissive={0x112244} color={0x2233ff} />
            <sphereGeometry args={[radius, widthSegment, heightSegment]} />
          </mesh>
          <object3D position={[2, 0, 0]} ref={moonOrbitRef}>
            <mesh ref={moonRef} scale={[0.5, 0.5, 0.5]}>
                <sphereGeometry args={[radius, widthSegment, heightSegment]}/>
                <meshPhongMaterial emissive={0x222222} color={0x888888}/>
            </mesh>

          </object3D>
        </object3D>
      </object3D>

      <pointLight color={0xffff00} intensity={3} position={[0, 0, 0]} />
    </>
  );
};

export default CanvasWrapper;
