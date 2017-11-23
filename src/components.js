import 'aframe';

AFRAME.registerComponent('drongo-cursor-listener', {
    schema: {
        default: false
    },
    init: function () {
        this.el.addEventListener('click', function(e) {
            this.setAttribute('visible', false)
        })
    }
})