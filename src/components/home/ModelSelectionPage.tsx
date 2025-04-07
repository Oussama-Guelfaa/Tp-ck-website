'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Environment, ContactShadows, Html, PerspectiveCamera, Loader } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as THREE from 'three';
import styles from './ModelSelection.module.css';
import { GridFloor, GlowEffect } from './ModelSelectionEffects';

// No custom type definitions needed - using built-in Three.js types

interface ModelProps {
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  onClick: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
  hovered: boolean;
  modelId: string;
}

// Model component that loads and displays a 3D model
function Model({ path, position, rotation, scale, onClick, hovered, modelId, ...props }: ModelProps) {
  // Load the 3D model
  const { scene } = useGLTF(path);
  const groupRef = useRef<THREE.Group>(null);

  // Apply materials and effects based on model type
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        // Type guard to check if the object is a mesh with material
        if (child instanceof THREE.Mesh) {
          // Create a clone of the material to avoid sharing between instances
          if (child.material) {
            // Clone the material
            child.material = child.material.clone();

            // Check if it's a standard material with roughness/metalness properties
            const stdMaterial = child.material as THREE.MeshStandardMaterial;
            if (stdMaterial.roughness !== undefined) {
              stdMaterial.roughness = 0.4;
              stdMaterial.metalness = 0.8;
            }

            // Apply different color tints based on model type
            if (modelId === 't20') {
              stdMaterial.color.setHex(0xFFFFFF); // White with slight red tint
              stdMaterial.emissive = new THREE.Color(0x330000);
              stdMaterial.emissiveIntensity = 0.2;
            } else if (modelId === 't30') {
              stdMaterial.color.setHex(0xFFFFFF); // White with slight blue tint
              stdMaterial.emissive = new THREE.Color(0x000033);
              stdMaterial.emissiveIntensity = 0.2;
            } else if (modelId === 't50') {
              stdMaterial.color.setHex(0xFFFFFF); // White with slight green tint
              stdMaterial.emissive = new THREE.Color(0x003300);
              stdMaterial.emissiveIntensity = 0.2;
            }
          }
        }
      });
    }
  }, [scene, modelId]);

  // Add subtle animation
  useFrame((state) => {
    if (groupRef.current) {
      // Add subtle floating motion
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;

      // Add subtle rotation when hovered
      if (hovered) {
        groupRef.current.rotation.y += 0.01;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      {...props}
    >
      <primitive object={scene} />

      {/* Add a highlight effect when hovered */}
      {hovered && (
        <mesh position={[0, -0.5, 0]}>
          <ringGeometry args={[1.8, 2, 32]} />
          <meshBasicMaterial
            color={modelId === 't20' ? '#ff3333' : modelId === 't30' ? '#3333ff' : '#33ff33'}
            transparent
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
}



// Model interface
interface ModelData {
  id: string;
  name: string;
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  description: string;
  features: string[];
}

// Main component for the model selection page
export default function ModelSelectionPage() {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);
  const router = useRouter();

  // We no longer need to check if user has already visited this page
  // or redirect automatically
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      // Set the flag in localStorage for future reference
      localStorage.setItem('hasVisitedModelSelection', 'true');
      console.log('Visited model selection page, setting flag');
    }
  }, []);

  // Function to reset the visited flag (for testing)
  const resetVisitedFlag = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hasVisitedModelSelection');
      alert('Visit flag reset. Refresh the page to see the model selection again.');
    }
  };

  // Handle model click
  const handleModelClick = (_model: string) => {
    // Navigate to the home page instead of the product page
    // We're not using the model parameter anymore since we always go to home
    router.push('/');
  };

  // Model data
  const models: ModelData[] = [
    {
      id: 't20',
      name: 'T20',
      path: '/models/machine.glb',
      position: [-6, 0, 0],
      rotation: [0, -Math.PI / 4, 0], // Same rotation as T50 which is visible
      scale: 1.1, // Same scale as T50 which is visible
      color: '#ff3333',
      description: 'Compact packaging solution for small to medium operations',
      features: ['Space-efficient design', 'Ideal for small facilities', 'Easy maintenance']
    },
    {
      id: 't30',
      name: 'T30',
      path: '/models/machine.glb',
      position: [0, 0, 0],
      rotation: [0, -Math.PI / 4, 0], // Same rotation as T50 which is visible
      scale: 1.1, // Same scale as T50 which is visible
      color: '#3333ff',
      description: 'Advanced packaging system with enhanced throughput',
      features: ['Medium capacity', 'Versatile configuration', 'Advanced analytics']
    },
    {
      id: 't50',
      name: 'T50',
      path: '/models/machine.glb',
      position: [6, 0, 0],
      rotation: [0, -Math.PI / 4, 0],
      scale: 1.1,
      color: '#33ff33',
      description: 'High-performance packaging solution for industrial applications',
      features: ['Maximum throughput', 'Enterprise integration', 'AI-powered optimization']
    }
  ];

  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 2, 12]);

  // Handle model selection for detailed view
  const handleModelSelect = (model: ModelData) => {
    setSelectedModel(model);
    // Move camera closer to the selected model
    setCameraPosition([model.position[0] * 0.7, 2, 8]);
  };

  // Handle back button from detailed view
  const handleBack = () => {
    setSelectedModel(null);
    setCameraPosition([0, 2, 12]);
  };

  return (
    <div className={styles.container}>
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/10 -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/10 translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 font-heading flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`${styles.logoIcon} mr-2`}
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#ff3333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            TP@CK
          </motion.span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex space-x-3">
          <Link href="/" className="text-sm text-gray-600 hover:text-primary transition-colors bg-white shadow-md backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 inline-flex items-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Home</span>
          </Link>
          <Link href="/products" className="text-sm text-gray-600 hover:text-primary transition-colors bg-white shadow-md backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 inline-flex items-center">
            <span>Skip to Products</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        </motion.div>
      </header>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center">
        <AnimatePresence>
          {!selectedModel && (
            <motion.div
              className="text-center mb-8 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className={`${styles.pageTitle} text-4xl md:text-5xl font-bold text-center mb-4 font-heading`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Choose Your Machine
              </motion.h1>

              <motion.p
                className={`${styles.pageSubtitle} text-lg text-center max-w-2xl`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our range of innovative packaging solutions
              </motion.p>

              <motion.div
                className="mt-4 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                    <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span>Click on a model to explore details</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected model details */}
        <AnimatePresence>
          {selectedModel && (
            <motion.div
              className={`${styles.detailsPanel} absolute top-24 left-8 z-20`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{selectedModel.name}</h2>
                <button
                  onClick={handleBack}
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              <p className="text-gray-600 mb-6">{selectedModel.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {selectedModel.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className={styles.featureItem}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                    >
                      <div className={`${styles.featureDot} ${styles[selectedModel.id]}`}></div>
                      <span className="text-gray-600">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <motion.button
                  className={styles.actionButton}
                  onClick={() => handleModelClick(selectedModel.id)}
                  whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(255, 51, 51, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View {selectedModel.name} Details</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>

                <motion.button
                  className="w-full bg-white text-gray-700 py-2 rounded-lg font-medium transition-colors border border-gray-200 flex items-center justify-center"
                  onClick={() => router.push('/')}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Return to Home</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Canvas */}
        <div className={styles.canvasContainer}>
          <Canvas shadows>
            <PerspectiveCamera position={cameraPosition} fov={60} makeDefault />
            <color attach="background" args={['#ffffff']} />

            <fog attach="fog" args={['#f5f5f5', 8, 30]} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.2} />

            {/* Background elements */}
            <GridFloor />

            {/* Direction indicators */}
            <group>
              {/* Left indicator for T20 */}
              <mesh position={[-6, -1.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.1, 3]} />
                <meshBasicMaterial color="#ff3333" transparent opacity={0.2} />
              </mesh>
              <Html position={[-6, 0, 0]} center>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  T20
                </div>
              </Html>

              {/* Center indicator for T30 */}
              <mesh position={[0, -1.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.1, 3]} />
                <meshBasicMaterial color="#3333ff" transparent opacity={0.2} />
              </mesh>
              <Html position={[0, 0, 0]} center>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  T30
                </div>
              </Html>

              {/* Right indicator for T50 */}
              <mesh position={[6, -1.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[3, 0.1, 3]} />
                <meshBasicMaterial color="#33ff33" transparent opacity={0.2} />
              </mesh>
              <Html position={[6, 0, 0]} center>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  T50
                </div>
              </Html>
            </group>

            {/* Models */}
            <Suspense fallback={<Html center><div className={styles.loadingSpinner}></div></Html>}>
              {models.map((model) => (
                <Float
                  key={model.id}
                  speed={1.5}
                  rotationIntensity={0.2}
                  floatIntensity={0.3}
                  enabled={hoveredModel !== model.id}
                >
                  <Model
                    path={model.path}
                    position={model.position}
                    rotation={model.rotation}
                    scale={hoveredModel === model.id || selectedModel?.id === model.id ? model.scale * 1.2 : model.scale}
                    onClick={() => selectedModel ? handleModelClick(model.id) : handleModelSelect(model)}
                    onPointerOver={() => setHoveredModel(model.id)}
                    onPointerOut={() => setHoveredModel(null)}
                    hovered={hoveredModel === model.id}
                    modelId={model.id}
                  />

                  {/* Enhanced glow effect behind model */}
                  <GlowEffect
                    position={[model.position[0], model.position[1], model.position[2] - 0.5] as [number, number, number]}
                    color={model.id === 't20' ? '#ff3333' : model.id === 't30' ? '#3333ff' : '#33ff33'}
                    size={3}
                    intensity={hoveredModel === model.id ? 0.5 : 0.3}
                  />

                  {/* Add a platform under each model */}
                  <mesh
                    position={[model.position[0], model.position[1] - 1, model.position[2]]}
                    rotation={[0, 0, 0]}
                    receiveShadow
                  >
                    <cylinderGeometry args={[2, 2, 0.1, 32]} />
                    <meshStandardMaterial
                      color={model.id === 't20' ? '#ffeeee' : model.id === 't30' ? '#eeeeff' : '#eeffee'}
                      metalness={0.2}
                      roughness={0.3}
                    />
                  </mesh>

                  {/* Model name floating above */}
                  <Html
                    position={[model.position[0], model.position[1] + 2, model.position[2]]}
                    center
                    distanceFactor={10}
                  >
                    <div className={`${styles.modelLabel} ${styles[model.id]} transition-colors duration-300 backdrop-blur-sm text-sm font-bold`}>
                      {model.name}
                    </div>
                  </Html>
                </Float>
              ))}
            </Suspense>

            <ContactShadows opacity={0.4} scale={10} blur={2} far={10} resolution={256} color="#000000" />
            <Environment preset="studio" />

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.5}
              enableDamping
              dampingFactor={0.05}
              minDistance={5}
              maxDistance={20}
            />
          </Canvas>

          <Loader />
        </div>

        {/* Navigation buttons */}
        <AnimatePresence>
          {!selectedModel && (
            <motion.div
              className="mt-8 text-center flex justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="inline-flex items-center px-5 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                whileTap={{ y: 0 }}
                onClick={() => router.push('/products')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 11h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Compare All Machines
              </motion.button>

              <motion.button
                className="inline-flex items-center px-5 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary/90 transition-colors"
                whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                whileTap={{ y: 0 }}
                onClick={() => router.push('/')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Continue to Homepage
              </motion.button>

              <motion.p
                className="mt-2 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Click to explore our full website
              </motion.p>

              {/* Reset button for testing */}
              <motion.button
                className="mt-4 inline-flex items-center px-5 py-2 bg-gray-100 border border-gray-200 rounded-lg shadow-sm text-gray-500 hover:bg-gray-200 transition-colors text-sm"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                onClick={resetVisitedFlag}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 20v-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reset Visit Flag (Testing Only)
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Preload models
// This is executed at module level and will preload the model
// to make it available faster when needed
useGLTF.preload('/models/machine.glb');
