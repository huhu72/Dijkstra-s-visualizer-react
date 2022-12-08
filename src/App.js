import "./App.css";
import Grid from "./Components/Grid/grid";
import React, { useState } from "react";
import ButtonToggleGroup from "./Components/ButtonToggleGroup";
import { ButtonTypes } from "./types";

function getInitialGrid() {
  const grid = [];

  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 53; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

function createNode(col, row) {
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
}

export default function App() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPresssed] = useState(false);
  const [activeBtn, setActiveBtn] = useState(ButtonTypes.Wall);
  const [startNode, setStartNode] = useState({ row: null, col: null });
  const [buttonSettings, setButtonSettings] = useState(
    getInitialButtonSettings()
  );

  function getInitialButtonSettings() {
    return Object.keys(ButtonTypes).reduce((accumulator, type) => {
      return {
        ...accumulator,
        [type]: {
          enabled: true,
        },
      };
    }, {});
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = updateGrid(grid, row, col, { isWall: true });
    setGrid(newGrid);
  }

  function updateGrid(grid, row, col, newState) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const updatedNode = { ...node, ...newState };
    newGrid[row][col] = updatedNode;
    setStartNode({ row, col });
    newGrid[row][col] = updatedNode;
    return newGrid;
  }
  function handleMouseUp() {
    setMouseIsPresssed(false);
  }

  function handleMouseDown(row, col) {
    if (activeBtn === ButtonTypes.Wall) {
      const updatedGrid = updateGrid(grid, row, col, { isWall: true });
      setGrid(updatedGrid);
      setMouseIsPresssed(true);
    } else if (activeBtn === ButtonTypes.Start && startNode.row == null) {
      const updatedGrid = updateGrid(grid, row, col, { isStart: true });
      setGrid(updatedGrid);
      setButtonSettings({ ...buttonSettings, Start: { enabled: false } });
    }
  }

  function onClick(buttonType) {
    setActiveBtn(buttonType);
    if (buttonType === ButtonTypes.Reset) {
      handleReset();
    }
  }

  function handleReset() {
    setGrid(getInitialGrid());
    setButtonSettings(getInitialButtonSettings);
    setStartNode({ row: null, col: null });
  }

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <ButtonToggleGroup onClick={onClick} buttonSettings={buttonSettings} />
      <Grid
        key="grid"
        grid={grid}
        mouseIsPressed={mouseIsPressed}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
