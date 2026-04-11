varying vec2 vUv;
varying float vElevation;
uniform float u_time;
uniform float u_depth;

float wave(vec2 p, float freq, float speed, float amp) {
  return sin(p.x * freq + u_time * speed) * cos(p.y * freq * 0.8 + u_time * speed * 0.7) * amp;
}

void main() {
  vUv = uv;
  vec3 pos = position;

  float w  = wave(pos.xy, 1.2, 0.6, 0.40);
       w  += wave(pos.xy, 2.5, 1.0, 0.18);
       w  += wave(pos.xy, 5.0, 0.8, 0.08);
       w  *= (1.0 - u_depth);

  pos.z += w;
  vElevation = w;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
