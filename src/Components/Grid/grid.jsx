import React, { Component } from "react";
import Node from "../Node/node";

class Grid extends Component {
  render() {
    const { grid, mouseIsPressed, onMouseDown, onMouseUp, onMouseEnter } =
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
                    mouseIsPressed={mouseIsPressed}
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
