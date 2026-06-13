'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function DottedGlobe() {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate coordinates on a sphere for the dotted effect
    const [positions, colors] = useMemo(() => {
        const count = 3500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        
        const colorBlue = new THREE.Color('#2282ff');
        const colorPink = new THREE.Color('#ff3dc8');
        
        for (let i = 0; i < count; i++) {
            // Golden spiral algorithm for even distribution on a sphere
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            
            const radius = 2.2;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            
            // Interpolate colors based on position
            const ratio = (y + radius) / (2 * radius);
            const mixedColor = new THREE.Color().lerpColors(colorBlue, colorPink, ratio);
            
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }
        return [positions, colors];
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            // Smooth auto-rotation + scroll rotation
            const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04 + scrollY * 0.0006;
            pointsRef.current.rotation.x = scrollY * 0.0002;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.055}
                vertexColors
                transparent
                opacity={0.9}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function GridSphere() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
        if (meshRef.current) {
            // Auto rotation + scroll rotation in opposite direction
            const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
            meshRef.current.rotation.y = -state.clock.getElapsedTime() * 0.02 - scrollY * 0.0003;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1 + scrollY * 0.0001;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.18, 30, 24]} />
            <meshBasicMaterial
                color="#2282ff"
                transparent
                opacity={0.12}
                wireframe={true}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}

function InnerGlobe() {
    const meshRef = useRef<THREE.Mesh>(null);
    
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.0, 32, 32]} />
            <meshBasicMaterial
                color="#03193d"
                transparent
                opacity={0.45}
            />
        </mesh>
    );
}

export default function GlobeCanvas() {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '400px', cursor: 'grab' }} className="globe-3d-wrapper">
            <Canvas
                camera={{ position: [0, 0, 5.5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[5, 3, 5]} intensity={1.0} />
                
                <DottedGlobe />
                <GridSphere />
                <InnerGlobe />
                
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping={true}
                    dampingFactor={0.05}
                    rotateSpeed={0.8}
                />
            </Canvas>
        </div>
    );
}
