import "./App.css";
import Grid from "./Components/Grid/grid";
import React, { useState } from "react";
import ButtonToggleGroup from "./Components/ButtonToggleGroup";
import { ButtonSettings, ButtonTypes, NodeType } from "./types";

function getInitialGrid(): NodeType[][] {
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

function createNode(col: number, row:number): NodeType {
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
  const [grid, setGrid] = useState<NodeType[][]>(getInitialGrid());
  const [mouseIsPressed, setMouseIsPresssed] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<ButtonTypes>(ButtonTypes.Wall);
  const [startNode, setStartNode] = useState<{row: number, col:number}>({ row: null, col: null });
  const [buttonSettings, setButtonSettings] = useState(
    getInitialButtonSettings()
  );

  function getInitialButtonSettings(): Record<ButtonTypes, ButtonSettings> {
    return Object.keys(ButtonTypes).reduce((accumulator, type) => {
      return {
        ...accumulator,
        [type]: {
          enabled: true,
        },
      };
    }, {} as Record<ButtonTypes, ButtonSettings>);
  }

  function handleMouseEnter(row: number, col: number) {
    if (!mouseIsPressed) return;
    const newGrid = updateGrid(grid, row, col, { isWall: true });
    setGrid(newGrid);
  }
//Using partial lets you give a partial type of the object. (i.e were only using the isWall property instead of all the other ones.) this makes all the properties optional so we dont have to add a ? to the properties in the Node type
  function updateGrid(grid: NodeType[][], row:number, col:number, newState:Partial<NodeType>):NodeType[][] {
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

  function handleMouseDown(row:number, col:number) {
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

  function onClick(buttonType: ButtonTypes) {
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
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
}
