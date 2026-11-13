# Implementation plan — v0.7 baseline

## Milestones and gates
1. **Bootstrap**: Vite React TS, Vitest, scripts, no CAM logic. `npm run build`, `npm test`, `npm run lint` pass.
2. **Domain model**: types for stock, tool, facing inputs, verified setup, initial known position, IR. Domain has no React/browser imports. Typecheck and tests pass.
3. **Validation**: pure function returns structured field errors; reject nonfinite values, zero/negative dimensions, stepOver > tool diameter, depth > stock thickness, safeZ < retractZ, unverified clearance, unknown initial state and exceeded resource caps. All tests pass.
4. **Facing geometry**: calculate raster rows, X bounds and depth passes, with floating tolerance and final endpoint inclusion. Test fixture W20 L10 T5 D4 S4 depth2.5 stepDown1 => X[-2,22], Y[-2,2,6,10,12], Z[-1,-2,-2.5].
5. **Motion planner**: validated ordered IR, known initial state; plunge/retract at feed, no XY rapid below retractZ, no unverified corridor; limits on row/pass/motion counts. Unit tests for order and unsafe rejection.
6. **Postprocessor**: 3 decimal XYZ/F, negative-zero normalization, LF/trailing newline, `.nc`, G21 G90 G17, explicit G0/G1, optional S/M3/M5, M2 proposed only; reject rounding-induced hazards and missing approvals. Golden tests.
7. **UI**: one-page form, inline errors, SVG XY path and depth list, code preview, explicit warnings, stale output invalidation, JSON save/load and `.nc` download only after successful checks.
8. **Integration**: browser smoke tests, accessibility checks, performance caps and manual controller-specific review checklist.

## Release policy
Passing unit tests does not certify NC code for a machine. Generic postprocessor output is a draft until machine/controller profile and setup are independently validated. No automatic fixture clearance detection.

## Work protocol
One milestone per Copilot request. After each milestone require changed file list, commands run and output, assumptions and unresolved issues. Do not proceed if checks fail. Never fabricate machine position or safety confirmations.
