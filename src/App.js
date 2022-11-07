import "./App.css";
import Grid from "./Components/Grid/grid";
import React, { Component } from "react";

var startNode = { row: null, col: null };
var endNode = { row: null, col: null };
class App extends Component {
  state = {
    grid: [],
    mouseIsPressed: false,
    buttonClicked: [
      { id: "wallBtn", isClicked: false },
      { id: "startNodeBtn", isClicked: false },
      { id: "endBtn", isClicked: false },
      { id: "resetBtn", isClicked: false },
    ],
    hasStartNode: false,
  };

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 23; row++) {
      const currentRow = [];
      for (let col = 0; col < 53; col++) {
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  createNode = (col, row) => {
    return {
      row,
      col,
      isStart: false,
      isFinish: false,
      isWall: false,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };
  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }
  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = this.getNewGridWithWall(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  };
  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };
  handleMouseDown = (row, col) => {
    const wallBtnIndex = this.state.buttonClicked.findIndex(
      (btn) => btn.id === "wallBtn"
    );
    const startNodeBtnIndex = this.state.buttonClicked.findIndex(
      (btn) => btn.id === "startNodeBtn"
    );
    if (this.state.buttonClicked[wallBtnIndex].isClicked) {
      const updatedGrid = this.getNewGridWithWall(this.state.grid, row, col);
      this.setState({ grid: updatedGrid, mouseIsPressed: true });
    } else if (this.state.buttonClicked[startNodeBtnIndex].isClicked) {
      const updatedGrid = this.getNewGridWithStartNode(
        this.state.grid,
        row,
        col
      );

      this.setState({ grid: updatedGrid });
    }
  };
  handleButtonClick(buttonID) {
    var buttonClicked = [...this.state.buttonClicked];
    buttonClicked.forEach((button) => {
      if (button.id !== buttonID) {
        button.isClicked = false;
      } else {
        button.isClicked = true;
      }
    });
    this.setState({ buttonClicked });
  }
  getNewGridWithWall(grid, row, col) {
    console.log("works");
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  }
  getNewGridWithStartNode(grid, row, col) {
    const startNodeBtnIndex = this.state.buttonClicked.findIndex(
      (btn) => btn.id === "startNodeBtn"
    );
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isStart: !node.isStart };
    newGrid[row][col] = newNode;
    const buttonClicked = [...this.state.buttonClicked];
    buttonClicked[startNodeBtnIndex].isClicked = false;
    startNode = { row, col };
    this.setState({ hasStartNode: true, buttonClicked });
    return newGrid;
  }
  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div className="App" onMouseUp={this.handleMouseUp}>
        <nav style={{ marginTop: "5px" }}>
          <button
            className="btn btn-primary"
            id="wallBtn"
            onClick={(e) => this.handleButtonClick(e.target.id)}
          >
            Wall
          </button>
          <button
            className="btn btn-primary"
            id="startNodeBtn"
            onClick={(e) => this.handleButtonClick(e.target.id)}
            disabled={this.state.hasStartNode}
          >
            Start Node
          </button>
        </nav>
        <Grid
          key="grid"
          grid={grid}
          mouseIsPressed={mouseIsPressed}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseEnter={this.handleMouseEnter}
        />
      </div>
    );
  }
}

export default App;
