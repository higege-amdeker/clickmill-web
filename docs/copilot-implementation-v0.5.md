# GitHub Copilot implementation instructions — v0.5

## Goal
Implement **only** the facing vertical slice for Web ClickMILL, from typed input through validation, deterministic toolpath and 2D preview, to draft generic G-code. Follow all documents in `docs/`; use `facing-algorithm.md` for path ordering and `gcode-spec.md` for postprocessor constraints.

## Architecture rules
- React + TypeScript with strict typing; Vite and Vitest are proposed.
- Domain, geometry, toolpath validation and postprocessor must be pure TypeScript, independent of React and browser APIs.
- Do not generate G-code directly from React form values; parse and validate into typed domain models first.
- Keep toolpath intermediate representation separate from G-code output.
- No server, telemetry, remote computation or machining-data upload.
- Treat safety-related unknowns as blocking diagnostics; never fabricate a machine profile or silently select a safe travel height.

## Implementation tasks (one PR / commit group at a time)
1. Define `FacingOperation`, `Workpiece`, `Tool`, `CuttingParameters`, `Setup`, `ToolpathMove`, and typed `Diagnostic`.
2. Implement pure parameter validation (finite values, dimensions, stepOver, stepDown, safeZ/retractZ, available external travel envelope and user confirmation).
3. Implement `calculateDepthLevels(totalDepth, stepDown)` and unit tests.
4. Implement `generateFacingToolpath(input)` according to `facing-algorithm.md` with deterministic ordered moves and explicit feed rates.
5. Implement independent toolpath validator: known initial Z, no XY rapid below retractZ, valid move coordinates, expected final safeZ.
6. Implement a draft generic G-code formatter (G21/G90/G17, G0/G1 only) with stable precision; machine startup/spindle/tool offsets remain profile-gated.
7. Build single-screen React form, SVG XY toolpath preview (feed/rapid differentiated), Z-level display, diagnostics and read-only NC preview.
8. Add project JSON import/export and browser file download; reject stale or invalid results after any input change.
9. Add unit and integration tests, then update docs with any deviations.

## Definition of done
- All cases in `test-plan.md` and `facing-algorithm.md` pass.
- No G-code download on validation failure or stale inputs.
- A user can inspect the complete ordered moves and NC text; preview and NC derive from exactly the same validated path.
- Generic G-code is clearly marked **not machine-certified**; the application never claims safe operation on arbitrary controllers.
- Do not implement drilling, pocketing, tool change, automatic machine startup or controller-specific codes in this iteration.

## First Copilot Chat prompt
> Read `.github/copilot-instructions.md`, `docs/requirements.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/facing-algorithm.md`, `docs/gcode-spec.md`, and `docs/test-plan.md`. Implement task 1 only: TypeScript domain types and tests. Do not build UI or G-code yet. Keep the domain React-independent. Identify unresolved machine-safety assumptions and do not guess their values. Show changed files and tests before moving to task 2.
