import React, { useRef, useMemo, useState, useEffect, Suspense, Component, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useNexusStore, CoreMode, AGiState } from '../../stores/nexusStore';

// Dynamic multi-part Neuromorphic Quantum Core
function NeuromorphicCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRing1Ref = useRef<THREE.Mesh>(null);
  const outerRing2Ref = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const crystalCoreRef = useRef<THREE.Mesh>(null);
  const latticeRef = useRef<THREE.LineSegments>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);

  const coreMode = useNexusStore((state) => state.coreMode);
  const agiState = useNexusStore((state) => state.agiState);
  const triggerExcitation = useNexusStore((state) => state.triggerExcitation);

  // Dynamic parameters based on mode & AGi state
  const speedMultiplier = useMemo(() => {
    let base = 1.0;
    if (coreMode === 'inference') base = 1.6;
    if (coreMode === 'synthesis') base = 2.4;
    if (coreMode === 'hyper') base = 3.6;
    if (agiState === 'thinking') base *= 1.8;
    if (agiState === 'speaking') base *= 1.3;
    return base;
  }, [coreMode, agiState]);

  const coreColors = useMemo(() => {
    switch (coreMode) {
      case 'inference':
        return { primary: '#20D39B', emissive: '#0B4734', ring: '#55F2BC' };
      case 'synthesis':
        return { primary: '#38BDF8', emissive: '#0369A1', ring: '#7DD3FC' };
      case 'hyper':
        return { primary: '#A855F7', emissive: '#581C87', ring: '#C084FC' };
      default:
        return { primary: '#20D39B', emissive: '#0A3828', ring: '#34D399' };
    }
  }, [coreMode]);

  // Procedural geometry for inner wireframe lattice
  const latticeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.05, 1);
    return new THREE.WireframeGeometry(geo);
  }, []);

  // Satellites setup
  const satellites = useMemo(() => [
    { radius: 2.4, speed: 1.1, size: 0.065, tilt: 0.4 },
    { radius: 2.8, speed: -0.85, size: 0.05, tilt: -0.6 },
    { radius: 3.2, speed: 0.65, size: 0.075, tilt: 1.1 },
    { radius: 2.1, speed: -1.3, size: 0.045, tilt: -0.2 }
  ], []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const effectiveDelta = delta * speedMultiplier;

    // Gentle global levitation
    if (groupRef.current) {
      groupRef.current.position.y = 0.2 + Math.sin(time * 1.2) * 0.08;
    }

    // Outer precision gimbal rotation
    if (outerRing1Ref.current) {
      outerRing1Ref.current.rotation.x = Math.sin(time * 0.4) * 0.2;
      outerRing1Ref.current.rotation.y += effectiveDelta * 0.4;
      outerRing1Ref.current.rotation.z += effectiveDelta * 0.2;
    }

    // Counter-rotating outer gimbal
    if (outerRing2Ref.current) {
      outerRing2Ref.current.rotation.x += effectiveDelta * 0.3;
      outerRing2Ref.current.rotation.y = Math.cos(time * 0.5) * 0.25;
      outerRing2Ref.current.rotation.z -= effectiveDelta * 0.35;
    }

    // Fast inner equatorial guide ring
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= effectiveDelta * 0.6;
    }

    // Faceted Crystal Core rotation & breathing
    if (crystalCoreRef.current) {
      crystalCoreRef.current.rotation.y += effectiveDelta * 0.5;
      crystalCoreRef.current.rotation.x += effectiveDelta * 0.3;
      const pulse = 1 + Math.sin(time * (coreMode === 'hyper' ? 6 : 3)) * 0.035;
      crystalCoreRef.current.scale.set(pulse, pulse, pulse);
    }

    // Lattice wireframe
    if (latticeRef.current) {
      latticeRef.current.rotation.y -= effectiveDelta * 0.3;
      latticeRef.current.rotation.z += effectiveDelta * 0.2;
    }

    // Orbiting satellites
    if (satellitesGroupRef.current) {
      satellitesGroupRef.current.rotation.y += effectiveDelta * 0.2;
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        triggerExcitation();
      }}
    >
      {/* 1. Central Faceted Dielectric Core */}
      <mesh ref={crystalCoreRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <meshPhysicalMaterial
          color={coreColors.primary}
          emissive={coreColors.emissive}
          emissiveIntensity={agiState === 'thinking' ? 2.5 : 1.2}
          roughness={0.14}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.4}
          ior={1.52}
          reflectivity={0.9}
        />
      </mesh>

      {/* 2. Concentric Inner Lattice */}
      <lineSegments ref={latticeRef} geometry={latticeGeometry}>
        <lineBasicMaterial color={coreColors.ring} transparent opacity={0.55} />
      </lineSegments>

      {/* 3. Primary Precision Gimbal Ring (Titanium Anisotropic Sheen) */}
      <mesh ref={outerRing1Ref}>
        <torusGeometry args={[1.9, 0.032, 24, 160]} />
        <meshStandardMaterial
          color="#A3B8B0"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 4. Counter-rotating Secondary Gimbal Ring */}
      <mesh ref={outerRing2Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[2.2, 0.024, 20, 160]} />
        <meshStandardMaterial
          color={coreColors.ring}
          metalness={0.88}
          roughness={0.25}
          emissive={coreColors.emissive}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 5. Inner Fast Equatorial Telemetry Ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.015, 16, 120]} />
        <meshBasicMaterial color={coreColors.ring} transparent opacity={0.7} />
      </mesh>

      {/* 6. Orbiting Satellites Constellation */}
      <group ref={satellitesGroupRef}>
        {satellites.map((sat, idx) => (
          <SatelliteNode key={idx} sat={sat} color={coreColors.ring} />
        ))}
      </group>

      {/* Contact Shadow Plane directly below the core */}
      <mesh position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

function SatelliteNode({ sat, color }: { sat: { radius: number; speed: number; size: number; tilt: number }; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * sat.speed;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(time) * sat.radius;
      meshRef.current.position.z = Math.sin(time) * sat.radius;
      meshRef.current.position.y = Math.sin(time * 1.5 + sat.tilt) * (sat.radius * 0.35);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[sat.size, 16, 16]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive={color}
        emissiveIntensity={2.5}
        metalness={0.8}
        roughness={0.1}
      />
    </mesh>
  );
}

// Background Quantum Dust Cloud
function QuantumDust({ count = 1200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;
      p[i * 3] = radius * Math.cos(phi) * Math.sin(theta);
      p[i * 3 + 1] = radius * Math.sin(phi);
      p[i * 3 + 2] = radius * Math.cos(phi) * Math.cos(theta);
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3}>
      <PointMaterial
        transparent
        color="#20D39B"
        size={0.038}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floor Substrate Grid
function ArchitecturalGround() {
  return (
    <group position={[0, -2.2, 0]}>
      {/* Floor grid with subtle opacity */}
      <gridHelper 
        args={[36, 36, '#12382C', '#081713']} 
      />
      {/* Dark radial fade disc to hide grid edges */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshBasicMaterial color="#030708" />
      </mesh>
    </group>
  );
}

function FallbackDisplay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-80 h-80 rounded-full border border-[#20D39B]/30 flex items-center justify-center">
        <div className="w-56 h-56 rounded-full border border-[#55F2BC]/40 animate-pulse flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#0C382A] to-[#20D39B]/40 blur-md" />
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL fallback activated:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) return <FallbackDisplay />;
    return this.props.children;
  }
}

export default function NexusEnvironment() {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#030708]">
      {/* Subtle architectural radial lighting background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,48,39,0.35)_0%,rgba(3,7,8,0.95)_75%)] pointer-events-none" />

      {hasWebGL ? (
        <CanvasErrorBoundary>
          <Canvas
            camera={{ position: [0, 0.8, 6.5], fov: 48 }}
            gl={{ 
              antialias: true, 
              alpha: true, 
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.15
            }}
          >
            <Suspense fallback={null}>
              <color attach="background" args={['#030708']} />
              <fog attach="fog" args={['#030708', 7, 24]} />
              
              {/* Studio PBR Lighting Setup */}
              <ambientLight intensity={0.4} color="#0B261D" />
              <hemisphereLight args={['#55F2BC', '#030708', 0.7]} />
              
              {/* Key Light */}
              <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
              
              {/* Fill Light (Cool Teal) */}
              <directionalLight position={[-6, 4, -3]} intensity={0.8} color="#20D39B" />
              
              {/* Core Accent Lights */}
              <pointLight position={[0, 0, 0]} intensity={2.0} distance={4} color="#20D39B" />
              <pointLight position={[0, -2, 2]} intensity={1.0} distance={5} color="#55F2BC" />

              <NeuromorphicCore />
              <QuantumDust />
              <ArchitecturalGround />

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                minDistance={3.8}
                maxDistance={11.0}
                maxPolarAngle={Math.PI / 2 + 0.05}
                minPolarAngle={Math.PI / 6}
                enableDamping={true}
                dampingFactor={0.06}
                rotateSpeed={0.65}
              />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        <FallbackDisplay />
      )}
    </div>
  );
}
