import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// hexagon tile 1: https://codepen.io/gpyne/pen/iElhp
// hexagon tile 2: https://www.codesmite.com/article/how-to-create-pure-css-hexagonal-grids
// hexagon tile 3: https://codepen.io/sandeep/pen/wFeKj

const terrainHexaWidth = 116;
const terrainHexaGridHeight = 100;
const roadWidth = 20;
const roadHeight = 20;
const oddMargin = 58 + 13;

const terrain_position_array = [
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [3, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [0, 3],
  [1, 3],
  [2, 3],
  [3, 3],
  [1, 4],
  [2, 4],
  [3, 4]
]

const num_roads = 72;
const road_x_offset = 33;
const road_y_offset = -10;
const road_grid_width = 68;
const road_grid_height = 60;
const road_position_dict = {
  "0": [2, 0],
  "1": [3, 0],
  "2": [4, 0],
  "3": [5, 0],
  "4": [6, 0],
  "5": [7, 0],
  "6": [2, 1],
  "7": [4, 1],
  "8": [6, 1],
  "9": [8, 1],
  "10": [1, 2],
  "11": [2, 2],
  "12": [3, 2],
  "13": [4, 2],
  "14": [5, 2],
  "15": [6, 2],
  "16": [7, 2],
  "17": [8, 2],
  "18": [1, 3],
  "19": [3, 3],
  "20": [5, 3],
  "21": [7, 3],
  "22": [9, 3],
  "23": [0, 4],
  "24": [1, 4],
  "25": [2, 4],
  "26": [3, 4],
  "27": [4, 4],
  "28": [5, 4],
  "29": [6, 4],
  "30": [7, 4],
  "31": [8, 4],
  "32": [9, 4],
  "33": [0, 5],
  "34": [2, 5],
  "35": [4, 5],
  "36": [6, 5],
  "37": [8, 5],
  "38": [10, 5],
  "39": [0, 6],
  "40": [1, 6],
  "41": [2, 6],
  "42": [3, 6],
  "43": [4, 6],
  "44": [5, 6],
  "45": [6, 6],
  "46": [7, 6],
  "47": [8, 6],
  "48": [9, 6],
  "49": [1, 7],
  "50": [3, 7],
  "51": [5, 7],
  "52": [7, 7],
  "53": [9, 7],
  "54": [1, 8],
  "55": [2, 8],
  "56": [3, 8],
  "57": [4, 8],
  "58": [5, 8],
  "59": [6, 8],
  "60": [7, 8],
  "61": [8, 8],
  "62": [2, 9],
  "63": [4, 9],
  "64": [6, 9],
  "65": [8, 9],
  "66": [2, 10],
  "67": [3, 10],
  "68": [4, 10],
  "69": [5, 10],
  "70": [6, 10],
  "71": [7, 10],
}

class LocalGameServer {
  constructor() {
    this.roads = Object.keys(road_position_dict)
    this.hexa_tiles = Array(terrain_position_array.length)
  }
}

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
class Tick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date(),
    };
  }
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        now: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.now.toString()}.</h2>
      </div>
    )
  }
}
function TerrainHexa(props) {
  let class_name = "hexagontent"
  class_name += " terrain-hexa-btn"
  let left = roadWidth + (roadWidth + terrainHexaWidth) * parseInt(props.x);
  let top = roadWidth + (roadHeight + terrainHexaGridHeight) * parseInt(props.y);
  if (parseInt(props.y) % 2 == 1) {
    left += oddMargin
  }
  return (
    <div class="hexagon" style={{ top: top + 'px', left: left + 'px' }}>
      {/* <div class="hexagontent"> */}
      <button className={class_name}
        onClick={() => props.onClick()}

      >{props.dice}</button>
    </div>
    // </div>
  )
}
function Road(props) {
  let class_name = "road";
  let x = parseInt(props.x);
  let y = parseInt(props.y);
  if ((y + 4) % 4 == 0) {
    class_name += x % 2 == 0 ? " rup" : " lup"
  }
  else if ((y + 4) % 4 == 2) {
    class_name += x % 2 == 0 ? " lup" : " rup"
  } else {
    class_name += " road-oddrow"
  }
  let left = road_x_offset + road_grid_width * parseInt(x);
  let top = road_y_offset + road_grid_height * parseInt(y);
  // http://www.tohoho-web.com/css/prop/transform-origin.htm
  // transform_originを設定すること
  return (
    <div class={class_name} style={{ top: top + 'px', left: left + 'px' }}>
      <button class="roadcontent"
        onClick={() => props.onClick()}
      >{x}, {y}</button>
    </div>
  )
}
// TODO: class="hexaone" text comes to top, not within div box. 
class CatanBoard extends React.Component {
  renderTerrainHexa(i) {
    let x = "";
    let y = "";
    [x, y] = terrain_position_array[i]
    return (
      <TerrainHexa
        dice={i}
        // type
        onClick={() => this.props.onClick(i)}
        x={x}
        y={y}
      // 多分盗賊かどうか、is_robber_thereとかがくる。
      />
    )
  }
  renderRoad(i) {
    let x = "";
    let y = "";
    [x, y] = road_position_dict[`${i}`]
    return (
      <Road
        // TODO: onClick to be onClickRoad()?
        onClick={() => this.props.onClick(i)}
        x={x}
        y={y}
      ></Road>
    )
  }
  render() {
    return (
      <div>
        <h1><Tick /></h1>
        <h1><Welcome name={tick()} /></h1>
        {/* TODO: catan-board aware of its position */}
        <div class="catan-board">
          <div>{this.renderRoad(0)}</div>
          <div>{this.renderRoad(1)}</div>
          <div>{this.renderRoad(2)}</div>
          <div>{this.renderRoad(3)}</div>
          <div>{this.renderRoad(4)}</div>
          <div>{this.renderRoad(5)}</div>
          <div>{this.renderRoad(6)}</div>
          <div>{this.renderRoad(7)}</div>
          <div>{this.renderRoad(8)}</div>
          <div>{this.renderRoad(9)}</div>
          <div>{this.renderRoad(10)}</div>
          <div>{this.renderRoad(11)}</div>
          <div>{this.renderRoad(12)}</div>
          <div>{this.renderRoad(13)}</div>
          <div>{this.renderRoad(14)}</div>
          <div>{this.renderRoad(15)}</div>
          <div>{this.renderRoad(16)}</div>
          <div>{this.renderRoad(17)}</div>
          <div>{this.renderRoad(18)}</div>
          <div>{this.renderRoad(19)}</div>
          <div>{this.renderRoad(20)}</div>
          <div>{this.renderRoad(21)}</div>
          <div>{this.renderRoad(22)}</div>
          <div>{this.renderRoad(23)}</div>
          <div>{this.renderRoad(24)}</div>
          <div>{this.renderRoad(25)}</div>
          <div>{this.renderRoad(26)}</div>
          <div>{this.renderRoad(27)}</div>
          <div>{this.renderRoad(28)}</div>
          <div>{this.renderRoad(29)}</div>
          <div>{this.renderRoad(30)}</div>
          <div>{this.renderRoad(31)}</div>
          <div>{this.renderRoad(32)}</div>
          <div>{this.renderRoad(33)}</div>
          <div>{this.renderRoad(34)}</div>
          <div>{this.renderRoad(35)}</div>
          <div>{this.renderRoad(36)}</div>
          <div>{this.renderRoad(37)}</div>
          <div>{this.renderRoad(38)}</div>
          <div>{this.renderRoad(39)}</div>
          <div>{this.renderRoad(40)}</div>
          <div>{this.renderRoad(41)}</div>
          <div>{this.renderRoad(42)}</div>
          <div>{this.renderRoad(43)}</div>
          <div>{this.renderRoad(44)}</div>
          <div>{this.renderRoad(45)}</div>
          <div>{this.renderRoad(46)}</div>
          <div>{this.renderRoad(47)}</div>
          <div>{this.renderRoad(48)}</div>
          <div>{this.renderRoad(49)}</div>
          <div>{this.renderRoad(50)}</div>
          <div>{this.renderRoad(51)}</div>
          <div>{this.renderRoad(52)}</div>
          <div>{this.renderRoad(53)}</div>
          <div>{this.renderRoad(54)}</div>
          <div>{this.renderRoad(55)}</div>
          <div>{this.renderRoad(56)}</div>
          <div>{this.renderRoad(57)}</div>
          <div>{this.renderRoad(58)}</div>
          <div>{this.renderRoad(59)}</div>
          <div>{this.renderRoad(60)}</div>
          <div>{this.renderRoad(61)}</div>
          <div>{this.renderRoad(62)}</div>
          <div>{this.renderRoad(63)}</div>
          <div>{this.renderRoad(64)}</div>
          <div>{this.renderRoad(65)}</div>
          <div>{this.renderRoad(66)}</div>
          <div>{this.renderRoad(67)}</div>
          <div>{this.renderRoad(68)}</div>
          <div>{this.renderRoad(69)}</div>
          <div>{this.renderRoad(70)}</div>
          <div>{this.renderRoad(71)}</div>
          <div class="honeycomb">
            <div class="ibws-fix">
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              <div class="hexaone">
                <div class="hexagontent"></div>
              </div>
              {/* <button>abc</button> */}
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
        {/* Developerツールを開かないと登場しない。 */}
        {/* positionを絶対位置表記で入力していくのがつらい */}
        {/* See: https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout */}
        <div><ul id="action-btn">
          {/* <li><button class="dev-road-btn" style={{top: '800px', left: '100px'}}>Build Road</button></li>
            <li><button class="dev-road-btn" style={{top: '850px', left: '100px'}}>Build Settlement</button></li>
            <li><button class="dev-road-btn" style={{top: '900px', left: '100px'}}>Build City</button></li>
            <li><button class="dev-road-btn" style={{top: '950px', left: '100px'}}>Buy Development Card</button></li>
            <li><button class="dev-road-btn" style={{top: '1000px', left: '100px'}}>4</button></li> */}
          <li><button class="dev-road-btn">Build Road</button></li>
          <li><button class="dev-road-btn">Build Settlement</button></li>
          <li><button class="dev-road-btn">Build City</button></li>
          <li><button class="dev-road-btn">Buy Development Card</button></li>
          <li><button class="dev-road-btn">4dfa</button></li>

        </ul></div>
      </div>
    )
  }
}

class CatanGame extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick(i) {
    let a = 1;
  }
  render() {
    return (
      <CatanBoard
        onClick={(i) => this.handleClick(i)}
      />
    )
  }
}

ReactDOM.render(
  <CatanGame />,
  document.getElementById('root')
);