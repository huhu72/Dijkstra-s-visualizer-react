import React, { Component } from 'react'
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
}
class Node extends Component<Props> {
  state = {}
  render (): JSX.Element {
    const {
      row,
      col,
      isStart,
      isEnd,
      isWall,
      onMouseUp,
      onMouseDown,
      onMouseEnter
    } = this.props
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
          width: '1.6vw',
          height: '1.6vw',
          display: 'inline-block',
          marginInline: '2px',
          backgroundColor: '#868686',
          borderRadius: '5px'
        }}
      ></div>
    )
  }
}

export default Node
