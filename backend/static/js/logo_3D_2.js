
document.addEventListener('DOMContentLoaded', () => {
  // --- Partie 1 : Fond étoilé 2D ---

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let numStars = 6900;
  let focalLength = window.innerWidth * 1;
  //let focalLength = window.innerWidth * 2;
  let centerX, centerY;
  let stars = [];

  function initializeStars() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: Math.random(), // opacité
      });
    }
  }

  function moveStars() {
    for (let star of stars) {
      star.z -= 7;
      if (star.z <= 0) star.z = canvas.width;
    }
  }

  function drawStars() {
    ctx.fillStyle = 'rgba(0, 10, 20, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
      let pixelX = (star.x - centerX) * (focalLength / star.z) + centerX;
      let pixelY = (star.y - centerY) * (focalLength / star.z) + centerY;
      let pixelRadius = 1 * (focalLength / star.z);
      ctx.fillStyle = `rgba(209, 255, 255, ${star.o})`;
      ctx.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
    }
  }

  initializeStars();

  // --- Partie 2 : Three.js Logo 3D ---

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100);
  camera.position.set(0, 60 ,0);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // fond transparent pour voir le canvas étoilé derrière
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = 0;
  renderer.domElement.style.left = 0;
  renderer.domElement.style.zIndex = 1;
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 2.0));
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
  directionalLight.position.set(50, 100, 50);
  scene.add(directionalLight);
  const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
  hemi.position.set(0, 100, 0);
  hemi.castShadow = true;
  scene.add(hemi);
  
    
      // Création du dégradé (haut -> bas)
      /*const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#00e6d8');  // cyan
      gradient.addColorStop(1, '#0033cc');  // bleu
    
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
      const texture = new THREE.CanvasTexture(canvas);
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.encoding = THREE.sRGBEncoding;
      return texture;
    }
    // Création de la texture de dégradé    

    const gradientTexture = createGradientTexture();

    const material = new THREE.MeshStandardMaterial({
      map: gradientTexture,
      roughness: 0.2,
      metalness: 0.6,
      side: THREE.DoubleSide
    });*/



  // Création des loaders pour les objets 3D
  const OBJLoader = new THREE.OBJLoader();
  const MTLLoader = new THREE.MTLLoader();


  
// Création de l'objet fixe
  const staticobj = new THREE.Group();
  scene.add(staticobj);

// Chargement de la texture de dégradé pour le centre
  const texturecentreLoader = new THREE.TextureLoader();
  const gradientcentreTexture = texturecentreLoader.load('./static/image/degrader_centre.jpg', (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.encoding = THREE.sRGBEncoding;
  });

// Objet centre fixe
  THREE.MTLLoader.setPath('./static/image/Logo/');
  THREE.MTLLoader.load('logo_centre.mtl', (materials0) => {  
    materials0.preload();
    THREE.OBJLoader.setMaterials(materials0);

    THREE.OBJLoader.load('./static/image/Logo/logo_centre.obj', (centre) => {
    centre.scale.set(1, 1, 1);

      // Remplacement du matériau par le dégradé
      centre.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: gradientcentreTexture,
            roughness: 0.05,
            metalness: 0.1,
            emissive: new THREE.Color(0x222222), 
            emissiveIntensity: 0.5
          });
        }
      });

    staticobj.add(centre); // affichage de l'objet central
    });
  });


  


  
// Cote 1 tournant
  const rotatingGroup = new THREE.Group();
  scene.add(rotatingGroup);
  const rotatingGroup2 = new THREE.Group();
  rotatingGroup.add(rotatingGroup2);

//création du dégradé pour la texture de la cote 1
  // Chargement de la texture de dégradé pour la cote 1
 const texturecote1Loader = new THREE.TextureLoader();
  const gradientcote1Texture = texturecote1Loader.load('./static/image/degrader_coter.jpg', (texture1) => {
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(1, 1);
    texture1.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture1.encoding = THREE.sRGBEncoding;
  });

// Chargement de l'objet 3D avec THREE.MTLLoader et THREE.OBJLoader
  THREE.MTLLoader.setPath('./static/image/Logo/');
  THREE.MTLLoader.load('logo_cote1.mtl', (materials) => {
    materials.preload();
    THREE.OBJLoader.setMaterials(materials);

    THREE.OBJLoader.load('./static/image/Logo/logo_cote1.obj', (cote1) => {// décalé pour tourner autour du centre
      cote1.scale.set(1, 1, 1);

      // Remplacement du matériau par le dégradé
      cote1.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: gradientcote1Texture,
            roughness: 0.05,
            metalness: 0.1,
            emissive: new THREE.Color(0x222222), 
            emissiveIntensity: 0.5
          });
        }
      });
      rotatingGroup2.add(cote1); //affichage du cote1 mobile
    });
  });



// Cote 2 tournant
const rotatingGroupGlobal = new THREE.Group();
scene.add(rotatingGroupGlobal);
const rotatingGroupLocal = new THREE.Group();
rotatingGroupGlobal.add(rotatingGroupLocal);

// Création de la texture de dégradé pour la cote 2
  // Chargement de la texture de dégradé pour la cote 2
  const texturecote2Loader = new THREE.TextureLoader();
  const gradientcote2Texture = texturecote2Loader.load('./static/image/degrader_coter.jpg', (texture2) => {
    texture2.wrapS = THREE.RepeatWrapping;
    texture2.wrapT = THREE.RepeatWrapping;
    texture2.repeat.set(1, 1);
    texture2.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture2.encoding = THREE.sRGBEncoding;
  });

// Chargement de l'objet 3D pour la cote 2
  THREE.MTLLoader.setPath('./static/image/Logo/');
  THREE.MTLLoader.load('logo_cote2.mtl', (materials2) => {
    materials2.preload();
    THREE.OBJLoader.setMaterials(materials2);

    // Chargement de l'objet 3D pour la cote 2
    THREE.OBJLoader.setPath('./static/image/Logo/');
    THREE.OBJLoader.load('logo_cote2.obj', (cote2) => {
      cote2.scale.set(1, 1, 1);

      // Remplacement du matériau par le dégradé
      cote2.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: gradientcote2Texture,
            roughness: 0.05,
            metalness: 0.1,
              emissive: new THREE.Color(0x222222), 
  emissiveIntensity: 0.5
          });
        }
      });
  
      rotatingGroupLocal.add(cote2);  //affichage du cote1 mobile
    });
  });

  // --- Boucle d'animation principale ---
  let angle = 0;
  function animate() {
    requestAnimationFrame(animate);
    moveStars();
    drawStars();
    // Rotation de la scène
    /*scene.rotation.x += 0.0;
    scene.rotation.y += 0.0;*/
    //rotatingGroup.rotation.y += 0.01; // Inclinaison haut/bas
    //rotatingGroup.rotation.y += 0.01; // Inclinaison haut/bas
    //rotatingGroup.rotation.x += 0.01; // Rotation horizontale
    //rotatingGroup.rotation.x += 0.01; // Rotation horizontale
    angle -= 0.01; // ≈ 0.57° par frame

    /*if (angle >= Math.PI) {
      angle = Math.PI; // bloque à 180°
    }*/
  
    // Appliquer la rotation synchronisée
    rotatingGroupGlobal.rotation.z = angle; // orbite autour du centre
    rotatingGroupLocal.rotation.x = angle;  // rotation sur soi-même
    rotatingGroup.rotation.z = angle; // rotation sur soi-même
    rotatingGroup2.rotation.x = angle; // rotation sur soi-même
    /*const group = scene.children.find(child => child instanceof THREE.Group);
    if (group) {
      //group.rotation.x += 0.01;
      group.rotation.y += 0.009;
      //group.rotation.z += 0.01; // Rotation autour de l'axe Z
      
    }
    // Ralentir la rotation de la caméra
    /*const time = Date.now() * 0.0003; // ← ici on ralentit
    camera.position.x = Math.sin(time) * 300;
    camera.position.z = Math.cos(time) * 300;
    camera.lookAt(0, 0, 0);*/

 // Positionner le groupe au même endroit que la caméraS
    // Mise à jour des contrôles  

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
  

  // --- Gestion redimensionnement ---

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
