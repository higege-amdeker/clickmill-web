# GitHub Copilot implementation plan — v0.6

Read `.github/copilot-instructions.md`, `docs/requirements.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/facing-inputs-v0.6.md`, `docs/facing-algorithm.md`, `docs/gcode-spec.md`, `docs/test-plan.md` before coding.

## Task 1 — domain and validation
Implement typed `FacingJob`, `Motion`, `Toolpath`, diagnostics and pure validators. React-independent TypeScript. Ensure finite numeric checks, depth/stock bounds, stepover/diameter bounds, safe/retract height relation, explicit external travel confirmation, known initial state and configurable resource caps. Add tests F05–F08, F11. Do not generate G-code yet.

## Task 2 — pure raster geometry
Implement deterministic `buildFacingGeometry` and `buildDepthLevels` with floating-point tolerance and output precision validation. Test F01–F04, F12. Never accumulate floating point increments iteratively.

## Task 3 — typed motion planner
Create ordered `rapid`/`feed` records with known state and feed rates; preserve row direction, feed Y connections, vertical feed plunges/retracts. Reject unsafe XY rapids and unknown initial state. Test F09–F10 and invariants. No React imports.

## Task 4 — postprocessor
Implement only draft generic G21/G90/G17/G0/G1 output with deterministic formatting. Do not invent spindle commands, work offsets, tool length compensation or program-end codes. Mark export non-machine-certified. Add golden tests and F14–F15.

## Task 5 — React UI
Single-page facing form, field errors, explicit clearance warning/acknowledgment, 2D XY preview and depth list, NC text view and download. Any edit invalidates prior generated output. Test F13.

## Copilot Chat prompt (Task 1 only)
Read all v0.6 specification documents. Implement Task 1 ONLY: React-independent TypeScript facing domain types and pure input validation, with Vitest tests for invalid values, fixture clearance acknowledgment, known initial state and resource caps. Do not build UI, toolpath or G-code. Never assume machine state, offsets or safe movement. Show changed files, tests and unresolved questions.

## Done criteria
Each task passes its unit tests and type checking; no implicit controller-specific startup code; safety preconditions explicitly surfaced; output remains a draft until machine-specific validation.
