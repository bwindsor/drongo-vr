import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { TweenMax } from 'gsap';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.t = 0;    // Tween variable
    this.n = 25;  // Number of DrongOs
    this.resetWaitPeriod = 5000; // Time to wait on completion before reset
    this.initialWaitPeriod = 4000; // Time to wait before the game starts
    this.pMax = 50 // Maximum distance
    this.resetTimeout = null;
    this.timerInterval = null;
    this.cursorRef = null;
    this.numTrees = 0;  // Number of trees in the circle
    this.treeRadius = 20;  // Radius of tree circle
    this.bounceHeight = 1.5; // Height above the ground for a DrongO to bounce
    this.treeHeightScale = 2;
    this.drongoScale = 0.04;
    this.accelRate = 20
    this.rotAccelRate = 60
    
    let rMax = 300 // Maximum rotation rate
    this.limits = [
      {
        p: [-this.pMax, this.pMax],
        r: [-rMax, rMax]
      }, {
        p: [this.bounceHeight, this.pMax],
        r: [-rMax, rMax]
      }, {
        p: [-this.pMax, this.pMax],
        r: [-rMax, rMax]
      }
    ]

    this.state = this.getInitialState()
  }

  getInitialState() {
    let drongoStates = Array.apply(null, Array(this.n)).map(x => {
      return {
        visible: true,
        xyz: [0, 0, 0].map((y,i) => {
          return {
            p: i==1 ? Math.random()*this.pMax+5 : (Math.random()-0.5)*this.pMax,
            d2p: 0,
            r: Math.random()*360,
            d2r: 0
          }
        })
      }
    })
    return {
      t: 0,
      drongoStates: drongoStates,
      startTime: new Date().getTime(),
      isPlaying: false,
      finalTime: null
    }
  }

  stepAccel(x, d2x, rate, limits) {
    d2x = d2x + (Math.random() - 0.5) * rate
    if (x > limits[1]) {
      d2x = -Math.abs(d2x)
    } else if (x < limits[0]) {
      d2x = Math.abs(d2x)
    }
    x = x + 0.5 * d2x * (0.05) ** 2  //s = ut + 0.5at^2
    return { x, d2x }
  }

  stepDrongoState(state, limits) {
    let { x: p, d2x: d2p } = this.stepAccel(state.p, state.d2p, this.accelRate, limits.p)
    let { x: r, d2x: d2r } = this.stepAccel(state.r, state.d2r, this.rotAccelRate, limits.r)
    return {
      ...state,
      p,
      d2p,
      r,
      d2r
    }
  }

  componentDidMount() {
    this.startGame()
  }

  startGame() {
    this.setState({ isPlaying: true })
    TweenMax.to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          drongoStates: prevState.drongoStates.map(d => {
            return {
              ...d,
              xyz: d.xyz.map((dd, i) => this.stepDrongoState(dd, this.limits[i]))
            }
          })
        }
      })
    })
  }
  stopGame() {
    this.setState({ finalTime: this.getElapsedTime(), isPlaying: false })
  }

  componentWillUnmount() {
    clearTimeout(this.resetTimeout)
  }

  getCount() {
    return this.state.drongoStates.filter(s => s.visible).length
  }

  handleClick(drongoIndex) {
    if (!this.state.isPlaying || this.getElapsedTime() < 0) { return }
    this.setState(prevState => {
      let newStates = prevState.drongoStates
      newStates[drongoIndex] = {
        ...prevState.drongoStates[drongoIndex],
        visible: false
      }
      return {
        drongoStates: newStates
      }
    })
    if (this.getCount() == 0) {
      this.stopGame()
      clearTimeout(this.resetTimeout);
      this.resetTimeout = setTimeout(() => this.resetGame(), this.resetWaitPeriod);
    }
  }
  
  resetGame() {
      this.setState(this.getInitialState())
      this.startGame();
  }

  // TODO - REPLACE THESE BY PUTTING THEM IN INIT FUNCTION OF A DRONGO OBJECT
  handleCursorRef(node) {
    if (!node) {return}
    this.cursorRef = node;
  }

  handleDrongoRef(node) {
    if (!node) { return }
    node.addEventListener('model-loaded', () => {
      this.cursorRef.components.raycaster.refreshObjects();
    });
  }

  getElapsedTime() {
   return (new Date().getTime() - this.state.startTime - this.initialWaitPeriod) / 1000;
  }

  render() {
    let elapsedTime = this.finalTime || this.getElapsedTime();
    return (
      <Scene stats>
        <a-assets>
          <a-asset-item id="drongo-obj" src="assets/drongo.obj"></a-asset-item>
          <a-asset-item id="drongo-mtl" src="assets/drongo.mtl"></a-asset-item>
          <a-asset-item id="tree-model" src="assets/tree/model.dae"></a-asset-item>
          <img id="grass-texture" src="assets/grass.jpg"></img>
          <img id="sky-texture" src="assets/sky.jpg"></img>
        </a-assets>
        <Entity position="0 0 0">
          <Entity primitive="a-camera" look-controls-enabled wasd-controls-enabled>
            <Entity cursor="fuse: true; fuseTimeout: 100"
              raycaster="objects: .drongo"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: black; shader: flat"
              _ref={node => this.handleCursorRef(node)}
              >
            </Entity>
            <Entity cursor="fuse: true; fuseTimeout: 3000"
              raycaster="objects: .reset-button"
              >
            </Entity>
            <Entity text={`value:${this.getCount()};align:center;color:black;font:exo2bold`} position="0 -0.1 -0.5">
            </Entity>
            <Entity text={`value:${elapsedTime.toFixed(elapsedTime >= 0 ? 1 : 0)}s;align:center;color:black;font:exo2bold`} position="0 -0.2 -0.5">
            </Entity>
          </Entity>
        </Entity>
        {this.numTrees && Array.apply(null, Array(this.numTrees)).map((d, i) => <Entity 
          collada-model="#tree-model"
          key={`tree-${i}`}
          position={`${this.treeRadius*Math.cos(i/this.numTrees*2*Math.PI)} 0 ${this.treeRadius*Math.sin(i/this.numTrees*2*Math.PI) + 10}`}
          scale={`1 ${this.treeHeightScale} 1`}
          ></Entity>)}
        <Entity primitive="a-plane" position="0 0 0" rotation="-90 0 0" material="src: #grass-texture; repeat: 10 10" height="2000" width="2000"></ Entity>
        <Entity primitive="a-circle" position="0 0.01 0" rotation="-90 0 0" color="red" radius="1"
          className="reset-button"
          events={{
            click: () => this.resetGame()
          }}
        ></ Entity>
        <Entity primitive="a-sky" material="src: #sky-texture"></Entity>
        {
          this.state.drongoStates.map((s, i) => {
            if (!s.visible) { return null }
            let p = s.xyz
            return <Entity
              key={`model-${i}`}
              className="drongo"
              _ref={node => this.handleDrongoRef(node)}
              events={{
                click: () => this.handleClick(i),
              }}
              position={`${p[0].p} ${p[1].p} ${p[2].p}`}
              rotation={`${p[0].r} ${p[1].r} ${p[2].r}`}
              obj-model="obj:#drongo-obj; mtl:#drongo-mtl"
              scale={`${this.drongoScale} ${this.drongoScale} ${this.drongoScale}`}
              ></Entity>
          })
        }
      </Scene>
    );
  }
}
