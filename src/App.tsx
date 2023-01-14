import './App.css'
import Grid from './Components/Grid/grid'
import React, { useState } from 'react'
import ButtonToggleGroup from './Components/ButtonToggleGroup'
import { ButtonSettings, ButtonTypes, NodeType } from './types'
import dijkstra, { getNodesInShortestPathOrder } from './Algorithms/dijkstra'

const rowCount = 40
function getInitialGrid (): NodeType[][] {
  const grid = []

  for (let row = 0; row < 19; row++) {
    const currentRow = []
    for (let col = 0; col < rowCount; col++) {
      currentRow.push(createNode(col, row))
    }
    grid.push(currentRow)
  }
  return grid
}

function createNode (col: number, row: number): NodeType {
  return {
    row,
    col,
    isStart: false,
    isEnd: false,
    isFinish: false,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null
  }
}

export default function App (): JSX.Element {
  const [grid, setGrid] = useState<NodeType[][]>(getInitialGrid())
  const [mouseIsPressed, setMouseIsPresssed] = useState<boolean>(false)
  const [activeBtn, setActiveBtn] = useState<ButtonTypes>(ButtonTypes.Wall)
  const [startNode, setStartNode] = useState<{ row: number | null, col: number | null }>({ row: null, col: null })
  const [endNode, setEndNode] = useState<{ row: number | null, col: number | null }>({ row: null, col: null })
  const [buttonSettings, setButtonSettings] = useState(
    getInitialButtonSettings()
  )

  function getInitialButtonSettings (): Record<ButtonTypes, ButtonSettings> {
    return Object.keys(ButtonTypes).reduce<Record<ButtonTypes, ButtonSettings>>((accumulator, type) => {
      return {
        ...accumulator,
        [type]: {
          enabled: true
        }
      }
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
    }, {} as Record<ButtonTypes, ButtonSettings>)
  }

  function handleMouseEnter (row: number, col: number): void {
    if (!mouseIsPressed) return
    const newGrid = updateGrid(grid, row, col, { isWall: true })
    setGrid(newGrid)
  }
  // Using partial lets you give a partial type of the object. (i.e were only using the isWall property instead of all the other ones.) this makes all the properties optional so we dont have to add a ? to the properties in the Node type
  function updateGrid (grid: NodeType[][], row: number, col: number, newState: Partial<NodeType>): NodeType[][] {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const updatedNode = { ...node, ...newState }
    newGrid[row][col] = updatedNode
    // console.log(newState)
    if (updatedNode.isStart) {
      setStartNode({ row, col })
    } else if (updatedNode.isEnd) {
      setEndNode({ row, col })
    }

    newGrid[row][col] = updatedNode
    return newGrid
  }
  function handleMouseUp (): void {
    setMouseIsPresssed(false)
  }

  function handleMouseDown (row: number, col: number): void {
    if (activeBtn === ButtonTypes.Wall) {
      const updatedGrid = updateGrid(grid, row, col, { isWall: true })
      setGrid(updatedGrid)
      setMouseIsPresssed(true)
    } else if (activeBtn === ButtonTypes.Start && startNode.row == null) {
      const updatedGrid = updateGrid(grid, row, col, { isStart: true })
      setGrid(updatedGrid)
      setButtonSettings({ ...buttonSettings, Start: { enabled: false } })
    } else if (activeBtn === ButtonTypes.End && endNode.row == null) {
      const updatedGrid = updateGrid(grid, row, col, { isEnd: true })
      setGrid(updatedGrid)
      setButtonSettings({ ...buttonSettings, End: { enabled: false } })
    }
  }

  function onClick (buttonType: ButtonTypes): void {
    setActiveBtn(buttonType)
    if (buttonType === ButtonTypes.Reset) {
      handleReset()
    }
    if (buttonType === ButtonTypes.Run) {
      runDisjktra()
    }
  }

  function handleReset (): void {
    setGrid(getInitialGrid())
    for (const row of grid) {
      for (const node of row) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById(`node-${node.row}-${node.col}`)!.className = 'node'
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById(`node-${node.row}-${node.col}`)!.style.backgroundColor = '#868686'
      }
    }
    setButtonSettings(getInitialButtonSettings)
    setStartNode({ row: null, col: null })
    setEndNode({ row: null, col: null })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function runDisjktra (): void {
    if (startNode.row !== null && startNode.col !== null && endNode.row !== null && endNode.col !== null) {
      const start: NodeType = grid[startNode.row][startNode.col]
      const end: NodeType = grid[endNode.row][endNode.col]
      const visitedNodesInOrder: NodeType[] = dijkstra(grid, start, end)
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(end)
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }
  }
  function animateDijkstra (visitedNodesInOrder: NodeType[], nodesInShortestPathOrder: NodeType[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const visitedNode = document.getElementById(`node-${node.row}-${node.col}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const start = document.getElementById(`node-${startNode.row!}-${startNode.col!}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const end = document.getElementById(`node-${endNode.row!}-${endNode.col!}`)
        if (visitedNode !== null && visitedNode !== start && visitedNode !== end) {
          visitedNode.className =
          'node node-visited'
        }
      }, 10 * i)
    }
  }
  function animateShortestPath (nodesInShortestPathOrder: NodeType[]): void {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        const nodePath = document.getElementById(`node-${node.row}-${node.col}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const start = document.getElementById(`node-${startNode.row!}-${startNode.col!}`)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const end = document.getElementById(`node-${endNode.row!}-${endNode.col!}`)
        if (nodePath !== null && nodePath !== start && nodePath !== end) {
          nodePath.className =
            'node node-shortest-path'
        }
      }, 50 * i)
    }
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
        rowCount = {rowCount}
      />
    </div>
  )
}
