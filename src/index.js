import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LocalGameClient from './local_client/LocalGameClient'
import counter from './reducers'
import { createStore } from 'redux'

// hexagon tile 1: https://codepen.io/gpyne/pen/iElhp
// hexagon tile 2: https://www.codesmite.com/article/how-to-create-pure-css-hexagonal-grids
// hexagon tile 3: https://codepen.io/sandeep/pen/wFeKj
const store = createStore(counter)
// render()
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
const num_terrains = 19;

const edge_x_offset = 33;
const edge_y_offset = -10;
const edge_grid_width = 68;
const edge_grid_height = 60;
const edge_position_dict = {
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
const num_edges = Object.keys(edge_position_dict).length;

class Player {
  constructor (who_am_i){
    // Resoource
    this.Lumber = 0;
    this.Brick = 0;
    this.Grain = 0;
    this.Wool = 0;
    this.Ore = 0;
    this.Cards = [];
    this.hasLargest = false;
    this.hasLongest = false;
    this.usedKnights = 0;
    this.who_am_i = who_am_i;
    // usedCards?
  }
}

const resourceTypes = {
  Lumber: 0,
  Brick: 1,
  Grain: 2,
  Wool: 3,
  Ore: 4,
}


const num_nodes = 54;


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
function ActionButton(props) {
  // Render Action Button
  return (
    <li>
      <button class="dev-road-btn"
        onClick={() => props.onClick()}
      >{props.name}</button>
    </li>
  )
}
function TerrainHexa(props) {
  let class_name = "hexagontent"
  class_name += " terrain-hexa-btn"
  let left = parseInt(props.offset_x) + roadWidth + (roadWidth + terrainHexaWidth) * parseInt(props.x);
  let top = parseInt(props.offset_y) + roadWidth + (roadHeight + terrainHexaGridHeight) * parseInt(props.y);
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
function EdgeDOM(props) {
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
  let left = parseInt(props.offset_x) + edge_x_offset + edge_grid_width * parseInt(x);
  let top = parseInt(props.offset_y) + edge_y_offset + edge_grid_height * parseInt(y);
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
  // Class fields: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
  // constructorの中に書かなくて良い？
  // setはできた。何に使う？
  state = {
    offset_x: 0,
    offset_y: 0,
  };

  element = React.createRef();

  onWindowResize = () => {
    if (this.element.current) {
      const offset_dom = this.element.current.getBoundingClientRect();
      const offset_x = offset_dom.left;
      const offset_y = offset_dom.top;
      this.setState({offset_x, offset_y}, () => {
        console.log(this.state);
        });
    }
  };
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }
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
        offset_x={this.state.offset_x}
        offset_y={this.state.offset_y}
      // 多分盗賊かどうか、is_robber_thereとかがくる。
      />
    )
  }
  renderEdge(i) {
    let x = "";
    let y = "";
    [x, y] = edge_position_dict[`${i}`]
    return (
      <EdgeDOM
        // TODO: onClick to be onClickEdge()?
        onClick={() => this.props.onClick(i)}
        x={x}
        y={y}
        offset_x={this.state.offset_x}
        offset_y={this.state.offset_y}
      ></EdgeDOM>
    )
  }
  renderActionButton(idx, value) {
    return(
      <ActionButton
        name={value}
        onClick={()=>this.props.onClickActionButton(idx)}
      ></ActionButton>
    )
  }
  render() {
    return (
      <div>
        {/* <h1><Tick /></h1> */}
        {/* <h1><Welcome name={tick()} /></h1> */}
        {/* TODO: catan-board aware of its position */}
        <div class="catan-board" ref={this.element}>
          {[...Array(num_edges).keys()].map(x => this.renderEdge(x))}
          {[...Array(num_terrains).keys()].map(x => this.renderTerrainHexa(x))}
        </div>
        
        {/* Developerツールを開かないと登場しない。 */}
        {/* positionを絶対位置表記で入力していくのがつらい */}
        {/* See: https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout */}
        <div>
          <ul id="action-btn-ul">
            {[...["Build Road", "Build Settlement", "Build City", 
            "Buy Development Card", "Change", "User Change", "Use Card"
            ].entries()].map(([x, y]) => this.renderActionButton(x, y))}
            

          </ul>
        </div>
      </div>
    )
  }

}

class CatanGame extends React.Component {
  constructor(props) {
    
    super(props)
    const snapshot = {
      // Board
      terrains: [...Array(num_terrains).entries()].map((i, v) => ({
        // TODO: Randomly locate terrains and dices.
        // Dice rolls and resources are given externally.
        dice: 0, 
        resourceType: 0
      })),
      // TODO: Define "No road" state somewhere?
      edges: [...Array(num_edges)].map(() => null),
      nodes: [...Array(num_nodes)].map(() => (
        {
          player: null,
          is_city: false, // How to obtain city or settlement?
          port: null,
          from: null, // TODO All / Individual resources. All: 3-1 change, Ind: 2-1 change
        })
      ),
      // Action: Need to be request body.
      prevAction: {
        player: 0,
        actionType: 0,
        consume: [0, 0, 0, 0, 0]
        // response: "Game started"
      },
      response: "Game started",
      // Player
      // TODO: 4人以外対戦?
      players: [...Array(4).entries()].map((i, v) => new Player(i))
    }
    this.state = {
      // 盤面をリストで持つ
      history: [snapshot]
    }
    this.game_client = new LocalGameClient(snapshot);
    this.state.stepNumber = 0
  }
  handleClick(i) {
    let a = 1;
  }
  handleClickActionButton(i){
    let b = 1;
    if (i == 0){
      // Build Roadが他のところでも文字列で使われているので共通化する。
      // 2つめの引数は何になる？資源？資源は送る時点で決まっていて、処理できるかできないか。

      // 場所とか。
      const road_position = [0, 1];
      this.game_client.send_action('Build Road', road_position)
      
    }
  }
  jumpTO(step) {
    this.setState({
      stepNumber: step,

      // whoIsNext: 
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]
    const moves = history.map((step, move) =>{
      // TODO: description to be action description
      const desc = move ? 
      'Go to move #' + move:
      'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    return (
      <div>
        <CatanBoard
          onClick={(i) => this.handleClick(i)}
          // これは合法
          onClickActionButton={(i) => this.handleClickActionButton(i)}
          edges={current.edges}
          
        />
        <div>{this.game_client.myname}</div>
        <div><ol>{moves}</ol></div>
      </div>
    )
  }
}

ReactDOM.render(
  <CatanGame />,
  document.getElementById('root')
);