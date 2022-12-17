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
