import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// hexagon tile 1: https://codepen.io/gpyne/pen/iElhp
// hexagon tile 2: https://www.codesmite.com/article/how-to-create-pure-css-hexagonal-grids
// hexagon tile 3: https://codepen.io/sandeep/pen/wFeKj
class Grid extends React.Component{
    render() {
        return (
        <div class='r-hex'>
            <div class='r-hex-inner'>
                <div class='r-hex-inner-2'></div>
            </div>
        </div>
        )
    }
}

ReactDOM.render(
    <Grid />,
    document.getElementById('root')
  );