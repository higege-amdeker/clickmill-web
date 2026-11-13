/**
 * Numeric inputs for a facing operation.
 *
 * Dimensions and Z values are in mm, feed rates are in mm/min, and spindleRPM
 * is in revolutions per minute. Physical machine limits are not represented by
 * this operation input.
 */
export interface FacingParameters {
  width: number
  height: number
  toolDiameter: number
  stepover: number
  depth: number
  stepdown: number
  safeZ: number
  retractZ: number
  feedXY: number
  feedZ: number
  spindleRPM: number
}
