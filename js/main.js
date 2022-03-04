var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}

window.replainSettings = { id: '311e5de3-4347-42d4-bab5-7e0e30430ea1' };
(function(u){var s=document.createElement('script');s.async=true;s.src=u;
var x=document.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);
})('https://widget.replain.cc/dist/client.js');

let camera
let scene
let renderer
let material
let mouseX = 0
let mouseY = 0
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
container = document.getElementById( 'canvas' );

init()
animate()

function init () {
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000)
  camera.position.z = 500

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0000ff, 0.001)

  const geometry = new THREE.BufferGeometry()
  const vertices = []
  const size = 2000

  for ( let i = 0; i < 20000; i ++ ) {
    const x = (Math.random() * size + Math.random() * size) / 2 - size / 2
    const y = (Math.random() * size + Math.random() * size) / 2 - size / 2
    const z = (Math.random() * size + Math.random() * size) / 2 - size / 2

    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  material = new THREE.PointsMaterial({
    size: 2,
    color: 0xffffff,
  })

  const particles = new THREE.Points(geometry, material)
  scene.add(particles)
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)

  container.style.touchAction = 'none'
  container.addEventListener('pointermove', onPointerMove)
  window.addEventListener('resize', onWindowResize)
}

function onWindowResize () {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onPointerMove (event) {
  mouseX = event.clientX - windowHalfX 
  mouseY = event.clientY - windowHalfY
}

function animate () {
  requestAnimationFrame(animate)
  render()
}

function render () {
  camera.position.x += (mouseX * 2 - camera.position.x) * 0.02
  camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
  camera.lookAt(scene.position)
  renderer.render(scene, camera)
  scene.rotation.x += 0.001
  scene.rotation.y += 0.002
}