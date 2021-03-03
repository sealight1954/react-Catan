import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// hexagon tile 1: https://codepen.io/gpyne/pen/iElhp
// hexagon tile 2: https://www.codesmite.com/article/how-to-create-pure-css-hexagonal-grids
// hexagon tile 3: https://codepen.io/sandeep/pen/wFeKj

// https://ja.reactjs.org/docs/rendering-elements.html#updating-the-rendered-element
function tick() {
    const element = (
      <div>
        <h1>Welcome</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    return element;

    // ReactDOM.render(element, document.getElementById('root'));
  }

  // 下記では表示更新されない。blog.ikappio.comの記事にfunctionを使った方法もある。
  // Hookを使う。
  setInterval(tick, 1000);
  function Welcome(props) {
    return <h1>Hello, {tick()}aim</h1>;
  }
  // https://blog.ikappio.com/drawing-with-setinterval-on-react/
  // 
class Tick extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            now: new Date(),
        };
    }
    componentDidMount() {
      this.intervalId = setInterval(()=> {
        this.setState({
          now: new Date(),
        });
      }, 1000);
    }
    componentWillUnmount() {
      clearInterval(this.intervalId);
    }
    render() {
        return(
            <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.now.toString()}.</h2>
      </div>
        )
    }
}

// TODO: class="hexaone" text comes to top, not within div box. 
class Grid extends React.Component{
    render() {
        return (
            <div>
            <h1><Tick /></h1>
            <h1><Welcome name={tick()}/></h1>
            <div class="honeycomb">
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can trust yourself when all men doubt you,</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">But make allowance for their doubting too;</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can wait and not be tired by waiting,</div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              

            </div>
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can meet with Triumph and Disaster</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">And treat those two impostors just the same;</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can bear to hear the truth you've spoken</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">Twisted by knaves to make a trap for fools,</div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              
              {/* <div class="hexagon oddrow">
                <div class="hexagontent">And stoop and build 'em up with worn-out tools:</div>
              </div> */}
            </div>
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">And lose, and start again at your beginnings</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">And never breathe a word about your loss;</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can force your heart and nerve and sinew</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">To serve your turn long after they are gone,</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">And so hold on when there is nothing in you</div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
            </div>
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If neither foes nor loving friends can hurt you,</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If all men count with you, but none too much;</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">If you can fill the unforgiving minute</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">With sixty seconds' worth of distance run,</div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
            </div>
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent">
                </div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent">bbb</div>
              </div>
              <div class="hexagon">
                <div class="hexagontent"></div>
              </div>
              <div class="hexagon">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent">abc</div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
            </div>
          </div>
          </div>
        )
    }
}


ReactDOM.render(
    <Grid />,
    document.getElementById('root')
  );