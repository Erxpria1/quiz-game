"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Quiz3D() {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const dodecaRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (torusRef.current) {
      torusRef.current.rotation.x = Math.sin(time * 0.5) * 0.5;
      torusRef.current.rotation.y += 0.01;
      torusRef.current.position.y = 1 + Math.sin(time * 1.2) * 0.3;
    }
    if (icoRef.current) {
      icoRef.current.rotation.x -= 0.008;
      icoRef.current.rotation.y += 0.012;
      icoRef.current.position.y = -1 + Math.cos(time * 0.8) * 0.3;
    }
    if (octaRef.current) {
      octaRef.current.rotation.x += 0.01;
      octaRef.current.rotation.z += 0.008;
      octaRef.current.position.y = 2 + Math.sin(time * 1.5) * 0.2;
    }
    if (dodecaRef.current) {
      dodecaRef.current.rotation.y -= 0.01;
      dodecaRef.current.rotation.z += 0.005;
      dodecaRef.current.position.y = -2 + Math.cos(time * 0.6) * 0.3;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.005;
      boxRef.current.rotation.y += 0.007;
      boxRef.current.position.y = 2.5 + Math.sin(time * 0.9) * 0.2;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.5;
    }
  });

  const torusArgs = useMemo(() => [1.2, 0.4, 16, 100] as const, []);
  const icoArgs = useMemo(() => [1.4, 0] as const, []);
  const octaArgs = useMemo(() => [1.0] as const, []);
  const dodecaArgs = useMemo(() => [0.9] as const, []);
  const boxArgs = useMemo(() => [1.8, 1.8, 1.8] as const, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={torusRef} position={[4, 1, -2]}>
        <torusGeometry args={torusArgs} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.85}
          roughness={0.15}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={icoRef} position={[-4, -1, -1]}>
        <icosahedronGeometry args={icoArgs} />
        <meshStandardMaterial
          color="#ec4899"
          metalness={0.7}
          roughness={0.25}
          emissive="#ec4899"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={octaRef} position={[-3, 2, -3]}>
        <octahedronGeometry args={octaArgs} />
        <meshStandardMaterial
          color="#10b981"
          metalness={0.75}
          roughness={0.2}
          emissive="#10b981"
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh ref={dodecaRef} position={[3, -2, -2]}>
        <dodecahedronGeometry args={dodecaArgs} />
        <meshStandardMaterial
          color="#f59e0b"
          metalness={0.6}
          roughness={0.35}
          emissive="#f59e0b"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh ref={boxRef} position={[0, 2.5, -4]}>
        <boxGeometry args={boxArgs} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.7}
          roughness={0.25}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[5, 0.1, 16, 100]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
