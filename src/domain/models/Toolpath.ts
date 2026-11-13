export interface ToolpathCoordinate {
  readonly x: number
  readonly y: number
  readonly z: number
}

export interface RapidMove extends ToolpathCoordinate {
  readonly kind: 'rapid'
}

export interface LinearMove extends ToolpathCoordinate {
  readonly kind: 'linear'
  readonly feedRate: number
}

export type ToolpathMove = RapidMove | LinearMove

/**
 * An ordered, React- and G-code-independent sequence of tool movements.
 *
 * Coordinates are absolute positions in the work coordinate system (G90
 * semantics). Every move is a complete XYZ endpoint; consumers must not infer
 * omitted coordinates or a starting position. The initial machine position,
 * tool length compensation, work offset, and fixture clearance must be
 * verified separately before a toolpath is executed.
 */
export interface Toolpath {
  readonly moves: readonly ToolpathMove[]
}
