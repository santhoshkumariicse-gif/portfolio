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
    guardrailLeftGeom,
    guardrailRightGeom,
    lightPostsData
  } = useMemo(() => {
    const SEGMENTS = 280;
    const ROAD_WIDTH = 14.0;
    const HALF_WIDTH = ROAD_WIDTH / 2;
    const upVector = new THREE.Vector3(0, 1, 0);

    // Positions & Indices for Road Surface
    const roadVerts: number[] = [];
    const roadUVs: number[] = [];
    const roadIndices: number[] = [];

    // Left Edge Solid Line
    const leftLineVerts: number[] = [];
    const leftLineIndices: number[] = [];

    // Right Edge Solid Line
    const rightLineVerts: number[] = [];
    const rightLineIndices: number[] = [];

    // Center Dashed Line
    const centerLineVerts: number[] = [];
    const centerLineIndices: number[] = [];

    // Guardrail Left & Right
    const glVerts: number[] = [];
    const grVerts: number[] = [];
    const guardrailIndices: number[] = [];

    // Light poles along road
    const lightPosts: { position: [number, number, number]; rotationY: number }[] = [];

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
      roadUVs.push(0, t * 70, 1, t * 70);

      // Left Solid White Edge Line (offset 0.02 above road to prevent Z-fighting)
      const l1 = pt.clone().addScaledVector(right, -HALF_WIDTH + 0.3).add(new THREE.Vector3(0, 0.02, 0));
      const l2 = pt.clone().addScaledVector(right, -HALF_WIDTH + 0.6).add(new THREE.Vector3(0, 0.02, 0));
      leftLineVerts.push(l1.x, l1.y, l1.z, l2.x, l2.y, l2.z);

      // Right Solid White Edge Line
      const r1 = pt.clone().addScaledVector(right, HALF_WIDTH - 0.6).add(new THREE.Vector3(0, 0.02, 0));
      const r2 = pt.clone().addScaledVector(right, HALF_WIDTH - 0.3).add(new THREE.Vector3(0, 0.02, 0));
      rightLineVerts.push(r1.x, r1.y, r1.z, r2.x, r2.y, r2.z);

      // Center Amber Dashed Line (dashed every alternate 2 segments)
      const isDash = (i % 4) < 2;
      const c1 = pt.clone().addScaledVector(right, -0.15).add(new THREE.Vector3(0, 0.025, 0));
      const c2 = pt.clone().addScaledVector(right, 0.15).add(new THREE.Vector3(0, 0.025, 0));
      if (isDash) {
        centerLineVerts.push(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z);
      } else {
        // degenerate quad to leave gap in dash
        centerLineVerts.push(c1.x, c1.y, c1.z, c1.x, c1.y, c1.z);
      }

      // Guardrail Barriers (height = 1.0 above road edge)
      const gl = pt.clone().addScaledVector(right, -HALF_WIDTH - 0.8).add(new THREE.Vector3(0, 0.9, 0));
      const gr = pt.clone().addScaledVector(right, HALF_WIDTH + 0.8).add(new THREE.Vector3(0, 0.9, 0));
      glVerts.push(gl.x, gl.y, gl.z, gl.x, gl.y - 0.3, gl.z);
      grVerts.push(gr.x, gr.y, gr.z, gr.x, gr.y - 0.3, gr.z);

      // Light post placed every 14 segments
      if (i % 14 === 0 && i < SEGMENTS) {
        const postSide = (i / 14) % 2 === 0 ? 1 : -1;
        const postPos = pt.clone().addScaledVector(right, postSide * (HALF_WIDTH + 2.5));
        const angle = Math.atan2(tangent.x, tangent.z);
        lightPosts.push({
          position: [postPos.x, postPos.y, postPos.z],
          rotationY: angle + (postSide > 0 ? -Math.PI / 2 : Math.PI / 2)
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
      guardrailLeftGeom: glG,
      guardrailRightGeom: grG,
      lightPostsData: lightPosts
    };
  }, []);

  return (
    <group name="HighwayEnvironment">
      {/* 1. Main Asphalt Highway Surface */}
      <mesh geometry={roadGeometry} receiveShadow>
        <meshStandardMaterial
          color="#0C0D0A"
          roughness={0.78}
          metalness={0.2}
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

      {/* 3. Amber/Crimson Center Dashed Divider Line */}
      <mesh geometry={centerLineGeometry}>
        <meshBasicMaterial color="#FFB347" side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Left and Right Guardrails */}
      <mesh geometry={guardrailLeftGeom}>
        <meshStandardMaterial color="#33373B" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={guardrailRightGeom}>
        <meshStandardMaterial color="#33373B" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 5. Roadside Highway Light Posts with Amber/Cyan Luminescence */}
      {lightPostsData.map((post, idx) => (
        <group key={`light-post-${idx}`} position={post.position} rotation={[0, post.rotationY, 0]}>
          {/* Vertical Pole */}
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.12, 0.16, 9.0, 8]} />
            <meshStandardMaterial color="#2B303A" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Overhanging Cantilever Arm */}
          <mesh position={[1.4, 8.8, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.1, 3.2, 8]} />
            <meshStandardMaterial color="#2B303A" metalness={0.8} roughness={0.4} />
          </mesh>
          {/* Luminaire Fixture */}
          <mesh position={[2.5, 9.7, 0]}>
            <boxGeometry args={[0.7, 0.2, 0.4]} />
            <meshStandardMaterial
              color="#FFB347"
              emissive="#FF8800"
              emissiveIntensity={2.5}
            />
          </mesh>
        </group>
      ))}

      {/* 6. Physical 3D Milestone Posts (KM 0 to KM 7) */}
      {HIGHWAY_MILESTONES.map((ms) => {
        const pt = HIGHWAY_SPLINE.getPointAt(ms.progress);
        const tangent = HIGHWAY_SPLINE.getTangentAt(ms.progress).normalize();
        const right = new THREE.Vector3().crossVectors(tangent, new THREE.Vector3(0, 1, 0)).normalize();
        const postPos = pt.clone().addScaledVector(right, -9.5); // Placed on left shoulder

        return (
          <group key={ms.id} position={[postPos.x, postPos.y, postPos.z]}>
            {/* Concrete Highway Milepost Plinth */}
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[1.2, 2.4, 0.6]} />
              <meshStandardMaterial color="#1E2320" roughness={0.6} metalness={0.2} />
            </mesh>

            {/* Glowing KM Indicator Plaque */}
            <mesh position={[0, 1.6, 0.32]}>
              <planeGeometry args={[1.0, 0.9]} />
              <meshBasicMaterial color={ms.color} />
            </mesh>

            {/* Pulsing Holographic Beacon Atop Milepost */}
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.2, 12, 12]} />
              <meshBasicMaterial color={ms.color} />
            </mesh>
          </group>
        );
      })}

      {/* 7. Ambient Cyber Terrain Grid Ground */}
      <mesh position={[0, -0.4, -1100]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[450, 2400, 32, 32]} />
        <meshStandardMaterial
          color="#060807"
          roughness={0.95}
          metalness={0.1}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};

