export interface ValidationError {
  field: string
  code: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  errors: readonly ValidationError[]
}
