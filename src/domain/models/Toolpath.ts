export interface ToolpathCoordinate {
  x?: number
  y?: number
  z?: number
}

export interface RapidMove extends ToolpathCoordinate {
  kind: 'rapid'
}

export interface LinearMove extends ToolpathCoordinate {
  kind: 'linear'
  feedRate: number
}

export type ToolpathMove = RapidMove | LinearMove

/**
 * An ordered, React- and G-code-independent sequence of tool movements.
 *
 * The meaning of omitted coordinates (modal versus an explicit inherited
 * position), the initial machine coordinate, and prerequisites for the first
 * move are intentionally unresolved until the machine/tool state contract is
 * defined. Consumers must not infer them.
 */
export interface Toolpath {
  moves: readonly ToolpathMove[]
}
