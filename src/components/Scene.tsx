"use client";

import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Points, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { isMobileViewport, isIOSDevice } from "@/lib/utils";

const Quiz3D = dynamic(() => import("./Quiz3D"), { ssr: false });

function ParticleField({ count }: { count: number }) {
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 250;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 250;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 250;
      const color = new THREE.Color().setHSL(Math.random() * 0.2 + 0.6, 0.8, 0.6);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col] as const;
  }, [count]);

  return (
    <Points positions={positions} colors={colors}>
      <pointsMaterial size={0.8} sizeAttenuation={true} depthWrite={false} vertexColors transparent opacity={0.8} />
    </Points>
  );
}

function RotatingRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[12, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#6366f1"
        metalness={0.9}
        roughness={0.1}
        emissive="#6366f1"
        emissiveIntensity={0.6}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = -state.clock.elapsedTime * 0.3;
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[10, 0.2, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.8}
        roughness={0.2}
        emissive="#8b5cf6"
        emissiveIntensity={0.4}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

function GlowSphere() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial
        color="#6366f1"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

export default function Scene() {
  const [isMobile, setIsMobile] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(isMobileViewport());
    setIsIOS(isIOSDevice());
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const starCount = isIOS ? 500 : isMobile ? 2000 : 6000;
  const particleCount = isIOS ? 200 : isMobile ? 800 : 3000;
  const sparkleCount = isIOS ? 0 : isMobile ? 0 : 200;
  const sparkleSize = isIOS ? 0 : isMobile ? 0 : 5;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 18], fov: 65 }}
        style={{ height: "100vh", width: "100vw" }}
        gl={{
          antialias: !isMobile && !isIOS,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: isIOS ? "low-power" : isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={isIOS ? 1 : isMobile ? 1 : [1, 2]}
      >
        <color attach="background" args={["#0a0a1a"]} />
        <fog attach="fog" args={["#0a0a1a", 20, 50]} />
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 7]} intensity={2.5} color="#6366f1" />
          <pointLight position={[-5, -10, -7]} intensity={2} color="#8b5cf6" />
          {!isMobile && <pointLight position={[5, -5, 5]} intensity={1.5} color="#a855f7" />}
          <pointLight position={[0, 0, 10]} intensity={1} color="#ffffff" />

          <ParticleField count={particleCount} />

          <Stars radius={200} depth={100} count={starCount} factor={7} saturation={0.6} fade speed={0.5} />

          {sparkleCount > 0 && (
            <Sparkles count={sparkleCount} scale={30} size={sparkleSize} speed={0.3} opacity={0.9} color="#a855f7" />
          )}

          <Float speed={isMobile ? 0.8 : 1.2} rotationIntensity={isMobile ? 0.2 : 0.4} floatIntensity={isMobile ? 0.3 : 0.5} floatingRange={[-1, 1]}>
            <Quiz3D />
          </Float>

          <GlowSphere />

          <RotatingRing />
          <InnerRing />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isMobile ? 0.3 : 0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
