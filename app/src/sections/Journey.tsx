import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import SectionChip from '../components/brand/SectionChip';
import { useT } from '../i18n/I18nContext';

gsap.registerPlugin(ScrollTrigger);

// Five operational stages from the new PPT (slide 11). Copy is pulled from the
// bilingual `steps` i18n block at render time, so the 3D journey speaks EN + AR.
const STAGES = [
  { progress: 0.0,  number: '01' },
  { progress: 0.25, number: '02' },
  { progress: 0.5,  number: '03' },
  { progress: 0.72, number: '04' },
  { progress: 0.92, number: '05' },
];
const STAGE_COUNT = STAGES.length;

const splinePoints = [
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(-6, 2, -3),
  new THREE.Vector3(-2, -1, 2),
  new THREE.Vector3(2, 1, -2),
  new THREE.Vector3(6, -2, 3),
  new THREE.Vector3(10, 0, 0),
];

const wireframeVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const wireframeFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  varying vec2 vUv;
  void main() {
    float lineWidth = 0.025;
    float repeat = 24.0;
    vec2 coord = fract(vUv * repeat);
    float gridX = smoothstep(0.0, lineWidth, coord.x) * smoothstep(lineWidth * 2.0, lineWidth, coord.x);
    float gridY = smoothstep(0.0, lineWidth, coord.y) * smoothstep(lineWidth * 2.0, lineWidth, coord.y);
    float wireframe = 1.0 - min(gridX, gridY);
    float diagonalUV = (vUv.x + vUv.y) * 12.0;
    float diagonalLine = fract(diagonalUV);
    float diagonal = smoothstep(0.0, 0.04, diagonalLine) * smoothstep(0.08, 0.04, diagonalLine);
    float diagonalIntensity = 0.5 + 0.5 * sin(uTime * 0.5);
    float scanLine = smoothstep(0.48, 0.5, vUv.y) * smoothstep(0.52, 0.5, vUv.y);
    float scanLineIntensity = 0.8 + 0.2 * sin(uTime * 2.0);
    float glow = exp(-abs(vUv.y - 0.5) * 10.0) * 0.4;
    float gridIntensity = 0.7 + 0.3 * sin(uTime * 0.3 + vUv.x * 5.0);
    vec3 finalColor = mix(uColor1, uColor2, vUv.x);
    float wireframeIntensity = wireframe * gridIntensity + glow;
    float hatch = diagonal * diagonalIntensity;
    float alpha = wireframeIntensity;
    alpha = max(alpha, hatch);
    alpha = max(alpha, scanLine * scanLineIntensity);
    gl_FragColor = vec4(finalColor, min(alpha, 1.0));
  }
`;

export default function Journey() {
  const { t } = useT();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { ref: introRef, isInView: introInView } = useInView(0.2);

  const journeyHeight = isMobile ? '400vh' : isTablet ? '500vh' : '600vh';

  const updateStage = useCallback((progress: number) => {
    const stageIdx = Math.min(Math.floor(progress * STAGE_COUNT), STAGE_COUNT - 1);
    setCurrentStageNum(stageIdx + 1);
    setJourneyProgress(progress);
  }, []);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const isMobileDevice = window.innerWidth < 768;
    const isTabletDevice = window.innerWidth >= 768 && window.innerWidth < 1024;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0D1232, isMobileDevice ? 0.045 : 0.035);

    const fov = isMobileDevice ? 55 : 45;
    const camera = new THREE.PerspectiveCamera(fov, container.clientWidth / container.clientHeight, 0.1, 1000);
    // Initial camera position is set after the curve is built (below).

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(isMobileDevice ? 1.5 : 2, window.devicePixelRatio));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const curve = new THREE.CatmullRomCurve3(splinePoints);
    curve.tension = 0.5;
    const tubeSegments = isMobileDevice ? 100 : 200;
    const pathPoints = curve.getPoints(tubeSegments);

    // Frame the camera on the start of the curve so the package and path
    // are in view the moment the pinned canvas mounts — no empty-navy void.
    {
      const camY = isMobileDevice ? 2.5 : isTabletDevice ? 3 : 3.5;
      const camZ = isMobileDevice ? 7 : isTabletDevice ? 8 : 9;
      const start = curve.getPointAt(0.02);
      const lookStart = curve.getPointAt(0.06);
      camera.position.set(start.x, start.y + camY, start.z + camZ);
      camera.lookAt(lookStart);
    }

    // Glowing cable
    const tubeGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.04, isMobileDevice ? 6 : 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0.12, depthWrite: false });
    scene.add(new THREE.Mesh(tubeGeo, tubeMat));

    // Path line with per-vertex colors so the portion behind the package
    // reads as "completed" (bright orange) and the portion ahead reads as
    // "remaining" (dim). Updated per-frame in the animate loop.
    const lineGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const lineColors = new Float32Array(pathPoints.length * 3);
    for (let i = 0; i < pathPoints.length; i++) {
      lineColors[i * 3]     = 0.6;  // dim default
      lineColors[i * 3 + 1] = 0.22;
      lineColors[i * 3 + 2] = 0.16;
    }
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.6, depthWrite: false });
    scene.add(new THREE.Line(lineGeo, lineMat));

    // Grid floor
    const gridSize = isMobileDevice ? 20 : 30;
    const gridDiv = isMobileDevice ? 20 : 30;
    const gridHelper = new THREE.GridHelper(gridSize, gridDiv, 0x1D2556, 0x1D2556);
    gridHelper.position.y = -2;
    (gridHelper.material as THREE.Material).opacity = 0.12;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).depthWrite = false;
    scene.add(gridHelper);

    // Package mesh — the Fast Access brandmark as a 3D box. Bigger than before,
    // with the full mark (orange swoosh + navy hex + diamond) on every face so it
    // reads as the logo from any angle as it travels the route.
    const pkgSize = isMobileDevice ? 0.95 : 0.9;
    const pkgGeo = new THREE.BoxGeometry(pkgSize, pkgSize, pkgSize);

    // One brandmark texture, used on all six faces.
    const makeMarkTexture = () => {
      const S = 512;
      const c = document.createElement('canvas');
      c.width = S; c.height = S;
      const g = c.getContext('2d')!;
      // clean brand cream base + subtle crafted edge
      g.fillStyle = '#F4F4F1';
      g.fillRect(0, 0, S, S);
      g.strokeStyle = 'rgba(13,18,50,0.10)';
      g.lineWidth = 10;
      g.strokeRect(8, 8, S - 16, S - 16);

      const cx = 256, cy = 268, k = 1.55; // scale the mark up to fill the face
      // orange swoosh — two stepped bars entering from the upper-left
      g.fillStyle = '#F15B41';
      g.fillRect(cx - 96 * k, cy - 132 * k * 0.62, 96 * k, 22 * k);
      g.fillRect(cx + 14 * k, cy - 132 * k * 0.62, 58 * k, 22 * k);
      // navy hexagon box mark
      g.fillStyle = '#0D1232';
      g.beginPath();
      g.moveTo(cx,           cy - 78 * k);
      g.lineTo(cx + 80 * k,  cy - 30 * k);
      g.lineTo(cx + 80 * k,  cy + 56 * k);
      g.lineTo(cx,           cy + 104 * k);
      g.lineTo(cx - 80 * k,  cy + 56 * k);
      g.lineTo(cx - 80 * k,  cy - 30 * k);
      g.closePath();
      g.fill();
      // diamond cut-out (cream), offset right like the logo slit
      g.fillStyle = '#F4F4F1';
      g.beginPath();
      g.moveTo(cx + 26 * k, cy - 4 * k);
      g.lineTo(cx + 58 * k, cy + 20 * k);
      g.lineTo(cx + 26 * k, cy + 44 * k);
      g.lineTo(cx - 6 * k,  cy + 20 * k);
      g.closePath();
      g.fill();

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      return tex;
    };

    const markTex = makeMarkTexture();
    const mkMat = () => new THREE.MeshStandardMaterial({ map: markTex, roughness: 0.55, metalness: 0.05 });
    // BoxGeometry face order: +x, -x, +y, -y, +z, -z — same mark on all six.
    const pkgMaterials = [mkMat(), mkMat(), mkMat(), mkMat(), mkMat(), mkMat()];
    const packageMesh = new THREE.Mesh(pkgGeo, pkgMaterials);
    scene.add(packageMesh);

    // Real lighting for the box (MeshStandardMaterial needs real lights)
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xF15B41, 0.35);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    // Keep the shader vars defined for compatibility with later references
    void wireframeVertexShader; void wireframeFragmentShader;

    const packageLight = new THREE.PointLight(0xF15B41, 0.8, 6);
    scene.add(packageLight);

    // Glow trail
    const trailCount = isMobileDevice ? 40 : 80;
    const trailPositions = new Float32Array(trailCount * 3);
    const trailAlphas = new Float32Array(trailCount);
    for (let i = 0; i < trailCount; i++) trailAlphas[i] = 1.0 - i / trailCount;

    const trailVShader = `attribute float alpha; varying float vAlpha; void main(){vAlpha=alpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_PointSize=${isMobileDevice ? '5.0' : '6.0'};}`;
    const trailFShader = `varying float vAlpha; uniform vec3 uColor; void main(){float d=length(gl_PointCoord-0.5);float strength=1.0-smoothstep(0.0,0.5,d);gl_FragColor=vec4(uColor,strength*vAlpha*0.6);}`;
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute('alpha', new THREE.BufferAttribute(trailAlphas, 1));
    const trailMat = new THREE.ShaderMaterial({
      vertexShader: trailVShader, fragmentShader: trailFShader,
      uniforms: { uColor: { value: new THREE.Vector3(1.0, 0.42, 0.21) } },
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(trailGeo, trailMat));

    // Stage markers
    const markers: THREE.Mesh[] = [];
    const markerLights: THREE.PointLight[] = [];
    const mRingSize = isMobileDevice ? 0.3 : 0.25;
    STAGES.forEach((stage) => {
      const pos = curve.getPointAt(stage.progress);
      const ringGeo = new THREE.TorusGeometry(mRingSize, 0.03, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0.35, depthWrite: false });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().add(new THREE.Vector3(0, 1, 0)));
      scene.add(ring);
      markers.push(ring);

      const light = new THREE.PointLight(0xF15B41, 0, 5);
      light.position.copy(pos);
      scene.add(light);
      markerLights.push(light);
    });

    // === Destination assembly at the end of the curve ===
    // Landing pad (flat ring on the ground), vertical light pillar, a
    // shockwave ring that expands+fades while the user lingers at the end,
    // and a bright point light. All start invisible and ramp up as the
    // package approaches stage 06 (progress >= ~0.75).
    const endPos = curve.getPointAt(1.0);

    const padGeo = new THREE.RingGeometry(0.45, 0.95, 48);
    const padMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const destPad = new THREE.Mesh(padGeo, padMat);
    destPad.position.set(endPos.x, endPos.y - 0.32, endPos.z);
    destPad.rotation.x = -Math.PI / 2;
    scene.add(destPad);

    const padCoreGeo = new THREE.CircleGeometry(0.42, 32);
    const padCoreMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const destPadCore = new THREE.Mesh(padCoreGeo, padCoreMat);
    destPadCore.position.set(endPos.x, endPos.y - 0.31, endPos.z);
    destPadCore.rotation.x = -Math.PI / 2;
    scene.add(destPadCore);

    const pillarGeo = new THREE.CylinderGeometry(0.06, 0.55, 4.5, 24, 1, true);
    const pillarMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const destPillar = new THREE.Mesh(pillarGeo, pillarMat);
    destPillar.position.set(endPos.x, endPos.y + 1.9, endPos.z);
    scene.add(destPillar);

    const shockGeo = new THREE.RingGeometry(0.5, 0.6, 64);
    const shockMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
    const destShock = new THREE.Mesh(shockGeo, shockMat);
    destShock.position.set(endPos.x, endPos.y - 0.30, endPos.z);
    destShock.rotation.x = -Math.PI / 2;
    scene.add(destShock);

    const destLight = new THREE.PointLight(0xF15B41, 0, 9);
    destLight.position.set(endPos.x, endPos.y + 0.5, endPos.z);
    scene.add(destLight);

    // Particles
    const particleCount = isMobileDevice ? 30 : 60;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * (isMobileDevice ? 20 : 30);
      pPositions[i * 3 + 1] = Math.random() * 8 - 2;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * (isMobileDevice ? 15 : 20);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xF15B41, size: 0.06, transparent: true, opacity: 0.25, depthWrite: false, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(pGeo, pMat));

    scene.add(new THREE.AmbientLight(0x1D2556, 0.5));

    // ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: wrapper, start: 'top top', end: 'bottom bottom',
      scrub: isMobileDevice ? 1 : 1.5, pin: stickyRef.current,
      onUpdate: (self) => { progressRef.current = self.progress; updateStage(self.progress); },
    });

    // Animation loop
    const clock = new THREE.Clock();
    let animId: number;
    let isVisible = true;
    const visObs = new IntersectionObserver(([e]) => { isVisible = e.isIntersecting; }, { threshold: 0 });
    visObs.observe(wrapper);

    const trailHistory: THREE.Vector3[] = [];

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const elapsed = clock.getElapsedTime();
      const progress = progressRef.current;

      // Gentle box rotation as it travels — like a package in motion.
      // In the final 5% of the journey we slow rotation toward identity
      // so the box "settles" upright onto the destination pad.
      const settle = progress > 0.95 ? Math.min((progress - 0.95) / 0.05, 1) : 0;
      packageMesh.rotation.y = THREE.MathUtils.lerp(elapsed * 0.4, 0, settle);
      packageMesh.rotation.x = THREE.MathUtils.lerp(Math.sin(elapsed * 0.6) * 0.15, 0, settle);
      const pos = curve.getPointAt(Math.min(progress, 0.999));
      // Gently lower the package onto the pad on arrival
      pos.y -= settle * 0.25;
      packageMesh.position.copy(pos);
      packageLight.position.copy(pos);

      trailHistory.unshift(pos.clone());
      if (trailHistory.length > trailCount) trailHistory.pop();
      const tArr = trailGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < Math.min(trailHistory.length, trailCount); i++) {
        tArr[i * 3] = trailHistory[i].x;
        tArr[i * 3 + 1] = trailHistory[i].y;
        tArr[i * 3 + 2] = trailHistory[i].z;
      }
      trailGeo.attributes.position.needsUpdate = true;

      const camY = isMobileDevice ? 2.5 : isTabletDevice ? 3 : 3.5;
      const camZ = isMobileDevice ? 7 : isTabletDevice ? 8 : 9;
      const lookA = Math.min(progress + 0.06, 0.999);
      const camP = Math.min(progress + 0.02, 0.999);
      const targetPos = curve.getPointAt(lookA);
      const camCurvePos = curve.getPointAt(camP);
      const ideal = new THREE.Vector3(camCurvePos.x, camCurvePos.y + camY, camCurvePos.z + camZ);
      camera.position.lerp(ideal, 0.08);
      camera.lookAt(targetPos);

      // Path is always drawn — opacity used to ramp from 0 at progress=0,
      // which left a navy void at section entry. Keep a steady visible base
      // and lift slightly as the journey advances so it still feels alive.
      tubeMat.opacity = 0.18 + Math.min(progress, 1) * 0.10;
      lineMat.opacity = 0.55 + Math.min(progress, 1) * 0.25;

      // Done-vs-remaining path tint: vertices behind the package glow bright
      // orange; vertices ahead stay dim. Gives a clear sense of progress.
      const colorArr = lineGeo.attributes.color.array as Float32Array;
      for (let i = 0; i < pathPoints.length; i++) {
        const t = i / (pathPoints.length - 1);
        if (t <= progress) {
          colorArr[i * 3]     = 1.00; // F15B41 bright
          colorArr[i * 3 + 1] = 0.36;
          colorArr[i * 3 + 2] = 0.25;
        } else {
          colorArr[i * 3]     = 0.55; // dim ahead
          colorArr[i * 3 + 1] = 0.20;
          colorArr[i * 3 + 2] = 0.15;
        }
      }
      lineGeo.attributes.color.needsUpdate = true;

      // Destination assembly — ramps up as the package approaches, pulses
      // while you linger at the end. arrivalT goes 0→1 across progress 0.75→1.0.
      const arrivalT = Math.max(0, Math.min((progress - 0.75) / 0.25, 1));
      const pulse = 0.65 + Math.sin(elapsed * 2.2) * 0.35;
      padMat.opacity     = arrivalT * 0.55 * pulse;
      padCoreMat.opacity = arrivalT * 0.25 * pulse;
      pillarMat.opacity  = arrivalT * 0.16 * (0.7 + pulse * 0.3);
      destLight.intensity = arrivalT * 1.8 * pulse;
      destPad.scale.setScalar(1 + arrivalT * Math.sin(elapsed * 2.2) * 0.04);
      // Shockwave: only visible in the last ~5% of scroll; expands outward and fades
      const shockT = progress > 0.95 ? ((progress - 0.95) / 0.05) : 0;
      // continuous expanding ring driven by time once we're in the arrival zone
      const shockPhase = shockT > 0 ? ((elapsed * 0.8) % 1) : 0;
      destShock.scale.setScalar(1 + shockPhase * 3.2);
      shockMat.opacity = shockT * (1 - shockPhase) * 0.7;

      const cIdx = Math.min(Math.floor(progress * 6), 5);
      markers.forEach((marker, i) => {
        const mat = marker.material as THREE.MeshBasicMaterial;
        const light = markerLights[i];
        if (i === cIdx) { const pulse = 0.6 + Math.sin(elapsed * 3) * 0.3; mat.opacity = pulse; light.intensity = pulse * 0.6; marker.scale.setScalar(1 + Math.sin(elapsed * 3) * 0.1); }
        else if (i < cIdx) { mat.opacity = 0.2; light.intensity = 0.1; marker.scale.setScalar(1); }
        else { mat.opacity = 0.1; light.intensity = 0; marker.scale.setScalar(1); }
      });

      const pArr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) pArr[i * 3 + 1] += Math.sin(elapsed * 0.5 + i) * 0.002;
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      trigger.kill();
      visObs.disconnect();
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [isMobile, isTablet, isDesktop, updateStage]);

  return (
    <section id="platform">
      {/* Intro — dark, kept quiet so the 3D canvas below is the visual.
          We previously had a decorative stepped-ribbon BrandPattern here that
          read as the start of a journey path and trailed into nothing — it
          made the section feel disconnected from the 3D scene that follows. */}
      <div ref={introRef} className="relative bg-fa-cream overflow-hidden pt-20 lg:pt-28 pb-10 lg:pb-14">
        <div className="container-main relative z-10 text-left rtl:text-right">
          <div className="mb-5" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
            <SectionChip>{t('journey.chip')}</SectionChip>
          </div>
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-liberty-blue leading-[1.05] tracking-[-0.02em] max-w-[800px]" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
            {t('journey.headlineA')}{' '}
            <span className="text-fa-orange-soda">{t('journey.headlineHighlight')}</span>{' '}
            {t('journey.headlineB')}
          </h2>
          <p className="font-body mt-5 text-base sm:text-lg text-fa-ink-muted max-w-[560px] leading-[1.55]" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
            {t('journey.body')}
          </p>
        </div>
      </div>

      {/* Journey sticky section */}
      <div ref={wrapperRef} className="relative" style={{ height: journeyHeight, background: 'linear-gradient(to bottom, var(--bg-cream-deep) 0%, #0D1232 15%, #0D1232 85%, var(--bg-paper) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.012) 48px, rgba(255,255,255,0.012) 49px)' }} />

        <div ref={stickyRef} className="h-screen w-full relative overflow-hidden">
          <div ref={canvasContainerRef} className="absolute inset-0" style={{ zIndex: 1 }} />

          <a href="#numbers" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F4F4F1] focus:text-[#0D1232] focus:rounded-lg">Skip journey</a>

          {/* Progress chip */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(13,18,50,0.7)', backdropFilter: 'blur(12px)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15B41]" style={{ animation: 'pulse-glow 2s infinite' }} />
            <span className="font-mono text-[10px] text-[#F15B41] tracking-wider">Stage {String(currentStageNum).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#F4F4F1]/60 font-medium">/ 05</span>
          </div>

          {/* Stage detail card */}
          <div
            className="absolute z-10"
            style={{
              bottom: isMobile ? 16 : 24, left: isMobile ? '50%' : 24,
              transform: isMobile ? 'translateX(-50%)' : 'none',
              width: isMobile ? 'calc(100% - 32px)' : isTablet ? 280 : 380,
              maxWidth: 420,
              background: 'rgba(244,244,241,0.96)', backdropFilter: 'blur(20px)',
              borderRadius: 14, padding: isMobile ? 18 : 24,
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[11px] text-[#F15B41]">{String(currentStageNum).padStart(2, '0')}</span>
              <span className="text-[11px] font-semibold text-[#0D1232] uppercase tracking-wide">{t(`steps.items.${currentStageNum - 1}.title`)}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6b7b] leading-relaxed mt-1" style={{ display: '-webkit-box', WebkitLineClamp: isMobile ? 3 : 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {t(`steps.items.${currentStageNum - 1}.body`)}
            </p>
            <div className="mt-3 h-1 rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#F15B41] transition-all duration-100" style={{ width: `${journeyProgress * 100}%` }} />
            </div>
          </div>

          {/* Desktop sidebar dots */}
          {isDesktop && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
              <span className="font-mono text-xs text-[#F15B41] tracking-wider">{String(currentStageNum).padStart(2, '0')} / 05</span>
              <div className="flex flex-col gap-2.5">
                {STAGES.map((stage, i) => (
                  <div key={stage.number} className="relative transition-all duration-300" style={{ width: i + 1 === currentStageNum ? 10 : 8, height: i + 1 === currentStageNum ? 10 : 8, borderRadius: '50%', backgroundColor: i + 1 <= currentStageNum ? '#F15B41' : 'transparent', border: i + 1 <= currentStageNum ? 'none' : '1px solid rgba(244,244,241,0.25)', boxShadow: i + 1 === currentStageNum ? '0 0 12px rgba(241,91,65,0.6)' : 'none' }} />
                ))}
              </div>
            </div>
          )}

          {/* Scroll hint mobile */}
          {isMobile && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center md:hidden">
              <div className="w-4 h-6 border border-white/25 rounded-full flex justify-center pt-1">
                <div className="w-1 h-1.5 bg-white/40 rounded-full" style={{ animation: 'scroll-hint 1.5s infinite' }} />
              </div>
              <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1.5">Scroll</span>
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse-glow{0%,100%{box-shadow:0 0 4px rgba(241,91,65,0.5)}50%{box-shadow:0 0 12px rgba(241,91,65,0.9)}}@keyframes scroll-hint{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(5px);opacity:1}}`}</style>
    </section>
  );
}
