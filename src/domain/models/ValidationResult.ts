export type ValidationErrorCode =
  | 'not-finite'
  | 'must-be-positive'
  | 'exceeds-tool-diameter'
  | 'below-retract-height'
  | 'safety-check-incomplete'

export interface ValidationError {
  field: string
  code: ValidationErrorCode
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: readonly ValidationError[]
}
