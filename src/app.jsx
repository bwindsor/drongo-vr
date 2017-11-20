import 'aframe';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { TweenMax } from 'gsap';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.t = 0;
    this.n = 100;
    this.a = Array.apply(null, Array(this.n)).map(x => [0, 0, 0, 0, 0, 0].map(y => Math.random()))
    this.p = this.a.map(x => x.map(y => 50))

    this.state = {
      t: this.t,
      r: this.p,
      a: this.a
    }
  }

  componentDidMount() {
    TweenMax.to(this, 3, {
      t: 1, repeat: -1, yoyo: true, onUpdate: () => this.setState(prevState => {
        return {
          t: this.t,
          a: prevState.a.map((aa,i) => aa.map((aaa,j) => aaa + ((prevState.r[i][j] > 300) ? (-prevState.r[i][j]) : ((Math.random() - 0.5) * 8)))),
          r: prevState.r.map((rr, i) => rr.map((rrr, j) =>
            rrr + 0.5 * prevState.a[i][j] * (0.05*0.05)
          ))
        }
      })
    })
  }

  render() {
    return (
      <a-scene>
        <a-circle position="0 0 0" rotation="-90 0 0" color="#86DC2B" radius="2000"></a-circle>
        <a-sky color="rgb(175,227,254)"></a-sky>
        {
          this.state.r.map((r, i) => {
            return <a-image key={`image-${i}`}
              position={`${r[0]} ${Math.max(5, r[1])} ${r[2]}`}
              height="10"
              width="10"
              rotation={`${r[3] * 30} ${r[4] * 30} ${r[5] * 30}`} src="assets/DrongOBird.png"></a-image>
          })
        }
      </a-scene>
    );
  }
}
