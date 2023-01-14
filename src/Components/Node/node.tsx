import React from 'react'
import './node.css'
interface Props {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isFinish: boolean
  isWall: boolean
  onMouseDown: (row: number, col: number) => void
  onMouseUp: () => void
  onMouseEnter: (row: number, col: number) => void
  rowCount: number
  windowSize: { width: number, height: number }
}
export default function Node ({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  onMouseUp,
  onMouseDown,
  onMouseEnter,
  rowCount,
  windowSize
}: Props): JSX.Element {
  const appendedClassName =
       isStart
         ? 'node-start'
         : isEnd
           ? 'node-end'
           : isWall
             ? 'node-wall'
             : ''

  return (
      <div
        key={`node-${row}-${col}`}
        id={`node-${row}-${col}`}
        className={`node ${appendedClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp}
        onMouseEnter={() => onMouseEnter(row, col)}
        style={{
          width: ((Math.min(windowSize.width) / rowCount) - 4) * 0.98,
          height: ((Math.min(windowSize.width) / rowCount) - 4) * 0.98,
          display: 'inline-block',
          marginInline: '2px',
          backgroundColor: '#868686',
          borderRadius: '5px'
        }}
      ></div>
  )
}
