# Decisions — v0.6

## Confirmed by product owner
- React + TypeScript; NC generation entirely in browser; single-screen UI; 2D preview; generic G-code draft.
- Work XY origin stock lower-left; Z0 stock top; Z+ upward; absolute metric coordinates.
- Two heights `safeZ >= retractZ > 0`; XY rapid allowed at verified retractZ or higher.
- First operation facing; tool center may travel outside stock; bidirectional zigzag raster along X.

## Implementation contracts proposed in v0.6 (review before production)
- Full-face center envelope extended by cutter radius, indexed raster spacing and depth levels, vertical feed entry/retraction.
- Explicit known initial state, external corridor verification, caps, output precision checks and tests.

## Still unresolved
- Controller-specific initialization, work offsets, spindle control, machine limits, tool length compensation, safe initial motion, NC file extension, startup/end codes, exact decimal precision, tolerance and resource cap numbers.
- Confirmation workflow for machine clearance, fixtures and stock outside area; no automatic collision checking.
- Actual spindle and feed suitability depends on material/tool/machine and must not be inferred from example values.
