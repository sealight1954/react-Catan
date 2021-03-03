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
function TerrainHexa (props) {
  let class_name = "hexagontent"
  class_name += " terrain-hexa-btn"
  return (
    <div class="hexagon">
      {/* <div class="hexagontent"> */}
      <button className={class_name}
        onClick={() => props.onClick()}
        
        >{props.dice}</button>
    </div>
    // </div>
  )
}
// TODO: class="hexaone" text comes to top, not within div box. 
class CatanBoard extends React.Component{
    renderTerrainHexa(i) {
      return (
        <TerrainHexa 
          dice={i}
          // type
          onClick={() => this.props.onClick(i)}
          // 多分盗賊かどうか、is_robber_thereとかがくる。
        />
      )
    }
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
              {this.renderTerrainHexa(0)}
              {this.renderTerrainHexa(1)}
              {this.renderTerrainHexa(2)}
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
              {this.renderTerrainHexa(3)}
              {this.renderTerrainHexa(4)}
              {this.renderTerrainHexa(5)}
              {this.renderTerrainHexa(6)}
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
              {this.renderTerrainHexa(7)}
              {this.renderTerrainHexa(8)}
              {this.renderTerrainHexa(9)}
              {this.renderTerrainHexa(10)}
              {this.renderTerrainHexa(11)}
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
              {this.renderTerrainHexa(12)}
              {this.renderTerrainHexa(13)}
              {this.renderTerrainHexa(14)}
              {this.renderTerrainHexa(15)}

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
              {this.renderTerrainHexa(16)}
              {this.renderTerrainHexa(17)}
              {this.renderTerrainHexa(18)}

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

class CatanGame extends React.Component{
  constructor(props){
    super(props)
  }
  handleClick(i) {
    let a = 1;
  }
  render() {
    return (
      <CatanBoard 
        onClick={(i)=> this.handleClick(i)}
      />
    )
  }
}

ReactDOM.render(
    <CatanGame />,
    document.getElementById('root')
  );