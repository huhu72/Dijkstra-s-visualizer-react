import React, { useEffect, useState, useRef } from 'react'
import Node from '../Node/node'
import { NodeType } from '../../types'

interface Props {
  grid: NodeType[][]
  onMouseDown: (row: number, col: number) => void
  onMouseUp: () => void
  onMouseEnter: (row: number, col: number) => void
  rowCount: number
}
function Grid ({ grid, onMouseDown, onMouseUp, onMouseEnter, rowCount }: Props): JSX.Element {
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const ref = useRef<any>(null)

  // useEffect(() => {
  //   setGridSize({ height: ref.current.clientHeight, width: ref.current.clientWidth })
  // }, [ref?.current?.clientHeight, ref?.current?.clientWidth])

  useEffect(() => {
    // Handler to call on window resize
    function handleResize (): void {
      // Set window width/height to state
      setGridSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // console.log({ grid });
  return (
      <div className ="grid" ref = {ref} style={{ margin: '5px 0 0', width: window.innerWidth, height: window.innerHeight }} key="Grid">
        {grid.map((row, i) => {
          return (
            <div className="i" key={i}>
              {row.map((node, j) => {
                const { row, col, isStart, isEnd, isFinish, isWall } = node
                return (
                  <Node
                    key={`node-${row}-${col}`}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isEnd={isEnd}
                    isFinish={isFinish}
                    isWall={isWall}
                    windowSize={gridSize}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseEnter={onMouseEnter}
                    rowCount={rowCount}
                    ></Node>
                )
              })}
            </div>
          )
        })}
      </div>
  )
}

export default Grid
