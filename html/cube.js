
import * as tsVector from '../dist/tsVector.js';

// cube vertices for cube of size 2 centered at the origin
const vertices = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1]
];

// cube edges (pairs of vertex indices)
const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7]
];

// Log the vertices and edges to the console
console.log('Cube Vertices:', vertices);
console.log('Cube Edges:', edges);

// 3x3 rotation matrix for rotating around the Y-axis
const angle = Math.PI / 4; // 45 degrees
const pitchMatrix = tsVector.pitch(angle)
const rollMatrix = tsVector.roll(angle/2)
const yawMatrix = tsVector.yaw(angle/3)

const rotationMatrix = tsVector.MMProduct(
    tsVector.MMProduct(pitchMatrix, rollMatrix), 
    yawMatrix);

// Rotate each vertex using the rotation matrix
const rotatedVertices = vertices.map(vertex => 
    tsVector.MvProduct(rotationMatrix, vertex))

// Scale each vertex by a scale factor
const scaleFactor = 150;
const scaledVertices = rotatedVertices.map(vertex => 
    tsVector.vScale(scaleFactor, vertex)
);

// Shift each vertex by twice the scale factor in the x and y directions
const shiftVector = [scaleFactor * 2, scaleFactor * 2, 0];
const shiftedVertices = scaledVertices.map(vertex => 
    tsVector.vAdd(vertex, shiftVector)
);

// Log the transformed vertices to the console
console.log('Transformed Cube Vertices:', shiftedVertices);

// get and empty the output div
const outputDiv = document.getElementById('output');
outputDiv.innerHTML = '';

// Create a canvas element and append it to the output div
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
outputDiv.appendChild(canvas);

// Get the 2D drawing context from the canvas
const ctx = canvas.getContext('2d');

// Draw the edges of the cube on the canvas
ctx.strokeStyle = 'black';
edges.forEach(edge => {
    const [startIndex, endIndex] = edge;
    const startVertex = shiftedVertices[startIndex];
    const endVertex = shiftedVertices[endIndex];
    
    ctx.beginPath();
    ctx.moveTo(startVertex[0], startVertex[1]);
    ctx.lineTo(endVertex[0], endVertex[1]);
    ctx.stroke();
})
