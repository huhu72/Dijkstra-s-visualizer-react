export enum ButtonTypes {
  Start = 'Start',
  End = 'End',
  Wall = 'Wall',
  Reset = 'Reset',
  Run = 'Run'
};

export interface NodeType {
  row: number
  col: number
  isStart: boolean
  isEnd: boolean
  isFinish: boolean
  isWall: boolean
  distance: number
  isVisited: boolean
  previousNode: NodeType | null
}

export interface ButtonSettings {
  enabled: boolean
}

export interface Props {
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
  grid: Node[][]
}
