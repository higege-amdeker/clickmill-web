import { describe, expect, it } from 'vitest'
import { validateGenerationReadiness } from '../../src/domain/validation/validateGenerationReadiness'
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

describe('validateGenerationReadiness', () => {
  it('is not ready when safety confirmation is incomplete', () => {
    const result = validateGenerationReadiness(validParameters, { safetyCheckCompleted: false })
    expect(result.ready).toBe(false)
    expect(result.valid).toBe(false)
    expect(result.errors).toContainEqual({
      field: 'safetyCheckCompleted',
      code: 'safety-check-incomplete',
      message: 'Safety confirmation must be completed before generation readiness.',
    })
  })

  it('is ready only when parameters and safety confirmation are valid', () => {
    expect(validateGenerationReadiness(validParameters, { safetyCheckCompleted: true })).toEqual({
      ready: true,
      valid: true,
      errors: [],
    })
  })

  it('returns parameter and safety errors together', () => {
    const result = validateGenerationReadiness(
      { ...validParameters, width: 0, safeZ: 2, retractZ: 3 },
      { safetyCheckCompleted: false },
    )
    expect(result.ready).toBe(false)
    expect(result.errors.map(({ field }) => field)).toEqual([
      'width',
      'safeZ',
      'safetyCheckCompleted',
    ])
  })
})
