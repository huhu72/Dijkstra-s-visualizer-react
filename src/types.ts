export enum ButtonTypes {
  Start = "Start",
  End = "End",
  Wall= "Wall",
  Reset= "Reset",
};

export type NodeType = {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    isWall: boolean,
    distance: number,
    isVisited: boolean,
    previousNode: Node
}

export type ButtonSettings = {
  enabled: boolean
}