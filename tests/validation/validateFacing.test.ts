import { describe, expect, it } from 'vitest'
import { validateFacing } from '../../src/domain/validation/validateFacing'
import type { FacingParameters } from '../../src/domain/models/FacingParameters'

const validParameters: FacingParameters = {
  width: 20,
  height: 10,
  toolDiameter: 4,
  stepover: 2,
  depth: 2.5,
  stepdown: 1,
  safeZ: 10,
  retractZ: 5,
  feedXY: 300,
  feedZ: 100,
  spindleRPM: 8000,
}

describe('validateFacing', () => {
  it('accepts valid parameters', () => {
    expect(validateFacing(validParameters)).toEqual({ valid: true, errors: [] })
  })

  it('rejects zero and negative positive-only values', () => {
    const result = validateFacing({ ...validParameters, width: 0, depth: -1, feedXY: 0 })
    expect(result.valid).toBe(false)
    expect(result.errors.map(({ field }) => field)).toEqual(['width', 'depth', 'feedXY'])
  })

  it('rejects an invalid stepover and clearance relationship', () => {
    const result = validateFacing({ ...validParameters, stepover: 5, safeZ: 2, retractZ: 3 })
    expect(result.errors.map(({ code }) => code)).toEqual([
      'exceeds-tool-diameter',
      'below-retract-height',
    ])
  })

  it('reports nonfinite values without derived duplicate errors', () => {
    const result = validateFacing({
      ...validParameters,
      stepover: Number.NaN,
      toolDiameter: Number.POSITIVE_INFINITY,
      safeZ: Number.NEGATIVE_INFINITY,
      retractZ: Number.NaN,
    })
    expect(result.errors).toHaveLength(4)
    expect(result.errors.every(({ code }) => code === 'not-finite')).toBe(true)
  })

  it('does not mutate the input object', () => {
    const input = { ...validParameters }
    const before = { ...input }
    validateFacing(input)
    expect(input).toEqual(before)
  })
})
