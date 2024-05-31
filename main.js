
// This code is based on three.js, which comes with the following license:
//
// The MIT License
//
// Copyright © 2010-2024 three.js authors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// define a few global variables
let scene;	// the scene, i.e. the collection of objects that will be rendered
let renderer;
let camera;
let cube;
let orbitControls;


init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		50,	// FOV
		window.innerWidth / window.innerHeight,	// aspect ratio
		0.1,	// frustrum near plane
		500	// frustrum far plane
	);
	camera.position.z = 5;

	// boilerplate code
	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// add a cube to the scene
	let geometry = new THREE.BoxGeometry( 1, 1, 1 );	// a cube
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );	// a green surface material
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	
	// orbit controls allow the camera to move around
	addOrbitControls();
}

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

function addOrbitControls() {
	orbitControls = new OrbitControls( camera, renderer.domElement );
	orbitControls.listenToKeyEvents( window ); // optional

	orbitControls.enableDamping = false; // an animation loop is required when either damping or auto-rotation are enabled
	orbitControls.dampingFactor = 0.05;

	orbitControls.enablePan = true;
	orbitControls.enableZoom = true;

	orbitControls.maxPolarAngle = Math.PI;
}
