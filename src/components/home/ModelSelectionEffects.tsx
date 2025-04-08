'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified version without post-processing effects
export function PostProcessingEffects() {
  // Return an empty fragment as we're not using post-processing effects
  return null;
}

// Eco-friendly animated grid floor component
export function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.15) % 1;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Infinite grid floor with eco-friendly green color */}
      <gridHelper
        ref={gridRef}
        args={[100, 100, '#7cb342', '#f5f5f5']} // Green primary lines, light grey secondary lines
        position={[0, 0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[100, 100, '#7cb342', '#f5f5f5']}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <gridHelper
        args={[100, 100, '#7cb342', '#f5f5f5']}
        position={[0, 0, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      />

      {/* Reflective floor with eco-friendly light grey color */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#f5f5f5" // Light grey base color
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      {/* Subtle cardboard-like texture overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color="#d3c7b5"
          opacity={0.03}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Spotlight that follows the camera
export function FollowSpotlight() {
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (spotlightRef.current) {
      spotlightRef.current.position.copy(camera.position);
    }
  });

  return (
    <spotLight
      ref={spotlightRef}
      intensity={1}
      distance={15}
      angle={0.5}
      penumbra={0.5}
      decay={2}
      castShadow
    />
  );
}

// Type definitions for GlowEffect props
interface GlowEffectProps {
  position: [number, number, number];
  color: string | number;
  size?: number;
  intensity?: number;
}

// Animated glow effect for models
export function GlowEffect({ position, color, size = 3, intensity = 0.5 }: GlowEffectProps) {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const t = clock.getElapsedTime();
      glowRef.current.scale.set(
        size + Math.sin(t * 2) * 0.1,
        size + Math.sin(t * 2) * 0.1,
        size + Math.sin(t * 2) * 0.1
      );

      // Type assertion to access material property
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = (0.5 + Math.sin(t * 2) * 0.2) * intensity;
      }
    }
  });

  return (
    <mesh ref={glowRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
