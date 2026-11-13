/**
 * User-declared safety acknowledgement kept separate from operation parameters.
 *
 * This flag records a workflow confirmation only. It never proves that the
 * machine, fixtures, work offset, tool length, or travel envelope are safe.
 */
export interface MachineSafetyContext {
  safetyCheckCompleted: boolean
}
