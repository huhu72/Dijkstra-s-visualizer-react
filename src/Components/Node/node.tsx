import React, { Component } from "react";
import "./node.css";
interface Props{
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  onMouseDown: (row:number, col:number)=>void;
  onMouseUp:()=>void;
  onMouseEnter: (row:number, col:number)=>void;
}
class Node extends Component<Props> {
  state = {};
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isWall,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
    } = this.props;
    const appendedClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <div
        key={`node-${row}-${col}`}
        id={`node-${row}-${col}`}
        className={`node ${appendedClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp}
        onMouseEnter={() => onMouseEnter(row, col)}
        style={{
          width: "1.6vw",
          height: "1.6vw",
          display: "inline-block",
          marginInline: "2px",
          backgroundColor: "#868686",
          borderRadius: "5px",
        }}
      ></div>
    );
  }
}

export default Node;
