import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import { TweenMax } from 'gsap';

export default class AppViewer extends React.Component {

  constructor(props) {
    super(props)
    this.n = 25;  // Number of DrongOs
    this.drongoScale = 0.06;
    this.initialWaitPeriod = 4000; // Time to wait before the game starts
    this.state = this.getInitialState()
  }

  getInitialState() {
    let drongoStates = Array.apply(null, Array(this.n)).map(x => {
      return {
        visible: true,
        xyz: [0, 0, 0, 0, 0, 0]
      }
    })
    return {
      drongoStates: drongoStates,
      isPlaying: false,
      elapsedTime: 0,
      cameraRotation: [0, 0, 0]
    }
  }

  getCount() {
    return this.state.drongoStates.filter(s => s.visible).length
  }

  resetGame() {
      this.setState(this.getInitialState())
      this.startGame();
  }

  onMessageReceived(message) {
      this.setState(prevState => {
        return {
          ...prevState,
          drongoStates: message.drongoStates,
          cameraRotation: message.cameraRotation === null ? prevState.cameraRotation : message.cameraRotation,
          elapsedTime: message.elapsedTime
      }});
  }

  render() {
    let rot = this.state.cameraRotation;
    return (
      <Scene>
        <a-assets>
          <a-asset-item id="drongo-obj" src="assets/drongo.obj"></a-asset-item>
          <a-asset-item id="drongo-mtl" src="assets/drongo.mtl"></a-asset-item>
          <a-asset-item id="tree-model" src="assets/tree/model.dae"></a-asset-item>
          <img id="grass-texture" src="assets/grass.jpg"></img>
          <img id="sky-texture" src="assets/sky.jpg"></img>
        </a-assets>
        <Entity sharedspace="room: bwindsor-12345678" events={{
          'enterparticipant': evt => {
            var detail = evt.detail;
            console.log(detail);
            console.log(detail.id + 'entered with position ' + detail.position);
          },
          'participantmessage': evt => {
            this.onMessageReceived(evt.detail.message);
          }
        }}>
        <Entity position="0 50 100">
          <Entity primitive="a-camera" look-controls-enabled wasd-controls-enabled>
            <Entity text={`value:${this.getCount()};align:center;color:black;font:exo2bold`} position="0 -0.1 -0.5">
            </Entity>
            <Entity text={`value:${this.state.elapsedTime.toFixed(this.state.elapsedTime >= 0 ? 1 : 0)}s;align:center;color:black;font:exo2bold`} position="0 -0.2 -0.5">
            </Entity>
          </Entity>
        </Entity>
        <Entity primitive="a-plane" position="0 0 0" rotation="-90 0 0" material="src: #grass-texture; repeat: 400 400" height="2000" width="2000"></ Entity>
        <Entity primitive="a-circle" position="0 0.01 0" rotation="-90 0 0" color="red" radius="1"
          className="reset-button"
        ></ Entity>
        <Entity primitive="a-sky" material="src: #sky-texture"></Entity>
        <Entity line={`start: 0, 0, 0; end: ${-100*Math.sin(rot.az)*Math.cos(rot.el)}, ${100*Math.sin(rot.el)}, ${-100*Math.cos(rot.az)*Math.cos(rot.el)}; color: red`}></Entity>
        {
          this.state.drongoStates.map((s, i) => {
            if (!s.visible) { return null }
            let p = s.xyz
            return <Entity
              key={`model-${i}`}
              className="drongo"
              position={`${p[0]} ${p[1]} ${p[2]}`}
              rotation={`${p[3]} ${p[4]} ${p[5]}`}
              obj-model="obj:#drongo-obj; mtl:#drongo-mtl"
              scale={`${this.drongoScale} ${this.drongoScale} ${this.drongoScale}`}
              ></Entity>
          })
        }
        </Entity>
      </Scene>
    );
  }
}
