var material = new THREE.MeshLambertMaterial({
    color: 0xCCCCCC
});
var geometry = new THREE.SphereGeometry();
var checker = new THREE.TextureLoader().load('assets/checker.png');
var object3d;

AFRAME.registerComponent('depthkit', {
    schema: {},
    init: function () {
        object3d = this;
    },


    remove: function () {
        console.log("Component Removed");
        this.el.getObject3D('depthkitObject').geometry = new THREE.Geometry();
    }
});

function loadDepthKit() {
    depthkit = new Depthkit();
    depthkit.load('../assets/John/John.txt', '../assets/John/John.mp4',
        dkCharacter => {
            character = dkCharacter;

            //Position and rotation adjustments
            dkCharacter.rotation.set(Math.PI - 0.25, 0, Math.PI / -2.0);
            // dkCharacter.rotation.y = Math.PI;
            dkCharacter.position.set(-0.25, 0.92, 0);

            // Depthkit video playback control
            depthkit.video.muted = "muted"; // Necessary for auto-play in chrome now
            depthkit.setLoop(true);
            depthkit.play();

            var waiterSplashscreen = document.getElementById('loading');
            waiterSplashscreen.style.display = "none";
            object3d.el.setObject3D('depthkitObject', character);

        });
}

document.getElementById('depthkit').onclick = () => {
    var waiterSplashscreen = document.getElementById('loading');
    waiterSplashscreen.style.display = "block";
    loadDepthKit();
}