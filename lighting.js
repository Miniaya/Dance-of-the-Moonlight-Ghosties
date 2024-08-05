import * as THREE from 'three';

const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light

const spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( -1.21, 20, 0.5 ); // -0.743, 10, 0.5
spotLight.decay = 0;
spotLight.distance = 25;
spotLight.angle = 0.5;
spotLight.penumbra = 0;

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1;
spotLight.shadow.mapSize.height = 1;

spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 1;
spotLight.shadow.camera.fov = 1;

const moonLight = new THREE.DirectionalLight( 0xffffff, 1 );
moonLight.position.set(170, -3, 0)
moonLight.lookAt(-40, -3, 0.5)

export { ambientLight, spotLight, moonLight }