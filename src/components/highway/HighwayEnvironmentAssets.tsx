import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { HIGHWAY_SPLINE } from './HighwaySpline';

const baseUrl = import.meta.env.BASE_URL || '/';

// Preload all 10 GLBs for instant highway initialization
useGLTF.preload(`${baseUrl}assets/3d/signature_hybrid_tree.glb`);
useGLTF.preload(`${baseUrl}assets/3d/roadside_shrub_cluster.glb`);
useGLTF.preload(`${baseUrl}assets/3d/charcoal_landscape_rock.glb`);
useGLTF.preload(`${baseUrl}assets/3d/cool_white_red_edge_streetlight.glb`);
useGLTF.preload(`${baseUrl}assets/3d/ice_grey_guardrail_segment.glb`);
useGLTF.preload(`${baseUrl}assets/3d/ice_grey_illuminated_planter.glb`);
useGLTF.preload(`${baseUrl}assets/3d/chapter_transition_tunnel.glb`);
useGLTF.preload(`${baseUrl}assets/3d/holographic_milestone_marker.glb`);
useGLTF.preload(`${baseUrl}assets/3d/final_contact_pavilion.glb`);
useGLTF.preload(`${baseUrl}assets/3d/milestone_billboard_rig.glb`);

// Reusable Instanced Mesh Renderer for multi-mesh GLTF scenes
interface InstancedGLBProps {
  scene: THREE.Group;
  matrices: THREE.Matrix4[];
  name?: string;
  onMaterialsReady?: (materials: THREE.Material[]) => void;
}

const InstancedGLB: React.FC<InstancedGLBProps> = ({ scene, matrices, name }) => {
  const count = matrices.length;

  const meshParts = useMemo(() => {
    const parts: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        parts.push({
          geometry: mesh.geometry,
          material: mesh.material as THREE.Material
        });
      }
    });
    return parts;
  }, [scene]);

  const instancedMeshes = useMemo(() => {
    return meshParts.map((part) => {
      const im = new THREE.InstancedMesh(part.geometry, part.material, count);
      for (let i = 0; i < count; i++) {
        im.setMatrixAt(i, matrices[i]);
      }
      im.instanceMatrix.needsUpdate = true;
      return im;
    });
  }, [meshParts, matrices, count]);

  return (
    <group name={name}>
      {instancedMeshes.map((im, idx) => (
        <primitive key={idx} object={im} />
      ))}
    </group>
  );
};

export const HighwayEnvironmentAssets: React.FC = () => {
  // Load models
  const treeGLB = useGLTF(`${baseUrl}assets/3d/signature_hybrid_tree.glb`);
  const shrubGLB = useGLTF(`${baseUrl}assets/3d/roadside_shrub_cluster.glb`);
  const rockGLB = useGLTF(`${baseUrl}assets/3d/charcoal_landscape_rock.glb`);
  const streetlightGLB = useGLTF(`${baseUrl}assets/3d/cool_white_red_edge_streetlight.glb`);
  const guardrailGLB = useGLTF(`${baseUrl}assets/3d/ice_grey_guardrail_segment.glb`);
  const planterGLB = useGLTF(`${baseUrl}assets/3d/ice_grey_illuminated_planter.glb`);
  const tunnelGLB = useGLTF(`${baseUrl}assets/3d/chapter_transition_tunnel.glb`);
  const markerGLB = useGLTF(`${baseUrl}assets/3d/holographic_milestone_marker.glb`);
  const pavilionGLB = useGLTF(`${baseUrl}assets/3d/final_contact_pavilion.glb`);

  // Animation refs
  const treesGroupRef = useRef<THREE.Group>(null);
  const hologramRefs = useRef<(THREE.Group | null)[]>([]);

  // Base CAD rotation to map Blender Z-up to Three.js Y-up
  const qCAD = useMemo(
    () => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2),
    []
  );

  // 1. Generate Tree Matrices along the highway landscape
  const treeMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const TREE_COUNT = 38;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < TREE_COUNT; i++) {
      const t = 0.04 + (i / (TREE_COUNT - 1)) * 0.92;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Alternating cluster distribution
      const side = i % 2 === 0 ? -1 : 1;
      const pseudoRand = Math.sin(i * 12.9898 + 78.233);
      const lateralDist = side * (14.5 + Math.abs(pseudoRand) * 11.5);
      const forwardJitter = (pseudoRand * 0.5) * 8.0;

      const pos = pt.clone().addScaledVector(right, lateralDist).addScaledVector(tangent, forwardJitter);
      pos.y = pt.y - 0.2; // Anchored into the terrain

      // Random Y rotation for variety
      const headingAngle = Math.atan2(tangent.x, -tangent.z) + pseudoRand * Math.PI;
      const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
      const qFinal = qHeading.clone().multiply(qCAD);

      const scaleVal = 1.6 + Math.abs(Math.cos(i * 3.7)) * 0.8;
      const scale = new THREE.Vector3(scaleVal, scaleVal, scaleVal);

      const mat = new THREE.Matrix4().compose(pos, qFinal, scale);
      matrices.push(mat);
    }
    return matrices;
  }, [qCAD]);

  // 2. Generate Shrub Matrices along road shoulders
  const shrubMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const SHRUB_COUNT = 44;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < SHRUB_COUNT; i++) {
      const t = 0.02 + (i / (SHRUB_COUNT - 1)) * 0.96;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      const side = (i % 3 === 0 ? -1 : 1);
      const pseudoRand = Math.cos(i * 24.123);
      const lateralDist = side * (9.6 + Math.abs(pseudoRand) * 3.8);

      const pos = pt.clone().addScaledVector(right, lateralDist);
      pos.y = pt.y - 0.1;

      const headingAngle = Math.atan2(tangent.x, -tangent.z) + pseudoRand * 2.0;
      const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
      const qFinal = qHeading.clone().multiply(qCAD);

      const scaleVal = 1.3 + Math.abs(pseudoRand) * 0.6;
      const scale = new THREE.Vector3(scaleVal, scaleVal, scaleVal);

      matrices.push(new THREE.Matrix4().compose(pos, qFinal, scale));
    }
    return matrices;
  }, [qCAD]);

  // 3. Generate Landscape Rock Matrices
  const rockMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const ROCK_COUNT = 28;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < ROCK_COUNT; i++) {
      const t = 0.05 + (i / (ROCK_COUNT - 1)) * 0.90;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      const side = i % 2 === 0 ? 1 : -1;
      const pseudoRand = Math.sin(i * 45.678);
      const lateralDist = side * (18.0 + Math.abs(pseudoRand) * 14.0);

      const pos = pt.clone().addScaledVector(right, lateralDist);
      pos.y = pt.y - 0.3;

      const headingAngle = Math.atan2(tangent.x, -tangent.z) + pseudoRand * Math.PI;
      const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
      const qFinal = qHeading.clone().multiply(qCAD);

      const scaleVal = 1.8 + Math.abs(pseudoRand) * 1.5;
      const scale = new THREE.Vector3(scaleVal, scaleVal * 0.85, scaleVal);

      matrices.push(new THREE.Matrix4().compose(pos, qFinal, scale));
    }
    return matrices;
  }, [qCAD]);

  // 4. Generate Streetlight Matrices on both road shoulders
  const streetlightMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const LIGHT_COUNT = 42;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < LIGHT_COUNT; i++) {
      const t = 0.02 + (i / (LIGHT_COUNT - 1)) * 0.96;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Alternating left and right shoulders
      const side = i % 2 === 0 ? -1 : 1;
      const lateralDist = side * 8.8; // Highway half width is 7.5, so 8.8 sits cleanly on shoulder

      const pos = pt.clone().addScaledVector(right, lateralDist);
      pos.y = pt.y;

      // Base heading aligned to road curve
      let headingAngle = Math.atan2(tangent.x, -tangent.z);
      // Streetlight arm points in +X. If on right side, rotate 180° so arm points inward toward road
      if (side === 1) {
        headingAngle += Math.PI;
      }

      const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
      const qFinal = qHeading.clone().multiply(qCAD);

      const scale = new THREE.Vector3(1.35, 1.35, 1.35);
      matrices.push(new THREE.Matrix4().compose(pos, qFinal, scale));
    }
    return matrices;
  }, [qCAD]);

  // 5. Generate Guardrail Matrices along road shoulders
  const guardrailMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const SEGMENTS = 54;
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < SEGMENTS; i++) {
      const t = 0.01 + (i / (SEGMENTS - 1)) * 0.98;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Guardrails on both shoulders (lateral ±8.0)
      for (const side of [-1, 1]) {
        const pos = pt.clone().addScaledVector(right, side * 8.1);
        pos.y = pt.y + 0.1;

        // Guardrail CAD length is along X, so rotate 90° to align with tangent
        const headingAngle = Math.atan2(tangent.x, -tangent.z) + Math.PI / 2;
        const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
        const qFinal = qHeading.clone().multiply(qCAD);

        const scale = new THREE.Vector3(1.05, 1.05, 1.05);
        matrices.push(new THREE.Matrix4().compose(pos, qFinal, scale));
      }
    }
    return matrices;
  }, [qCAD]);

  // 6. Generate Illuminated Planters flanking the 7 milestones
  const planterMatrices = useMemo(() => {
    const matrices: THREE.Matrix4[] = [];
    const up = new THREE.Vector3(0, 1, 0);

    for (let km = 1; km <= 7; km++) {
      const t = km / 7.0;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Pair of planters: left and right
      for (const side of [-1, 1]) {
        const pos = pt.clone().addScaledVector(right, side * 8.5).addScaledVector(tangent, -4.0);
        pos.y = pt.y;

        const headingAngle = Math.atan2(tangent.x, -tangent.z);
        const qHeading = new THREE.Quaternion().setFromAxisAngle(up, headingAngle);
        const qFinal = qHeading.clone().multiply(qCAD);

        const scale = new THREE.Vector3(1.25, 1.25, 1.25);
        matrices.push(new THREE.Matrix4().compose(pos, qFinal, scale));
      }
    }
    return matrices;
  }, [qCAD]);

  // 7. Transition Tunnels positioned at chapter transition zones
  const tunnels = useMemo(() => {
    const tunnelData: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }[] = [];
    // Transition thresholds between key acts
    const transitionTs = [0.22, 0.50, 0.78];

    transitionTs.forEach((t) => {
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const headingAngle = Math.atan2(tangent.x, -tangent.z);

      tunnelData.push({
        position: [pt.x, pt.y, pt.z],
        rotation: [-Math.PI / 2, 0, headingAngle],
        scale: [1.85, 1.85, 1.85]
      });
    });

    return tunnelData;
  }, []);

  // 8. Holographic Milestone Markers (1 at each of the 7 milestones)
  const milestoneMarkers = useMemo(() => {
    const markers: { id: string; basePos: THREE.Vector3; initialRot: number }[] = [];
    const up = new THREE.Vector3(0, 1, 0);

    for (let km = 1; km <= 7; km++) {
      const t = km / 7.0;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, up).normalize();

      // Positioned on the shoulder opposite or near the billboard
      const pos = pt.clone().addScaledVector(right, -9.2).addScaledVector(tangent, 2.0);
      pos.y = pt.y + 0.5;

      markers.push({
        id: `hologram-km-${km}`,
        basePos: pos,
        initialRot: Math.atan2(tangent.x, -tangent.z)
      });
    }
    return markers;
  }, []);

  // 9. Final Contact Pavilion at KM 7 Terminal
  const pavilionData = useMemo(() => {
    const pt = HIGHWAY_SPLINE.getPointAt(1.0);
    const tangent = HIGHWAY_SPLINE.getTangentAt(1.0).normalize();
    const headingAngle = Math.atan2(tangent.x, -tangent.z);

    return {
      position: [pt.x, pt.y, pt.z] as [number, number, number],
      rotation: [-Math.PI / 2, 0, headingAngle] as [number, number, number],
      scale: [2.3, 2.3, 2.3] as [number, number, number]
    };
  }, []);

  // Frame animations (wind sway & hologram rotation/hover)
  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;

    // Organic wind sway for trees
    if (treesGroupRef.current) {
      treesGroupRef.current.rotation.z = Math.sin(elapsed * 0.75) * 0.008;
      treesGroupRef.current.rotation.x = Math.cos(elapsed * 0.55) * 0.006;
    }

    // Hologram floating and spinning
    hologramRefs.current.forEach((markerGroup, idx) => {
      if (!markerGroup) return;
      const marker = milestoneMarkers[idx];
      if (!marker) return;

      // Vertical sine float
      markerGroup.position.y = marker.basePos.y + Math.sin(elapsed * 1.3 + idx * 0.8) * 0.18;
      // Continuous slow rotation
      markerGroup.rotation.y += delta * 0.45;
    });
  });

  return (
    <group name="HighwayEnvironmentAssets">
      {/* 1. Signature Hybrid Trees (Instanced) */}
      <group ref={treesGroupRef}>
        <InstancedGLB scene={treeGLB.scene} matrices={treeMatrices} name="InstancedHybridTrees" />
      </group>

      {/* 2. Roadside Shrub Clusters (Instanced) */}
      <InstancedGLB scene={shrubGLB.scene} matrices={shrubMatrices} name="InstancedShrubs" />

      {/* 3. Landscape Rocks (Instanced) */}
      <InstancedGLB scene={rockGLB.scene} matrices={rockMatrices} name="InstancedRocks" />

      {/* 4. Cool White Red-Edge Streetlights (Instanced) */}
      <InstancedGLB scene={streetlightGLB.scene} matrices={streetlightMatrices} name="InstancedStreetlights" />

      {/* 5. Modular Guardrails (Instanced) */}
      <InstancedGLB scene={guardrailGLB.scene} matrices={guardrailMatrices} name="InstancedGuardrails" />

      {/* 6. Illuminated Planters (Instanced) */}
      <InstancedGLB scene={planterGLB.scene} matrices={planterMatrices} name="InstancedPlanters" />

      {/* 7. Chapter Transition Tunnels (Set-Pieces) */}
      <group name="TransitionTunnels">
        {tunnels.map((t, idx) => (
          <group key={idx} position={t.position} rotation={t.rotation} scale={t.scale}>
            <primitive object={tunnelGLB.scene.clone(true)} />
          </group>
        ))}
      </group>

      {/* 8. Holographic Milestone Markers (Animated Floating Beacons) */}
      <group name="MilestoneHolograms">
        {milestoneMarkers.map((marker, idx) => (
          <group
            key={marker.id}
            ref={(el) => (hologramRefs.current[idx] = el)}
            position={[marker.basePos.x, marker.basePos.y, marker.basePos.z]}
            rotation={[0, marker.initialRot, 0]}
          >
            {/* Orient CAD Z-up to Three.js Y-up */}
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[1.25, 1.25, 1.25]}>
              <primitive object={markerGLB.scene.clone(true)} />
            </group>
            {/* Holographic Point Light Accent */}
            <pointLight color="#E10620" intensity={1.8} distance={8} position={[0, 1.2, 0]} />
          </group>
        ))}
      </group>

      {/* 9. Final Contact Pavilion at KM 7 Destination */}
      <group
        name="FinalContactPavilion"
        position={pavilionData.position}
        rotation={pavilionData.rotation}
        scale={pavilionData.scale}
      >
        <primitive object={pavilionGLB.scene.clone(true)} />
        <pointLight color="#F1F5F7" intensity={2.5} distance={30} position={[0, 4, 0]} />
        <pointLight color="#E10620" intensity={1.2} distance={20} position={[0, 1, 0]} />
      </group>
    </group>
  );
};
