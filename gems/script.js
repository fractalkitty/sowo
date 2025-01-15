let angle = 0;
let vertices = [];
let faces = [];
let seedValue = 0;
let noiseOffset = 0;

function setup() {
  cnv = createCanvas(400, 400, WEBGL);
  seedValue = random(1000);
  updateShape();
  angle = PI / 5;
}

function draw() {
  background(255);
  orbitControl(5, 5);
  rotateX(angle);
  rotateY(angle * 0.7);
  rotateZ(angle * 0.5);
  pointLight(205, 205, 205, -600, -600, 600);
  pointLight(205, 205, 205, 600, 1200, 1200);
  pointLight(205, 205, 205, -600, -600, -600);
  stroke(100, 150, 200, 100);
  beginShape(TRIANGLES);
  for (let face of faces) {
    for (let vertexIndex of face) {
      let v = vertices[vertexIndex];
      specularMaterial(100, 140, 155);
      vertex(v.x, v.y, v.z);
    }
  }
  endShape();
  angle += 0.005;
}

function regenerate() {
  seedValue = random(1000);
  noiseOffset = random(1000);
  updateShape();
}

function updateShape() {
  const layers = parseInt(document.getElementById("layers").value);
  const segments = parseInt(document.getElementById("segments").value);
  const twist = parseInt(document.getElementById("twist").value) * 0.1;
  const height = parseInt(document.getElementById("height").value);
  const noiseScale =
    parseInt(document.getElementById("noiseScale").value) * 0.01;
  const noiseAmount = parseInt(document.getElementById("noiseAmount").value);
  const safeRadius = parseInt(document.getElementById("safeRadius").value);
  document.getElementById("layersValue").textContent = round(layers, 1);
  document.getElementById("segmentsValue").textContent = round(segments, 1);
  document.getElementById("twistValue").textContent = round(twist, 1);
  document.getElementById("heightValue").textContent = round(height, 1);
  document.getElementById("noiseScaleValue").textContent = round(noiseScale, 1);
  document.getElementById("noiseAmountValue").textContent = round(
    noiseAmount,
    1
  );
  document.getElementById("safeRadiusValue").textContent = round(safeRadius, 1);

  generateChiralShape(
    segments,
    twist,
    height,
    noiseScale,
    noiseAmount,
    safeRadius,
    layers
  );
}

function getNoiseValue(x, y, z, scale) {
  return noise(
    (x + seedValue) * scale,
    (y + seedValue) * scale,
    (z + noiseOffset) * scale
  );
}

function generateChiralShape(
  segments,
  twist,
  height,
  noiseScale,
  noiseAmount,
  safeRadius,
  layers
) {
  vertices = [];
  faces = [];

  const radius = 100;

  // Bottom center
  vertices.push({ x: 0, y: 0, z: -height / 2 });
  const bottomCenterIndex = 0;

  for (let layer = 0; layer <= layers; layer++) {
    const z = (layer / layers) * height - height / 2; //layer height
    const layerTwist = (layer / layers) * twist; //twist the layer

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * TWO_PI + layerTwist;
      //point on circle using angle
      const baseX = cos(angle);
      const baseY = sin(angle);

      // radius that gives buldge in the center
      const r = radius * (1 - Math.abs(layer - layers / 2) / (layers / 1.5));

      const noiseVal = getNoiseValue(
        baseX + layer * 0.1,
        baseY + layer * 0.1,
        z * 0.01,
        noiseScale
      );

      const displacement = map(noiseVal, 0, 1, -noiseAmount, noiseAmount);
      const rawRadius = r + displacement;
      const safeR = max(rawRadius, safeRadius);

      vertices.push({
        x: baseX * safeR,
        y: baseY * safeR,
        z: z + displacement * 0.5,
      });
    }
  }

  // top center point
  vertices.push({ x: 0, y: 0, z: height / 2 });
  const topCenterIndex = vertices.length - 1;

  // generate faces between layers
  for (let layer = 0; layer < layers; layer++) {
    for (let i = 0; i < segments; i++) {
      const current = layer * segments + i + 1;
      const next = layer * segments + ((i + 1) % segments) + 1;
      const aboveCurrent = (layer + 1) * segments + i + 1;
      const aboveNext = (layer + 1) * segments + ((i + 1) % segments) + 1;
      faces.push([current, next, aboveNext]);
      faces.push([current, aboveNext, aboveCurrent]);
    }
  }

  // Bottom cap faces
  for (let i = 0; i < segments; i++) {
    const current = i + 1;
    const next = ((i + 1) % segments) + 1;
    faces.push([bottomCenterIndex, next, current]);
  }

  // top cap faces
  const topLayerStart = layers * segments + 1;
  for (let i = 0; i < segments; i++) {
    const current = topLayerStart + i;
    const next = topLayerStart + ((i + 1) % segments);
    faces.push([topCenterIndex, current, next]);
  }
}

function exportSTL() {
  let stl = "solid chiralShape\n";

  for (let face of faces) {
    const v1 = vertices[face[0]];
    const v2 = vertices[face[1]];
    const v3 = vertices[face[2]];

    const normal = calculateNormal(v1, v2, v3);

    stl += ` facet normal ${normal.x} ${normal.y} ${normal.z}\n`;
    stl += "  outer loop\n";
    stl += `   vertex ${v1.x} ${v1.y} ${v1.z}\n`;
    stl += `   vertex ${v2.x} ${v2.y} ${v2.z}\n`;
    stl += `   vertex ${v3.x} ${v3.y} ${v3.z}\n`;
    stl += "  endloop\n";
    stl += " endfacet\n";
  }

  stl += "endsolid chiralShape";

  const blob = new Blob([stl], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "chiralShape.stl";
  link.click();
  URL.revokeObjectURL(url);
}

function calculateNormal(v1, v2, v3) {
  let ax = v2.x - v1.x;
  let ay = v2.y - v1.y;
  let az = v2.z - v1.z;

  let bx = v3.x - v1.x;
  let by = v3.y - v1.y;
  let bz = v3.z - v1.z;

  let nx = ay * bz - az * by;
  let ny = az * bx - ax * bz;
  let nz = ax * by - ay * bx;

  let length = Math.sqrt(nx * nx + ny * ny + nz * nz);
  return {
    x: nx / length,
    y: ny / length,
    z: nz / length,
  };
}
