import React, { Component } from "react";
import Node from "../Node/node";
import {NodeType} from "../../types"

interface Props{
  grid:NodeType[][];
  onMouseDown: (row:number, col:number)=>void;
  onMouseUp:()=>void;
  onMouseEnter: (row:number, col:number)=>void;
}
class Grid extends Component<Props> {
  render() {
    const { grid, onMouseDown, onMouseUp, onMouseEnter } =
      this.props;

    // console.log({ grid });
    return (
      <div className="grid" style={{ margin: "5px 0 0" }} key="Grid">
        {grid.map((row, i) => {
          return (
            <div className="i" key={i}>
              {row.map((node, j) => {
                const { row, col, isStart, isFinish, isWall } = node;
                return (
                  <Node
                    key={`node-${row}-${col}`}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isFinish={isFinish}
                    isWall={isWall}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseEnter={onMouseEnter}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Grid;
