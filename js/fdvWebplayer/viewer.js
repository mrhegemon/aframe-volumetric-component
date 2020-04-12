

var geometry;
var mesh; // global variable for MESH from MESH SEQUENCE
var material;
var textureSize;
var renderer = new THREE.WebGLRenderer();
var initialized = false;

var bodyTex; // global variable for MESH SEQUENCE TEXTURE


var object4D = new THREE.Object3D();
// initializes 4dviews mesh
function init(nbFrames, nbBlocs, framerate, maxVertices, maxTriangles, textureEncoding, textureSizeX, textureSizeY) {
    geometry = new THREE.BufferGeometry();

    var vertices = new Float32Array(maxVertices * 3);
    var uvs = new Float32Array(maxVertices * 2);
    var indices = new Uint32Array(maxTriangles * 3);

    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.dynamic = true;


    if (textureEncoding == 164) {
        bodyTex = new THREE.CompressedTexture(null, textureSizeX, textureSizeY,
            THREE.RGBA_ASTC_8x8_Format, THREE.UnsignedByteType, THREE.UVMapping,
            THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
            THREE.LinearFilter, THREE.LinearFilter);
    } else {
        bodyTex = new THREE.CompressedTexture(null, textureSizeX, textureSizeY,
            THREE.RGB_S3TC_DXT1_Format, THREE.UnsignedByteType, THREE.UVMapping,
            THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping,
            THREE.LinearFilter, THREE.LinearFilter);
    }
    material = new THREE.MeshBasicMaterial({ map: bodyTex })

    mesh = new THREE.Mesh(geometry, material);

    textureSize = textureSizeX;

    object4D.add(mesh);
    

    initialized = true;
}



// updates mesh from meshsequence for each frame

function updateMesh(Verts, Faces, UVs, Texture, nbVerts, nbFaces) {

    geometry.dispose();
    geometry.attributes.position.array = Verts;
    geometry.attributes.uv.array = UVs
    mesh.geometry.index.array = Faces;

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.uv.needsUpdate = true;
    mesh.geometry.index.needsUpdate = true;

    geometry.setDrawRange(0, nbFaces * 3);
    mesh.rotation.x = -1.57;

    var mipmap = { "data": Texture, "width": textureSize, "height": textureSize };
    var mipmaps = [];
    mipmaps.push(mipmap);



    bodyTex.mipmaps = mipmaps;
    bodyTex.needsUpdate = true
    material.needsUpdate = true;


}



// LOAD SEQUENCE
function LoadSequence() {

    if (!instance) {
        CreatePlayer();
        isAudiomuted = false;
    }
    else {
        console.log('CHANGE SEQUENCE sequence');
        DestroyPlayer(function () {

            CreatePlayer();
            isAudiomuted = false;


        });
    }

    load4dObject(object4D);
}

// MESH SEQUENCE LOADING PROGRESS

function ProgressWaiter() {
    var percent = meshesCache.length / maxCacheSize;

    console.error((percent * 100) + "%")
}

// Free memory on window loosing focus
window.onblur = function () {
    pauseSequence();
}

// Free memory on window closing
window.onunload = function () {
    DestroyPlayer();
}

window.onfocus = function () {
    playSequence();
}


var current_mode = screen.orientation;

var file4dsAudio, file4dsMobile, file4dsDesktop;

var capturesList = [
    {
        audio: 'assets/Sample4DViews_PresentingHOLOSYS_audio.wav',
        desktop: 'assets/Sample4DViews_PresentingHOLOSYS_30fps_FILTERED_DESKTOP_STD.4ds',
        mobile: 'assets/Sample4DViews_PresentingHOLOSYS_30fps_FILTERED_MOBILE_STD.4ds'
    },
    {
        desktop: 'assets/hulahoop_30_proc_mobile.4ds',
        mobile: 'assets/hulahoop_30_proc_mobile.4ds'
    }

];


var index = 0;
document.getElementById('prev').onclick = () => {

    index--;
    if (index < 0) index = capturesList.length;
    StartStreaming(capturesList[index]);

}

document.getElementById('next').onclick = () => {

    index++;
    if (index > capturesList.length - 1) index = 0;
    StartStreaming(capturesList[index]);

}

document.getElementById('play').onclick = () => {

    index = 0;
    StartStreaming(capturesList[index]);

}

// LOAD DESIRED 4D Capture Data
function StartStreaming(capture) {

    file4dsAudio = capture.audio;
    file4dsMobile = capture.mobile;
    file4dsDesktop = capture.desktop;
    var waiterSplashscreen = document.getElementById('loading');
    waiterSplashscreen.style.display = "block";
    DestroyPlayer();
    LoadSequence();
}

