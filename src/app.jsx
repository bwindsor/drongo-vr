import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { TweenMax } from 'gsap';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.t = 0;    // Tween variable
    this.n = 100;  // Number of DrongOs

    let drongoStates = Array.apply(null, Array(this.n)).map(x =>
      [0, 0, 0].map(y => {
        return {
          p: Math.random()+50,
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

  stepDrongoState(state) {
    let a = state.d2p
    let p = state.p
    let rate = 1
    let plim = 200
    a = a + (Math.random() - 0.5) * rate
    if (p > plim) {
      a = -Math.abs(a)
    } else if (p < -plim) {
      a = Math.abs(a)
    }
    p = p + 0.5 * a * (0.05) ** 2  //s = ut + 0.5at^2
    return {
      p: p,
      d2p: a,
      r: state.r,
      d2r: state.d2r
    }
  }

  componentDidMount() {
    TweenMax.to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          drongoStates: prevState.drongoStates.map(d => d.map(dd => this.stepDrongoState(dd))) 
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
