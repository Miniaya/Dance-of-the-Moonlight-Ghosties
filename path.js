import * as THREE from 'three';

// x: x
// y: up and down (z)
// z: y

const dancePoints = [
  new THREE.Vector3( 1.960, 0, 0.5 ), //A
  new THREE.Vector3( 0, -0.75, 1 ), //B
  new THREE.Vector3( 1.032, 0, 2.739 ), //C
  new THREE.Vector3( -0.707, -0.75, 1.707 ), //D
  new THREE.Vector3( -1.207, 0, 3.667 ), //E
  new THREE.Vector3( -1.707, -0.75, 1.707 ), //F
  new THREE.Vector3( -3.446, 0, 2.739 ), //G
  new THREE.Vector3( -2.414, -0.75, 1 ), //H
  new THREE.Vector3( -4.374, 0, 0.5 ), //I
  new THREE.Vector3( -2.414, -0.75, 0 ), //J
  new THREE.Vector3( -3.446, 0, -1.739 ), //K
  new THREE.Vector3( -1.707, -0.75, -0.707 ), //L
  new THREE.Vector3( -1.207, 0, -2.667 ), //M
  new THREE.Vector3( -0.866, -0.75, -0.5 ), //N
  new THREE.Vector3( 1.032, 0, -1.739 ), //O
  new THREE.Vector3( 0, -0.75, 0 ), //P
  new THREE.Vector3( 1.960, 0, 0.5 )
]

const danceMaterial = new THREE.LineBasicMaterial({
	color: 0x9132a8
});
const dancePointsPath = new THREE.CatmullRomCurve3(dancePoints);

const cameraMaterial = new THREE.LineBasicMaterial({
	color: 0x9132a8
});
const cameraPointsPath = new THREE.CurvePath();

const cameraStraightLineIn = new THREE.LineCurve3(new THREE.Vector3(70, -4, 0), new THREE.Vector3( -9.374, -4, 0 ));
const cameraSpiralStart = new THREE.CatmullRomCurve3([
  new THREE.Vector3( -9.374, -4, 0 ),
  new THREE.Vector3( -9.374, 0, 0),
  new THREE.Vector3(-1.207, 1, 8.667), //E
  new THREE.Vector3( 6.032, 2, 7.739 ), //C
]);

const cameraStraightLineOut = new THREE.LineCurve3(new THREE.Vector3( 6.032, 2, 7.739 ), new THREE.Vector3( 70, 2, 7.739 ));

const cameraSpiralMultiply = new THREE.CatmullRomCurve3([
  new THREE.Vector3( 6.032, 2, 7.739 ), //C
  new THREE.Vector3(6.960, 4, 0.5), //A
  new THREE.Vector3( 6.032, 6, -6.739 ), //O
  new THREE.Vector3(-1.207, 8, -7.667), //M
  new THREE.Vector3( -8.446, 10, -6.739 ), //K
  new THREE.Vector3( -9.374, 8, 5.5 ), //I
  new THREE.Vector3( -8.446, 6, 7.739 ), //G
  new THREE.Vector3(-1.207, 4, 8.667), //E
  new THREE.Vector3( 6.032, 2, 7.739 ), //C
]);

cameraPointsPath.add(cameraStraightLineIn);
cameraPointsPath.add(cameraSpiralStart);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraSpiralMultiply);
cameraPointsPath.add(cameraStraightLineOut);

export { dancePointsPath, cameraPointsPath }