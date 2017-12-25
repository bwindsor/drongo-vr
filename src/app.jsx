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
    this.resetTimeout = null;
    this.initialTimeout = null;
    this.timerInterval = null;
    this.cursorRef = null;

    let pMax = 200 // Maximum distance
    let rMax = 300 // Maximum rotation rate
    this.limits = [
      {
        p: [-pMax, pMax],
        r: [-rMax, rMax]
      }, {
        p: [5, pMax],
        r: [-rMax, rMax]
      }, {
        p: [-pMax, pMax],
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
            p: i==1 ? Math.random()*100+5 : (Math.random()-0.5)*100,
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
      elapsedTime: -this.initialWaitPeriod/1000,
      isPlaying: false
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => this.setState(prevState => {
      return { elapsedTime: prevState.elapsedTime + 0.1 }
    }), 100)
  }
  stopTimer() {
    clearInterval(this.timerInterval)
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
    let rate = 30
    let { x: p, d2x: d2p } = this.stepAccel(state.p, state.d2p, rate, limits.p)
    let rotRate = 15
    let { x: r, d2x: d2r } = this.stepAccel(state.r, state.d2r, rotRate, limits.r)
    return {
      ...state,
      p,
      d2p,
      r,
      d2r
    }
  }

  componentDidMount() {
    this.waitForGame()
  }

  waitForGame() {
    this.initialTimeout = setTimeout(() => this.startGame(), this.initialWaitPeriod)
    this.startTimer()
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
    this.stopTimer()
    this.setState({ isPlaying: false })
  }

  componentWillUnmount() {
    clearTimeout(this.resetTimeout)
    clearTimeout(this.initialTimeout)
    this.stopGame()
  }

  getCount() {
    return this.state.drongoStates.filter(s => s.visible).length
  }

  handleClick(drongoIndex) {
    if (!this.state.isPlaying || this.state.elapsedTime < 0) { return }
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
      this.resetTimeout = setTimeout(() => {
        this.setState(this.getInitialState())
        this.waitForGame()
      }, this.resetWaitPeriod)
    }
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

  render() {
    return (
      <Scene>
        <a-assets>
          <a-asset-item id="drongo-obj" src="assets/drongo.obj"></a-asset-item>
          <a-asset-item id="drongo-mtl" src="assets/drongo.mtl"></a-asset-item>
        </a-assets>
        <Entity position="0 0 0">
          <Entity primitive="a-camera" look-controls-enabled wasd-controls-enabled>
            <Entity cursor="fuse: true; fuseTimeout: 100"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: black; shader: flat"
              _ref={node => this.handleCursorRef(node)}
              >
            </Entity>
            <Entity text={`value:${this.getCount()};align:center;color:black;font:exo2bold`} position="0 -0.1 -0.5">
            </Entity>
            <Entity text={`value:${this.state.elapsedTime.toFixed(this.state.elapsedTime >= 0 ? 1 : 0)}s;align:center;color:black;font:exo2bold`} position="0 -0.2 -0.5">
            </Entity>
          </Entity>
        </Entity>
        <Entity primitive="a-circle" position="0 0 0" rotation="-90 0 0" color="#86DC2B" radius="2000"></ Entity>
        <Entity primitive="a-sky" color="rgb(175,227,254)"></Entity>
        {
          this.state.drongoStates.map((s, i) => {
            if (!s.visible) { return null }
            let p = s.xyz
            return <Entity
              key={`model-${i}`}
              _ref={node => this.handleDrongoRef(node)}
              events={{
                click: () => this.handleClick(i),
              }}
              position={`${p[0].p} ${p[1].p} ${p[2].p}`}
              rotation={`${p[0].r} ${p[1].r} ${p[2].r}`}
              obj-model="obj:#drongo-obj; mtl:#drongo-mtl"
              scale="0.2 0.2 0.2"
              ></Entity>
          })
        }
      </Scene>
    );
  }
}
