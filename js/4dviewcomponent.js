var material = new THREE.MeshLambertMaterial({
    color: 0xCCCCCC
});
var geometry = new THREE.SphereGeometry();
var checker = new THREE.TextureLoader().load('assets/checker.png');
var object3d;

AFRAME.registerComponent('4dview', {
    schema: {},
    init: function () {
        object3d = this;
    },



    remove: function () {
        console.log("Component Removed");
        this.el.getObject3D('mesh').geometry = new THREE.Geometry();
    }
});

function load4dObject(object) {
    object3d.el.setObject3D('4dobject', object);
}

function animate() { }