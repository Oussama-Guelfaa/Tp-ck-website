'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DummyModelProps {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number | [number, number, number];
  [key: string]: unknown;
}

// This component creates a simple 3D model to use as a placeholder
// until the real GLB model is available
export function DummyModel({ position, rotation, scale, ...props }: DummyModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animate the model
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale} {...props}>
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* Base */}
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color="#444" />

        {/* Main body */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[1.5, 1, 0.8]} />
          <meshStandardMaterial color="#666" />
        </mesh>

        {/* Top part */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[1.2, 0.6, 0.7]} />
          <meshStandardMaterial color="#555" />
        </mesh>

        {/* Control panel */}
        <mesh position={[0, 1.3, 0.4]} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.8, 0.4, 0.05]} />
          <meshStandardMaterial color="#333" />

          {/* Screen */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.6, 0.3]} />
            <meshStandardMaterial color="#007bff" emissive="#007bff" emissiveIntensity={0.5} />
          </mesh>
        </mesh>

        {/* Conveyor belt */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.2, 0.1, 0.8]} />
          <meshStandardMaterial color="#222" />

          {/* Rollers */}
          {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.9, 16]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          ))}
        </mesh>

        {/* Logo */}
        <mesh position={[0, 0.6, 0.41]}>
          <planeGeometry args={[0.6, 0.2]} />
          <meshStandardMaterial color="#e60000" emissive="#e60000" emissiveIntensity={0.3} />
        </mesh>
      </mesh>
    </group>
  );
}
