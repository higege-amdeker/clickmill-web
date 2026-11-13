import type { FacingParameters } from '../models/FacingParameters'
import type { MachineSafetyContext } from '../models/MachineSafetyContext'
import type { ValidationError, ValidationResult } from '../models/ValidationResult'
import { validateFacing } from './validateFacing'

export interface GenerationReadiness extends ValidationResult {
  ready: boolean
}

export function validateGenerationReadiness(
  parameters: FacingParameters,
  safetyContext: MachineSafetyContext,
): GenerationReadiness {
  const parameterResult = validateFacing(parameters)
  const errors: ValidationError[] = [...parameterResult.errors]

  if (!safetyContext.safetyCheckCompleted) {
    errors.push({
      field: 'safetyCheckCompleted',
      code: 'safety-check-incomplete',
      message: 'Safety confirmation must be completed before generation readiness.',
    })
  }

  return {
    valid: errors.length === 0,
    ready: errors.length === 0,
    errors,
  }
}
