

var geometry;
var mesh; // global variable for MESH from MESH SEQUENCE
var material;
var textureSize;

var initialized = false;

var bodyTex; // global variable for MESH SEQUENCE TEXTURE


function createViewer() {
  
}

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

