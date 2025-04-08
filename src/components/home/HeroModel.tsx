'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Environment, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styles from './HeroModel.module.css';

// Model component that loads and displays the 3D model
function Model({ autoRotate = true }) {
  // Load the 3D model
  const { scene } = useGLTF('/models/machine.glb');
  const modelRef = useRef<THREE.Group>(null);
  const rotationSpeed = 0.003;

  // Clone the scene to avoid modifying the cached original
  const clonedScene = useRef<THREE.Group>();

  useEffect(() => {
    if (!clonedScene.current) {
      clonedScene.current = scene.clone();

      // Preserve original materials but optimize and enable shadows
      clonedScene.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            // Clone the material to avoid modifying the cached original
            if (Array.isArray(child.material)) {
              // Handle multi-material meshes
              child.material = child.material.map(mat => mat.clone());
            } else {
              // Handle single material meshes
              child.material = child.material.clone();

              // Enhance material properties without changing colors
              if (child.material.type.includes('MeshStandardMaterial')) {
                // Adjust standard material properties
                const stdMaterial = child.material as THREE.MeshStandardMaterial;
                // Enhance metalness and roughness for better appearance
                stdMaterial.metalness = Math.min(stdMaterial.metalness + 0.1, 1.0);
                stdMaterial.roughness = Math.max(stdMaterial.roughness - 0.1, 0.0);
                // Slightly boost the color saturation
                if (stdMaterial.color) {
                  const color = stdMaterial.color;
                  const hsl = {h: 0, s: 0, l: 0};
                  color.getHSL(hsl);
                  color.setHSL(hsl.h, Math.min(hsl.s * 1.2, 1.0), hsl.l);
                }
              }

              // Enhance emissive properties for glowing parts
              if (child.material.type.includes('MeshStandardMaterial') ||
                  child.material.type.includes('MeshPhysicalMaterial')) {
                const matWithEmissive = child.material as THREE.MeshStandardMaterial;
                if (matWithEmissive.emissive && matWithEmissive.emissiveIntensity !== undefined) {
                  // Slightly increase emissive intensity for better glow
                  matWithEmissive.emissiveIntensity = Math.min(matWithEmissive.emissiveIntensity + 0.1, 1.0);
                }
              }
            }
          }

          // Enable shadows
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // Add animation
  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      // Smooth auto-rotation
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0.5, 0]} rotation={[0, -Math.PI / 3, 0]} scale={1.8}>
      {clonedScene.current && <primitive object={clonedScene.current} />}
    </group>
  );
}

// Loading component
function Loader() {
  return (
    <Html center>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading 3D Model...</p>
      </div>
    </Html>
  );
}

export function HeroModel() {
  return (
    <motion.div
      className={styles.modelContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Canvas
        shadows
        camera={{ position: [5, 3, 8], fov: 40 }}
        className={styles.canvas}
      >
        {/* Optimized lighting setup for original model colors */}
        <ambientLight intensity={0.5} />

        {/* Main key light - neutral white light */}
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={1.0}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color="#FFFFFF"
        />

        {/* Fill light from opposite side - slightly warm */}
        <spotLight
          position={[-8, 5, -8]}
          angle={0.4}
          penumbra={1}
          intensity={0.6}
          castShadow={false}
          color="#FFF8E1"
        />

        {/* Rim light to highlight edges - slightly cool */}
        <pointLight
          position={[0, 8, -10]}
          intensity={0.4}
          color="#F5F5F5"
        />

        {/* Bottom fill light for better visibility of base */}
        <pointLight
          position={[0, -3, 0]}
          intensity={0.2}
          color="#FFFFFF"
        />

        <React.Suspense fallback={<Loader />}>
          <Model />
          {/* Soft shadows for better grounding */}
          <ContactShadows
            opacity={0.4}
            scale={10}
            blur={2}
            far={10}
            resolution={512}
            color="#000000"
          />

          {/* Environment lighting for realistic reflections */}
          <Environment preset="studio" background={false} />

          {/* Subtle platform under the model */}
          <mesh position={[0, -1.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[3, 32]} />
            <meshStandardMaterial
              color="#F5F5F5"
              metalness={0.1}
              roughness={0.9}
              transparent
              opacity={0.8}
            />
          </mesh>

          <OrbitControls
            enableZoom={true}
            zoomSpeed={0.5}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={5}
            maxDistance={15}
          />
        </React.Suspense>
      </Canvas>
    </motion.div>
  );
}

// Preload model
useGLTF.preload('/models/machine.glb');
