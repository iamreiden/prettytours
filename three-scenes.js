/**
 * PRETTY TOURS — Three.js Scene Manager
 * Scènes 3D avec shaders GLSL pour le site narratif immersif
 */

(function () {
  'use strict';

  // ─── GLSL Shaders ─────────────────────────────────────────────────────────

  const OCEAN_VERT = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float u_time;
    uniform float u_depth;

    float wave(vec2 p, float freq, float speed, float amp) {
      return sin(p.x * freq + u_time * speed)
           * cos(p.y * freq * 0.8 + u_time * speed * 0.7) * amp;
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float w  = wave(pos.xy, 1.2, 0.6, 0.40);
           w  += wave(pos.xy, 2.5, 1.0, 0.18);
           w  += wave(pos.xy, 5.0, 0.8, 0.08);
           w  *= (1.0 - u_depth);
      pos.z    += w;
      vElevation = w;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const OCEAN_FRAG = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float u_time;
    uniform float u_depth;

    void main() {
      vec3 deepSea    = vec3(0.00, 0.03, 0.12);
      vec3 shallowSea = vec3(0.06, 0.42, 0.55);
      vec3 surface    = vec3(0.18, 0.72, 0.75);
      vec3 foam       = vec3(0.80, 0.95, 1.00);

      vec3 col = mix(mix(surface, shallowSea, u_depth * 0.5), deepSea, u_depth);

      float sh = sin(vUv.x * 22.0 + u_time * 1.8) * sin(vUv.y * 17.0 + u_time * 1.3);
      sh = sh * 0.5 + 0.5;
      col += sh * 0.08 * (1.0 - u_depth) * vec3(0.4, 1.0, 1.0);

      float f = smoothstep(0.18, 0.40, vElevation) * (1.0 - u_depth);
      col = mix(col, foam, f * 0.55);

      float glint = pow(max(sh - 0.7, 0.0) / 0.3, 6.0) * 0.6 * (1.0 - u_depth);
      col += glint * vec3(1.0, 0.92, 0.75);

      float caustic = abs(sin(vUv.x * 28.0 + u_time * 0.6) * sin(vUv.y * 22.0 + u_time * 0.45));
      col += caustic * u_depth * 0.2 * vec3(0.2, 0.9, 0.8);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const SKY_VERT = `
    varying vec3 vPos;
    void main() {
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const SKY_FRAG = `
    varying vec3 vPos;
    uniform float u_depth;
    void main() {
      float t = clamp((vPos.y + 60.0) / 120.0, 0.0, 1.0);
      vec3 col = mix(
        mix(vec3(0.08, 0.50, 0.70), vec3(0.00, 0.15, 0.35), t),
        mix(vec3(0.00, 0.04, 0.12), vec3(0.00, 0.01, 0.06), t),
        u_depth
      );
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const FISH_VERT = `
    attribute vec3 aRandom;
    uniform float u_time;
    void main() {
      vec3 pos   = position;
      float spd  = 0.5 + aRandom.x * 0.8;
      float rad  = 1.5 + aRandom.y * 4.0;
      float ph   = aRandom.z * 6.2832;
      pos.x += sin(u_time * spd + ph) * rad;
      pos.y += cos(u_time * spd * 0.7 + ph + 1.57) * 0.8;
      pos.z += cos(u_time * spd * 0.5 + ph) * rad * 0.6;
      vec4 mvPos  = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (2.5 + aRandom.x * 3.5) * (300.0 / -mvPos.z);
      gl_Position  = projectionMatrix * mvPos;
    }
  `;

  const FISH_FRAG = `
    uniform float u_visibility;
    uniform float u_time;
    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      if (length(uv) > 0.5) discard;
      float a   = (1.0 - length(uv) * 2.0) * u_visibility;
      float hue = fract(gl_FragCoord.x * 0.003 + u_time * 0.05);
      vec3  col = mix(vec3(0.1, 0.7, 0.9), vec3(1.0, 0.6, 0.1), hue);
      gl_FragColor = vec4(col, a);
    }
  `;

  const BUBBLE_VERT = `
    attribute float aRand;
    uniform float u_time;
    void main() {
      vec3  pos = position;
      float t   = mod(u_time * (0.3 + aRand * 0.4) + aRand * 8.0, 8.0);
      pos.y    += t * 1.5 - 4.0;
      pos.x    += sin(t * 1.5 + aRand * 6.28) * 0.35;
      vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (1.5 + aRand * 2.5) * (200.0 / -mvPos.z);
      gl_Position  = projectionMatrix * mvPos;
    }
  `;

  const BUBBLE_FRAG = `
    uniform float u_visibility;
    void main() {
      vec2  uv = gl_PointCoord - 0.5;
      float d  = length(uv);
      if (d > 0.5) discard;
      float ring  = smoothstep(0.30, 0.48, d) * (1.0 - smoothstep(0.45, 0.5, d));
      float inner = (1.0 - d * 2.0) * 0.08;
      float a     = (ring + inner) * u_visibility;
      gl_FragColor = vec4(0.75, 0.95, 1.0, a);
    }
  `;

  const TERRAIN_VERT = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float u_time;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
        f.y
      );
    }

    void main() {
      vUv = uv;
      vec3 pos = position;
      float n = noise(pos.xy * 2.0)        * 0.500
              + noise(pos.xy * 4.0 + 1.7)  * 0.250
              + noise(pos.xy * 8.0 + 3.3)  * 0.125;
      n += sin(u_time * 0.15 + pos.x) * 0.03;
      pos.z    += n * 2.0;
      vElevation = n;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const TERRAIN_FRAG = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float u_progress;
    uniform float u_time;

    vec3 getColor(int i) {
      if (i == 0) return vec3(0.545, 0.227, 0.227);
      if (i == 1) return vec3(0.360, 0.239, 0.180);
      if (i == 2) return vec3(0.831, 0.647, 0.455);
      if (i == 3) return vec3(0.769, 0.573, 0.227);
      if (i == 4) return vec3(0.482, 0.369, 0.482);
      if (i == 5) return vec3(0.227, 0.420, 0.227);
      return vec3(0.251, 0.878, 0.816);
    }

    void main() {
      float prog = clamp(u_progress, 0.0, 0.9999) * 6.0;
      int   idx  = int(prog);
      float frac = fract(prog);
      vec3  col  = mix(getColor(idx), getColor(idx + 1), frac);
      col *= (0.60 + vElevation * 0.75);
      float det = sin(vUv.x * 30.0 + u_time * 0.08) * sin(vUv.y * 25.0) * 0.025;
      col += det;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ─── Scene Manager ─────────────────────────────────────────────────────────

  class PrettyToursSceneManager {
    constructor(canvas) {
      if (!canvas || typeof THREE === 'undefined') return;

      this.canvas = canvas;
      this.clock  = new THREE.Clock();
      this.scene  = new THREE.Scene();
      this.currentScene = 'ocean';

      // Camera base position animated by GSAP separately from breathing
      this._camBase = { x: 0, y: 2.0, z: 8.0 };

      this._setupRenderer();
      this._setupCamera();
      this._buildSky();
      this._buildOcean();
      this._buildFish();
      this._buildBubbles();
      this._buildTerrain();
      this._buildOrbs();

      window.addEventListener('resize', () => this._onResize());
      this._onResize();

      // Bind tick for rAF
      this._tick = this._tick.bind(this);
      this._tick();
    }

    _setupRenderer() {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000408, 1);
    }

    _setupCamera() {
      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);
      this.camera.position.set(0, 2.0, 8.0);
      this.camera.lookAt(0, 0, 0);
    }

    _buildSky() {
      this._skyU = { u_depth: { value: 0.0 } };
      const mat = new THREE.ShaderMaterial({
        vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
        uniforms: this._skyU, side: THREE.BackSide
      });
      this.scene.add(new THREE.Mesh(new THREE.SphereGeometry(200, 16, 16), mat));
    }

    _buildOcean() {
      this._oceanU = { u_time: { value: 0 }, u_depth: { value: 0 } };
      const mat = new THREE.ShaderMaterial({
        vertexShader: OCEAN_VERT, fragmentShader: OCEAN_FRAG,
        uniforms: this._oceanU
      });
      this.oceanMesh = new THREE.Mesh(new THREE.PlaneGeometry(26, 26, 120, 120), mat);
      this.oceanMesh.rotation.x = -Math.PI * 0.38;
      this.oceanMesh.position.y = -1.8;
      this.scene.add(this.oceanMesh);
    }

    _buildFish() {
      const N   = 500;
      const pos = new Float32Array(N * 3);
      const rnd = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        pos[i3]   = (Math.random() - 0.5) * 18;
        pos[i3+1] = (Math.random() - 0.5) * 8 - 3;
        pos[i3+2] = (Math.random() - 0.5) * 18;
        rnd[i3]   = Math.random();
        rnd[i3+1] = Math.random();
        rnd[i3+2] = Math.random();
      }
      this._fishU = { u_time: { value: 0 }, u_visibility: { value: 0 } };
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('aRandom',  new THREE.BufferAttribute(rnd, 3));
      const mat = new THREE.ShaderMaterial({
        vertexShader: FISH_VERT, fragmentShader: FISH_FRAG,
        uniforms: this._fishU, transparent: true, depthWrite: false
      });
      this.fishPoints = new THREE.Points(geo, mat);
      this.scene.add(this.fishPoints);
    }

    _buildBubbles() {
      const N   = 250;
      const pos = new Float32Array(N * 3);
      const rnd = new Float32Array(N);
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        pos[i3]   = (Math.random() - 0.5) * 14;
        pos[i3+1] = (Math.random() - 1.2) * 6;
        pos[i3+2] = (Math.random() - 0.5) * 14;
        rnd[i]    = Math.random();
      }
      this._bubbleU = { u_time: { value: 0 }, u_visibility: { value: 0 } };
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('aRand',    new THREE.BufferAttribute(rnd, 1));
      const mat = new THREE.ShaderMaterial({
        vertexShader: BUBBLE_VERT, fragmentShader: BUBBLE_FRAG,
        uniforms: this._bubbleU, transparent: true, depthWrite: false
      });
      this.scene.add(new THREE.Points(geo, mat));
    }

    _buildTerrain() {
      this._terrainU = { u_time: { value: 0 }, u_progress: { value: 0 } };
      const mat = new THREE.ShaderMaterial({
        vertexShader: TERRAIN_VERT, fragmentShader: TERRAIN_FRAG,
        uniforms: this._terrainU
      });
      this.terrainMesh = new THREE.Mesh(new THREE.PlaneGeometry(22, 22, 140, 140), mat);
      this.terrainMesh.rotation.x = -Math.PI * 0.32;
      this.terrainMesh.position.y = -2.5;
      this.terrainMesh.visible = false;
      this.scene.add(this.terrainMesh);
    }

    _buildOrbs() {
      this.orbGroup = new THREE.Group();
      this.orbGroup.visible = false;
      const N = 6;
      for (let i = 0; i < N; i++) {
        const a   = (i / N) * Math.PI * 2;
        const r   = 0.5 + (i % 3) * 0.2;
        const mat = new THREE.MeshBasicMaterial({
          color: 0x40e0d0, wireframe: true, transparent: true, opacity: 0
        });
        const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1), mat);
        mesh.position.set(Math.cos(a) * 4, 0, Math.sin(a) * 4);
        this.orbGroup.add(mesh);
      }
      this.scene.add(this.orbGroup);
    }

    // ── Public transition API ────────────────────────────────────────────────

    transitionTo(name) {
      if (!window.gsap) return;
      const DUR = 1.0;
      this.currentScene = name;

      const isUW  = name === 'underwater';
      const isCOL = name === 'colors';
      const isTES = name === 'testimonials';

      // Sky / ocean depth
      gsap.to(this._skyU.u_depth,   { value: isUW ? 1.0 : isCOL ? 0.3 : 0.0, duration: DUR });
      gsap.to(this._oceanU.u_depth, { value: isUW ? 1.0 : 0.0, duration: DUR });

      // Particles
      gsap.to(this._fishU.u_visibility,   { value: isUW ? 1.0 : 0.0, duration: DUR });
      gsap.to(this._bubbleU.u_visibility, { value: isUW ? 0.8 : 0.0, duration: DUR });

      // Terrain
      if (isCOL) {
        this.terrainMesh.visible = true;
      } else {
        const self = this;
        setTimeout(() => {
          if (self.currentScene !== 'colors') self.terrainMesh.visible = false;
        }, DUR * 1000 + 100);
      }

      // Orbs
      if (isTES) {
        this.orbGroup.visible = true;
        this.orbGroup.children.forEach((o, i) => {
          gsap.to(o.material, { opacity: 0.5 + i * 0.04, duration: DUR, delay: i * 0.06 });
        });
      } else {
        this.orbGroup.children.forEach(o => {
          gsap.to(o.material, { opacity: 0, duration: DUR * 0.5 });
        });
        const self = this;
        setTimeout(() => {
          if (self.currentScene !== 'testimonials') self.orbGroup.visible = false;
        }, DUR * 500 + 100);
      }

      // Camera base target
      const targets = {
        ocean:        [0,  2.0, 8.0],
        underwater:   [0, -1.5, 6.0],
        colors:       [0,  3.5, 9.0],
        excursions:   [0,  1.5, 10.0],
        testimonials: [0,  0.5, 11.0],
      };
      const [cx, cy, cz] = targets[name] || targets.ocean;
      gsap.to(this._camBase, { x: cx, y: cy, z: cz, duration: DUR * 1.5, ease: 'power3.inOut' });
    }

    /** Called every scrub tick from ScrollTrigger underwater section */
    setUnderwaterProgress(p) {
      const depth = Math.min(p * 1.3, 1.0);
      this._oceanU.u_depth.value = depth;
      this._skyU.u_depth.value   = depth;
      this._camBase.y = 2.0 - p * 4.5;
    }

    /** Called every scrub tick from ScrollTrigger colors section */
    setColorsProgress(p) {
      this._terrainU.u_progress.value = p;
    }

    // ── Resize ───────────────────────────────────────────────────────────────

    _onResize() {
      const W = window.innerWidth, H = window.innerHeight;
      this.camera.aspect = W / H;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(W, H);
    }

    // ── Render loop ───────────────────────────────────────────────────────────

    _tick() {
      const t = this.clock.getElapsedTime();

      // Update all time uniforms
      this._oceanU.u_time.value   = t;
      this._fishU.u_time.value    = t;
      this._bubbleU.u_time.value  = t;
      this._terrainU.u_time.value = t;

      // Orb animation
      if (this.orbGroup.visible) {
        this.orbGroup.rotation.y = t * 0.22;
        this.orbGroup.children.forEach((o, i) => {
          o.position.y = Math.sin(t * 0.55 + i * 1.05) * 0.55;
          o.rotation.x = t * 0.3 + i;
          o.rotation.z = t * 0.2 + i * 0.5;
        });
      }

      // Camera: base position + subtle breathing offset
      this.camera.position.x = this._camBase.x + Math.cos(t * 0.22) * 0.07;
      this.camera.position.y = this._camBase.y + Math.sin(t * 0.28) * 0.03;
      this.camera.position.z = this._camBase.z;
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this._tick);
    }
  }

  // ─── Init ──────────────────────────────────────────────────────────────────

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mainCanvas');
    if (canvas) {
      window.sceneManager = new PrettyToursSceneManager(canvas);
    }
  });

})();
