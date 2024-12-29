uniform float uTime;
uniform vec2 uMouse;
uniform float uEnter;
uniform vec2 aspectRatio;

varying vec2 vUv;
varying float vCircle;

void main()
{
    vUv = uv;
    vec3 pos = position;

    vec2 aspectCorrectedMouse = vec2(uMouse.x * aspectRatio.x / aspectRatio.y , uMouse.y);
    vec2 aspectUV = vec2(uv.x * aspectRatio.x/aspectRatio.y , uv.y);

    float radius = 0.5;
    float frequency = 10.0;
    float amplitude = 20.0;

    float circle = smoothstep(radius,  0.0, distance(aspectCorrectedMouse,aspectUV));
    float wave = sin(distance(aspectCorrectedMouse,aspectUV) * frequency - uTime * 3.0) * amplitude;

    pos.z += wave * circle * uEnter;
    // pos.x += - uMouse.x * .1;

    float scale = 0.1;  
    pos.xy *= 1.0 + scale * uEnter;

    vCircle = wave * uEnter * circle;

    // Final position transformation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
