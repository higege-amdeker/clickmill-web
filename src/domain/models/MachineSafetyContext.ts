/**
 * Explicit safety acknowledgement kept separate from operation parameters.
 *
 * This flag records a workflow confirmation only; it is not evidence that the
 * machine, fixtures, work offset, tool length, or travel envelope were
 * physically measured.
 */
export interface MachineSafetyContext {
  safetyCheckCompleted: boolean
}
