var material = new THREE.MeshLambertMaterial({
    color: 0xCCCCCC
});
var geometry = new THREE.SphereGeometry();
var checker = new THREE.TextureLoader().load('assets/checker.png');

AFRAME.registerComponent('4dview', {
    schema: {},
    init: function () {

        // Intializing Component with Dummy values

        this.geometry = new THREE.SphereGeometry();

        this.material = new THREE.MeshBasicMaterial({ map: checker });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.el.setObject3D('mesh', this.mesh);
    },

    update: function () {

    },
    tick: function () {

        //Updating Mesh Sequences and Textures

        if (mesh) {
            this.mesh.geometry.dispose();
            this.mesh.geometry = mesh.geometry;
            this.mesh.rotation.x = -1.57;
            this.mesh.material.map = bodyTex;

        }
    },

    remove: function () {
        console.log("Component Removed");
        this.el.getObject3D('mesh').geometry = new THREE.Geometry();
    }
});

function animate() { }