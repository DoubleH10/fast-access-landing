import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';
import { useMediaQuery } from '../hooks/useMediaQuery';
import SectionChip from '../components/brand/SectionChip';
import BrandPattern from '../components/brand/BrandPattern';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  { progress: 0.0, label: 'Receive', number: '01' },
  { progress: 0.2, label: 'Store', number: '02' },
  { progress: 0.4, label: 'Pick', number: '03' },
  { progress: 0.55, label: 'Pack', number: '04' },
  { progress: 0.75, label: 'Ship', number: '05' },
  { progress: 0.95, label: 'Deliver', number: '06' },
];

// Stage copy informed by PPT slide 11 (5-step operational arc).
// We keep the 6-stage scroll for granularity; "Receive" and "Store" map to
// PPT's "Receipt & Storage", "Pick" and "Pack" map to PPT's "Packaging".
// Stats are placeholders until real ops data lands — see /tmp/fa-replace.md
const STAGE_DATA = [
  {
    number: '01', label: 'Receive',
    headline: 'We receive your products — and you can see them instantly.',
    body: 'Inbound shipments are scanned, weighed, and slotted the moment they cross our door. Every SKU appears in your dashboard before the truck pulls away.',
    stats: [
      { value: '8m', label: 'Avg. dock-to-shelf' },   // TODO: real number
      { value: '100%', label: 'Scan accuracy' },       // TODO: real number
    ],
  },
  {
    number: '02', label: 'Store',
    headline: 'Stored safely, ready to ship.',
    body: 'Climate-controlled bays for temperature-sensitive products. Smart slotting puts fast-movers near pick-paths so urgent orders go out first.',
    stats: [
      { value: 'TBD', label: 'Fulfillment centers' },  // TODO: replace with real KSA centre count
      { value: 'TBD', label: 'Total capacity (sq m)' },
    ],
  },
  {
    number: '03', label: 'Pick',
    headline: 'The right unit, from the right slot, every time.',
    body: 'Pick paths optimise across orders in real time. Human accuracy where it counts, system speed where it scales.',
    stats: [
      { value: 'TBD', label: 'Pick accuracy' },
      { value: 'TBD', label: 'Avg. pick time' },
    ],
  },
  {
    number: '04', label: 'Pack',
    headline: 'Packed with your brand identity, every time.',
    body: 'Durable packaging that protects the product, with your inserts, cards, and gift options stamped right on every box.',
    stats: [
      { value: '100%', label: 'Branded packaging' },
      { value: 'TBD', label: 'Damage rate' },
    ],
  },
  {
    number: '05', label: 'Ship',
    headline: 'The best carrier for every route — automatically.',
    body: 'We work with the strongest local and international carriers across Saudi Arabia and beyond. Service rules you set; savings you keep.',
    stats: [
      { value: 'TBD', label: 'Carrier integrations' },
      { value: 'TBD', label: 'Avg. label savings' },
    ],
  },
  {
    number: '06', label: 'Deliver',
    headline: 'On the doorstep — tracked, proven, on time.',
    body: 'Real-time tracking your shoppers actually read. Same-day delivery from cloud stores in 2-4 hours. Performance reports for you.',
    stats: [
      { value: '2-4hr', label: 'Same-day window' },
      { value: 'TBD', label: 'On-time rate' },
    ],
  },
];

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [currentStageNum, setCurrentStageNum] = useState(1);
  const [stageData, setStageData] = useState(STAGE_DATA[0]);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { ref: introRef, isInView: introInView } = useInView(0.2);

  const journeyHeight = isMobile ? '400vh' : isTablet ? '500vh' : '600vh';

  const updateStage = useCallback((progress: number) => {
    const stageIdx = Math.min(Math.floor(progress * 6), 5);
    setCurrentStageNum(stageIdx + 1);
    setStageData(STAGE_DATA[stageIdx]);
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
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(isMobileDevice ? 1.5 : 2, window.devicePixelRatio));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const curve = new THREE.CatmullRomCurve3(splinePoints);
    curve.tension = 0.5;
    const tubeSegments = isMobileDevice ? 100 : 200;
    const pathPoints = curve.getPoints(tubeSegments);

    // Glowing cable
    const tubeGeo = new THREE.TubeGeometry(curve, tubeSegments, 0.04, isMobileDevice ? 6 : 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0.12, depthWrite: false });
    scene.add(new THREE.Mesh(tubeGeo, tubeMat));

    const lineGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xF15B41, transparent: true, opacity: 0.35, depthWrite: false });
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

    // Package mesh
    const pkgSize = isMobileDevice ? 0.6 : 0.5;
    const pkgGeo = new THREE.BoxGeometry(pkgSize, pkgSize, pkgSize);
    const pkgShader = new THREE.ShaderMaterial({
      vertexShader: wireframeVertexShader,
      fragmentShader: wireframeFragmentShader,
      uniforms: { uTime: { value: 0 }, uColor1: { value: new THREE.Vector3(0.15, 0.15, 0.35) }, uColor2: { value: new THREE.Vector3(1.0, 0.42, 0.21) } },
      transparent: true, side: THREE.DoubleSide, depthWrite: false,
    });
    const packageMesh = new THREE.Mesh(pkgGeo, pkgShader);
    scene.add(packageMesh);

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

      pkgShader.uniforms.uTime.value = elapsed;
      const pos = curve.getPointAt(Math.min(progress, 0.999));
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

      tubeMat.opacity = Math.min(progress * 1.5, 1) * 0.12;
      lineMat.opacity = Math.min(progress * 1.5, 1) * 0.35;

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
      {/* Intro — dark with brand stepped ribbon accent */}
      <div ref={introRef} className="relative bg-fa-liberty-blue section-padding overflow-hidden">
        <BrandPattern
          pattern="ribbon"
          tint="orange"
          opacity={0.22}
          className="absolute -bottom-[15%] -right-[5%] w-[80%] max-w-none"
        />
        <BrandPattern
          pattern="lozenge"
          tint="white"
          opacity={0.04}
          className="absolute top-[15%] -right-[20%] w-[55%] max-w-[800px]"
        />
        <div className="container-main relative z-10">
          <div className="mb-5" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out' }}>
            <SectionChip onDark>The Package Journey</SectionChip>
          </div>
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] lg:text-[56px] text-fa-classic-chalk leading-[1.05] tracking-[-0.02em] max-w-[800px]" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 600ms ease-out 100ms' }}>
            Every order, <span className="text-fa-orange-soda">tracked</span> across six steps.
          </h2>
          <p className="font-body mt-5 text-base sm:text-lg text-fa-classic-chalk/65 max-w-[560px] leading-[1.55]" style={{ opacity: introInView ? 1 : 0, transform: introInView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 500ms ease-out 200ms' }}>
            From receiving to delivery, your inventory moves through our intelligent network with real-time visibility at every stage.
          </p>
        </div>
      </div>

      {/* Journey sticky section */}
      <div ref={wrapperRef} className="relative" style={{ height: journeyHeight, backgroundColor: '#0D1232' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(255,255,255,0.012) 48px, rgba(255,255,255,0.012) 49px)' }} />

        <div ref={stickyRef} className="h-screen w-full relative overflow-hidden">
          <div ref={canvasContainerRef} className="absolute inset-0" style={{ zIndex: 1 }} />

          <a href="#numbers" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F4F4F1] focus:text-[#0D1232] focus:rounded-lg">Skip journey</a>

          {/* Progress chip */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(13,18,50,0.7)', backdropFilter: 'blur(12px)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F15B41]" style={{ animation: 'pulse-glow 2s infinite' }} />
            <span className="font-mono text-[10px] text-[#F15B41] tracking-wider">Stage {String(currentStageNum).padStart(2, '0')}</span>
            <span className="text-[10px] text-[#F4F4F1]/60 font-medium">/ 06</span>
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
              <span className="font-mono text-[11px] text-[#F15B41]">{stageData.number}</span>
              <span className="text-[11px] font-semibold text-[#0D1232] uppercase tracking-wide">{stageData.label}</span>
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#0D1232] leading-snug">{stageData.headline}</h3>
            <p className="text-xs sm:text-sm text-[#6b6b7b] leading-relaxed mt-2" style={{ display: '-webkit-box', WebkitLineClamp: isMobile ? 3 : 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {stageData.body}
            </p>
            {/* Stage stats */}
            <div className="flex items-center gap-5 mt-3 pt-3 border-t border-[#e8e8e8]">
              {stageData.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[15px] text-[#0D1232] leading-none">{s.value}</div>
                  <div className="text-[9px] font-medium text-[#8a8a9a] uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 h-1 rounded-full bg-[#e8e8e8] overflow-hidden">
              <div className="h-full rounded-full bg-[#F15B41] transition-all duration-100" style={{ width: `${journeyProgress * 100}%` }} />
            </div>
          </div>

          {/* Desktop sidebar dots */}
          {isDesktop && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
              <span className="font-mono text-xs text-[#F15B41] tracking-wider">{String(currentStageNum).padStart(2, '0')} / 06</span>
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
