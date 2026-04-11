varying vec2 vUv;
varying float vElevation;
uniform float u_time;
uniform float u_depth;

void main() {
  vec3 deepSea    = vec3(0.00, 0.03, 0.12);
  vec3 midOcean   = vec3(0.02, 0.18, 0.35);
  vec3 shallowSea = vec3(0.06, 0.42, 0.55);
  vec3 surface    = vec3(0.18, 0.72, 0.75);
  vec3 foam       = vec3(0.80, 0.95, 1.00);

  vec3 waterBase = mix(
    mix(surface, shallowSea, u_depth * 0.5),
    deepSea, u_depth
  );

  float sh = sin(vUv.x * 22.0 + u_time * 1.8) * sin(vUv.y * 17.0 + u_time * 1.3);
  sh = sh * 0.5 + 0.5;
  waterBase += sh * 0.08 * (1.0 - u_depth) * vec3(0.4, 1.0, 1.0);

  float f = smoothstep(0.18, 0.40, vElevation) * (1.0 - u_depth);
  waterBase = mix(waterBase, foam, f * 0.55);

  float glint = pow(max(sh - 0.7, 0.0) / 0.3, 6.0) * 0.6 * (1.0 - u_depth);
  waterBase += glint * vec3(1.0, 0.92, 0.75);

  float c = abs(sin(vUv.x * 28.0 + u_time * 0.6) * sin(vUv.y * 22.0 + u_time * 0.45));
  waterBase += c * u_depth * 0.2 * vec3(0.2, 0.9, 0.8);

  gl_FragColor = vec4(waterBase, 1.0);
}
