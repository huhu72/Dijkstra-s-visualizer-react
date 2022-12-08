import "./App.css";
import Grid from "./Components/Grid/grid";
import React, { useState } from "react";
import ButtonToggleGroup from "./Components/ButtonToggleGroup";
import { ButtonTypes } from "./types";

var startNode = { row: null, col: null };
var endNode = { row: null, col: null };

// class App extends Component {
//   state = {
//     grid: [],
//     mouseIsPressed: false,
//     buttonClicked: [
//       { id: "wallBtn", isClicked: false },
//       { id: "startNodeBtn", isClicked: false },
//       { id: "endBtn", isClicked: false },
//       { id: "resetBtn", isClicked: false },
//     ],
//     hasStartNode: false,
//   };

//   // const [state, setState] = useState({
//   //   grid: [],
//   //   mouseIsPressed: false,
//   //   buttonClicked: [
//   //     { id: "wallBtn", isClicked: false },
//   //     { id: "startNodeBtn", isClicked: false },
//   //     { id: "endBtn", isClicked: false },
//   //     { id: "resetBtn", isClicked: false },
//   //   ],
//   //   hasStartNode: false,
//   // });

//   getInitialGrid = () => {
//     const grid = [];

//     for (let row = 0; row < 23; row++) {
//       const currentRow = [];
//       for (let col = 0; col < 53; col++) {
//         currentRow.push(this.createNode(col, row));
//       }
//       grid.push(currentRow);
//     }
//     return grid;
//   };
//   //For functional component implementation
//   //const [grid, setGrid] = useState(getInitialGrid());

//   createNode = (col, row) => {
//     return {
//       row,
//       col,
//       isStart: false,
//       isFinish: false,
//       isWall: false,
//       distance: Infinity,
//       isVisited: false,
//       previousNode: null,
//     };
//   };

//   componentDidMount() {
//     const grid = this.getInitialGrid();
//     this.setState({ grid });
//     console.log(this.state.buttonClicked);
//   }

// handleMouseEnter = (row, col) => {
//   if (!this.state.mouseIsPressed) return;

//   const newGrid = this.getNewGridWithWall(this.state.grid, row, col);
//   this.setState({ grid: newGrid });
// };

// handleMouseUp = () => {
//   this.setState({ mouseIsPressed: false });
// };

// handleMouseDown = (row, col) => {
//   const wallBtnIndex = this.state.buttonClicked.findIndex(
//     (btn) => btn.id === "wallBtn"
//   );

//   const startNodeBtnIndex = this.state.buttonClicked.findIndex(
//     (btn) => btn.id === "startNodeBtn"
//   );

//   if (this.state.buttonClicked[wallBtnIndex].isClicked) {
//     const updatedGrid = this.getNewGridWithWall(this.state.grid, row, col);

//     this.setState({ grid: updatedGrid, mouseIsPressed: true });
//   } else if (this.state.buttonClicked[startNodeBtnIndex].isClicked) {
//     const updatedGrid = this.getNewGridWithStartNode(
//       this.state.grid,
//       row,
//       col
//     );

//     this.setState({ grid: updatedGrid });
//   }
// };
//   handleButtonClick = (buttonID) => {
//     console.log(buttonID);

//     var buttonClicked = this.state.buttonClicked.map((val) => ({
//       ...val,
//     }));

//     buttonClicked.forEach((button) => {
//       if (button.id !== buttonID) {
//         button.isClicked = false;
//       } else {
//         button.isClicked = true;
//       }
//     });

//     this.setState({ buttonClicked });
//     /*
//     this.setState({
//       buttonClicked: this.state.buttonClicked.map(
//         (button) => button.id === buttonID
//       ),
//     });
//     */

//     console.log(this.state.buttonClicked);
//   };

//   getNewGridWithWall(grid, row, col) {
//     console.log("works");
//     const newGrid = grid.slice();
//     const node = newGrid[row][col];
//     const newNode = { ...node, isWall: !node.isWall };
//     newGrid[row][col] = newNode;
//     return newGrid;
//   }

//   getNewGridWithStartNode(grid, row, col) {
//     const startNodeBtnIndex = this.state.buttonClicked.findIndex(
//       (btn) => btn.id === "startNodeBtn"
//     );

//     const newGrid = grid.slice();
//     const node = newGrid[row][col];
//     const newNode = { ...node, isStart: !node.isStart };
//     newGrid[row][col] = newNode;
//     const buttonClicked = [...this.state.buttonClicked];
//     buttonClicked[startNodeBtnIndex].isClicked = false;
//     startNode = { row, col };
//     this.setState({ hasStartNode: true, buttonClicked });
//     return newGrid;
//   }

//   render() {
//     const { grid, mouseIsPressed } = this.state;
//     //console.log(this.state.buttonClicked);
//     return (
//       <div className="App" onMouseUp={this.handleMouseUp}>
//         <nav style={{ marginTop: "5px" }}>
//           <div className="btn-container">
//             <button
//               className="btn btn-primary"
//               id="wallBtn"
//               onClick={(e) => this.handleButtonClick(e.target.id)}
//             >
//               Wall
//             </button>
//             <button
//               className="btn btn-primary"
//               id="startNodeBtn"
//               onClick={(e) => this.handleButtonClick(e.target.id)}
//               disabled={this.state.hasStartNode}
//             >
//               Start Node
//             </button>
//             <input
//               type="checkbox"
//               id="resetBtn"
//               onClick={(e) => this.handleButtonClick(e.target.id)}
//             />
//           </div>
//         </nav>
// <Grid
//   key="grid"
//   grid={grid}
//   mouseIsPressed={mouseIsPressed}
//   onMouseDown={this.handleMouseDown}
//   onMouseUp={this.handleMouseUp}
//   onMouseEnter={this.handleMouseEnter}
// />
//       </div>
//     );
//   }
// }

// export default App;

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
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
  }

  function getNewGridWithWall(grid, row, col) {
    console.log("works");
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
    return newGrid;
  }

  function getNewGridWithStartNode(grid, row, col) {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = { ...node, isStart: !node.isStart };
    newGrid[row][col] = newNode;
    setStartNode({ row, col });
    return newGrid;
  }

  function handleMouseUp() {
    setMouseIsPresssed(false);
  }

  function handleMouseDown(row, col) {
    if (activeBtn === ButtonTypes.Wall) {
      const updatedGrid = getNewGridWithWall(grid, row, col);
      setGrid(updatedGrid);
      setMouseIsPresssed(true);
    } else if (activeBtn === ButtonTypes.Start && startNode.row == null) {
      const updatedGrid = getNewGridWithStartNode(grid, row, col);
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
