import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { TweenMax } from 'gsap';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.t = 0;    // Tween variable
    this.n = 50;  // Number of DrongOs

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

    let drongoStates = Array.apply(null, Array(this.n)).map(x =>
      [0, 0, 0].map(y => {
        return {
          p: Math.random() + 50,
          d2p: 0,
          r: 0,
          d2r: 0
        }
      })
    )

    this.state = {
      t: this.t,  // Tween
      drongoStates: drongoStates
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
    let rate = 100
    let { x: p, d2x: d2p } = this.stepAccel(state.p, state.d2p, rate, limits.p)
    let rotRate = 15
    let { x: r, d2x: d2r } = this.stepAccel(state.r, state.d2r, rotRate, limits.r)
    return {
      p,
      d2p,
      r,
      d2r
    }
  }

  componentDidMount() {
    TweenMax.to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          drongoStates: prevState.drongoStates.map(d => d.map((dd, i) => this.stepDrongoState(dd, this.limits[i])))
        }
      })
    })
  }

  render() {
    return (
      <a-scene>
        <a-entity position="0 0 0">
          <a-camera look-controls-enabled wasd-controls-enabled>
            <a-entity cursor="fuse: true; fuseTimeout: 100"
              position="0 0 -1"
              geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
              material="color: black; shader: flat">
            </a-entity>
          </a-camera>
        </a-entity>
        <a-circle position="0 0 0" rotation="-90 0 0" color="#86DC2B" radius="2000"></a-circle>
        <a-sky color="rgb(175,227,254)"></a-sky>
        {
          this.state.drongoStates.map((p, i) => {
            return <a-image
              key={`image-${i}`}
              drongo-cursor-listener
              position={`${p[0].p} ${p[1].p} ${p[2].p}`}
              height="10"
              width="10"
              rotation={`${p[0].r} ${p[1].r} ${p[2].r}`} src="assets/DrongOBird.png"></a-image>
          })
        }
      </a-scene>
    );
  }
}
