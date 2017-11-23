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
    // Acceleration (initialise to random numbers between 0 and 1)
    p = {
      x: {
        p: 0,
        a: 0
      }
    }

    this.p = Array.apply(null, Array(this.n)).map(x => { return
      [0,0,0].map(y => { return {
        p: Math.random(),
        a: 0
      }})
    })

    this.d2p = Array.apply(null, Array(this.n)).map(x => [0, 0, 0].map(y => Math.random()))
    // Rotational acceleration (initialise to zeros)
    this.d2r = Array.apply(null, Array(this.n)).map(x => [0, 0, 0])
    // Position
    this.p = this.d2p.map(x => x.map(y => 50))
    // Rotation
    this.r = this.d2r.map(x => [0,90,0])

    this.state = {
      t: this.t,  // Tween
      d2p: this.d2p,
      p: this.p,
      d2r: this.d2r,
      r: this.r
    }
  }

  stepPosition(p, a, da, plim) {
    a = a + da*(Math.random()-0.5)*rate
    if (p > plim) { a = -a }
    p = p + 0.5*a*(0.05)**2  //s = ut + 0.5at^2
    return {p, a}
  }

  componentDidMount() {
    TweenMax.to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          d2p: prevState.d2p.map((aa, i) => aa.map((aaa, j) => aaa + ((prevState.p[i][j] > 300) ? (-prevState.p[i][j]) : ((Math.random() - 0.5) * 8)))),
          p: prevState.p.map((rr, i) => rr.map((rrr, j) =>
            rrr + 0.5 * prevState.d2p[i][j] * (0.05 * 0.05)
          )),
          d2r: 
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
          this.state.p.map((p, i) => {
            let r = this.state.r[i]
            return <a-image
             key={`image-${i}`}
              drongo-cursor-listener
              position={`${p[0]} ${p[1]} ${p[2]}`}
              height="10"
              width="10"
              rotation={`${r[0]} ${r[1]} ${r[2]}`} src="assets/DrongOBird.png"></a-image>
          })
        }
      </a-scene>
    );
  }
}
