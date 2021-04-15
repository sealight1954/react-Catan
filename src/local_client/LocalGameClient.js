// TODO: single sourceから参照する。
const num_terrains = 1;
class LocalGameClient {
    constructor(snapshot) {
      this.history = [snapshot];
      // this.roads = Object.keys(edge_position_dict)
      // this.hexa_tiles = Array(terrain_position_array.length)
      // this.points = Array(num_nodes);
      this.myname = "LocalGameClient test"
      this.terrains = [...Array(num_terrains).entries()];
    }
    // TODO: 実際に内部で処理を分ける。
    send_action(type, road_position){
      console.log(type, road_position)
    }
  }

export default LocalGameClient