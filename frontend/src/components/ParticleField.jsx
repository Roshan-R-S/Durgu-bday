import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededRandom(index, seed) {
  const value = Math.sin(index * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function randomRange(index, seed, min, max) {
  return seededRandom(index, seed) * (max - min) + min;
}

// Mouse tracker (normalized -1 to 1)
function useMouse() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return mouse;
}

// Floating gold particles
function GoldParticles({ count = 280 }) {
  const mesh = useRef();
  const mouse = useMouse();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Build random particle positions, sizes, speeds, phases
  const [positions, sizes, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const spd = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = randomRange(i, 1, -10, 10);
      pos[i * 3 + 1] = randomRange(i, 2, -7, 7);
      pos[i * 3 + 2] = randomRange(i, 3, -5, 5);
      sz[i] = randomRange(i, 4, 0.008, 0.048);
      spd[i] = randomRange(i, 5, 0.00008, 0.0006);
      ph[i] = randomRange(i, 6, 0, Math.PI * 2);
    }
    return [pos, sz, spd, ph];
  }, [count]);

  // Circular sway texture (soft glow dot)
  const texture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,220,160,1)");
    gradient.addColorStop(0.4, "rgba(212,165,116,0.6)");
    gradient.addColorStop(1, "rgba(212,165,116,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const posArr = mesh.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const base = positions[i * 3 + 1];
      const phase = phases[i];
      const speed = speeds[i];

      // Drift upward, wrap around
      let y = base + t * speed * 0.25;
      y = ((y + 7) % 14) - 7;
      posArr[i * 3 + 1] = y;

      // Gentle sway on X
      posArr[i * 3 + 0] =
        positions[i * 3 + 0] + Math.sin(t * 0.06 + phase) * 0.08;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Subtle mouse parallax on the whole cloud
    targetRotation.current.x += (mouse.current.y * 0.12 - targetRotation.current.x) * 0.04;
    targetRotation.current.y += (mouse.current.x * 0.18 - targetRotation.current.y) * 0.04;
    mesh.current.rotation.x = targetRotation.current.x;
    mesh.current.rotation.y = targetRotation.current.y;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.18}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors={false}
        color="#d4a574"
      />
    </points>
  );
}

// Tiny blush accent particles
function BlushParticles({ count = 80 }) {
  const mesh = useRef();

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = randomRange(i, 11, -8, 8);
      pos[i * 3 + 1] = randomRange(i, 12, -6, 6);
      pos[i * 3 + 2] = randomRange(i, 13, -5, 1);
      spd[i] = randomRange(i, 14, 0.00005, 0.0004);
      ph[i] = randomRange(i, 15, 0, Math.PI * 2);
    }
    return [pos, spd, ph];
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    const posArr = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1] + t * speeds[i] * 0.25;
      y = ((y + 6) % 12) - 6;
      posArr[i * 3 + 1] = y;
      posArr[i * 3 + 0] =
        positions[i * 3 + 0] + Math.sin(t * 0.05 + phases[i]) * 0.05;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#c9827a"
      />
    </points>
  );
}

// Soft floating aurora orbs
function AuroraOrbs() {
  const groupRef = useRef();
  const mouse = useMouse();
  const target = useRef({ x: 0, y: 0 });

  const orbs = useMemo(() => [
    { x: -3.5, y: 1.2, z: -4, color: "#d4a574", scale: 2.8, speed: 0.02, phase: 0 },
    { x: 3.2,  y: -1.5, z: -5, color: "#c9827a", scale: 2.2, speed: 0.015, phase: 1.2 },
    { x: 0.5,  y: 2.5,  z: -6, color: "#e8c5a0", scale: 1.6, speed: 0.025, phase: 2.4 },
    { x: -2,   y: -2.8, z: -4.5, color: "#d4a574", scale: 1.4, speed: 0.018, phase: 3.6 },
  ], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    groupRef.current.children.forEach((orb, i) => {
      const o = orbs[i];
      orb.position.y = o.y + Math.sin(t * o.speed + o.phase) * 0.12;
      orb.position.x = o.x + Math.cos(t * o.speed * 0.7 + o.phase) * 0.08;
    });

    target.current.x += (mouse.current.x * 0.5 - target.current.x) * 0.02;
    target.current.y += (mouse.current.y * 0.3 - target.current.y) * 0.02;
    groupRef.current.position.x = target.current.x;
    groupRef.current.position.y = target.current.y;
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={[orb.x, orb.y, orb.z]}>
          <sphereGeometry args={[orb.scale, 16, 16]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.045}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

// Scene wrapper
function Scene() {
  return (
    <>
      <AuroraOrbs />
      <GoldParticles count={280} />
      <BlushParticles count={80} />
    </>
  );
}

// Main export: fixed full-screen canvas
export default function ParticleField() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
