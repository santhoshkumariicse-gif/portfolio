import React, { useMemo } from 'react';
import * as THREE from 'three';
import { HIGHWAY_SPLINE, HIGHWAY_MILESTONES } from './HighwaySpline';

export const HighwayRoadMesh: React.FC = () => {
  // 1. Generate Extruded Road Geometry along HIGHWAY_SPLINE
  const {
    roadGeometry,
    leftLineGeometry,
    rightLineGeometry,
    centerLineGeometry,
    laserRailLeftGeom,
    laserRailRightGeom,
    guardrailLeftGeom,
    guardrailRightGeom,
    lightPostsData,
    overheadGantriesData
  } = useMemo(() => {
    const SEGMENTS = 320;
    const ROAD_WIDTH = 15.0;
    const HALF_WIDTH = ROAD_WIDTH / 2;
    const upVector = new THREE.Vector3(0, 1, 0);

    // Positions & Indices for Road Surface
    const roadVerts: number[] = [];
    const roadUVs: number[] = [];
    const roadIndices: number[] = [];

    // Left Edge Solid White Line
    const leftLineVerts: number[] = [];
    const leftLineIndices: number[] = [];

    // Right Edge Solid White Line
    const rightLineVerts: number[] = [];
    const rightLineIndices: number[] = [];

    // Center Dashed Amber Line
    const centerLineVerts: number[] = [];
    const centerLineIndices: number[] = [];

    // Laser Edge Glow Rails (Crimson Hologram)
    const laserLVerts: number[] = [];
    const laserRVerts: number[] = [];
    const laserIndices: number[] = [];

    // Guardrail Left & Right
    const glVerts: number[] = [];
    const grVerts: number[] = [];
    const guardrailIndices: number[] = [];

    // Light poles along road
    const lightPosts: { position: [number, number, number]; rotationY: number }[] = [];
    // Overhead structural gantries
    const overheadGantries: { position: [number, number, number]; rotationY: number }[] = [];

    for (let i = 0; i <= SEGMENTS; i++) {
      const t = i / SEGMENTS;
      const pt = HIGHWAY_SPLINE.getPointAt(t);
      const tangent = HIGHWAY_SPLINE.getTangentAt(t).normalize();
      const right = new THREE.Vector3().crossVectors(tangent, upVector).normalize();

      // Road Vertices (Left & Right)
      const pLeft = pt.clone().addScaledVector(right, -HALF_WIDTH);
      const pRight = pt.clone().addScaledVector(right, HALF_WIDTH);

      roadVerts.push(pLeft.x, pLeft.y, pLeft.z);
      roadVerts.push(pRight.x, pRight.y, pRight.z);
      roadUVs.push(0, t * 80, 1, t * 80);

      // Left Solid White Edge Line (offset 0.02 above road)
      const l1 = pt.clone().addScaledVector(right, -HALF_WIDTH + 0.4).add(new THREE.Vector3(0, 0.02, 0));
      const l2 = pt.clone().addScaledVector(right, -HALF_WIDTH + 0.7).add(new THREE.Vector3(0, 0.02, 0));
      leftLineVerts.push(l1.x, l1.y, l1.z, l2.x, l2.y, l2.z);

      // Right Solid White Edge Line
      const r1 = pt.clone().addScaledVector(right, HALF_WIDTH - 0.7).add(new THREE.Vector3(0, 0.02, 0));
      const r2 = pt.clone().addScaledVector(right, HALF_WIDTH - 0.4).add(new THREE.Vector3(0, 0.02, 0));
      rightLineVerts.push(r1.x, r1.y, r1.z, r2.x, r2.y, r2.z);

      // Center Amber Dashed Line (dashed every alternate 2 segments)
      const isDash = (i % 4) < 2;
      const c1 = pt.clone().addScaledVector(right, -0.18).add(new THREE.Vector3(0, 0.025, 0));
      const c2 = pt.clone().addScaledVector(right, 0.18).add(new THREE.Vector3(0, 0.025, 0));
      if (isDash) {
        centerLineVerts.push(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z);
      } else {
        centerLineVerts.push(c1.x, c1.y, c1.z, c1.x, c1.y, c1.z);
      }

      // Crimson Laser Rails along the extreme edge of the highway
      const railL = pt.clone().addScaledVector(right, -HALF_WIDTH - 0.1).add(new THREE.Vector3(0, 0.35, 0));
      const railR = pt.clone().addScaledVector(right, HALF_WIDTH + 0.1).add(new THREE.Vector3(0, 0.35, 0));
      laserLVerts.push(railL.x, railL.y, railL.z, railL.x, railL.y + 0.1, railL.z);
      laserRVerts.push(railR.x, railR.y, railR.z, railR.x, railR.y + 0.1, railR.z);

      // Guardrail Barriers (height = 1.0 above road edge)
      const gl = pt.clone().addScaledVector(right, -HALF_WIDTH - 0.9).add(new THREE.Vector3(0, 0.9, 0));
      const gr = pt.clone().addScaledVector(right, HALF_WIDTH + 0.9).add(new THREE.Vector3(0, 0.9, 0));
      glVerts.push(gl.x, gl.y, gl.z, gl.x, gl.y - 0.35, gl.z);
      grVerts.push(gr.x, gr.y, gr.z, gr.x, gr.y - 0.35, gr.z);

      // Light posts every 12 segments
      if (i % 12 === 0 && i < SEGMENTS) {
        const postSide = (i / 12) % 2 === 0 ? 1 : -1;
        const postPos = pt.clone().addScaledVector(right, postSide * (HALF_WIDTH + 2.8));
        const angle = Math.atan2(tangent.x, tangent.z);
        lightPosts.push({
          position: [postPos.x, postPos.y, postPos.z],
          rotationY: angle + (postSide > 0 ? -Math.PI / 2 : Math.PI / 2)
        });
      }

      // Overhead structural truss gantries every 48 segments
      if (i > 0 && i % 48 === 0 && i < SEGMENTS) {
        const angle = Math.atan2(tangent.x, tangent.z);
        overheadGantries.push({
          position: [pt.x, pt.y, pt.z],
          rotationY: angle
        });
      }

      // Quad Indexing for Strip
      if (i < SEGMENTS) {
        const vIdx = i * 2;
        roadIndices.push(vIdx, vIdx + 1, vIdx + 2);
        roadIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);

        leftLineIndices.push(vIdx, vIdx + 1, vIdx + 2);
        leftLineIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);

        rightLineIndices.push(vIdx, vIdx + 1, vIdx + 2);
        rightLineIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);

        centerLineIndices.push(vIdx, vIdx + 1, vIdx + 2);
        centerLineIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);

        laserIndices.push(vIdx, vIdx + 1, vIdx + 2);
        laserIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);

        guardrailIndices.push(vIdx, vIdx + 1, vIdx + 2);
        guardrailIndices.push(vIdx + 1, vIdx + 3, vIdx + 2);
      }
    }

    // Build BufferGeometries
    const road = new THREE.BufferGeometry();
    road.setAttribute('position', new THREE.Float32BufferAttribute(roadVerts, 3));
    road.setAttribute('uv', new THREE.Float32BufferAttribute(roadUVs, 2));
    road.setIndex(roadIndices);
    road.computeVertexNormals();

    const leftLine = new THREE.BufferGeometry();
    leftLine.setAttribute('position', new THREE.Float32BufferAttribute(leftLineVerts, 3));
    leftLine.setIndex(leftLineIndices);
    leftLine.computeVertexNormals();

    const rightLine = new THREE.BufferGeometry();
    rightLine.setAttribute('position', new THREE.Float32BufferAttribute(rightLineVerts, 3));
    rightLine.setIndex(rightLineIndices);
    rightLine.computeVertexNormals();

    const centerLine = new THREE.BufferGeometry();
    centerLine.setAttribute('position', new THREE.Float32BufferAttribute(centerLineVerts, 3));
    centerLine.setIndex(centerLineIndices);
    centerLine.computeVertexNormals();

    const laserL = new THREE.BufferGeometry();
    laserL.setAttribute('position', new THREE.Float32BufferAttribute(laserLVerts, 3));
    laserL.setIndex(laserIndices);

    const laserR = new THREE.BufferGeometry();
    laserR.setAttribute('position', new THREE.Float32BufferAttribute(laserRVerts, 3));
    laserR.setIndex(laserIndices);

    const glG = new THREE.BufferGeometry();
    glG.setAttribute('position', new THREE.Float32BufferAttribute(glVerts, 3));
    glG.setIndex(guardrailIndices);
    glG.computeVertexNormals();

    const grG = new THREE.BufferGeometry();
    grG.setAttribute('position', new THREE.Float32BufferAttribute(grVerts, 3));
    grG.setIndex(guardrailIndices);
    grG.computeVertexNormals();

    return {
      roadGeometry: road,
      leftLineGeometry: leftLine,
      rightLineGeometry: rightLine,
      centerLineGeometry: centerLine,
      laserRailLeftGeom: laserL,
      laserRailRightGeom: laserR,
      guardrailLeftGeom: glG,
      guardrailRightGeom: grG,
      lightPostsData: lightPosts,
      overheadGantriesData: overheadGantries
    };
  }, []);

  return (
    <group name="HighwayEnvironment">
      {/* 1. Main Asphalt Highway Surface */}
      <mesh geometry={roadGeometry} receiveShadow>
        <meshStandardMaterial
          color="#0B0E0D"
          roughness={0.82}
          metalness={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. White Shoulder Solid Lines */}
      <mesh geometry={leftLineGeometry}>
        <meshBasicMaterial color="#E2E8F0" side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={rightLineGeometry}>
        <meshBasicMaterial color="#E2E8F0" side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Amber Center Dashed Divider Line */}
      <mesh geometry={centerLineGeometry}>
        <meshBasicMaterial color="#FFB347" side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Crimson Holographic Laser Edge Rails */}
      <mesh geometry={laserRailLeftGeom}>
        <meshBasicMaterial color="#FF1E40" side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={laserRailRightGeom}>
        <meshBasicMaterial color="#FF1E40" side={THREE.DoubleSide} />
      </mesh>

      {/* 5. Left and Right Guardrails */}
      <mesh geometry={guardrailLeftGeom}>
        <meshStandardMaterial color="#2B312E" metalness={0.8} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={guardrailRightGeom}>
        <meshStandardMaterial color="#2B312E" metalness={0.8} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* 6. Roadside Highway Light Posts with Amber Luminescence */}
      {lightPostsData.map((post, idx) => (
        <group key={`light-post-${idx}`} position={post.position} rotation={[0, post.rotationY, 0]}>
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 9.0, 8]} />
            <meshStandardMaterial color="#1E2421" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[1.4, 8.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.1, 3.2, 8]} />
            <meshStandardMaterial color="#1E2421" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[2.5, 9.7, 0]}>
            <boxGeometry args={[0.7, 0.2, 0.4]} />
            <meshStandardMaterial
              color="#FFB347"
              emissive="#FF8800"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      ))}

      {/* 7. Overhead Trusses spanning the highway */}
      {overheadGantriesData.map((gantry, idx) => (
        <group key={`overhead-gantry-${idx}`} position={gantry.position} rotation={[0, gantry.rotationY, 0]}>
          {/* Left Column */}
          <mesh position={[-9.5, 5.5, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 11.0, 8]} />
            <meshStandardMaterial color="#181E1B" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Right Column */}
          <mesh position={[9.5, 5.5, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 11.0, 8]} />
            <meshStandardMaterial color="#181E1B" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Crossbeam */}
          <mesh position={[0, 11.0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <boxGeometry args={[1.2, 19.5, 0.6]} />
            <meshStandardMaterial color="#121614" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Glowing Crimson Telemetry Bar across beam */}
          <mesh position={[0, 11.0, 0.35]}>
            <planeGeometry args={[18.0, 0.15]} />
            <meshBasicMaterial color="#FF1E40" />
          </mesh>
        </group>
      ))}

      {/* 8. Physical 3D Milestone Posts (KM 0 to KM 7) */}
      {HIGHWAY_MILESTONES.map((ms) => {
        const pt = HIGHWAY_SPLINE.getPointAt(ms.progress);
        const tangent = HIGHWAY_SPLINE.getTangentAt(ms.progress).normalize();
        const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
        const postPos = pt.clone().addScaledVector(right, -10.2);

        return (
          <group key={ms.id} position={[postPos.x, postPos.y, postPos.z]}>
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[1.2, 2.4, 0.6]} />
              <meshStandardMaterial color="#161B19" roughness={0.6} metalness={0.3} />
            </mesh>
            <mesh position={[0, 1.6, 0.32]}>
              <planeGeometry args={[1.0, 0.9]} />
              <meshBasicMaterial color={ms.color} />
            </mesh>
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshBasicMaterial color={ms.color} />
            </mesh>
          </group>
        );
      })}

      {/* 9. Ambient Cyber Terrain Grid Ground */}
      <mesh position={[0, -0.4, -1100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 2600, 32, 32]} />
        <meshStandardMaterial
          color="#050706"
          roughness={0.96}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};
