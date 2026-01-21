
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Points, PointMaterial, Environment, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

// Alias para elementos intrínsecos de R3F
const Group = 'group' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
const Mesh = 'mesh' as any;

/**
 * Campo de partículas sutil para profundidad
 */
const SubtleParticles = ({ count = 1500 }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#E61E43"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
};

/**
 * Objeto de Geometría Sagrada Pulsante
 */
const SacredPulsingGeometry = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotación suave y compleja
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.z = t * 0.1;
      
      // Efecto de pulso (escala)
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      groupRef.current.scale.set(pulse, pulse, pulse);
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -t * 0.3;
    }
  });

  return (
    <Group ref={groupRef}>
      {/* Núcleo Central */}
      <Icosahedron ref={coreRef} args={[0.8, 1]}>
        <meshStandardMaterial 
          color="#E61E43" 
          emissive="#E61E43" 
          emissiveIntensity={2} 
          wireframe 
        />
      </Icosahedron>

      {/* Anillos de Geometría Sagrada (Nested Rings) */}
      {[...Array(6)].map((_, i) => (
        <Torus 
          key={i} 
          args={[3, 0.015, 16, 100]} 
          rotation={[
            (Math.PI / 3) * i, 
            (Math.PI / 6) * i, 
            0
          ]}
        >
          <meshStandardMaterial 
            color="#E61E43" 
            emissive="#E61E43" 
            emissiveIntensity={1.5}
            transparent
            opacity={0.8}
          />
        </Torus>
      ))}

      {/* Esfera de puntos exterior */}
      <Sphere args={[4, 32, 32]}>
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.03} 
        />
      </Sphere>

      {/* Luces puntuales internas para el brillo */}
      <PointLight distance={5} intensity={5} color="#E61E43" />
    </Group>
  );
};

/**
 * Escena del Hero: Diseño minimalista y sagrado
 */
export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <AmbientLight intensity={0.4} />
        <PointLight position={[10, 10, 10]} intensity={1} color="#E61E43" />
        <PointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <SacredPulsingGeometry />
          <SubtleParticles count={2000} />
        </Float>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

/**
 * Escena de núcleo tecnológico para secciones secundarias
 */
export const TechCoreScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        <AmbientLight intensity={0.7} />
        <PointLight position={[2, 2, 2]} intensity={1} color="#E61E43" />
        
        <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
          <SacredPulsingGeometry />
        </Float>
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
