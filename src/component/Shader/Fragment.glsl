uniform sampler2D uTexture;
varying vec2 vUv;
varying float vCircle;

void main() {
    gl_FragColor = vec4(vCircle,3.0,3.0,1.0);
    gl_FragColor = texture2D(uTexture, vUv);
    gl_FragColor.rgb += vCircle / 220.0;
    gl_FragColor = vec4(1.0,1.0,0.0,0.2);
}