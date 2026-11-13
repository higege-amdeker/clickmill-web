# Data Model (Draft)

## Entities
- `Project`: schemaVersion, operation, workpiece, tool, cuttingParameters, setup, postprocessorSettings.
- `Workpiece`: width, length, thickness (mm).
- `Tool`: diameter (mm), optional tool number.
- `CuttingParameters`: spindleRPM, feedXY, feedZ, stepDown, stepOver.
- `Setup`: work origin, Z-zero, safeZ, clearanceZ (precise semantics TBD).
- `Toolpath`: ordered motion and machine-state commands, plus diagnostics.

## Rules
- JSON is versioned and validated on import.
- No NaN, infinity, negative dimensions, or zero tool diameter.
- Separate UI strings from parsed numeric domain values.
- All toolpath coordinates use a documented coordinate frame.


## v0.4 coordinate and parameter contract
```ts
type Millimeters = number;
interface Setup {
  xyOrigin: 'stock-lower-left';
  zZero: 'stock-top';
  safeZ: Millimeters;    // proposed; > 0
  retractZ: Millimeters; // proposed; > 0 and <= safeZ
}
interface DepthParameters {
  totalDepth: Millimeters; // positive input, cutting Z is negative
  stepDown: Millimeters;   // positive maximum depth increment
}
type Motion =
  | { kind: 'rapid'; x?: number; y?: number; z?: number }
  | { kind: 'feed'; x?: number; y?: number; z?: number; feed: number };
```
The type definitions describe a proposed domain contract; operation-specific shapes and modal machine state remain to be designed.

## Depth schedule
For `i = 1..ceil(totalDepth / stepDown)`, emit `z_i = -min(i * stepDown, totalDepth)`. Avoid floating-point accumulation by calculating each level from the index and clamp the final level exactly to `-totalDepth`. Example: depth 2.5 and stepDown 1 => [-1, -2, -2.5].

## v0.5 facing contract (proposal)
```ts
interface FacingOperation { kind: 'facing'; totalDepth: number; }
interface Workpiece { width: number; length: number; thickness: number; }
interface Tool { diameter: number; kind: 'flat-end-mill'; }
interface CuttingParameters {
  feedXY: number; feedZ: number; spindleRPM: number;
  stepDown: number; stepOver: number;
}
interface Setup {
  xyOrigin: 'stock-lower-left'; zZero: 'stock-top';
  safeZ: number; retractZ: number;
  // User-confirmed fixture-free envelope; NOT inferred from stock.
  externalTravelVerified: boolean;
}
```
The toolpath must also encode an explicit known starting Z and preserve ordered moves. Machine-specific limits and work offsets remain unresolved; do not assume that negative X/Y is allowed.
