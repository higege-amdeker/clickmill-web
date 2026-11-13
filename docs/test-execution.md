# Test execution and acceptance

## Per change
```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
```

## Domain validation tests
- Reject `NaN`, `Infinity`, 0 and negative geometry/feed values.
- Reject `stepOver > toolDiameter`, `depth > stock.thickness`, `safeZ < retractZ` and `retractZ <= 0`.
- Block toolpath motion when known initial XYZ or verified travel corridor is missing.
- Reject unreasonably large raster/pass/motion counts before allocation.

## Geometry golden fixture
W=20, L=10, T=5, D=4, stepover=4, totalDepth=2.5, stepDown=1:
- X bounds [-2,22]
- Y rows [-2,2,6,10,12]
- Z passes [-1,-2,-2.5]
- 15 X sweeps, 12 Y connectors; X cutting distance 360mm, Y connectors 42mm.
- Check final row exactly 12 and final depth exactly -2.5, with defined tolerance.

## Postprocessor golden checks
- LF-only, trailing newline, `.nc`, X/Y/Z/F fixed three decimals, no `-0.000`.
- Optional spindle OFF: no S/M3/M5. ON: validated RPM, S/M3 before cut, M5 after final retract.
- No XY rapid below retractZ; no downward rapid; reject rounding-induced unsafe changes.
- Reject stale generated NC after any input or postprocessor option changes.

## Manual verification before any machine use
Verify target controller dialect, startup tool state, machine limits, work offset, tool length compensation, fixtures, clamps, spindle readiness and dry-run/simulation. Unit tests alone do not certify machine-safe NC.
