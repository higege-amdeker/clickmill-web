import { describe, expect, it, expectTypeOf } from 'vitest'
import type {
  LinearMove,
  RapidMove,
  Toolpath,
  ToolpathCoordinate,
  ToolpathMove,
} from '../../src/domain/models/Toolpath'

describe('Toolpath model', () => {
  it('represents complete absolute XYZ endpoints', () => {
    const rapid: RapidMove = { kind: 'rapid', x: 0, y: 0, z: 10 }
    const linear: LinearMove = { kind: 'linear', x: 20, y: 10, z: -1, feedRate: 300 }
    const toolpath: Toolpath = { moves: [rapid, linear] }

    expect(toolpath.moves).toEqual([rapid, linear])
    expectTypeOf<ToolpathCoordinate>().toEqualTypeOf<{ readonly x: number; readonly y: number; readonly z: number }>()
    expectTypeOf<LinearMove>().toHaveProperty('feedRate').toBeNumber()
  })

  it('keeps the move sequence readonly at the type level', () => {
    expectTypeOf<Toolpath['moves']>().toEqualTypeOf<readonly ToolpathMove[]>()
  })
})
