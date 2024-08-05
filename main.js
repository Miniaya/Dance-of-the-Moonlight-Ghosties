import * as THREE from 'three';
import { cameraPointsPath, dancePointsPath } from './path';
import { ambientLight, moonLight, spotLight } from './lighting';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const init = () => {
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( -1.21, 50, 0.5  ); // vaakataso 10, 0.75, 0
  camera.lookAt( 70, 50, 5 );

  const scene = new THREE.Scene();

  // create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add( listener );

  // create a global audio source
  const sound = new THREE.PositionalAudio( listener );

  // load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( '/KesanMuistoja.ogg', function( buffer ) {
  	sound.setBuffer( buffer );
  	sound.setRefDistance( 20 );
  	sound.setVolume( 0.75 );
    sound.play();
  });

  const skyTexture = new THREE.TextureLoader().load('/starsky.png');
  const skyGeometry = new THREE.SphereGeometry(200);
  const skyMaterial = new THREE.MeshPhysicalMaterial({ map: skyTexture, side: THREE.DoubleSide })
  const sky = new THREE.Mesh(skyGeometry, skyMaterial);
  scene.add(sky);

  const analyser = new THREE.AudioAnalyser(sound, 32);

  const loader = new GLTFLoader();
  loader.load('/ghost.glb', function (gltf) {
    const ghost = gltf.scene;
    scene.add(ghost);
    ghost.add(sound);
  }, undefined, function (error) {
    console.error(error);
  });

  const moonGeometry = new THREE.SphereGeometry( 15, 32, 16 ); 
  const moonMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 
  const moon = new THREE.Mesh( moonGeometry, moonMaterial );
  scene.add( moon );
  moon.position.set(170, 0, 0);

  // add lights
  scene.add( ambientLight );
  scene.add( spotLight );
  scene.add( moonLight );

  const uniforms = {
    resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    time: { type: 'f', value: 0.0 },
    frequenzy: { type: 'f', value: 0.0 },
  }

  const waterMaterial = new THREE.ShaderMaterial( {
    wireframe: true,
    uniforms,
    vertexShader: document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
  } );

  const waterMesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 200, 200, 1000, 1000 ),
    waterMaterial
  );

  waterMesh.position.set(0, -4.5, 0);
  waterMesh.rotateX(Math.PI / 2);

  scene.add(waterMesh);

  const bottomMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } ); 

  const bottomMesh = new THREE.Mesh(
    new THREE.PlaneGeometry( 200, 200, 1000, 1000 ),
    bottomMaterial
  );

  bottomMesh.position.set(0, -9, 0);
  bottomMesh.rotateX(Math.PI / 2);

  scene.add( bottomMesh );

  renderer.render( scene, camera );

  let danceTimeFraction = 0;
  let dancePosFraction = 0;
  let cameraPosFraction = 0;
  const tempo = 0.0012;

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame( animate );

    uniforms.time.value = clock.getElapsedTime();
    uniforms.frequenzy.value = analyser.getAverageFrequency();

    const dancePosition = dancePointsPath.getPoint(dancePosFraction);
    const ghost = scene.getObjectByName('Scene')
    ghost.position.copy(dancePosition);

    const cameraPosition = cameraPointsPath.getPoint(cameraPosFraction);
    camera.position.copy(cameraPosition);

    danceTimeFraction += tempo;

    if (camera.position.y > 0) {
      camera.lookAt( -1.21, 0, 0.5 );
    }

    if (cameraPosFraction < 1) {
      cameraPosFraction += tempo / 14;
    }

    if (danceTimeFraction <= 1 / 8) {
      dancePosFraction += tempo;
      ghost.rotateY(danceTimeFraction / Math.PI);
    }

    if (danceTimeFraction >= 2 / 8) {
      danceTimeFraction = 0;
    }

    if (dancePosFraction > 1) {
      dancePosFraction = 0;
    }

    if (cameraPosFraction > 1) {
      scene.remove(ghost);
      scene.remove(waterMesh);
      scene.remove(moon);
      scene.remove(sky);
    }

    renderer.render( scene, camera );
  }

  animate()
}

export default init