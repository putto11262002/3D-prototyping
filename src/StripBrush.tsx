import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Vector3 } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter";

const StripBrush = () => {
  const [length, setLength] = useState(30);
  const [height, setHeight] = useState(3);
  const [width, setWidth] = useState(3);
  const [materialHeight, setMaterialHeight] = useState(4);
  const [backingMaterial, setBackingMaterial] = useState(0);
  const modelRef = useRef<THREE.Group>(null!);

  const exporter = new OBJExporter();

  const woodColorMap = useLoader(TextureLoader, "/wood.jpg");
  const plasticColorMap = useLoader(TextureLoader, "/plastic.png");

  woodColorMap.wrapT = THREE.RepeatWrapping
  woodColorMap.wrapS = THREE.RepeatWrapping
  woodColorMap.repeat.set(1, 6)
  plasticColorMap.wrapS = THREE.RepeatWrapping
  plasticColorMap.repeat.setY(3)

  const backingMaterials = [woodColorMap, plasticColorMap];

  const renderThings = React.useCallback(() => {
    const filaments = [];
    for (let i = 0; i < length / 2 - 0.5; i += 0.3) {
      for (let j = 0; j < width / 2 - 0.5; j += 0.3) {
        filaments.push(new Vector3(-i, height / 2 + materialHeight / 2, -j));
        filaments.push(new Vector3(-i, height / 2 + materialHeight / 2, j));
        filaments.push(new Vector3(i, height / 2 + materialHeight / 2, -j));
        filaments.push(new Vector3(i, height / 2 + materialHeight / 2, j));
      }
    }
    return filaments.map((postion, idx) => (
      <mesh key={idx} position={postion}>
        <cylinderGeometry args={[0.03, 0.06, materialHeight, 50]} />
        <meshBasicMaterial />
      </mesh>
    ));
  }, [height, length, width, materialHeight]);

  return (
    <div className="px-2">
      <h1 className="text-lg  mt-3 mb-2 font-bold">
        Wooden/Plastic Strip Brush
      </h1>
      <div className="flex">
        <form className="basis-[25%] shrink  grid grid-cols-1 gap-2">
          <div className="col-span-1 flex gap-2 flex-col">
            <label htmlFor="">Height</label>
            <input
            max={10}
              className="input"
              type="number"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value))}
            />
          </div>

          <div className="col-span-1 flex gap-2  flex-col">
            <label htmlFor="">Width</label>
            <input
            max={15}
              className="input"
              type="number"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
            />
          </div>

          <div className="col-span-1 flex gap-2  flex-col">
            <label htmlFor="">Length</label>
            <input
            max={50}
              className="input"
              type="number"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </div>

          <div className=" grid-cols-1 flex gap-2  flex-col">
            <label htmlFor="">Material height</label>
            <input
            max={20}
              className="input"
              type="number"
              value={materialHeight}
              onChange={(e) => setMaterialHeight(parseInt(e.target.value))}
            />
          </div>

          <div className="grid-cols-1 flex gap-2  flex-col">
            <label htmlFor="">Backing Material</label>
            <div className="flex px-2 gap-2">
              <div
                onClick={() => setBackingMaterial(0)}
                className={`w-5 h-5 rounded-full overflow-hidden ${
                  backingMaterial === 0 ? "ring-2 ring-zinc-800" : ""
                }`}
              >
                <img
                  className="h-full w-full object-cover"
                  src="/wood.jpg"
                  alt="Wood"
                />
              </div>

              <div
                onClick={() => setBackingMaterial(1)}
                className={`w-5 h-5 rounded-full overflow-hidden ${
                  backingMaterial === 1 ? "ring-2 ring-zinc-800" : ""
                }`}
              >
                <img
                  className="h-full w-full object-cover"
                  src="/plastic.png"
                  alt="Wood"
                />
              </div>
            </div>


            <div className="mt-3">
              <button
              className="px-5 py-1 bg-zinc-800 text-teal-50 rounded-sm "
                onClick={(e) => {
                  e.preventDefault();
                  const result = exporter.parse(modelRef.current);
                  const url = URL.createObjectURL(new Blob([result]));
                  const link = document.createElement("a");
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.href = url;
                  link.download = "model.obj";
                  link.click();
                }}
              >
                Export
              </button>
            </div>

          
          </div>

       
        </form>

        <div className="basis-[60%] grow">
          <Canvas
            style={{ height: "23rem" }}
            camera={{ position: new Vector3(0, 0, 20), fov: 80 }}
          >
            <OrbitControls  />

            {/* <directionalLight
              position={[30, 20, 10]}
              color={0xfaf7ed}
              intensity={2}
            /> */}

            {/* <mesh rotation={[- Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 30]}/>
          <meshBasicMaterial color={0x00ff00}/>
        </mesh> */}

           <group ref={modelRef}>
           <mesh >
              <boxGeometry args={[length, height, width]} />
              <meshBasicMaterial map={backingMaterials[backingMaterial]} />
            </mesh>

            {renderThings()}
           </group>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default StripBrush;
