import type { FacingParameters } from '../models/FacingParameters'
import type { ValidationError, ValidationResult } from '../models/ValidationResult'

const numericFields: readonly (keyof FacingParameters)[] = [
  'width',
  'height',
  'toolDiameter',
  'stepover',
  'depth',
  'stepdown',
  'safeZ',
  'retractZ',
  'feedXY',
  'feedZ',
  'spindleRPM',
]

const positiveFields: readonly (keyof FacingParameters)[] = [
  'width',
  'height',
  'toolDiameter',
  'depth',
  'stepdown',
  'feedXY',
  'feedZ',
  'spindleRPM',
]

const error = (field: string, code: string, message: string): ValidationError => ({
  field,
  code,
  message,
})

export function validateFacing(parameters: FacingParameters): ValidationResult {
  const errors: ValidationError[] = []
  const nonFinite = new Set<keyof FacingParameters>()

  for (const field of numericFields) {
    if (!Number.isFinite(parameters[field])) {
      nonFinite.add(field)
      errors.push(error(field, 'not-finite', `${field} must be finite.`))
    }
  }

  for (const field of positiveFields) {
    if (!nonFinite.has(field) && parameters[field] <= 0) {
      errors.push(error(field, 'must-be-positive', `${field} must be greater than zero.`))
    }
  }

  if (!nonFinite.has('stepover') && !nonFinite.has('toolDiameter')) {
    if (parameters.stepover <= 0) {
      errors.push(error('stepover', 'must-be-positive', 'stepover must be greater than zero.'))
    } else if (parameters.stepover > parameters.toolDiameter) {
      errors.push(error('stepover', 'exceeds-tool-diameter', 'stepover must not exceed toolDiameter.'))
    }
  }

  if (!nonFinite.has('safeZ') && !nonFinite.has('retractZ')) {
    if (parameters.retractZ <= 0) {
      errors.push(error('retractZ', 'must-be-positive', 'retractZ must be greater than zero.'))
    }
    if (parameters.safeZ <= 0) {
      errors.push(error('safeZ', 'must-be-positive', 'safeZ must be greater than zero.'))
    }
    if (parameters.safeZ < parameters.retractZ) {
      errors.push(error('safeZ', 'below-retract-height', 'safeZ must be greater than or equal to retractZ.'))
    }
  }

  return { valid: errors.length === 0, errors }
}
