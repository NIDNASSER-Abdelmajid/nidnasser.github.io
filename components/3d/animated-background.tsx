"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes component - Optimized
function FloatingShapes() {
  const meshRef = useRef<THREE.Group>(null);
  const count = 30; // Reduced from 50 for better performance
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05; // Slower rotation for smoother performance
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    }
  });

  return (
    <group ref={meshRef}>
      <Points positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending} // Better blending for performance
        />
      </Points>
    </group>
  );
}

// Animated code blocks floating in 3D space
function CodeBlocks() {
  const groupRef = useRef<THREE.Group>(null);
  const codeSnippets = [
    'const app = () => {\n  return <div>Hello</div>\n}',
    'async function getData() {\n  const res = await fetch("/api")\n  return res.json()\n}',
    'class Database {\n  async connect() {\n    return this.pool.connect()\n  }\n}',
    'export const config = {\n  runtime: "edge",\n  regions: ["iad1"]\n}'
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.005;
        child.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {codeSnippets.map((_, index) => (
        <mesh key={index} position={[
          Math.cos(index * Math.PI * 0.5) * 8,
          Math.sin(index * Math.PI * 0.3) * 4,
          Math.sin(index * Math.PI * 0.7) * 6
        ]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial
            color="#1e293b"
            transparent
            opacity={0.3}
            emissive="#22d3ee"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Interactive particle system that responds to mouse movement
function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  const count = 1000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Create wave effect based on mouse position
        const mouseInfluence = 
          Math.sin(state.clock.elapsedTime + positions[i3] * 0.1) * 0.1 +
          Math.cos(mouse.x * viewport.width * 0.1 + positions[i3 + 1] * 0.1) * 0.1;
        
        positions[i3 + 2] += mouseInfluence * 0.1;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      
      <FloatingShapes />
      <CodeBlocks />
      <InteractiveParticles />
    </>
  );
}

// Main component with responsive canvas
type AnimatedBackgroundVariant = 'default' | 'resume';

interface AnimatedBackgroundProps {
  variant?: AnimatedBackgroundVariant;
  className?: string;
}

export function AnimatedBackground({ variant = 'default', className = '' }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-blue-950/20 to-violet-950/20" />
    );
  }

  // Choose gradient based on variant
  const gradient = variant === 'resume'
    ? 'linear-gradient(135deg, #020617 0%, #0f172a 35%, #1e1b4b 70%, #581c87 100%)'
    : 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #581c87 100%)';

  return (
    <div className={`fixed inset-0 -z-10 print:hidden ${className}`}>
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: false, // Disable for better performance
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Enable automatic performance scaling
        style={{ background: gradient }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/60 dark:via-black/30 dark:to-black/50 pointer-events-none mix-blend-normal" />
    </div>
  );
}
